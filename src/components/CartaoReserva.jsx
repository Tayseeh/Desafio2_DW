import React from 'react';

export default function CartaoReserva({ reserva, remover }) {
  return (
    <article className="cartao">
      <div className="cartao-topo">
        <div>
          <h3>{reserva.proprietario}</h3>
          <span className="placa">{reserva.placa}</span>
        </div>
        <button className="botao-remover" onClick={() => remover(reserva.id)}>
          Remover
        </button>
      </div>

      <div className="detalhes">
        <p><strong>Veículo:</strong> {reserva.modelo}</p>
        <p><strong>Cor:</strong> {reserva.cor}</p>
        <p><strong>Apartamento:</strong> {reserva.apartamento} - {reserva.bloco}</p>
        <p><strong>Vaga:</strong> {reserva.vaga}</p>
      </div>
    </article>
  );
}
