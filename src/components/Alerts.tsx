import React from 'react';
import type { Client } from '../types';

interface AlertsProps {
  clientsNeedingReport: Client[];
  clientsWithDelayedVisits: Client[]; // 1. Adicionamos a nova prop
}

export const Alerts: React.FC<AlertsProps> = ({ clientsNeedingReport, clientsWithDelayedVisits }) => {
  const hasAlerts = clientsNeedingReport.length > 0 || clientsWithDelayedVisits.length > 0;

  // Se não houver nenhum alerta, não renderiza nada
  if (!hasAlerts) {
    return null;
  }

  return (
    <div className="alerts-container">
      {/* Seção para Visitas Atrasadas */}
      {clientsWithDelayedVisits.length > 0 && (
        <div className="alert-section delayed-visits-alert">
          <h2>🏃‍♂️ Alerta de Visitas Atrasadas</h2>
          <p>Os seguintes clientes tiveram menos de 2 visitas nas duas primeiras semanas e precisam de atenção:</p>
          <ul>
            {clientsWithDelayedVisits.map(client => (
              <li key={client.id}>{client.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Seção para Relatórios Pendentes */}
      {clientsNeedingReport.length > 0 && (
        <div className="alert-section report-pending-alert">
          <h2>⚠️ Alerta de Pendência de Relatório</h2>
          <p>Os seguintes clientes já completaram as visitas mensais, mas o relatório ainda não foi feito:</p>
          <ul>
            {clientsNeedingReport.map(client => (
              <li key={client.id}>{client.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};