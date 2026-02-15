# EPC-03 — Gestión del Inventario (Catálogo)

## Registro de Implementación

> **Épica:** EPC-03  
> **User Stories:** US-301, US-302, US-303  
> **Stack:** Spring Boot 3.5.4 (Java 17) · Next.js 16.1.6 · PostgreSQL · Orval v8.2.0  
> **Fecha de inicio:** Febrero 2026

---

## Índice

1. [Fase 0 — Investigación y Planificación](#fase-0--investigación-y-planificación)
2. [Fase 1 — Backend: Refactoring y Filtros](#fase-1--backend-refactoring-y-filtros)
3. [Fase 2 — Regeneración de Contratos Orval](#fase-2--regeneración-de-contratos-orval)
4. [Fase 3 — Frontend: Capa de Datos](#fase-3--frontend-capa-de-datos)
5. [Fase 4 — Frontend: Listado de Productos](#fase-4--frontend-listado-de-productos)
6. [Fase 5 — Frontend: Detalle y Alta de Producto](#fase-5--frontend-detalle-y-alta-de-producto)
7. [Resumen de Archivos](#resumen-de-archivos)
8. [Rutas del Build Final](#rutas-del-build-final)
9. [Checklist de Validación](#checklist-de-validación)

---

## Fase 0 — Investigación y Planificación

### Notion — User Stories revisadas

| US | Título | Criterios clave |
|---|---|---|
| US-301 | Visualización del Catálogo | Tabla con columnas Código, Nombre, Línea, Escala, Stock, Precio, MSRP. Badge de stock con colores (rojo=0, ámbar<100, azul<1000, verde≥1000). |
| US-302 | Segmentación y Búsqueda | Filtro por Línea de Producto, Escala. Búsqueda por nombre/código. Paginación server-side. |
| US-303 | Alta de Producto | Formulario con todos los campos. Código único. Línea seleccionada de existentes. Validación frontend + backend. |

### Patrones existentes identificados (módulo customers)

- **Server Components** para data fetching (`page.tsx` async)
- **nuqs** para estado de URL (paginación, filtros)
- **TanStack Table** para tablas
- **@tanstack/react-form** + **zod** para formularios
- **Orval** genera clientes fetch tipados desde OpenAPI
- **Capa de API** en `lib/api/` mapea DTOs → tipos de dominio
- **Server Actions** en `lib/actions/` para mutaciones

### Base de datos (inmutable — nunca se modifica)

```
Schema: products_service

productlines (PK: product_line VARCHAR(50))
  ├── text_description TEXT
  ├── html_description TEXT
  └── image BYTEA

products (PK: product_code VARCHAR(15), FK: product_line → productlines)
  ├── product_name VARCHAR(70)
  ├── product_scale VARCHAR(10)
  ├── product_vendor VARCHAR(50)
  ├── product_description TEXT
  ├── quantity_in_stock SMALLINT
  ├── buy_price NUMERIC(10,2)
  └── msrp NUMERIC(10,2)

~110 productos, 7 líneas de producto
```

---

## Fase 1 — Backend: Refactoring y Filtros

**Objetivo:** Alinear `product_service` con los patrones de `customer_service` (error handling, paginación, filtros avanzados, OpenAPI).

### Archivos NUEVOS

#### 1. `dto/ApiErrorResponse.java`

**Ruta:** `spring-backend/services/product_service/src/main/java/org/code/product_service/dto/ApiErrorResponse.java`

DTO estándar para errores con anotaciones Swagger:

```java
// Campos: timestamp, status, error, message, path, validationErrors (Map<String, String>)
// Anotaciones: @Schema en cada campo para documentación OpenAPI
```

#### 2. `dto/CustomPagedDTO.java`

**Ruta:** `spring-backend/services/product_service/src/main/java/org/code/product_service/dto/CustomPagedDTO.java`

Wrapper genérico de paginación que reemplaza el `Page<T>` de Spring en la respuesta:

```java
// Campos: content (List<T>), totalElements, totalPages, number, size, first, last, hasNext, hasPrev
// Método estático: from(Page<T>) → CustomPagedDTO<T>
```

#### 3. `exceptions/GlobalExceptionHandler.java`

**Ruta:** `spring-backend/services/product_service/src/main/java/org/code/product_service/exceptions/GlobalExceptionHandler.java`

`@RestControllerAdvice` con handlers:

| Excepción | HTTP Status | Respuesta |
|---|---|---|
| `ResourceNotFoundException` | 404 | ApiErrorResponse |
| `MethodArgumentNotValidException` | 400 | ApiErrorResponse + validationErrors |
| `DataIntegrityViolationException` | 409 | ApiErrorResponse |
| `DeletionNotAllowedException` | 409 | ApiErrorResponse |
| `Exception` (genérica) | 500 | ApiErrorResponse |

#### 4. `exceptions/DeletionNotAllowedException.java`

**Ruta:** `spring-backend/services/product_service/src/main/java/org/code/product_service/exceptions/DeletionNotAllowedException.java`

RuntimeException simple para uso futuro (ej. cuando un producto tiene órdenes asociadas).

### Archivos MODIFICADOS

#### 5. `controllers/ProductController.java`

**Cambios:**
- Retorna `CustomPagedDTO<ProductDTO>` en lugar de `Page<ProductDTO>`
- Nuevos `@RequestParam` opcionales: `productLine`, `productVendor`, `productScale`
- Anotaciones OpenAPI: `@Operation`, `@ApiResponses`, `@Parameter`

#### 6. `controllers/ProductLineController.java`

**Cambios:**
- Retorna `CustomPagedDTO<ProductLineDTO>` en lugar de `Page<ProductLineDTO>`
- Anotaciones OpenAPI agregadas

#### 7. `specifications/criteria/ProductSearchCriteria.java`

**Antes:** Solo tenía campo `q` (búsqueda general)

**Después:** 4 campos: `q`, `productLine`, `productVendor`, `productScale` con `@NoArgsConstructor`/`@AllArgsConstructor`

#### 8. `specifications/ProductSpecification.java`

**Filtros añadidos:**
- `productLine` → match exacto contra FK (`root.get("productLine").get("productLine")`)
- `productVendor` → LIKE case-insensitive
- `productScale` → match exacto
- `q` → ahora case-insensitive (LOWER + LIKE)

### Validación Fase 1

```bash
# Compilación exitosa
cd spring-backend/services/product_service && ./mvnw compile

# Filtros funcionando
curl "localhost:8083/api/v1/products?productLine=Motorcycles"  # → 13 resultados
curl "localhost:8083/api/v1/products?productScale=1:10"         # → 6 resultados
curl "localhost:8083/api/v1/products/INEXISTENTE"               # → 404 con ApiErrorResponse
```

---

## Fase 2 — Regeneración de Contratos Orval

### Problema encontrado

El directorio `src/contracts/product-service/models/` estaba contaminado con tipos de otros servicios (orders, payments, customers) por ejecuciones previas de Orval sin filtro de proyecto.

### Solución

```bash
# 1. Limpiar modelos contaminados
rm -rf nextjs-front/src/contracts/product-service/models/*

# 2. Regenerar solo product-service
cd nextjs-front && npx orval --config orval.config.ts -p product-service
```

### Resultado: 15 modelos limpios + index

| Archivo | Descripción |
|---|---|
| `apiErrorResponse.ts` | Tipo de error del backend |
| `apiErrorResponseValidationErrors.ts` | Mapa de errores de validación |
| `customPagedDTOProductDTO.ts` | Página de ProductDTO |
| `customPagedDTOProductLineDTO.ts` | Página de ProductLineDTO |
| `customPagedDTOProductSummaryDTO.ts` | Página de ProductSummaryDTO |
| `getAllProductLinesParams.ts` | Params del endpoint GET /product-lines |
| `getAllProductsParams.ts` | Params del endpoint GET /products (incluye productLine, productVendor, productScale) |
| `getAllProductsSummaryParams.ts` | Params del endpoint GET /products/summary |
| `getBulkProductsParams.ts` | Params de búsqueda bulk |
| `productDTO.ts` | DTO completo del producto |
| `productDtoCreateUpdate.ts` | DTO para crear/actualizar |
| `productLineDTO.ts` | DTO de línea de producto |
| `productLineDtoCreateUpdate.ts` | DTO para crear/actualizar línea |
| `productSummaryDTO.ts` | DTO resumen del producto |
| `index.ts` | Barrel export |

---

## Fase 3 — Frontend: Capa de Datos

### Archivos NUEVOS

#### 1. `src/types/product.ts`

Interfaces de dominio (desacopladas de DTOs de Orval):

```typescript
Product         // productCode, productName, productLine, productScale, productVendor,
                // productDescription, quantityInStock, buyPrice, msrp, productLineDescription

ProductSummary  // productCode, productName, productLine, quantityInStock, buyPrice, msrp, productVendor

ProductLine     // productLine, textDescription, productCount
```

Re-exporta `PaginatedResponse` desde `@/types/customer`.

#### 2. `src/lib/api/products-api.ts`

Funciones de API con mapeo DTO → dominio:

| Función | Descripción |
|---|---|
| `getProducts(params)` | Lista paginada de productos completos. Convierte page 1-based → 0-based. |
| `getProductsSummary(params)` | Lista paginada de resúmenes (menos campos). |
| `getProduct(id)` | Producto individual por código. Retorna `null` en 404. |
| `getProductLines()` | Todas las líneas de producto (size=100, son pocas). |

Mappers internos: `mapProductDtoToProduct`, `mapProductSummaryDtoToSummary`, `mapProductLineDtoToProductLine`.

#### 3. `src/lib/actions/product.actions.ts`

Server Actions (`"use server"`) para mutaciones:

| Action | Descripción |
|---|---|
| `createProductAction(payload)` | Crea producto. Retorna `ActionResponse<ProductDTO>` con manejo de 201/400. |
| `updateProductAction(productCode, payload)` | Actualiza producto existente. |
| `deleteProductAction(productCode)` | Elimina producto. |

Tipo común: `ActionResponse<T> = { success: true; data: T } | { success: false; error: string; validationErrors?: Record<string, string> }`

---

## Fase 4 — Frontend: Listado de Productos

### Archivos NUEVOS

#### 1. `src/app/products/page.tsx`

Server Component principal. Parallel fetch con `Promise.all([getProducts(), getProductLines()])`. Renderiza:
- Header con título "Catálogo de Productos" + botón "Nuevo Producto" → `/products/new`
- `<ProductsToolbar>` (búsqueda + filtros)
- `<ProductsTable>` (tabla de datos)
- `<PaginationControl>` (reutilizado de customers)

#### 2. `src/app/products/layout.tsx`

Layout pass-through (`<>{children}</>`)

#### 3. `src/app/products/search-params.ts`

Parsers nuqs para estado de URL:

| Param | Tipo | Default |
|---|---|---|
| `page` | int | 1 |
| `size` | int | 10 |
| `q` | string | "" |
| `productLine` | string | "" |
| `productScale` | string | "" |

#### 4. `src/components/products/columns.tsx`

7 columnas de TanStack Table:

| Columna | Contenido |
|---|---|
| CÓDIGO | Link a `/products/{code}` con font-mono |
| PRODUCTO | Nombre + vendor en texto secundario |
| LÍNEA | productLine |
| ESCALA | productScale |
| STOCK | `<StockBadge>` con colores |
| PRECIO COMPRA | Formateado con `formatCurrency` |
| MSRP | Formateado con `formatCurrency` |

#### 5. `src/components/products/products-table.tsx`

Componente genérico `<TData, TValue>` usando TanStack Table. Mismo patrón que `customers-table.tsx`.

#### 6. `src/components/products/products-toolbar.tsx`

Barra de herramientas con:
- Input de búsqueda (debounced 300ms)
- Select de Línea de Producto (dinámico desde `productLines`)
- Select de Escala (valores estáticos: 1:10, 1:12, etc.)
- Botón "Limpiar" para resetear todos los filtros

Usa `nuqs` con `shallow: false` para navegación server-side.

#### 7. `src/components/products/stock-badge.tsx`

Badge con colores según cantidad:

| Rango | Color |
|---|---|
| `= 0` | 🔴 Rojo |
| `< 100` | 🟡 Ámbar |
| `< 1000` | 🔵 Azul |
| `≥ 1000` | 🟢 Verde |

Cumple criterio 3 de US-301.

### Archivo MODIFICADO

#### 8. `src/components/dynamic-breadcrumb.tsx`

- Agregado `products: "Catálogo"` al mapa `segmentLabels`
- Nueva regla: si el segmento anterior es "products" y el actual no es "new", se etiqueta como "Ficha de Producto"

---

## Fase 5 — Frontend: Detalle y Alta de Producto

### Página de Detalle (`/products/[id]`)

#### 1. `src/app/products/[id]/page.tsx`

Server Component que:
- Recibe `params.id` (productCode)
- Llama a `getProduct(id)` — retorna `null` si no existe → `notFound()`
- Renderiza layout: Header → Info + Pricing (grid 2:1) → Descripción → Zona de Riesgo

#### 2. `src/app/products/[id]/loading.tsx`

Skeleton de carga que replica la estructura del layout final:
- Header: avatar skeleton + título + badges
- Grid 2:1: card grande + 3 cards de pricing
- Card de descripción
- Card de acciones

#### 3. `src/components/products/details/product-header.tsx`

Header con:
- Ícono `<Package>` en fondo primary
- Nombre del producto (h1 bold)
- Código (font-mono) + Badge de línea (secondary) + Badge de escala (coloreado por mapa)
- Botón "Volver" (→ `/products`) + botón "Editar Producto"

Mapa de colores por escala:
```
1:10 → purple, 1:12 → blue, 1:18 → cyan, 1:24 → teal,
1:32 → green, 1:50 → amber, 1:72 → orange, 1:700 → red
```

#### 4. `src/components/products/details/product-info-card.tsx`

Dos componentes exportados:

**`ProductInfoCard`** — Tarjeta principal con grid 2x3:
- Nombre, Fabricante (con ícono Truck), Línea, Escala, Stock (con `StockBadge` + "unidades"), Margen Bruto (%)

**`ProductPricingCard`** — 3 KPI cards apiladas:
- Precio de Compra (azul)
- MSRP (púrpura)
- Margen Unitario = MSRP - buyPrice (esmeralda)

#### 5. `src/components/products/details/product-description-card.tsx`

Tarjeta con:
- Descripción del producto (o mensaje italic si está vacía)
- Si existe, sección separada con descripción de la línea de producto

#### 6. `src/components/products/details/product-lifecycle-actions.tsx`

Componente client (`"use client"`) con:
- Zona de Riesgo (borde rojo, fondo rojo tenue)
- Botón "Eliminar Producto"
- `AlertDialog` de confirmación con mensaje que incluye el productCode
- Llama a `deleteProductAction(productCode)` → redirige a `/products` en éxito

### Página de Creación (`/products/new`)

#### 7. `src/app/products/new/page.tsx`

Server Component que precarga `getProductLines()` y pasa las líneas al formulario client.

#### 8. `src/components/products/new/create-product-page.tsx`

Componente client con:
- `useForm` de `@tanstack/react-form` + schema Zod
- Validación del código: `^[A-Z0-9_]+$`, máx 15 chars
- Campos numéricos manejados como strings en el form, parseados a number al enviar
- Llama a `createProductAction(payload)` → redirige a `/products` en éxito
- Exporta tipo `ProductForm` para uso en sub-componentes

**Schema Zod:**

| Campo | Validación |
|---|---|
| productCode | requerido, max 15, solo `[A-Z0-9_]` |
| productName | requerido, max 70 |
| productLine | requerido (select) |
| productScale | requerido (select) |
| productVendor | requerido, max 50 |
| productDescription | opcional |
| quantityInStock | opcional, 0-32767 |
| buyPrice | opcional, ≥ 0 |
| msrp | opcional, ≥ 0 |

#### 9. `src/components/products/new/create-product-header.tsx`

Header con:
- Título "Registrar Nuevo Producto"
- Subtítulo descriptivo
- Botón "Cancelar" (router.back) + botón "Guardar Producto" (type=submit)

#### 10. `src/components/products/new/product-form-card.tsx`

Card con 4 secciones:

1. **Identificación del Producto** (`Package` icon)
   - Código (input uppercase, max 15)
   - Nombre (input, max 70)

2. **Clasificación** (`Ruler` icon)
   - Línea de Producto (Select dinámico desde `productLines`)
   - Escala (Select con valores: 1:10, 1:12, 1:18, 1:24, 1:32, 1:50, 1:72, 1:700)
   - Fabricante (input con ícono Truck, max 50)

3. **Stock y Precios** (`DollarSign` icon)
   - Cantidad en Stock (number, min 0, max 32767)
   - Precio de Compra (number con prefijo $)
   - MSRP (number con prefijo $)

4. **Descripción**
   - Textarea resizable (min 100px height)

---

## Resumen de Archivos

### Archivos nuevos creados (total: 22)

#### Backend (`spring-backend/services/product_service/src/main/java/org/code/product_service/`)

| # | Archivo | Tipo |
|---|---|---|
| 1 | `dto/ApiErrorResponse.java` | Nuevo |
| 2 | `dto/CustomPagedDTO.java` | Nuevo |
| 3 | `exceptions/GlobalExceptionHandler.java` | Nuevo |
| 4 | `exceptions/DeletionNotAllowedException.java` | Nuevo |

#### Backend modificados

| # | Archivo | Cambio |
|---|---|---|
| 5 | `controllers/ProductController.java` | CustomPagedDTO + filtros + OpenAPI |
| 6 | `controllers/ProductLineController.java` | CustomPagedDTO + OpenAPI |
| 7 | `specifications/criteria/ProductSearchCriteria.java` | +3 campos (productLine, productVendor, productScale) |
| 8 | `specifications/ProductSpecification.java` | +3 filtros + q case-insensitive |

#### Contratos Orval (`nextjs-front/src/contracts/product-service/`)

| # | Archivo | Tipo |
|---|---|---|
| 9 | `api.ts` | Regenerado |
| 10 | `models/` (16 archivos) | Regenerados (limpieza + regeneración) |

#### Frontend — Tipos y Datos (`nextjs-front/src/`)

| # | Archivo | Tipo |
|---|---|---|
| 11 | `types/product.ts` | Nuevo |
| 12 | `lib/api/products-api.ts` | Nuevo |
| 13 | `lib/actions/product.actions.ts` | Nuevo |

#### Frontend — Listado (`nextjs-front/src/`)

| # | Archivo | Tipo |
|---|---|---|
| 14 | `app/products/page.tsx` | Nuevo |
| 15 | `app/products/layout.tsx` | Nuevo |
| 16 | `app/products/search-params.ts` | Nuevo |
| 17 | `components/products/columns.tsx` | Nuevo |
| 18 | `components/products/products-table.tsx` | Nuevo |
| 19 | `components/products/products-toolbar.tsx` | Nuevo |
| 20 | `components/products/stock-badge.tsx` | Nuevo |

#### Frontend — Detalle (`nextjs-front/src/`)

| # | Archivo | Tipo |
|---|---|---|
| 21 | `app/products/[id]/page.tsx` | Nuevo |
| 22 | `app/products/[id]/loading.tsx` | Nuevo |
| 23 | `components/products/details/product-header.tsx` | Nuevo |
| 24 | `components/products/details/product-info-card.tsx` | Nuevo |
| 25 | `components/products/details/product-description-card.tsx` | Nuevo |
| 26 | `components/products/details/product-lifecycle-actions.tsx` | Nuevo |

#### Frontend — Creación (`nextjs-front/src/`)

| # | Archivo | Tipo |
|---|---|---|
| 27 | `app/products/new/page.tsx` | Nuevo |
| 28 | `components/products/new/create-product-page.tsx` | Nuevo |
| 29 | `components/products/new/create-product-header.tsx` | Nuevo |
| 30 | `components/products/new/product-form-card.tsx` | Nuevo |

#### Frontend — Modificados

| # | Archivo | Cambio |
|---|---|---|
| 31 | `components/dynamic-breadcrumb.tsx` | +products en segmentLabels, +regla "Ficha de Producto" |

---

## Rutas del Build Final

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /customers
├ ƒ /customers/[id]
├ ○ /customers/new
├ ƒ /products            ← US-301 + US-302
├ ƒ /products/[id]       ← Detalle
└ ○ /products/new        ← US-303

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

---

## Checklist de Validación

### US-301 — Visualización del Catálogo
- [ ] Navegar a `/products` muestra la tabla con datos
- [ ] Columnas visibles: Código, Producto, Línea, Escala, Stock, Precio Compra, MSRP
- [ ] Badge de stock muestra colores correctos (rojo=0, ámbar<100, azul<1000, verde≥1000)
- [ ] Click en código navega a `/products/{code}`

### US-302 — Segmentación y Búsqueda
- [ ] Búsqueda por texto filtra por nombre/código (debounced 300ms)
- [ ] Filtro por Línea de Producto funciona (select dinámico)
- [ ] Filtro por Escala funciona (select estático)
- [ ] Botón "Limpiar" resetea todos los filtros
- [ ] Paginación funciona (cambio de página, cambio de tamaño)
- [ ] Los filtros se reflejan en la URL (nuqs)

### US-303 — Alta de Producto
- [ ] Navegar a `/products/new` muestra el formulario
- [ ] Select de Línea muestra las 7 líneas existentes
- [ ] Select de Escala muestra las opciones estáticas
- [ ] Validación client-side funciona (campos requeridos, formato de código)
- [ ] Crear producto con datos válidos redirige a `/products` con toast de éxito
- [ ] Error de código duplicado muestra mensaje de error

### Detalle de Producto
- [ ] `/products/{code}` muestra información completa del producto
- [ ] Tarjeta de info: nombre, fabricante, línea, escala, stock, margen
- [ ] KPIs de pricing: precio compra, MSRP, margen unitario
- [ ] Descripción del producto visible
- [ ] Descripción de la línea visible (si existe)
- [ ] Botón "Volver" regresa a `/products`
- [ ] Botón "Eliminar" abre diálogo de confirmación
- [ ] Eliminar producto con confirmación redirige a `/products`
- [ ] Producto inexistente muestra página 404
- [ ] Loading skeleton se muestra durante carga

### Backend
- [ ] `GET /api/v1/products?productLine=Motorcycles` retorna 13 resultados
- [ ] `GET /api/v1/products?productScale=1:10` retorna 6 resultados
- [ ] `GET /api/v1/products?q=harley` retorna resultados (case-insensitive)
- [ ] `GET /api/v1/products/INEXISTENTE` retorna 404 con ApiErrorResponse
- [ ] `POST /api/v1/products` con body inválido retorna 400 con validationErrors
- [ ] OpenAPI spec en `localhost:8083/api-docs` incluye nuevos schemas

---

## Notas Técnicas

### Patrón de conversión de página
El frontend usa paginación **1-based** (nuqs default), el backend usa **0-based** (Spring `Pageable`). La conversión se hace en `products-api.ts`: `page: page - 1`.

### Manejo de tipos Orval
Orval genera uniones discriminadas estrictas (ej. `status: 201 | 400`). Para acceder a campos que no existen en todos los branches, se usa `as unknown as T` en las server actions.

### CustomPagedDTO vs Page
`CustomPagedDTO<T>` reemplaza `Page<T>` de Spring en la respuesta HTTP. Esto da control total sobre los nombres de campos (`hasNext`/`hasPrev` en lugar de propiedades anidadas de Pageable).

### Stitch
No existen diseños de Stitch para el módulo de productos. Solo existe `DetallesDeCliente.html` para customers. El diseño de productos sigue los mismos patrones visuales de customers.
