# Usa la imagen oficial de OpenJDK 21 como base
FROM openjdk:21-jdk-slim

# Instala Maven
RUN apt-get update && apt-get install -y maven && apt-get clean

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo pom.xml (esto es importante para la construcción incremental)
COPY pom.xml .

# Descarga las dependencias de Maven
RUN mvn dependency:go-offline

# Copia el código fuente del proyecto al contenedor
COPY src /app/src

# Compila el proyecto
RUN mvn clean install

# Expone el puerto en el que se ejecutará la aplicación (si es necesario)
EXPOSE 8081

# Comando para ejecutar la aplicación
CMD ["mvn", "spring-boot:run"]
