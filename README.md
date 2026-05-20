# TechPRO E-Commerce

Plataforma de e-commerce construida con **Next.js App Router**, conectada a un backend **Strapi CMS** y con integración de pagos via **Mercado Pago**.

---

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 4 + PostCSS |
| Componentes UI | shadcn/ui + @base-ui/react + Embla Carousel |
| Íconos | Lucide React |
| Estado global | Zustand (carrito y favoritos) |
| Validación | Zod |
| Autenticación | JWT custom con `jose` |
| Pagos | Mercado Pago |
| CMS / Backend | Strapi |

---

## Arquitectura general

La aplicación mezcla **Server Components** para el fetching de datos y **Client Components** para la interactividad. El frontend consume la API REST de Strapi a través de una capa de servicios centralizada.

```
Usuario
  │
  ▼
Middleware (proxy.ts)       → Protección de rutas por cookie JWT
  │
  ▼
App Router (Next.js)
  ├── Server Components      → Fetching de productos, categorías, schema
  └── Client Components      → Carrito, favoritos, filtros, formularios
  │
  ▼
Servicios (services/)       → Abstraen la API de Strapi
  │
  ▼
lib/strapi.ts (query())     → Cliente HTTP con autenticación por scope
  │
  ▼
Strapi CMS
```

---

## Estructura del proyecto

```
app/
├── layout.tsx              # Root layout: providers globales, Navbar, Footer
├── error.tsx               # Boundary global de errores
└── (routes)/
    ├── page.tsx            # Homepage
    ├── products/
    │   ├── page.tsx        # Listado de productos con filtros (PLP)
    │   └── [productSlug]/  # Detalle de producto (PDP)
    ├── cart/               # Carrito de compras
    ├── bookmarks/          # Lista de favoritos
    └── profile/            # Perfil de usuario (protegida)

actions/
└── auth.actions.ts         # Server Actions: login, register, logout

api/
└── ...                     # Hooks cliente para fetching reactivo

contexts/
└── auth-context.tsx        # AuthProvider y hook useAuth

hooks/
├── use-cart.tsx            # Estado del carrito (Zustand + localStorage)
└── use-bookmarks.tsx       # Estado de favoritos (Zustand + localStorage)

lib/
├── strapi.ts               # Cliente HTTP y constructor de queries para Strapi
├── errors.ts               # Jerarquía de errores custom (AppError)
├── error-logger.ts         # Logger estructurado de errores
└── filters/
    └── product-filter.ts   # Schema Zod para filtros de productos

services/
├── products/               # getProducts, getProductsBySlug, getProductsByFilter, getSchemaProducts
└── category/               # getCategory

types/
├── product.ts              # ProductType, ProductTypeFields, ProductTypeRelations
├── productSchema.ts        # ProductSchema (metadatos de enumeraciones)
└── response.ts             # ResponseType genérico para hooks

proxy.ts                    # Lógica de protección de rutas (middleware)
```

---

## Flujos principales

### Autenticación

1. El usuario envía el formulario → se llama un **Server Action** (`loginAction` / `registerAction`)
2. El Server Action se comunica con Strapi y, si es exitoso, almacena el JWT en una cookie `httpOnly`
3. `proxy.ts` inspecciona esa cookie en cada request para redirigir o permitir el acceso
4. `AuthProvider` recibe el usuario hidratado desde el servidor, evitando flickering en el cliente

| Tipo de ruta | Comportamiento |
|---|---|
| Protegidas (`/cart`, `/profile`) | Redirige a `/login` si no hay JWT |
| De auth (`/login`, `/register`) | Redirige a `/` si ya hay JWT |

### Carrito y favoritos

Ambos sistemas usan **Zustand con persistencia en `localStorage`**:

| Feature | Hook | Clave en storage |
|---|---|---|
| Carrito | `useCart` | `cart-storage` |
| Favoritos | `useBookmarks` | `bookmarks-storage` |

Desde la página de favoritos, el usuario puede mover un ítem directamente al carrito, lo que ejecuta `addItem` en el store del carrito y `removeItem` en el de favoritos al mismo tiempo.

### Catálogo de productos

- **Homepage**: Server Component con banners promocionales, carrusel de destacados y navegación por categorías.
- **PLP (`/products`)**: Filtros sincronizados con la URL via `useProductFilters`. Los valores de los filtros (`origin`, `state`) se obtienen dinámicamente del schema de Strapi. La lista usa `<Suspense>` para mostrar skeletons durante la carga.
- **PDP (`/products/[slug]`)**: Fetching server-side por slug, galería con carrusel, precio formateado y botones para agregar al carrito o a favoritos.

---

## Integración con Strapi

Toda la comunicación pasa por `lib/strapi.ts`. La función `query()` maneja dos scopes de autenticación:

| Scope | Variable de entorno | Uso |
|---|---|---|
| `getResources` | `STRAPI_TOKEN` | Endpoints de productos y categorías |
| `getSchemas` | `STRAPI_TOKEN_SCHEMAS` | API del Content-Type Builder (metadatos) |

Los servicios construyen query strings compatibles con Strapi para selección de campos, population de relaciones y filtros complejos (igualdad, rangos de precio, booleanos).

---

## Manejo de errores

Todos los errores del sistema extienden la clase base `AppError`:

| Clase | Código HTTP | Descripción |
|---|---|---|
| `NotFoundError` | 404 | Recurso o página no encontrada |
| `UnauthorizedError` | 401 | Usuario no autenticado |
| `ForbiddenError` | 403 | Sin permisos suficientes |
| `ValidationError` | 422 | Fallo en validación de formulario o payload |
| `ServiceUnavailableError` | 503 | Strapi u otro servicio externo caído |
| `TimeoutError` | 408 | Request demoró demasiado |
| `InternalError` | 500 | Excepción inesperada / bug |

Los errores operacionales (esperados) se loggean como `warn`; los no operacionales como `error`. El boundary global `app/error.tsx` muestra mensajes seguros al usuario, ocultando stack traces.

---

## Variables de entorno

```env
# Strapi
STRAPI_HOST=https://tu-strapi.com
STRAPI_TOKEN=tu_token_de_contenido
STRAPI_TOKEN_SCHEMAS=tu_token_de_schemas

# Auth
JWT_SECRET=tu_secreto_jwt

# Mercado Pago
MP_ACCESS_TOKEN=tu_access_token
NEXT_PUBLIC_MP_PUBLIC_KEY=tu_public_key
```

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd techpro-ecommerce

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Completar los valores en .env.local

# 4. Correr en desarrollo
npm run dev
```

La app estará disponible en `http://localhost:3000`.