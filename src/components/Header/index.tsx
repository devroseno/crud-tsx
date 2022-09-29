import { Link } from 'react-router-dom';
import './styles.css'
 
export function Header(){
    return(
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="link">Pedidos pendentes</Link>
                    </li>
                    <li>
                        <Link to="/pedidos-pendentes" className="link">Pedidos entregues</Link>
                    </li>
                    <li>
                        <Link to="/cadastrar-pedidos" className="link">Cadastrar pedidos</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}