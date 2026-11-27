import React from 'react';
import { Link } from 'react-router-dom';

export default function VagasDisponiveis({ vagas }) {
  return (
    <section>
      <div className="titulo-pagina">
        <div>
          <span className="titulo-etiqueta">VAGAS LIVRES</span>
          <p>Vagas disponíveis para reserva.</p>
        </div>
      </div>

      {vagas.length > 0 ? (
        <div className="grade-vagas">
          {vagas.map((vaga) => (
            <Link key={vaga} className="vaga-livre" to={`/cadastro?vaga=${vaga}`}>
              <span>Vaga</span>
              <strong>{vaga}</strong>
              <small>Disponível</small>
            </Link>
          ))}
        </div>
      ) : (
        <p>Não há vagas disponíveis no momento.</p>
      )}
    </section>
  );
}
