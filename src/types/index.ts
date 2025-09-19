export type Schedule = boolean[][];

// Define o formato completo de um cliente
export interface Client {
  id: number;
  name: string;
  schedule: Schedule;
  reportSubmitted: boolean;
}