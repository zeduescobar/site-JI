// Pricing section
const { useState: useStatePricing, useMemo: useMemoPricing } = React;

const PLANS = [
  {
    id: "presenca",
    tag: "Plano 01",
    name: "Presença Local",
    tagline: "Para quem precisa de presença profissional no Google.",
    setupNormal: 1200,
    setup: 960,
    monthly: 238,
    cta: "Quero esse plano",
    features: [
      { t: "Landing page focada em conversão", on: true },
      { t: "Domínio + hospedagem", on: true },
      { t: "SEO básico", on: true },
      { t: "Botão de WhatsApp integrado", on: true },
      { t: "Suporte mensal", on: true },
    ],
  },
  {
    id: "acelerador",
    tag: "Plano 02",
    name: "Acelerador",
    tagline: "Para quem quer crescer com tráfego pago.",
    setupNormal: 3500,
    setup: 2800,
    monthly: 720,
    featured: true,
    cta: "Quero esse plano",
    features: [
      { t: "Site otimizado pra conversão", on: true },
      { t: "Google Analytics 4 configurado", on: true },
      { t: "Estrutura de tráfego pago (Google)", on: true },
      { t: "Relatório mensal com análise real", on: true },
      { t: "Otimização contínua de campanhas", on: true },
    ],
  },
];

const fmtBR = (n) => "R$ " + Math.round(n).toLocaleString("pt-BR");

function PricingSection() {
  return (
    <section id="pacotes" className="alt">
      <div className="wrap">
        <Reveal className="sh">
          <span className="eyebrow"><span className="dot"></span>Pacotes</span>
          <h2>Escolha o plano certo para o tamanho do seu sonho.</h2>
          <p>Todos os pacotes incluem hospedagem, certificado SSL e suporte técnico. Sem letra miúda.</p>
        </Reveal>

        {/* Banner de lançamento */}
        <Reveal>
          <div className="launch-banner">
            <span className="launch-dot"></span>
            <div>
              <strong>Condição de lançamento — apenas 3 vagas</strong>
              <span>Em troca, pedimos um depoimento em vídeo ao final e permissão para usar o resultado como case.</span>
            </div>
          </div>
        </Reveal>

        <div className="plans plans--two">
          {PLANS.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <div className={`plan ${p.featured ? "featured" : ""}`}>
                {p.featured && <div className="plan-badge">Mais escolhido</div>}
                <div className="plan-tag">{p.tag}</div>
                <h3>{p.name}</h3>
                <div className="plan-tagline">{p.tagline}</div>
                <div className="plan-price">
                  <div className="from">Setup · condição de lançamento</div>
                  <div className="big">
                    {fmtBR(p.setup)} <small>de entrada</small>
                  </div>
                  <div className="plan-normal-price">
                    preço normal <s>{fmtBR(p.setupNormal)}</s>
                  </div>
                  <div className="mensal">+ <strong>{fmtBR(p.monthly)}</strong>/mês</div>
                </div>
                <ul className="plan-features">
                  {p.features.map((f, j) => (
                    <li key={j} className={f.on ? "" : "muted"}>
                      {f.on ? <Icon name="check" size={18} /> : <Icon name="x" size={18} />}
                      <span>{f.t}</span>
                    </li>
                  ))}
                </ul>
                <a
                  className={`btn ${p.featured ? "btn-primary" : "btn-secondary"}`}
                  href="#/diagnostico"
                  onClick={(e) => { e.preventDefault(); window.navigate("/diagnostico"); }}
                >
                  {p.cta} <Icon name="arrow-right" size={14} />
                </a>
              </div>
            </Reveal>
          ))}
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
  const [traffic, setTraffic] = useStatePricing(900);

  const result = useMemoPricing(() => {
    const plan = PLANS.find(p => p.id === pkg);
    const trafficCost = pkg === "presenca" ? 0 : traffic;
    const totalMonthly = plan.monthly + trafficCost;
    const firstYear = plan.setup + (totalMonthly * 12);
    return { plan, trafficCost, totalMonthly, firstYear };
  }, [pkg, traffic]);

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
              {fmtBR(result.plan.monthly)} JI {result.trafficCost > 0 && <>+ {fmtBR(result.trafficCost)} mídia</>}
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
