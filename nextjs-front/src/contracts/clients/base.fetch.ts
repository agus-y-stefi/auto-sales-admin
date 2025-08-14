const API_BASES: Record<string, string> = {
    '/api/customers': process.env.NEXT_PUBLIC_CUSTOMERS_API || 'http://localhost:8081',
    '/api/products': process.env.NEXT_PUBLIC_PRODUCTS_API || 'http://localhost:8082',
    '/api/orders': process.env.NEXT_PUBLIC_ORDERS_API || 'http://localhost:8083',
};

export const customFetch = async <T>(
    url: string,
    options?: RequestInit
): Promise<T> => {
    // Si la url ya es absoluta, la dejamos intacta
    let fullUrl: string;

    if (url.startsWith('http')) {
        fullUrl = url;
    } else {
        // Buscar el prefix para saber qué base usar
        const entry = Object.entries(API_BASES).find(([prefix]) => url.startsWith(prefix));
        if (!entry) {
            throw new Error(`No base URL configured for path: ${url}`);
        }
        const [prefix, base] = entry;

        // Reemplazar solo el prefijo por la base del microservicio
        fullUrl = base + url.substring(prefix.length);
    }

    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('token')
            : process.env.API_TOKEN || null;

    const response = await fetch(fullUrl, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error ${response.status}: ${errorText}`);
    }

    if (response.status === 204) return {} as T;

    return (await response.json()) as T;
};
