import React, { useState, useMemo, useEffect } from 'react';
import { Roteiro } from './components/Roteiro';
import { Alerts } from './components/Alerts';
import { INITIAL_CLIENTS } from './data/initialData';
import type { Client } from './types';

function App() {
  // --- ESTADO PRINCIPAL ---
  // 1. O estado dos clientes agora é inicializado buscando dados do localStorage.
  // Se não encontrar nada, usa os dados iniciais.
  const [clients, setClients] = useState<Client[]>(() => {
    try {
      const savedClients = localStorage.getItem('clientsData');
      return savedClients ? JSON.parse(savedClients) : INITIAL_CLIENTS;
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage", error);
      return INITIAL_CLIENTS;
    }
  });

  // 2. O estado da semana atual começa em 1, mas será definido automaticamente.
  const [currentWeek, setCurrentWeek] = useState(1);


  // --- EFEITOS (LÓGICA AUTOMÁTICA) ---
  // Efeito para salvar os dados no localStorage toda vez que o estado 'clients' mudar.
  useEffect(() => {
    localStorage.setItem('clientsData', JSON.stringify(clients));
  }, [clients]);

  // Efeito para definir a semana atual automaticamente com base na data real.
  // Roda apenas uma vez quando o aplicativo é carregado.
  useEffect(() => {
    const getWeekOfMonth = (date: Date): number => {
      const dayOfMonth = date.getDate();
      if (dayOfMonth <= 7) return 1;
      if (dayOfMonth <= 14) return 2;
      if (dayOfMonth <= 21) return 3;
      return 4;
    };

    const today = new Date(); // Pega a data atual do sistema
    const week = getWeekOfMonth(today);
    setCurrentWeek(week);
  }, []); // O array vazio [] garante que este efeito rode apenas na montagem.


  // --- FUNÇÕES DE MANIPULAÇÃO DE ESTADO ---
  // Função para lidar com a mudança de um checkbox da agenda
  const handleScheduleChange = (clientId: number, weekIndex: number, dayIndex: number) => {
    setClients(prevClients =>
      prevClients.map(client => {
        if (client.id === clientId) {
          const newSchedule = client.schedule.map(week => [...week]);
          newSchedule[weekIndex][dayIndex] = !newSchedule[weekIndex][dayIndex];
          return { ...client, schedule: newSchedule };
        }
        return client;
      })
    );
  };

  // Função para lidar com a mudança do checkbox de relatório
  const handleReportChange = (clientId: number) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? { ...client, reportSubmitted: !client.reportSubmitted }
          : client
      )
    );
  };


  // --- LÓGICA DE ALERTAS (MEMOIZED) ---
  // Alerta para relatórios pendentes
  const clientsNeedingReport = useMemo(() => {
    return clients.filter(client => {
      const reportIsPending = !client.reportSubmitted;
      const hasVisitInAllWindows = client.schedule.every(week =>
        week.some(dayIsVisited => dayIsVisited === true)
      );
      return reportIsPending && hasVisitInAllWindows;
    });
  }, [clients]);

  // Alerta para visitas atrasadas
  const clientsWithDelayedVisits = useMemo(() => {
    if (currentWeek < 3) {
      return [];
    }
    return clients.filter(client => {
      const firstTwoWeeks = client.schedule.slice(0, 2);
      const totalVisits = firstTwoWeeks.flat().filter(Boolean).length;
      return totalVisits < 2;
    });
  }, [clients, currentWeek]);


  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="App">
      <Alerts
        clientsNeedingReport={clientsNeedingReport}
        clientsWithDelayedVisits={clientsWithDelayedVisits}
      />

      <h1>Controle de Rotas</h1>

      <div className="week-selector">
        <span>Semana Atual (Automática):</span>
        {[1, 2, 3, 4].map(week => (
          <button
            key={week}
            className={currentWeek === week ? 'active' : ''}
            onClick={() => setCurrentWeek(week)}
          >
            Semana {week}
          </button>
        ))}
      </div>

      <Roteiro
        clients={clients}
        onScheduleChange={handleScheduleChange}
        onReportChange={handleReportChange}
      />
    </div>
  );
}

export default App;