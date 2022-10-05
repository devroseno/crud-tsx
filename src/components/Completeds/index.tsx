import { PageControl } from "../PageControl/index";

//HOOKS
import { useOrders } from "../../hooks/useOrders";

//TYPES
import { Order } from "../../@types/order";

//ICONS
import { FaTrash } from 'react-icons/fa';

//AXIOS
import { api } from "../../services/api";

//SWEETALERT
import Swal from 'sweetalert2';

export function Completeds() {
    const { orders, fetchOrders } = useOrders();

    async function deleteOrder(order: Order) {
        try {

            await api.delete(`/orders/${order.id}`);

            Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "O pedido foi deletado!"
            });

            fetchOrders();
        } catch(error) {
            console.log(error);
            
            Swal.fire({
                icon: "error",
                title: "Algo deu errado!",
                text: "Não foi possível deletar o pedido!"
            });
        }
    }

    return(
        <main>
            <PageControl title="Pedidos Entregues" />
            <section className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>DESCRIÇÃO</th>
                            <th>PREÇO</th>
                            <th>DETALHES</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.filter((order) => order.status === 1).map((order) => {
                            const id = order.id;

                            return (
                                <tr key={id}>
                                    <td>{order.description}</td>
                                    <td>{order.price}</td>
                                    <td>{order.details}</td>
                                    <td>
                                        <button
                                        type="button" 
                                        className="delete-btn actions-btn"
                                        onClick={() => deleteOrder(order)}
                                        >
                                            <i><FaTrash/></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </main>
    );
}