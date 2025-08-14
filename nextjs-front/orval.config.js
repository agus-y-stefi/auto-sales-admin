module.exports = {
    'customer-service': {
        input: 'http://localhost:8081/api-docs',
        output: {
            target: './src/contracts/generated/customer-service/api.ts',
            schemas: './src/contracts/generated/customer-service/models.ts',
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
            target: './src/contracts/generated/orders-service/api.ts',
            schemas: './src/contracts/generated/orders-service/models.ts',
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
            target: './src/contracts/generated/product-service/api.ts',
            schemas: './src/contracts/generated/product-service/models.ts',
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