import { useMemo, useState } from "react";
import "./style.css";

export default function Preferencias() {
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [intervalSeconds, setIntervalSeconds] = useState(5);
  const [saved, setSaved] = useState(false);

  const firstSendLabel = useMemo(() => "Primeiro envio do dia", []);
  const lastSendLabel = useMemo(() => "Último envio do dia", []);
  const recomendacao = useMemo(
    () => "Recomendado: 3-5 segundos para evitar bloqueios",
    []
  );

  function handleSave() {
    setSaved(false);

    const interval = Number(intervalSeconds);
    if (!startTime || !endTime) return alert("Preencha os horários.");
    if (Number.isNaN(interval) || interval < 1) return alert("Intervalo inválido.");

    console.log({ startTime, endTime, intervalSeconds: interval });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="pref-page">
      <main className="pref-main">
        <div className="pref-grid">
          {/* MENU LATERAL (igual ao print do menu) */}
          <aside className="pref-card pref-menuCard">
            <div className="pref-cardTitle">Menu</div>

            <button className="pref-menuBtn" type="button">
              Perfil
            </button>

            <button className="pref-menuBtn active" type="button">
              Preferências de Envio
            </button>

            <button className="pref-menuBtn" type="button">
              Notificações
            </button>
          </aside>

          {/* CARD PRINCIPAL */}
          <section className="pref-card pref-mainCard">
            <div className="pref-mainHead">
              <div>
                <div className="pref-cardTitle">Preferências de Envio</div>
                <div className="pref-cardDesc">
                  Configure horários e intervalos para envio de mensagens
                </div>
              </div>
            </div>

            {/* GRID DOS CAMPOS (como no print: 2 colunas em cima, 1 embaixo) */}
            <div className="pref-formGrid">
              {/* Início */}
              <div className="pref-field">
                <label className="pref-label">Horário de Início</label>
                <div className="pref-inputRow">
                  <span className="pref-inlineIcon" aria-hidden="true">🕒</span>
                  <input
                    className="pref-input"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="pref-helper">{firstSendLabel}</div>
              </div>

              {/* Término */}
              <div className="pref-field">
                <label className="pref-label">Horário de Término</label>
                <div className="pref-inputRow">
                  <span className="pref-inlineIcon" aria-hidden="true">🕒</span>
                  <input
                    className="pref-input"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                <div className="pref-helper">{lastSendLabel}</div>
              </div>

              {/* Intervalo */}
              <div className="pref-field pref-span2">
                <label className="pref-label">Intervalo entre Mensagens (segundos)</label>
                <div className="pref-inputRow">
                  <span className="pref-inlineIcon" aria-hidden="true">💬</span>
                  <input
                    className="pref-input"
                    type="number"
                    min="1"
                    value={intervalSeconds}
                    onChange={(e) => setIntervalSeconds(e.target.value)}
                  />
                </div>
                <div className="pref-helper">{recomendacao}</div>
              </div>
            </div>

            {/* ALERTA (como no print) */}
            <div className="pref-alert" role="alert">
              <span className="pref-alertIcon" aria-hidden="true">⚠️</span>
              <span className="pref-alertText">
                <strong>Atenção:</strong> Respeite os horários comerciais e intervalos adequados para evitar bloqueios do WhatsApp.
              </span>
            </div>

            {/* AÇÕES */}
            <div className="pref-actions">
              <button className="pref-saveBtn" type="button" onClick={handleSave}>
                <span className="pref-saveIcon" aria-hidden="true">💾</span>
                {saved ? "Salvo!" : "Salvar Preferências"}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
