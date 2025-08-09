# Sistema de Gestión de Ventas

Una plataforma moderna y completa para la gestión integral de ventas, órdenes, productos y clientes. Desarrollada con tecnologías de vanguardia para ofrecer una experiencia de usuario excepcional y un rendimiento óptimo.

## Tabla de Contenidos

- [Tecnologías y Funcionalidades](#-tecnologías-y-funcionalidades)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Arquitectura](#-arquitectura)
- [Comenzando](#-comenzando)
- [Desarrollo Backend](#-desarrollo-backend)
- [Desarrollo Frontend](#-desarrollo-frontend)
- [Testing y QA](#-testing-y-qa)
- [Despliegue](#-despliegue)
- [CI/CD](#-cicd)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)


## Tecnologías y Funcionalidades

### Frontend (Next.js + React)

- **Next.js 15.3.2** - Framework React con SSR y SSG
- **React 19.0.0** - Librería UI moderna
- **TypeScript 5** - Tipado estático para mayor robustez
- **Tailwind CSS 3.4.17** - Framework CSS utilitario
- **HeroUI/React** - Componentes UI modernos y accesibles
- **Material UI 7.0.1** - Componentes adicionales
- **Ant Design 5.24.6** - Suite completa de componentes
- **Framer Motion** - Animaciones fluidas y profesionales
- **Lucide React** - Iconografía consistente
- **Jest 29.7.0** - Testing unitario


### Backend (Spring Boot + Java)

- **Java 23** - Última versión LTS
- **Spring Boot** - Framework empresarial robusto
- **Maven** - Gestión de dependencias y construcción
- **PostgreSQL** - Base de datos relacional de alto rendimiento


### DevOps e Infraestructura

- **Docker** - Contenerización para despliegues consistentes
- **PostgreSQL** - Base de datos en contenedor dedicado


### Funcionalidades Principales

- ✅ **Gestión de Órdenes** - Creación, edición y seguimiento completo
- ✅ **Catálogo de Productos** - Administración integral del inventario
- ✅ **Base de Clientes** - CRM integrado con historial completo
- ✅ **Dashboard Analítico** - Métricas y reportes en tiempo real
- ✅ **Interfaz Responsive** - Optimizada para todos los dispositivos
- ✅ **Sidebar Colapsible** - Navegación intuitiva y eficiente
- ✅ **Modales Interactivos** - Formularios dinámicos para CRUD
- ✅ **Sistema de Estados** - Seguimiento visual del flujo de órdenes


## Capturas de Pantalla

### Dashboard Principal





### Gestión de Órdenes





### Detalles de Orden





### Catálogo de Productos





## ️ Arquitectura

```mermaid
Failed to render diagram
```

### Flujo de Datos

1. **Frontend** - Next.js renderiza componentes React con datos tipados
2. **API Layer** - Spring Boot expone endpoints RESTful
3. **Business Logic** - Procesamiento de reglas de negocio
4. **Data Layer** - PostgreSQL almacena datos relacionales
5. **Docker** - Contenerización para consistencia entre entornos


## Comenzando

### Prerrequisitos

- Node.js 18+
- Java 23+
- Docker & Docker Compose
- PostgreSQL 15+


### Instalación Rápida

```shellscript
# Clonar el repositorio
git clone https://github.com/tu-usuario/sales-management-system.git
cd sales-management-system

# Levantar servicios con Docker
docker-compose up -d

# Instalar dependencias del frontend
cd frontend
npm install

# Iniciar desarrollo frontend
npm run dev

# En otra terminal - Backend
cd ../backend
./mvnw spring-boot:run
```

La aplicación estará disponible en:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)
- **Base de Datos**: localhost:5432


## Desarrollo Backend

Para información detallada sobre el desarrollo del backend, consulta:
👉 [Backend README](./backend/README.md)

### Comandos Principales

```shellscript
# Compilar proyecto
./mvnw clean compile

# Ejecutar tests
./mvnw test

# Generar JAR
./mvnw clean package

# Ejecutar aplicación
./mvnw spring-boot:run
```

## Desarrollo Frontend

Para información detallada sobre el desarrollo del frontend, consulta:
👉 [Frontend README](./frontend/README.md)

### Comandos Principales

```shellscript
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start

# Linting
npm run lint

# Tests
npm test
```

## Testing y QA

### Tests Unitarios

```shellscript
# Frontend
npm test

# Backend
./mvnw test
```

### Tests E2E con Playwright

```shellscript
# Instalar Playwright
npx playwright install

# Ejecutar tests E2E
npm run test:e2e

# Ejecutar en modo UI
npm run test:e2e:ui
```

### Cobertura de Tests

```shellscript
# Frontend coverage
npm run test:coverage

# Backend coverage
./mvnw jacoco:report
```

## Despliegue

### Producción con Docker

```shellscript
# Build y deploy completo
docker-compose -f docker-compose.prod.yml up -d

# Solo rebuild de servicios específicos
docker-compose up -d --build frontend
```

### Variables de Entorno

```plaintext
# Frontend
NEXT_PUBLIC_API_URL=https://api.tudominio.com
NEXT_PUBLIC_APP_ENV=production

# Backend
DATABASE_URL=postgresql://user:pass@db:5432/salesdb
JWT_SECRET=tu-jwt-secret-seguro
```

## CI/CD

Pipeline automatizado con **GitHub Actions**:

- ✅ **Build & Test** - Compilación y tests automáticos
- ✅ **Code Quality** - Análisis estático con SonarQube
- ✅ **Security Scan** - Escaneo de vulnerabilidades
- ✅ **Docker Build** - Construcción de imágenes
- ✅ **Deploy** - Despliegue automático a staging/producción


Ver configuración completa en: [`.github/workflows/`](./.github/workflows/)

## Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


Para más detalles, consulta: [CONTRIBUTING.md](./CONTRIBUTING.md)

### Estándares de Código

- **Frontend**: ESLint + Prettier
- **Backend**: Checkstyle + SpotBugs
- **Commits**: Conventional Commits
- **Branches**: GitFlow workflow


## Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

## Contacto

**Equipo de Desarrollo**

- 📧 Email: [dev-team@salesmanagement.com](mailto:dev-team@salesmanagement.com)
- 💼 LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- 🐙 GitHub: [@tu-usuario](https://github.com/tu-usuario)


**Soporte Técnico**

- 📧 Soporte: [support@salesmanagement.com](mailto:support@salesmanagement.com)
- 📚 Documentación: [docs.salesmanagement.com](https://docs.salesmanagement.com)


---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐
