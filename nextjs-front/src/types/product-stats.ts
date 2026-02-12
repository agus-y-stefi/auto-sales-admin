export interface ProductStat {
    productName: string;
    category: string;
    quantity: number;
    icon?: string; // Optional: specific icon override
    categoryIcon?: string; // To map category to material symbol
}
