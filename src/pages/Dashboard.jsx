import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard({ reservas }) {
  const totalVagas = 20;
  const vagasOcupadas = reservas.map((reserva) => Number(reserva.vaga));
  const ocupadas = vagasOcupadas.length;
  const livres = totalVagas - ocupadas;
  const ocupacao = Math.round((ocupadas / totalVagas) * 100);

  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <section className="dashboard">
      <div className="dashboard-cabecalho">
        <div className="dashboard-boas-vindas">
          <p className="sobre-titulo">BEM-VINDO(A) AO GARAGÊ</p>
          <p className="mensagem-boas-vindas">Acompanhe a situação do estacionamento.</p>
        </div>
        <div className="data-atual">
          <span className="data-icone">▦</span>
          <span>{dataAtual}</span>
        </div>
      </div>

      <div className="indicadores">
        <article className="indicador indicador-total">
          <span className="indicador-icone">P</span>
          <div><strong>{totalVagas}</strong><span>Total de vagas</span></div>
        </article>
        <article className="indicador indicador-livre">
          <span className="indicador-icone">✓</span>
          <div><strong>{livres}</strong><span>Vagas livres</span></div>
        </article>
        <article className="indicador indicador-ocupado">
          <span className="indicador-icone">▣</span>
          <div><strong>{ocupadas}</strong><span>Vagas ocupadas</span></div>
        </article>
        <article className="indicador indicador-percentual">
          <span className="indicador-icone">%</span>
          <div><strong>{ocupacao}%</strong><span>Taxa de ocupação</span></div>
        </article>
      </div>

      <div className="painel-vagas">
        <div className="painel-titulo">
          <div>
            <span className="painel-simbolo">P</span>
            <div>
              <h3>Situação das vagas</h3>
              <p>Visualização geral do estacionamento</p>
            </div>
          </div>
        </div>

        <div className="mapa-vagas">
          <div className="grade-vagas-dashboard">
            {Array.from({ length: totalVagas }, (_, indice) => {
              const numero = indice + 1;
              const ocupada = vagasOcupadas.includes(numero);
              const conteudo = (
                <>
                  <span>{String(numero).padStart(2, '0')}</span>
                  <small>{ocupada ? 'Ocupada' : 'Livre'}</small>
                </>
              );

              return ocupada ? (
                <div key={numero} className="vaga-mini ocupada" title="Vaga ocupada">
                  {conteudo}
                </div>
              ) : (
                <Link
                  key={numero}
                  to={`/cadastro?vaga=${numero}`}
                  className="vaga-mini livre vaga-clicavel"
                  title={`Cadastrar reserva na vaga ${numero}`}
                >
                  {conteudo}
                </Link>
              );
            })}
          </div>

          <div className="legenda-vagas">
            <p><span className="legenda-cor cor-livre"></span> Vaga livre ({livres})</p>
            <p><span className="legenda-cor cor-ocupada"></span> Vaga ocupada ({ocupadas})</p>
          </div>
        </div>
      </div>
    </section>
  );
}
