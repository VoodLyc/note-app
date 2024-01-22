FROM maven:3.9.6-amazoncorretto-21

COPY . /usr/src/backend

WORKDIR /usr/src/backend

RUN mvn clean install
RUN mvn compile

ENTRYPOINT ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]