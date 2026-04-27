# Auto Sales Admin

Repositorio con un backend en Spring Boot y un frontend en Next.js.

## Requisitos

- Docker y Docker Compose
- Node.js y npm

## Cómo correr el proyecto

### 1. Levantar el backend

Desde la carpeta `spring-backend`:

```bash
docker-compose up
```

Esto levanta las bases de datos y los microservicios necesarios para exponer las APIs.

### 2. Instalar dependencias del frontend

Desde la carpeta `nextjs-front`:

```bash
npm install
```

### 3. Generar los contratos de API

Con el backend ya corriendo, ejecutar dentro de `nextjs-front`:

```bash
npm run generate:api
```

Este comando ejecuta Orval y genera los clientes tipados consumidos por el frontend.

### 4. Levantar el frontend

Luego, también desde `nextjs-front`:

```bash
npm run dev
```

El frontend queda disponible en `http://localhost:3000`.

## Orden recomendado

1. `docker-compose up` en `spring-backend`
2. `npm install` en `nextjs-front`
3. `npm run generate:api` en `nextjs-front`
4. `npm run dev` en `nextjs-front`

## Notas

- La generación de API depende de que los microservicios estén disponibles en `localhost:8081`, `localhost:8082` y `localhost:8083`.
- Si cambian las URLs de los servicios, también debe ajustarse la configuración de Orval.