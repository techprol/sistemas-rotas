# 📌 Sobre o Sistema

Este sistema foi desenvolvido para auxiliar no controle de visitas semanais a clientes e na geração de relatórios mensais.
O fluxo funciona assim:

- Cada cliente deve receber 1 visita por semana, totalizando 4 visitas ao mês.

- É permitido realizar mais de uma visita na mesma semana, sem problemas.

- Ao final das 4 semanas, deve ser gerado um relatório consolidado dos atendimentos daquele cliente.

O sistema também conta com um alerta automático, que avisa quando já foram registradas visitas em todas as semanas do mês e o relatório ainda não foi concluído.

# ⚠️ Lógica do Alerta de Relatório Pendente

1. O sistema verifica se em cada semana do mês houve ao menos uma visita registrada para aquele cliente.

2. Quando todas as 4 semanas tiverem registro de visita:

- Caso o relatório ainda não tenha sido finalizado, o sistema gera um alerta de pendência.

- O alerta permanece ativo até que o relatório seja marcado como concluído.

3. Isso garante que não se esqueça do fechamento mensal de relatórios, mesmo quando houver visitas extras em algumas semanas.