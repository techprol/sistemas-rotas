import React from 'react';
import type { Client } from '../types'; // Importando o tipo que acabamos de criar

interface RoteiroProps {
  clients: Client[];
  onScheduleChange: (clientId: number, weekIndex: number, dayIndex: number) => void;
  onReportChange: (clientId: number) => void;
}

const WEEK_DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export const Roteiro: React.FC<RoteiroProps> = ({ clients, onScheduleChange, onReportChange }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th rowSpan={2} className="client-header">CLIENTE / PERÍODO</th>
            <th colSpan={6} className="week1-header">1ª SEMANA</th>
            <th colSpan={6} className="week2-header">2ª SEMANA</th>
            <th colSpan={6} className="week3-header">3ª SEMANA</th>
            <th colSpan={6} className="week4-header">4ª SEMANA</th>
            <th rowSpan={2} className="report-header">RELATÓRIO</th>
          </tr>
          <tr>
            {[...Array(4)].map((_, weekIndex) =>
              WEEK_DAYS.map((day, dayIndex) => (
                <th key={`${weekIndex}-${dayIndex}`} className={`week${weekIndex + 1}-header`}>
                  {day}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="client-name">{client.name}</td>
              {client.schedule.flat().map((isChecked, index) => {
                const weekIndex = Math.floor(index / 6);
                const dayIndex = index % 6;
                return (
                  <td key={`${client.id}-${weekIndex}-${dayIndex}`} className={`week-cell week${weekIndex + 1}-bg`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onScheduleChange(client.id, weekIndex, dayIndex)}
                    />
                  </td>
                );
              })}
              <td className="report-cell">
                <input
                  type="checkbox"
                  checked={client.reportSubmitted}
                  onChange={() => onReportChange(client.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};