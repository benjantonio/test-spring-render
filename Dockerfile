FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
COPY . .

RUN apt-get install maven -y
run mvn clean install

FROM openjdk:17-jdk-slim

EXPOSE 8080

COPY --form=build /target/HolaSpring-0.0.1-SNAPSHOT.jar benjantonio.jar
ENTRYPOINT ["java","-jar","benjantonio.jar"]