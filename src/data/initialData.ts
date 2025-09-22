import type { Client } from '../types';

// Função para criar uma agenda vazia (4 semanas x 6 dias)
const createEmptySchedule = (): boolean[][] =>
  Array(4).fill(null).map(() => Array(6).fill(false));

export const INITIAL_CLIENTS: Client[] = [
  { id: 1, name: 'PARNAMARIM', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 2, name: 'PM NATAL', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 3, name: 'PM MOSSORÓ', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 4, name: 'LAJES', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 5, name: 'SANTA CRUZ ODONT', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 6, name: 'SANTA CRUZ HOSP', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 7, name: 'NOVA CRUZ ODONT', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 8, name: 'SJM ODONT (CEO + UBS)', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 9, name: 'SJM UPA', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 10, name: 'SJS ODONT', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 11, name: 'SASO ODONT', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 12, name: 'GOIANINHA', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 13, name: 'TOUROS', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 14, name: 'IELMO MARINHO', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 15, name: 'TANGARÁ', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 16, name: 'JARDIM ANGICOS', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 17, name: 'SAMU', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 18, name: 'TIBAU DO SUL', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 19, name: 'LAGOA NOVA', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 20, name: 'PASSA E FICA', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 21, name: 'PUREZA', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 22, name: 'SERRA CAIADA', schedule: createEmptySchedule(), reportSubmitted: false },
  { id: 23, name: 'SERRINHA', schedule: createEmptySchedule(), reportSubmitted: false },
  // Adicione mais clientes aqui se precisar
];