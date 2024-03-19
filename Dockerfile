FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvc clean package -DskipTest
FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/HolaSpring-0.0.1-SNAPSHOT.jar benjantonio.jar
EXPOSE 8080
ENTRYPOINT ["JAVA","-jar","benjantonio.jar"]