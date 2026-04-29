// Pricing section with calculator
const { useState: useStatePricing, useMemo: useMemoPricing } = React;

const PLANS = [
  {
    id: "presenca",
    tag: "Pacote 01",
    name: "Presença Local",
    tagline: "Para quem precisa começar com o pé direito.",
    setup: 2500,
    monthly: 297,
    cta: "Quero esse plano",
    features: [
      { t: "Site profissional (até 5 páginas)", on: true },
      { t: "Otimização para Google Meu Negócio", on: true },
      { t: "ChatBot com IA no WhatsApp", on: true },
      { t: "Hospedagem e domínio inclusos", on: true },
      { t: "SSL e site rápido (PageSpeed 90+)", on: true },
      { t: "1 revisão por mês", on: true },
      { t: "Tráfego pago Google Ads", on: false },
      { t: "Aplicativo personalizado", on: false },
    ],
  },
  {
    id: "acelerador",
    tag: "Pacote 02",
    name: "Acelerador",
    tagline: "Para quem quer crescer agora, não depois.",
    setup: 4500,
    monthly: 1497,
    featured: true,
    cta: "Quero esse plano",
    features: [
      { t: "Tudo do plano Presença Local", on: true },
      { t: "Tráfego pago Google Ads (gestão profissional)", on: true },
      { t: "2 landing pages de alta conversão", on: true },
      { t: "SEO local avançado (top 3 do Google)", on: true },
      { t: "IA respondendo e qualificando leads 24h", on: true },
      { t: "Relatório mensal de resultados", on: true },
      { t: "Aplicativo personalizado", on: false },
      { t: "Consultor dedicado", on: false },
    ],
  },
  {
    id: "dominio",
    tag: "Pacote 03",
    name: "Domínio Total",
    tagline: "Para quem quer dominar a região.",
    setup: 12000,
    monthly: 1997,
    cta: "Falar com especialista",
    features: [
      { t: "Tudo do plano Acelerador", on: true },
      { t: "Aplicativo personalizado (Android + iOS)", on: true },
      { t: "Automações com IA (agenda, follow-up, recovery)", on: true },
      { t: "CRM integrado", on: true },
      { t: "Consultor dedicado", on: true },
      { t: "Reuniões estratégicas quinzenais", on: true },
    ],
  },
];

const fmtBR = (n) => "R$ " + Math.round(n).toLocaleString("pt-BR");

function PricingSection() {
  const [billing, setBilling] = useStatePricing("monthly"); // monthly | annual
  return (
    <section id="pacotes" className="alt">
      <div className="wrap">
        <Reveal className="sh">
          <span className="eyebrow"><span className="dot"></span>Pacotes</span>
          <h2>Escolha o plano certo para o tamanho do seu sonho.</h2>
          <p>Todos os pacotes incluem hospedagem, certificado SSL e suporte técnico. Sem letra miúda.</p>
        </Reveal>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <div className="price-tabs">
            <button className={billing === "monthly" ? "on" : ""} onClick={() => setBilling("monthly")}>Mensal</button>
            <button className={billing === "annual" ? "on" : ""} onClick={() => setBilling("annual")}>Anual <span className="save">−15%</span></button>
          </div>
        </div>

        <div className="plans">
          {PLANS.map((p, i) => {
            const monthly = billing === "annual" ? p.monthly * 0.85 : p.monthly;
            return (
              <Reveal key={p.id} delay={i * 80}>
                <div className={`plan ${p.featured ? "featured" : ""}`}>
                  {p.featured && <div className="plan-badge">Mais escolhido</div>}
                  <div className="plan-tag">{p.tag}</div>
                  <h3>{p.name}</h3>
                  <div className="plan-tagline">{p.tagline}</div>
                  <div className="plan-price">
                    <div className="from">A partir de</div>
                    <div className="big">{fmtBR(p.setup)} <small>de entrada</small></div>
                    <div className="mensal">+ <strong>{fmtBR(monthly)}</strong>/mês {billing === "annual" && <span style={{ color: "var(--green)", fontSize: 12, fontWeight: 600 }}>(anual)</span>}</div>
                  </div>
                  <ul className="plan-features">
                    {p.features.map((f, j) => (
                      <li key={j} className={f.on ? "" : "muted"}>
                        {f.on ? <Icon name="check" size={18} /> : <Icon name="x" size={18} />}
                        <span>{f.t}</span>
                      </li>
                    ))}
                  </ul>
                  <a className={`btn ${p.featured ? "btn-primary" : "btn-secondary"}`} href="#/diagnostico" onClick={(e) => { e.preventDefault(); window.navigate("/diagnostico"); }}>
                    {p.cta} <Icon name="arrow-right" size={14} />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="price-foot">
          <strong>Pagamento:</strong> 50% de entrada + 50% na entrega · Mensalidade só após o site no ar e aprovado · Sem fidelidade
        </div>

        <PricingCalculator />
      </div>
    </section>
  );
}

function PricingCalculator() {
  const [pkg, setPkg] = useStatePricing("acelerador");
  const [traffic, setTraffic] = useStatePricing(900); // R$/mês mídia
  const [billing, setBilling] = useStatePricing("monthly");

  const result = useMemoPricing(() => {
    const plan = PLANS.find(p => p.id === pkg);
    const monthly = billing === "annual" ? plan.monthly * 0.85 : plan.monthly;
    const trafficCost = pkg === "presenca" ? 0 : traffic;
    const totalMonthly = monthly + trafficCost;
    const firstYear = plan.setup + (totalMonthly * 12);
    return { plan, monthly, trafficCost, totalMonthly, firstYear };
  }, [pkg, traffic, billing]);

  return (
    <Reveal>
      <div className="calc">
        <div className="calc-grid">
          <div>
            <span className="eyebrow"><span className="dot"></span>Calculadora</span>
            <h3 style={{ marginTop: 10 }}>Calcule o investimento total do seu plano.</h3>
            <p>Inclui mensalidade JI + verba de mídia paga (que vai direto para o Google, não para a JI).</p>

            <div className="calc-controls">
              <div className="calc-row">
                <label>Pacote</label>
                {PLANS.map(p => (
                  <button key={p.id} className={`pill ${pkg === p.id ? "on" : ""}`} onClick={() => setPkg(p.id)}>{p.name}</button>
                ))}
              </div>
              <div className="calc-row">
                <label>Cobrança</label>
                <button className={`pill ${billing === "monthly" ? "on" : ""}`} onClick={() => setBilling("monthly")}>Mensal</button>
                <button className={`pill ${billing === "annual" ? "on" : ""}`} onClick={() => setBilling("annual")}>Anual (−15%)</button>
              </div>
              {pkg !== "presenca" && (
                <div className="calc-row">
                  <label>Verba de mídia paga (Google Ads)</label>
                  {[900, 1500, 3000, 6000].map(v => (
                    <button key={v} className={`pill ${traffic === v ? "on" : ""}`} onClick={() => setTraffic(v)}>{fmtBR(v)}/mês</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="calc-out">
            <div className="lb">Investimento mensal</div>
            <div className="big">{fmtBR(result.totalMonthly)}<small>/mês</small></div>
            <div className="sub">
              {fmtBR(result.monthly)} JI {result.trafficCost > 0 && <>+ {fmtBR(result.trafficCost)} mídia</>}
            </div>
            <div className="total">
              Entrada de <strong>{fmtBR(result.plan.setup)}</strong> · Total 1º ano: <strong>{fmtBR(result.firstYear)}</strong>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

Object.assign(window, { PricingSection, PLANS, fmtBR });
