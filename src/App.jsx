import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ListarVagas from './pages/ListarVagas.jsx';
import VagasDisponiveis from './pages/VagasDisponiveis.jsx';
import CadastroReserva from './pages/CadastroReserva.jsx';
import { listarReservas, listarVagasDisponiveis, salvarReservas } from './services.js';

export default function App() {
  const [reservas, setReservas] = useState(listarReservas);
  const vagasDisponiveis = listarVagasDisponiveis(reservas);

  function adicionarReserva(reserva) {
    const novasReservas = [...reservas, reserva];
    setReservas(novasReservas);
    salvarReservas(novasReservas);
  }

  function removerReserva(id) {
    const confirmar = window.confirm('Deseja realmente remover esta reserva?');
    if (!confirmar) return;

    const novasReservas = reservas.filter((reserva) => reserva.id !== id);
    setReservas(novasReservas);
    salvarReservas(novasReservas);
  }

  const dadosParaCadastro = {
    adicionar: adicionarReserva,
    placas: reservas.map((reserva) => reserva.placa.replace('-', '').toUpperCase())
  };

  return (
    <>
      <Menu />
      <main className="container conteudo">
        <Routes>
          <Route path="/" element={<Dashboard reservas={reservas} />} />
          <Route path="/cadastradas" element={<ListarVagas reservas={reservas} remover={removerReserva} />} />
          <Route path="/disponiveis" element={<VagasDisponiveis vagas={vagasDisponiveis} />} />
          <Route path="/cadastro" element={
            <CadastroReserva vagas={vagasDisponiveis} salvar={dadosParaCadastro} />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
