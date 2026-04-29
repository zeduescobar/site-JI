// Hero with animated laptop + phone WhatsApp + AI bot
const { useEffect: useEffectHero, useState: useStateHero } = React;

function HeroPhone() {
  // Cycling chat messages
  const script = [
    { who: "them", text: "Oi! Quero saber sobre limpeza dental. Vocês atendem hoje?", t: "10:42" },
    { who: "me", text: "Olá! Sim 😊 Temos horário às 14h e 17h hoje. Qual prefere?", t: "10:42", bot: true },
    { who: "them", text: "17h fica perfeito.", t: "10:43" },
    { who: "me", text: "Combinado! Reservei para você. Posso confirmar seu nome?", t: "10:43", bot: true },
  ];
  const [count, setCount] = useStateHero(1);
  const [typing, setTyping] = useStateHero(false);
  useEffectHero(() => {
    if (count >= script.length) {
      const r = setTimeout(() => setCount(1), 4500);
      return () => clearTimeout(r);
    }
    const showTyping = setTimeout(() => setTyping(true), 700);
    const advance = setTimeout(() => { setTyping(false); setCount(c => c + 1); }, 2000);
    return () => { clearTimeout(showTyping); clearTimeout(advance); };
  }, [count]);

  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="wa-bar">
          <div className="av">JI</div>
          <div>
            <div className="nm">Clínica Sorrir · IA</div>
            <div className="st">online · responde em segundos</div>
          </div>
        </div>
        <div className="wa-body">
          {script.slice(0, count).map((m, i) => (
            <div key={i} className={`wa-msg ${m.who} ${m.bot ? "bot" : ""}`}>
              {m.text}
              <div className="meta">{m.t}{m.who === "me" ? " ✓✓" : ""}</div>
            </div>
          ))}
          {typing && count < script.length && (
            <div className="wa-typing"><i></i><i></i><i></i></div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroLaptopScreen() {
  return (
    <div className="fb">
      <div className="fb-bar">
        <i></i><i></i><i></i>
        <div className="url">clinicasorrir.com.br</div>
      </div>
      <div className="fb-body">
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--blue)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Clínica Sorrir</div>
        <div className="fb-h">Seu sorriso merece o melhor cuidado</div>
        <div className="fb-p"></div>
        <div className="fb-p short"></div>
        <div className="fb-cta">
          <span className="b">Agendar consulta</span>
          <span className="b alt">Ver serviços</span>
        </div>
        <div className="fb-grid">
          <div className="t"></div><div className="t"></div><div className="t"></div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="wrap hero-grid">
        <Reveal>
          <span className="eyebrow"><span className="dot"></span>Agência de resultado para negócios locais</span>
          <h1>
            Mais clientes para o seu negócio local —{" "}
            <span className="grad">em 30 dias, no piloto automático.</span>
          </h1>
          <p className="hero-sub">
            Sites, tráfego pago e atendimento com IA que trabalham 24h por você. Para clínicas, escritórios, lojas e prestadores que querem parar de depender só do boca a boca.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#/diagnostico" onClick={(e) => { e.preventDefault(); window.navigate("/diagnostico"); }}>
              Quero meu diagnóstico gratuito <Icon name="arrow-right" size={16} />
            </a>
            <a className="btn btn-secondary" href="#metodo" onClick={(e) => { e.preventDefault(); document.getElementById("metodo")?.scrollIntoView({ behavior: "smooth" }); }}>
              Ver como funciona →
            </a>
          </div>
          <div className="hero-micro">
            <span>Análise completa em 48h</span>
            <span>Sem compromisso</span>
            <span>+50 negócios atendidos</span>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="hero-stage">
            <div className="laptop">
              <div className="laptop-screen"><HeroLaptopScreen /></div>
            </div>
            <HeroPhone />
            <div className="ai-badge">
              <div className="ic"><Icon name="bot" size={16} /></div>
              <div>
                <div className="lb">IA respondendo</div>
                <div className="vl">2.4s · 24/7</div>
              </div>
            </div>
            <div className="spike-badge">
              <div className="ic"><Icon name="trend" size={16} /></div>
              <div>
                <div className="lb">Leads / semana</div>
                <div className="vl">+184%</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
