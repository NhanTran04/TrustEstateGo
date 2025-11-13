# Sử dụng image Java 21
FROM eclipse-temurin:21-jdk-jammy

# Đặt thư mục làm việc
WORKDIR /app

# Copy toàn bộ project vào container
COPY . .

# Build project (nếu chưa build)
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Chạy file JAR
CMD ["java", "-jar", "target/trustestatego-0.0.1-SNAPSHOT.jar"]
