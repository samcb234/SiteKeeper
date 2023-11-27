FROM openjdk:17-jdk-alpine

RUN apk --update add fontconfig ttf-dejavu

ARG JAR_FILE=${project.artifactId}-${project.version}-exec.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]