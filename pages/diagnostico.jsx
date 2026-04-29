// Diagnóstico — multi-step form
const { useState: useStateDiag } = React;

function DiagnosticoPage() {
  const TOTAL = 4;
  const [step, setStep] = useStateDiag(1);
  const [done, setDone] = useStateDiag(false);
  const [data, setData] = useStateDiag({
    segmento: "", site: "", goal: "", verba: "",
    nome: "", whats: "", email: "", cidade: "",
  });
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const canNext = () => {
    if (step === 1) return !!data.segmento;
    if (step === 2) return !!data.site && data.goal.trim().length >= 5;
    if (step === 3) return !!data.verba;
    if (step === 4) {
      const digits = data.whats.replace(/\D/g, "");
      return data.nome.trim().length >= 2 && digits.length >= 10 && digits.length <= 13;
    }
    return false;
  };

  const formatWhats = (raw) => {
    const d = raw.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d ? `(${d}` : "";
    if (d.length <= 7) return `(${d.slice(0,2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
  };

  const sendToWhatsApp = () => {
    const msg = [
      `Olá! Vim pelo site da JI Tecnologia e quero solicitar meu diagnóstico gratuito. 😊`,
      ``,
      `*Nome:* ${data.nome}`,
      `*WhatsApp:* ${data.whats}`,
      data.email ? `*E-mail:* ${data.email}` : null,
      data.cidade ? `*Cidade:* ${data.cidade}` : null,
      ``,
      `*Segmento:* ${data.segmento}`,
      `*Situação atual:* ${data.site}`,
      `*Objetivo (90 dias):* ${data.goal}`,
      `*Investimento mensal:* ${data.verba}`,
    ].filter(l => l !== null).join("\n");
    const url = `https://wa.me/5511942805862?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setDone(true);
  };

  const next = () => { if (step < TOTAL) setStep(step + 1); else sendToWhatsApp(); };
  const prev = () => { if (step > 1) setStep(step - 1); };

  if (done) {
    return (
      <main data-screen-label="Diagnostico-Sucesso">
        <div className="page-header">
          <div className="wrap">
            <a className="back" href="#/" onClick={(e) => { e.preventDefault(); window.navigate("/"); }}><Icon name="arrow-left" size={14} /> Voltar para início</a>
          </div>
        </div>
        <section style={{ paddingTop: 0 }}>
          <div className="wrap diag-shell">
            <div className="diag-success">
              <div className="ck"><Icon name="check" size={40} /></div>
              <h2>Pedido enviado, {data.nome.split(" ")[0] || "tudo certo"}!</h2>
              <p className="lead" style={{ marginTop: 14, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                Recebemos os dados do seu <strong style={{ color: "var(--ink)" }}>{data.segmento || "negócio"}</strong>. Em até 48h você recebe no WhatsApp <strong className="mono" style={{ color: "var(--ink)" }}>{data.whats}</strong> um PDF com 5 a 10 pontos de melhoria — mesmo que não feche conosco.
              </p>
              <div className="next">
                <div className="step">
                  <div className="n">Agora</div>
                  <h4>Análise técnica</h4>
                  <p>Nossa equipe vai auditar seu Google Meu Negócio, site atual e concorrentes diretos.</p>
                </div>
                <div className="step">
                  <div className="n">Em até 48h</div>
                  <h4>PDF no WhatsApp</h4>
                  <p>Você recebe um relatório com pontos prioritários e ganhos esperados.</p>
                </div>
                <div className="step">
                  <div className="n">Depois</div>
                  <h4>Você decide</h4>
                  <p>Sem pressão. Se fizer sentido, conversamos sobre o pacote ideal. Se não, tá tudo bem.</p>
                </div>
              </div>
              <div style={{ marginTop: 36 }}>
                <a className="btn btn-secondary" href="#/" onClick={(e) => { e.preventDefault(); window.navigate("/"); }}>Voltar para o início</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main data-screen-label="Diagnostico">
      <div className="page-header">
        <div className="wrap">
          <a className="back" href="#/" onClick={(e) => { e.preventDefault(); window.navigate("/"); }}><Icon name="arrow-left" size={14} /> Voltar para início</a>
          <span className="eyebrow" style={{ marginTop: 24, display: "block" }}><span className="dot"></span>Diagnóstico gratuito · 48h</span>
          <h1>Vamos entender seu negócio em 4 passos.</h1>
          <p>Leva menos de 2 minutos. Em 48h você recebe um PDF com 5 a 10 pontos de melhoria — mesmo que não feche conosco.</p>
        </div>
      </div>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap diag-shell">
          <div className="diag-progress">
            {[1, 2, 3, 4].map(n => <div key={n} className={n <= step ? "on" : ""}></div>)}
          </div>

          <div className="diag-step">
            <div className="meta">Passo {step} de {TOTAL}</div>

            {step === 1 && (
              <>
                <h2>Qual é o seu segmento?</h2>
                <p className="lead">Vamos adaptar o diagnóstico ao tipo de negócio que você tem.</p>
                <div className="choices">
                  {[
                    { k: "Clínica / Saúde", s: "Odonto, estética, veterinária, fisio…" },
                    { k: "Advocacia / Escritório", s: "Direito, contabilidade, consultoria…" },
                    { k: "Loja / Varejo", s: "Moda, presentes, especialidades…" },
                    { k: "Serviços", s: "Mecânica, beleza, manutenção, eventos…" },
                    { k: "Restaurante / Alimentação", s: "Restaurante, delivery, cafeteria…" },
                    { k: "Outro", s: "Conta pra gente no próximo passo." },
                  ].map(opt => (
                    <button key={opt.k} className={`choice ${data.segmento === opt.k ? "on" : ""}`} onClick={() => set("segmento", opt.k)}>
                      <span className="rad"></span>
                      <span>
                        <div className="lb">{opt.k}</div>
                        <div className="sub">{opt.s}</div>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2>Onde você está hoje?</h2>
                <p className="lead">Pra gente saber se otimiza ou refaz do zero.</p>
                <div className="field">
                  <label>Você já tem site?</label>
                  <select value={data.site} onChange={(e) => set("site", e.target.value)}>
                    <option value="">Selecione...</option>
                    <option>Sim, e funciona razoavelmente bem</option>
                    <option>Sim, mas é antigo / não converte</option>
                    <option>Não tenho — só Instagram / WhatsApp</option>
                    <option>Não tenho nada online ainda</option>
                  </select>
                </div>
                <div className="field">
                  <label>Qual o objetivo principal nos próximos 90 dias?</label>
                  <textarea
                    placeholder="Ex: dobrar agendamentos, sair do zero no Google, automatizar o WhatsApp que tá demais…"
                    value={data.goal}
                    onChange={(e) => set("goal", e.target.value)}
                  />
                  <div className="hint">Quanto mais específico, melhor o diagnóstico.</div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2>Qual plano faz mais sentido pra você?</h2>
                <p className="lead">Condição de lançamento — 3 vagas. Se ainda não sabe, escolha "ainda definindo" — sem stress.</p>
                <div className="choices">
                  {[
                    { k: "Presença Local — R$ 960 + R$ 238/mês", s: "Landing page, domínio, hospedagem e SEO otimizado." },
                    { k: "Acelerador — R$ 2.800 + R$ 720/mês", s: "Site completo, Google Analytics e estrutura de tráfego pago." },
                    { k: "Ainda definindo", s: "Sem problema, vamos te ajudar a escolher." },
                  ].map(opt => (
                    <button key={opt.k} className={`choice ${data.verba === opt.k ? "on" : ""}`} onClick={() => set("verba", opt.k)}>
                      <span className="rad"></span>
                      <span>
                        <div className="lb">{opt.k}</div>
                        <div className="sub">{opt.s}</div>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2>Pra onde mandamos seu PDF?</h2>
                <p className="lead">Em 48h você recebe um relatório personalizado no WhatsApp.</p>
                <div className="field">
                  <label>Seu nome</label>
                  <input value={data.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Ex: Maria Silva" />
                </div>
                <div className="field">
                  <label>WhatsApp</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={data.whats}
                    onChange={(e) => set("whats", formatWhats(e.target.value))}
                    placeholder="(11) 90000-0000"
                  />
                </div>
                <div className="field">
                  <label>E-mail (opcional)</label>
                  <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="seu@email.com" />
                </div>
                <div className="field">
                  <label>Cidade</label>
                  <input value={data.cidade} onChange={(e) => set("cidade", e.target.value)} placeholder="Ex: Mogi das Cruzes - SP" />
                </div>

                <div className="diag-summary">
                  <dl>
                    <dt>Segmento</dt><dd>{data.segmento || "—"}</dd>
                    <dt>Situação</dt><dd>{data.site || "—"}</dd>
                    <dt>Verba</dt><dd>{data.verba || "—"}</dd>
                  </dl>
                </div>
              </>
            )}

            <div className="diag-actions">
              {step > 1 ? (
                <button className="btn btn-secondary" onClick={prev}><Icon name="arrow-left" size={14} /> Voltar</button>
              ) : <span></span>}
              <button className="btn btn-primary" disabled={!canNext()} onClick={next} style={{ opacity: canNext() ? 1 : 0.5, cursor: canNext() ? "pointer" : "not-allowed" }}>
                {step < TOTAL ? <>Próximo passo <Icon name="arrow-right" size={14} /></> : <>Solicitar diagnóstico <Icon name="check" size={16} /></>}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { DiagnosticoPage });
