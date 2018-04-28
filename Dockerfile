FROM openjdk:8-jdk-alpine

ADD backend/build/libs/ /project
WORKDIR /project

CMD java -Xmx512M -jar -Dspring.profiles.active=stage,heroku -Dserver.port=$PORT backend-0.0.1-SNAPSHOT.jar