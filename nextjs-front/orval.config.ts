export interface Microservices {
    customers: string;
    orders: string;
    products: string;
}

export interface ApiEndpoints {
    local: Microservices;
    production: Microservices;
}

// 🏁 BANDERA: cambia entre entornos disponibles
const USE_ENVIRONMENT: keyof ApiEndpoints = "local";

// Configuración de endpoints por entorno
const API_ENDPOINTS: ApiEndpoints = {
    local: {
        customers: "http://localhost:8081",
        orders: "http://localhost:8083",
        products: "http://localhost:8082",
    },
    production: {
        customers: "https://auto-sales-admin-customer-service.onrender.com/",
        orders: "https://auto-sales-admin.onrender.com",
        products: "https://auto-sales-admin-products-service.onrender.com",
    },
};

// Obtener la configuración actual
const currentEndpoints: Microservices = API_ENDPOINTS[USE_ENVIRONMENT];

// Debug: mostrar la configuración actual
console.log(`🌍 Entorno activo: ${USE_ENVIRONMENT.toUpperCase()}`);
console.log("📡 URLs configuradas:");
console.log("  - Customers:", currentEndpoints.customers);
console.log("  - Orders:", currentEndpoints.orders);
console.log("  - Products:", currentEndpoints.products);
console.log("---");

export default {
    "customer-service": {
        input: `${currentEndpoints.customers}/api-docs`,
        output: {
            target: "./src/contracts/customer-service/generated/api.ts",
            schemas: "./src/contracts/customer-service/generated/models",
            client: "fetch",
            baseUrl: currentEndpoints.customers,
            override: {
                fetch: {
                    includeHttpStatusReturnType: false,
                },
            },
        },
    },
    "orders-service": {
        input: `${currentEndpoints.orders}/api-docs`,
        output: {
            target: "./src/contracts/orders-service/generated/api.ts",
            schemas: "./src/contracts/orders-service/generated/models",
            client: "fetch",
            baseUrl: currentEndpoints.orders,
            override: {
                fetch: {
                    includeHttpStatusReturnType: false,
                },
            },
        },
    },
    "product-service": {
        input: `${currentEndpoints.products}/api-docs`,
        output: {
            target: "./src/contracts/product-service/generated/api.ts",
            schemas: "./src/contracts/product-service/generated/models",
            client: "fetch",
            baseUrl: currentEndpoints.products,
            override: {
                fetch: {
                    includeHttpStatusReturnType: false,
                },
            },
        },
    },
};
