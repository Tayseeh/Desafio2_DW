import React, { useState } from 'react';
import CartaoReserva from '../components/CartaoReserva.jsx';
import { Link } from 'react-router-dom';

export default function ListarVagas({ reservas, remover }) {
  const [busca, setBusca] = useState('');

  const reservasFiltradas = reservas.filter((reserva) => {
    const texto = `${reserva.proprietario} ${reserva.placa} ${reserva.apartamento} ${reserva.modelo} ${reserva.vaga}`;
    return texto.toLowerCase().includes(busca.toLowerCase());
  });

  return (
    <section>
      <div className="titulo-pagina">
        <div>
          <span className="titulo-etiqueta">VAGAS OCUPADAS</span>
          <p>Consulte as reservas registradas no estacionamento.</p>
        </div>
        <Link className="botao" to="/cadastro">Nova reserva</Link>
      </div>

      <input
        className="campo-busca"
        type="search"
        placeholder="Buscar por nome, placa, apartamento ou veículo"
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
      />

      <div className="lista">
        {reservasFiltradas.map((reserva) => (
          <CartaoReserva key={reserva.id} reserva={reserva} remover={remover} />
        ))}
        {reservasFiltradas.length === 0 && <p>Nenhuma reserva encontrada.</p>}
      </div>
    </section>
  );
}
