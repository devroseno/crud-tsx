import { useState, FormEvent } from 'react';
import { api } from '../../services/api';
import { PageControl } from '../../components/PageControl';
import { OrderForm } from '../../components/OrderForm';

//SWEETALERT
import Swal from 'sweetalert2';

export function Register() {
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [details, setDetails] = useState("");

    async function handleRegisterOrder(event: FormEvent) {
        event.preventDefault();

        try{
            await api.post("/orders", {
                description,
                price,
                details,
                status: 0
            });
    
            Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "Pedido cadastrado com sucesso!"
            });
    
            setDescription("");
            setPrice("");
            setDetails("");
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Algo deu errado!",
                text: "Erro ao cadastrar o pedido!"
            });
        }
    }

    return(
        <main>
            <PageControl title="Cadastro de Pedidos"/>
            <OrderForm
                onSubmit={handleRegisterOrder}
                description={description}
                setDescription={setDescription}
                price={price}
                setPrice={setPrice}
                details={details}
                setDetails={setDetails}
            />
        </main>
    )
}