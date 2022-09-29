import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import Swal from 'sweetalert2';
import './styles.css';

type Order = {
    id: number;
    description: string;
    price: string;
    details: string;
    status: number;
}

export function Home(){
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);

    function handleNavigateToRegister() {
        navigate("/cadastrar-pedidos");
    }

    useEffect(() => {
        async function fetchOrders() {
            try{
                const response = await api.get("/orders");
                setOrders(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Algo deu errado!",
                    text: "Não foi possível buscar os pacientes"
                });
            }
        }

        fetchOrders();
    }, []);

    return(
        <main>
            <section className="page-control">
                <h2 className="title">Pedidos Pendentes</h2>
                <Button onClick={handleNavigateToRegister}>Cadastrar Pedidos</Button>
            </section>

            <section className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>DESCRIÇÃO</th>
                            <th>PREÇO</th>
                            <th>OBSERVAÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return(
                                <tr key={order.id}>
                                    <td>{order.description}</td>
                                    <td>{order.price}</td>
                                    <td>{order.details}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </main>
    );
}