import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VEHICLE_MODELS } from '../data/vehicleModels.js';

const formularioVazio = {
  placa: '',
  proprietario: '',
  apartamento: '',
  bloco: '',
  modelo: '',
  cor: '',
  vaga: ''
};

export default function CadastroReserva({ vagas, salvar, editar, reserva }) {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState(reserva ? { ...reserva } : formularioVazio);
  const [erro, setErro] = useState('');

  useEffect(() => {
    setFormulario(reserva ? { ...reserva } : formularioVazio);
    setErro('');
  }, [reserva]);

  function atualizarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario({ ...formulario, [name]: value });
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    setErro('');

    const placa = formulario.placa.trim().toUpperCase();
    const placaValida = /^[A-Z]{3}-?\d{4}$/.test(placa) ||
      /^[A-Z]{3}\d[A-Z]\d{2}$/.test(placa);

    if (!placaValida) {
      setErro('Informe uma placa válida (ABC-1234 ou ABC1D23).');
      return;
    }

    if (!formulario.proprietario.trim() || !formulario.apartamento ||
        !formulario.bloco || !formulario.modelo || !formulario.cor.trim() ||
        !formulario.vaga) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (formulario.apartamento.length > 3) {
      setErro('O apartamento deve ter no máximo 3 números.');
      return;
    }

    const placaSemTraco = placa.replace('-', '');
    const placasExistentes = salvar.placas.filter((item) =>
      !reserva || item !== reserva.placa.replace('-', '').toUpperCase()
    );
    if (placasExistentes.includes(placaSemTraco)) {
      setErro('Já existe uma reserva cadastrada para esta placa.');
      return;
    }

    if (!vagas.includes(Number(formulario.vaga))) {
      setErro('A vaga selecionada não está disponível.');
      return;
    }

    const dadosReserva = {
      ...formulario,
      placa,
      vaga: Number(formulario.vaga)
    };

    if (reserva) {
      const reservaAtualizada = { ...reserva, ...dadosReserva };
      editar(reservaAtualizada);
      console.log('Dados atualizados:', reservaAtualizada);
      window.alert('Reserva atualizada com sucesso!');
    } else {
      const novaReserva = { id: Date.now(), ...dadosReserva };
      salvar.adicionar(novaReserva);
      console.log('Dados do formulário:', novaReserva);
      window.alert('Cadastro realizado com sucesso!');
    }

    navigate('/cadastradas');
  }

  return (
    <section>
      <div className="titulo-pagina">
        <div>
          <span className="titulo-etiqueta">{reserva ? 'EDITAR RESERVA' : 'NOVO REGISTRO'}</span>
          <p>{reserva ? 'Altere os dados da reserva cadastrada.' : 'Informe os dados do proprietário e do veículo.'}</p>
        </div>
      </div>

      <form className="formulario" onSubmit={enviarFormulario}>
        {erro && <p className="mensagem-erro">{erro}</p>}

        <label>
          Placa do veículo
          <input name="placa" value={formulario.placa} onChange={atualizarCampo}
            maxLength="8" placeholder="ABC-1234 ou ABC1D23" required />
        </label>

        <label>
          Nome do proprietário
          <input name="proprietario" value={formulario.proprietario}
            onChange={atualizarCampo} maxLength="50" required />
        </label>

        <label>
          Número do apartamento
          <input name="apartamento" value={formulario.apartamento}
            onChange={atualizarCampo} maxLength="3" inputMode="numeric" required />
        </label>

        <label>
          Bloco do apartamento
          <select name="bloco" value={formulario.bloco} onChange={atualizarCampo} required>
            <option value="">Selecione</option>
            <option value="Bloco A">Bloco A</option>
            <option value="Bloco B">Bloco B</option>
            <option value="Bloco C">Bloco C</option>
          </select>
        </label>

        <label>
          Modelo do veículo
          <select name="modelo" value={formulario.modelo} onChange={atualizarCampo} required>
            <option value="">Selecione o modelo</option>
            {VEHICLE_MODELS.map((modelo) => (
              <option key={modelo} value={modelo}>{modelo}</option>
            ))}
          </select>
        </label>

        <label>
          Cor do veículo
          <input name="cor" value={formulario.cor} onChange={atualizarCampo}
            maxLength="30" required />
        </label>

        <label>
          Número da vaga
          <select name="vaga" value={formulario.vaga} onChange={atualizarCampo} required>
            <option value="">Selecione uma vaga disponível</option>
            {vagas.map((vaga) => (
              <option key={vaga} value={vaga}>Vaga {vaga}</option>
            ))}
          </select>
        </label>

        <div className="acoes-formulario">
          <Link className="botao botao-secundario" to="/cadastradas">Cancelar</Link>
          <button className="botao" type="submit">{reserva ? 'Salvar alterações' : 'Salvar reserva'}</button>
        </div>
      </form>
    </section>
  );
}
