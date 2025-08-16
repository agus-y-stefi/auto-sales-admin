module.exports = {
    'customer-service': {
        input: 'http://localhost:8081/api-docs',
        output: {
            target: './src/contracts/customer-service/generated/api.ts',
            schemas: './src/contracts/customer-service/generated/models',
            client: 'fetch',
            baseUrl: 'http://localhost:8081',
            override: {
                fetch: {
                    includeHttpStatusReturnType: false,
                },
            },
        },
    },
    'orders-service': {
        input: 'http://localhost:8082/api-docs',
        output: {
            target: './src/contracts/orders-service/generated/api.ts',
            schemas: './src/contracts/orders-service/generated/models',
            client: 'fetch',
            baseUrl: 'http://localhost:8082',
            override: {
                fetch: {
                    includeHttpStatusReturnType: false,
                },
            },
        },
    },
    'product-service': {
        input: 'http://localhost:8083/api-docs',
        output: {
            target: './src/contracts/product-service/generated/api.ts',
            schemas: './src/contracts/product-service/generated/models',
            client: 'fetch',
            baseUrl: 'http://localhost:8083',
            override: {
                fetch: {
                    includeHttpStatusReturnType: false,
                },
            },
        },
    },
};