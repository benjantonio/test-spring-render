FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package


FROM openjdk:17-alpine
COPY --from=build /target/HolaSpring-0.0.1-SNAPSHOT.jar benjantonio.jar
EXPOSE $PORT
ENTRYPOINT ["java","-jar","benjantonio.jar"]


FROM maven:3.8.4-openjdk-11 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]