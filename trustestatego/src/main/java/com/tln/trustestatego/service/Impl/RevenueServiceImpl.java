package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.response.RevenueResponse;
import com.tln.trustestatego.repository.PaymentRepository;
import com.tln.trustestatego.service.RevenueService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RevenueServiceImpl implements RevenueService {

    PaymentRepository paymentRepository;

    @Override
    public List<RevenueResponse> getRevenueByMonth(int year) {
        Map<Integer, BigDecimal> map = paymentRepository.getRevenueByMonthRaw(year)
                .stream()
                .collect(Collectors.toMap(
                        row -> ((Number) row[0]).intValue(),
                        row -> (BigDecimal) row[1]
                ));

        return IntStream.rangeClosed(1, 12)
                .mapToObj(m -> new RevenueResponse(m, map.getOrDefault(m, BigDecimal.ZERO)))
                .toList();
    }

    @Override
    public List<RevenueResponse> getRevenueByQuarter(int year) {
        List<RevenueResponse> months = getRevenueByMonth(year);

        Map<Integer, BigDecimal> quarterMap = months.stream()
                .collect(Collectors.groupingBy(
                        m -> (m.getPeriod() - 1) / 3 + 1, // tính quý
                        Collectors.reducing(BigDecimal.ZERO, RevenueResponse::getTotal, BigDecimal::add)
                ));

        return IntStream.rangeClosed(1, 4)
                .mapToObj(q -> new RevenueResponse(q, quarterMap.getOrDefault(q, BigDecimal.ZERO)))
                .toList();
    }

    @Override
    public List<RevenueResponse> getRevenueByYear(int year) {

        BigDecimal total = getRevenueByMonth(year).stream()
                .map(RevenueResponse::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return List.of(new RevenueResponse(year, total));
    }
}

