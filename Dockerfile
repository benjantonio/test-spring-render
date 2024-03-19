FROM maven:3.8.5-openjdk-17 AS build
COPY target/HolaSpring-0.0.1-SNAPSHOT.jar benjantonio.jar
ENTRYPOINT ["JAVA","-jar","benjantonio.jar"]