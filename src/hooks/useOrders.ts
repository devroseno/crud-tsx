import { useState, useEffect } from "react";
import { Order } from "../@types/order";
import { api } from "../services/api";

//SWEETALERT
import Swal from 'sweetalert2';
 
export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);

    async function fetchOrders() {
        try {
            const response = await api.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Algo deu errado!",
                text: "Atenção, algo não ocorreu bem!"
            });
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return{
        orders,
        fetchOrders
    }
}   