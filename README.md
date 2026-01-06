# 📬 Mensagens Cooperativa

Plataforma de comunicação acadêmica voltada para associações de pós-graduandos, permitindo o envio **individual e organizado** de mensagens via WhatsApp, com foco em **segmentação**, **agendamento responsável** e **análise de resultados**.

---

## 🎯 Objetivo do Projeto

O **Mensagens Cooperativa** foi criado para facilitar a comunicação institucional e acadêmica, permitindo que associações e coletivos:

- Divulguem eventos acadêmicos
- Alcancem contatos de pós-graduação em todo o Brasil
- Enviem mensagens **individualizadas**, não em grupos
- Respeitem boas práticas de horário e frequência
- Tomem decisões baseadas em dados

---

## 🧭 Fluxo da Aplicação

1. **Login**
2. **Onboarding (Tutorial Inicial)**  
   - Apresentação das funcionalidades
   - Guia em 7 passos
   - Executado apenas no primeiro acesso
3. **Aplicação Principal**
   - Dashboard
   - Gestão de Contatos
   - Criação de Campanhas
   - Métricas e Relatórios

O onboarding é automaticamente ignorado após a conclusão.

---

## 🧱 Arquitetura Frontend

O projeto segue uma arquitetura **modular, escalável e orientada a UX**, utilizando React.

### 📁 Estrutura de Pastas

```text
src/
├── layouts/
│   └── AppLayout/
│       ├── index.jsx
│       └── style.css
│
├── pages/
│   ├── Login/
│   ├── Onboarding/
│   │   ├── index.jsx
│   │   ├── style.css
│   │   ├── steps.json
│   │   └── steps/
│   │       ├── StepWelcome.jsx
│   │       ├── StepContacts.jsx
│   │       ├── StepSegmentation.jsx
│   │       ├── StepCampaigns.jsx
│   │       ├── StepSchedule.jsx
│   │       ├── StepAnalytics.jsx
│   │       └── StepFinish.jsx
│   │
│   ├── Dashboard/
│   ├── Contatos/
│   ├── Campanhas/
│   ├── Relatorios/
│   └── Configuracoes/
│
├── components/
│   ├── Button/
│   ├── Input/
│   ├── Checkbox/
│   ├── Modal/
│   └── Icon/
│
├── routes/
│   ├── PrivateRoutes.jsx
│   └── index.jsx
│
├── services/
│   └── api.js
│
├── styles/
│   ├── variables.css
│   ├── global.css
│   └── reset.css
│
└── app.jsx


