const STORAGE_KEY = 'reservas-estacionamento';

const reservasIniciais = [
  {
    id: 1,
    placa: 'ABC-1234',
    proprietario: 'Mariana Oliveira',
    apartamento: '302',
    bloco: 'Bloco A',
    modelo: 'Honda Civic',
    cor: 'Prata',
    vaga: 1
  },
  {
    id: 2,
    placa: 'DEF-5678',
    proprietario: 'Rafael Costa',
    apartamento: '104',
    bloco: 'Bloco B',
    modelo: 'Toyota Corolla',
    cor: 'Preto',
    vaga: 2
  },
  {
    id: 3,
    placa: 'GHI-9012',
    proprietario: 'Camila Santos',
    apartamento: '501',
    bloco: 'Bloco A',
    modelo: 'Hyundai HB20',
    cor: 'Branco',
    vaga: 4
  }
];

export function listarReservas() {
  const dadosSalvos = localStorage.getItem(STORAGE_KEY);

  if (dadosSalvos) {
    return JSON.parse(dadosSalvos);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservasIniciais));
  return reservasIniciais;
}

export function salvarReservas(reservas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
}

export function listarVagasDisponiveis(reservas) {
  const vagasOcupadas = reservas.map((reserva) => Number(reserva.vaga));

  return Array.from({ length: 20 }, (_, indice) => indice + 1)
    .filter((vaga) => !vagasOcupadas.includes(vaga));
}
