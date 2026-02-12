import { Order } from "@/types/order";
import { Payment } from "@/types/payment";

export const mockOrders: Order[] = [
    {
        orderNumber: 10100,
        orderDate: "2023-01-06",
        requiredDate: "2023-01-13",
        shippedDate: "2023-01-10",
        status: "Shipped",
        comments: null,
        customerNumber: 1024,
        total: 1250.0,
    },
    {
        orderNumber: 10101,
        orderDate: "2023-01-09",
        requiredDate: "2023-01-18",
        shippedDate: "2023-01-11",
        status: "Shipped",
        comments: "Check on availability.",
        customerNumber: 1024,
        total: 890.5,
    },
    {
        orderNumber: 10102,
        orderDate: "2023-01-10",
        requiredDate: "2023-01-18",
        shippedDate: "2023-01-14",
        status: "Shipped",
        comments: null,
        customerNumber: 1024,
        total: 4500.0,
    },
    {
        orderNumber: 10103,
        orderDate: "2023-01-29",
        requiredDate: "2023-02-07",
        shippedDate: "2023-02-02",
        status: "Shipped",
        comments: null,
        customerNumber: 121, // Different customer
        total: 2100.0,
    },
    {
        orderNumber: 10104,
        orderDate: "2023-01-31",
        requiredDate: "2023-02-09",
        shippedDate: "2023-02-01",
        status: "Shipped",
        comments: null,
        customerNumber: 1024,
        total: 1560.75,
    },
    {
        orderNumber: 10105,
        orderDate: "2023-02-11",
        requiredDate: "2023-02-21",
        shippedDate: null,
        status: "In Process",
        comments: null,
        customerNumber: 1024,
        total: 3200.0,
    },
    {
        orderNumber: 10310,
        orderDate: "2023-10-16",
        requiredDate: "2023-10-24",
        shippedDate: null,
        status: "On Hold",
        comments: null,
        customerNumber: 1024,
        total: 750.0,
    },
];

export const mockPayments: Payment[] = [
    {
        customerNumber: 1024,
        checkNumber: "HQ336336",
        paymentDate: "2023-10-19",
        amount: 6066.38,
        paymentMethod: "Check",
    },
    {
        customerNumber: 1024,
        checkNumber: "JM555205",
        paymentDate: "2023-09-08",
        amount: 1089.36,
        paymentMethod: "Bank Transfer",
    },
    {
        customerNumber: 1024,
        checkNumber: "OM314933",
        paymentDate: "2023-08-04",
        amount: 3357.98,
        paymentMethod: "Cash",
    },
    {
        customerNumber: 121,
        checkNumber: "AD314933",
        paymentDate: "2023-08-04",
        amount: 1500.0,
        paymentMethod: "Check",
    },
];

export const mockProductStats = [
    {
        productName: "Ford Mustang 1968",
        category: "Muscle Car",
        quantity: 150,
        categoryIcon: "Car",
    },
    {
        productName: "Harley Davidson 2003",
        category: "Motorcycles",
        quantity: 98,
        categoryIcon: "Bike",
    },
    {
        productName: "Mack Truck R 1958",
        category: "Trucks",
        quantity: 75,
        categoryIcon: "Truck",
    },
];
