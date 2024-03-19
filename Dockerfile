FROM amazoncorretto:11-alpine-jdk
COPY target/HolaSpring-0.0.1-SNAPSHOT.jar benjantonio.jar
ENTRYPOINT ["java","-jar","/benjantonio.jar"]