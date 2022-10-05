import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from './components/Header/index';
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Edit } from "./pages/Edit";
import { Completeds } from './components/Completeds';


import './styles/global.css';


function App() {
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar-pedidos" element={<Register />}/>
        <Route path="/editar-pedido/:id" element={<Edit/>}/>
        <Route path="/pedidos-pendentes" element={<Completeds/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
