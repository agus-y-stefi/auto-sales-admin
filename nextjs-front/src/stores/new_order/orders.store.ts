// /stores/orderStore.ts
import {create} from "zustand";
import {IProduct, IProductTableNewOrder} from "@/contracts";

export interface IProductSelection {
    productCode: string;
    productName: string;
    quantity: number;
    price: number;
}

interface OrderState {
    customerId?: string;
    salesRepId?: string;
    requiredDate?: Date;
    comments?: string;

    selectedProducts: Record<string, IProductSelection>;
    countSelectedProducts: number;
    step: number;

    // acciones
    setCustomer: (id: string) => void;
    setSalesRep: (id: string) => void;
    setDate: (date: Date | undefined) => void;
    setComments: (comments: string) => void;

    toggleProduct: (product: IProductTableNewOrder) => void;
    updateProduct: (productCode: string, data: Partial<IProductSelection>) => void;
    updateProductQuantity: (productCode: string, quantity: number) => void;
    clearProducts: () => void;

    setStep: (step: number) => void;

    clear: () => void;
}

export const useOrderStore = create<OrderState>()((set) => ({
        customerId: undefined,
        salesRepId: undefined,
        requiredDate: undefined,
        comments: "",
        selectedProducts: {},
        countSelectedProducts: 0,
        step: 1,

        setCustomer: (id) => set({customerId: id}),
        setSalesRep: (id) => set({salesRepId: id}),
        setDate: (requiredDate : Date | undefined) => set({requiredDate}),
        setComments: (comments) => set({comments}),

        toggleProduct: (product) =>
            set((state): { selectedProducts: Record<string, IProductSelection>, countSelectedProducts: number } => {
                const exists = product.productCode in state.selectedProducts;
                if (exists) {
                    const {[product.productCode]: _, ...rest} = state.selectedProducts;
                    return {selectedProducts: rest, countSelectedProducts: state.countSelectedProducts - 1};
                } else {
                    return {
                        selectedProducts: {
                            ...state.selectedProducts,
                            [product.productCode]: {
                                productCode: product.productCode,
                                productName: product.productName,
                                quantity: 1,
                                price: product.MSRP,
                            },
                        },
                        countSelectedProducts: state.countSelectedProducts + 1
                    };
                }
            }),

        updateProduct: (productCode, data) =>
            set((state) => ({
                selectedProducts: {
                    ...state.selectedProducts,
                    [productCode]: {
                        ...state.selectedProducts[productCode],
                        ...data,
                    },
                },
            })),
        updateProductQuantity: (productCode, quantity) =>
            set((state) => ({
                selectedProducts: {
                    ...state.selectedProducts,
                    [productCode]: {
                        ...state.selectedProducts[productCode],
                        quantity,
                    },
                },
            })),

        clearProducts: () => set({selectedProducts: {}, countSelectedProducts: 0}),
        setStep: (step) => set({step}),
        clear: () => set({
            customerId: undefined,
            salesRepId: undefined,
            requiredDate: undefined,
            comments: "",
            selectedProducts: {},
            countSelectedProducts: 0,
            step: 1,
        })
    }))
;
