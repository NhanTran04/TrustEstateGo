package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.response.ChatBoxResponse;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.repository.PropertyRepository;
import com.tln.trustestatego.service.ChatBoxService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatBoxServiceImpl implements ChatBoxService {
    private final WebClient webClient;
    private final PropertyRepository propertyRepository;

    @Value("${app.api.gemini.api-key}")
    private String apiKey;

    @Value("${app.api.gemini.model}")
    private String model;

    @Override
    public ChatBoxResponse ask(String userMessage) {
        try {
            // 1. Extract thông tin liên quan đến BĐS
            String location = extractLocation(userMessage);
            BigDecimal maxPrice = extractPrice(userMessage);
            Integer minArea = extractArea(userMessage);

            boolean isRealEstate = (location != null || maxPrice != null || minArea != null
                    || userMessage.toLowerCase().contains("phòng")
                    || userMessage.toLowerCase().contains("căn")
                    || userMessage.toLowerCase().contains("chung cư")
                    || userMessage.toLowerCase().contains("nhà"));

            String context;

            if (isRealEstate) {
                if (location == null) location = "";
                if (maxPrice == null) maxPrice = BigDecimal.valueOf(999999999);
                if (minArea == null) minArea = 0;

                Page<Property> page  = propertyRepository
                        .findByLocationContainingIgnoreCaseAndPriceLessThanEqualAndAreaGreaterThanEqual(
                                location, maxPrice, minArea,
                                PageRequest.of(0, 5)
                        );
                List<Property> properties = page.getContent();

                long total = page.getTotalElements();

                if (properties.isEmpty()) {
                    return new ChatBoxResponse("Hiện tại chưa có căn hộ đúng yêu cầu. Bạn có muốn tham khảo lựa chọn gần nhất không?");
                }

                // Build context ngắn gọn
                StringBuilder sb = new StringBuilder();
                sb.append("Người dùng hỏi: ").append(userMessage).append("\n");
                sb.append("Có tổng cộng ").append(total).append(" căn hộ phù hợp.\n");
                sb.append("Danh sách một số căn tiêu biểu:\n");

                properties.forEach(p -> sb.append("- ")
                        .append(p.getTitle())
                        .append(", giá: ").append(p.getPrice()).append(" VND")
                        .append(", diện tích: ").append(p.getArea()).append("m2")
                        .append(", vị trí: ").append(p.getLocation())
                        .append("\n")
                );

                sb.append("Hãy trả lời ngắn gọn, chỉ cho biết số lượng căn hộ và liệt kê nhanh các căn ở trên.");
                context = sb.toString();

            } else {
                // Không liên quan BĐS → để Gemini trả lời tự nhiên
                context = "Người dùng hỏi: " + userMessage + "\nHãy trả lời tự nhiên, thân thiện như một chatbot bình thường.";
            }

            // 2. Gọi Gemini
            Map<String, Object> body = Map.of(
                    "contents", List.of(
                            Map.of("parts", List.of(Map.of("text", context)))
                    )
            );

            Map response = webClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/v1beta/models/{model}:generateContent")
                            .build(model))
                    .header("x-goog-api-key", apiKey)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null) {
                throw new RuntimeException("Empty response from Gemini");
            }

            Object candObj = response.get("candidates");
            if (candObj instanceof List list && !list.isEmpty()) {
                Object first = list.get(0);
                if (first instanceof Map firstMap) {
                    Object content = firstMap.get("content");
                    if (content instanceof Map contentMap) {
                        Object partsObj = contentMap.get("parts");
                        if (partsObj instanceof List pList && !pList.isEmpty()) {
                            Object part0 = pList.get(0);
                            if (part0 instanceof Map partMap) {
                                Object txt = partMap.get("text");
                                return new ChatBoxResponse(txt != null ? txt.toString() : "");
                            }
                        }
                    }
                }
            }
            return new ChatBoxResponse("Xin lỗi — không có phản hồi hợp lệ từ Gemini.");

        } catch (WebClientResponseException wex) {
            log.error("Gemini API error: {} - {}", wex.getStatusCode(), wex.getResponseBodyAsString());
            throw new RuntimeException("Lỗi gọi Gemini API: " + wex.getMessage());
        } catch (Exception ex) {
            log.error("Error in ask()", ex);
            throw new RuntimeException("Lỗi nội bộ khi gọi Gemini: " + ex.getMessage());
        }
    }



    // --- Helper parse functions ---
    private String extractLocation(String text) {
        Pattern p = Pattern.compile("(Quận\\s*\\d+|Huyện\\s*\\w+|Thủ Đức|Hà Nội|HCM)", Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(text);
        return m.find() ? m.group() : null;
    }

    private BigDecimal extractPrice(String text) {
        Pattern p = Pattern.compile("(\\d+(?:[.,]\\d+)?)(\\s*tr|\\s*triệu)", Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(text);
        if (m.find()) {
            String num = m.group(1).replace(",", ".");
            return new BigDecimal(num).multiply(BigDecimal.valueOf(1_000_000));
        }
        return null;
    }

    private Integer extractArea(String text) {
        Pattern p = Pattern.compile("(\\d+)(\\s*m2|\\s*m²)", Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(text);
        if (m.find()) {
            return Integer.parseInt(m.group(1));
        }
        return null;
    }
}
