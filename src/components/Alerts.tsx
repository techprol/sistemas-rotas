import React from 'react';
import type { Client } from '../types'; 

// A props que nosso componente receberá é uma lista de clientes que precisam de atenção
interface AlertsProps {
  clientsNeedingReport: Client[];
}

export const Alerts: React.FC<AlertsProps> = ({ clientsNeedingReport }) => {
  // Se não houver clientes na lista, não renderiza nada
  if (clientsNeedingReport.length === 0) {
    return null;
  }

  return (
    <div className="alerts-container">
      <h2>⚠️ Alertas de Pendência</h2>
      <p>Os seguintes clientes já completaram as visitas mensais, mas o relatório ainda não foi marcado como feito:</p>
      <ul>
        {clientsNeedingReport.map(client => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
};