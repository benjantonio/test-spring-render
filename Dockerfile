FROM maven:3.8.4-openjdk-11 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build app/target/HolaSpring-0.0.1-SNAPSHOT.jar benjantonio.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","benjantonio.jar"]
