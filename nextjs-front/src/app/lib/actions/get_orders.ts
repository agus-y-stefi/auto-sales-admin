
const getOrders = async () =>{
    const res = await fetch("/api/orders/getOrders")
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
}