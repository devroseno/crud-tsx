import './styles.css';
import { api } from '../../services/api';
import { Button } from '../../components/Button/index';
import { FormEvent, useState } from 'react';
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
            <section className="page-control">
                <h2>Cadastro de Pedidos</h2>
            </section>
            <form className="register-orders-form" onSubmit={handleRegisterOrder}>
                <div className="form-control">
                    <label htmlFor="description">Descrição</label>
                    <input
                    type="text"
                    id="description" 
                    placeholder="Descreva o pedido"
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="price">Preço</label>
                    <input
                    type="text"
                    id="price"
                    placeholder="Insira o preço total do pedido"
                    onChange={(event) => setPrice(event.target.value)}
                    value={price}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="details">Observação (opcional)</label>
                    <input
                    type="text"
                    id="details"
                    placeholder="Observações sobre o pedido"
                    onChange={(event) => setDetails(event.target.value)}
                    value={details}
                    />
                </div>
                <div className="form-confirm">
                    <Button type="submit">Cadastrar</Button>
                </div>
            </form>
        </main>
    )
}