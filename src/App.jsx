import React, { useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ListarVagas from './pages/ListarVagas.jsx';
import VagasDisponiveis from './pages/VagasDisponiveis.jsx';
import CadastroReserva from './pages/CadastroReserva.jsx';
import { listarReservas, listarVagasDisponiveis, salvarReservas } from './services.js';

function EditarReservaRoute({ reservas, vagasParaEdicao, editar, salvar }) {
  const { id } = useParams();
  const reserva = reservas.find((item) => String(item.id) === String(id));

  if (!reserva) return <Navigate to="/cadastradas" replace />;

  return (
    <CadastroReserva
      vagas={vagasParaEdicao(reserva.id)}
      salvar={salvar}
      editar={editar}
      reserva={reserva}
    />
  );
}

export default function App() {
  const [reservas, setReservas] = useState(listarReservas);
  const vagasDisponiveis = listarVagasDisponiveis(reservas);

  function adicionarReserva(reserva) {
    const novasReservas = [...reservas, reserva];
    setReservas(novasReservas);
    salvarReservas(novasReservas);
  }

  function atualizarReserva(reservaAtualizada) {
    const novasReservas = reservas.map((reserva) =>
      reserva.id === reservaAtualizada.id ? reservaAtualizada : reserva
    );
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

  function vagasParaEdicao(id) {
    const reservaAtual = reservas.find((reserva) => String(reserva.id) === String(id));
    const reservasSemAtual = reservas.filter((reserva) => String(reserva.id) !== String(id));
    const vagasLivres = listarVagasDisponiveis(reservasSemAtual);
    // A vaga atual também deve aparecer como opção durante a edição.
    return reservaAtual ? [...vagasLivres, Number(reservaAtual.vaga)].sort((a, b) => a - b) : vagasLivres;
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
          <Route path="/editar/:id" element={
            <EditarReservaRoute
              reservas={reservas}
              vagasParaEdicao={vagasParaEdicao}
              editar={atualizarReserva}
              salvar={dadosParaCadastro}
            />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
