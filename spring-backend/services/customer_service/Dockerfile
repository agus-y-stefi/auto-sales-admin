# Etapa 1: Compilación con Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Carpeta de trabajo
WORKDIR /app

# Copiar pom.xml y descargar dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Imagen liviana con JDK para correr la app
FROM eclipse-temurin:21-jdk-alpine

# Carpeta de trabajo
WORKDIR /app

# Copiar el jar compilado desde la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Puerto expuesto (cambia según tu microservicio)
EXPOSE 8081:8081

# Comando de inicio
ENTRYPOINT ["java","-jar","app.jar"]
