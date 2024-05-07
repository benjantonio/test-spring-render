FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package


FROM openjdk:17-alpine
COPY --from=build /target/HolaSpring-0.0.1-SNAPSHOT.jar benjantonio.jar
ENTRYPOINT ["java","-jar","benjantonio.jar"]