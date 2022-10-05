import { useState, useEffect, FormEvent } from 'react';
import { api } from '../../services/api';
import { PageControl } from '../../components/PageControl';
import { OrderForm } from '../../components/OrderForm';
import { useNavigate, useParams } from 'react-router-dom';

//CSS
import './styles.css';

//SWEETALERT
import Swal from 'sweetalert2';

export function Edit() {
    const params = useParams();
    const navigate = useNavigate();
    
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [details, setDetails] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await api.get(`/orders/${params.id}`);
                setDescription(response.data.description)
                setPrice(response.data.price)
                setDetails(response.data.details)
                setIsLoading(false);
            } catch (error) {
                console.log(error);

                Swal.fire({
                    icon: "error",
                    title: "Algo deu errado!",
                    text: "Atenção, algo não ocorreu bem!"
                });
            }
        }
        fetchOrder();
    }, [params.id]);

    async function handleEditOrder(event: FormEvent) {
        event.preventDefault()
        try {
            await api.put(`/orders/${params.id}`, {
                description,
                price,
                details,
                status: 0
            });

            Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "O pedido foi editado com sucesso!",
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 1500
            });

            setTimeout(() => navigate("/"), 1600);
        } catch(error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Algo deu errado!",
                text: "Erro ao tentar editar pedido!"
            });
        }
    }

    return(
        <main>
            <PageControl title="Edição de Pedidos "/>
            {isLoading ? (
                <div className="loading">
                    <span>Aguarde...</span>
                </div>
            ) : (
                <OrderForm
                    onSubmit={handleEditOrder}
                    description={description}
                    setDescription={setDescription}
                    price={price}
                    setPrice={setPrice}
                    details={details}
                    setDetails={setDetails}
                    buttonTitle="Atualizar"
                />
            )}
        </main>
    );
}