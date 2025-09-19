import React, { useState, useMemo } from 'react';
import { Roteiro } from './components/Roteiro';
import { Alerts } from './components/Alerts';
import { INITIAL_CLIENTS } from './data/initialData';
import type { Client } from './types';

function App() {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);

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

  const handleReportChange = (clientId: number) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? { ...client, reportSubmitted: !client.reportSubmitted }
          : client
      )
    );
  };

  // 2. Lógica para encontrar clientes com relatórios pendentes
  // Usamos 'useMemo' para otimizar, recalculando a lista apenas quando 'clients' mudar.
  const clientsNeedingReport = useMemo(() => {
    return clients.filter(client => {
      // Verifica se o relatório NÃO foi enviado
      const reportIsPending = !client.reportSubmitted;

      // Verifica se há pelo menos uma visita em CADA uma das 4 semanas
      const hasVisitInAllWindows = client.schedule.every(week =>
        week.some(dayIsVisited => dayIsVisited === true)
      );

      return reportIsPending && hasVisitInAllWindows;
    });
  }, [clients]);


  return (
    <div className="App">
      {/* 3. Renderizar o componente de alertas no topo */}
      <Alerts clientsNeedingReport={clientsNeedingReport} />
      
      <h1>Controle de Rotas</h1>
      <Roteiro
        clients={clients}
        onScheduleChange={handleScheduleChange}
        onReportChange={handleReportChange}
      />
    </div>
  );
}

export default App;