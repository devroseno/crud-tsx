import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { PageControl } from '../../components/PageControl';

//TYPES
import { Order } from '../../@types/order';

// CSS
import './styles.css';

//SWEET ALERT
import Swal from 'sweetalert2';

//ICONS
import {FaEdit, FaTrash, FaCheck} from 'react-icons/fa';

export function Home(){
    const { orders, fetchOrders } = useOrders();
    const navigate = useNavigate();

    function handleNavigateToRegister() {
        navigate("/cadastrar-pedidos");
    }
    
    async function handleChangeStatusOrder(order: Order) {
        order.status = 1;

        try {
            await api.put(`/orders/${order.id}`, order);

            Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "Pedido entregue com sucesso!"
            });
            
            fetchOrders();
        } catch(error) {     
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Algo deu errado",
                text: "Não foi possível mudar o status do pedido!"
            });
        }
    }

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
            <PageControl title="Pedidos Pendentes">
                <Button onClick={handleNavigateToRegister}>Cadastrar Pedidos</Button>
            </PageControl>

            <section className="table-container">
                <table >
                    <thead>
                        <tr>
                            <th>DESCRIÇÃO</th>
                            <th>PREÇO</th>
                            <th>OBSERVAÇÕES</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.filter((order) => order.status === 0).map((order) =>  {
                            return(
                                <tr key={order.id}>
                                    <td>{order.description}</td>
                                    <td>{order.price}</td>
                                    <td>{order.details}</td>
                                    <td>
                                        <Link to={`/editar-pedido/${order.id}`} className="edit-btn actions-btn">
                                            <i><FaEdit/></i>
                                        </Link>
                                        <button 
                                        type="button"
                                        className="delete-btn actions-btn"
                                        onClick={() => deleteOrder(order)}
                                        >
                                            <i><FaTrash/></i>
                                        </button>
                                        <button
                                            type="button"
                                            className="check-btn actions-btn"
                                            onClick={() => handleChangeStatusOrder(order)}
                                        >
                                            <i>
                                                <FaCheck/>
                                            </i>
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