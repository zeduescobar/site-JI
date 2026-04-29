// Strip, Pain, Method, Sobre, Garantia, CTA Final
function ClientStrip() {
  const logos = [
    { src: "assets/logolivie.png",  alt: "Clínica Livie",  name: "Clínica Livie" },
    { src: "assets/logo-vaicom (2).jpg",       alt: "VaiCom Saúde",  name: "VaiCom Saúde"  },
  ];
  return (
    <section className="strip tight">
      <div className="wrap">
        <div className="strip-label">Marcas que confiam na JI Tecnologia para crescer no digital</div>
        <div className="strip-row strip-row--logos">
          {logos.map((l, i) => (
            <div className="client-logo client-logo--img" key={i}>
              <img src={l.src} alt={l.alt} />
              <span className="client-logo-name">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PainSection() {
  const pains = [
    { ic: "globe", h: "Sem site, invisível no Google", p: "Sem presença própria, você simplesmente não existe para quem pesquisa seu serviço. Instagram não substitui um site indexado." },
    { ic: "phone", h: "WhatsApp lotado de mensagens repetidas", p: "Você perde horas por dia respondendo as mesmas dúvidas — e mesmo assim, leads esfriam." },
    { ic: "search", h: "Quem busca encontra o concorrente", p: "Quando alguém procura seu serviço no Google, é o concorrente que aparece. Não você." },
    { ic: "money", h: "Tráfego pago que não converteu", p: "Já investiu em anúncios, mas o dinheiro sumiu sem retorno claro nem relatório." },
  ];
  return (
    <section className="alt">
      <div className="wrap">
        <Reveal className="sh">
          <span className="eyebrow"><span className="dot"></span>Dor</span>
          <h2>Você reconhece algum desses problemas?</h2>
          <p>Se respondeu sim para 2 ou mais, a gente precisa conversar.</p>
        </Reveal>
        <div className="pain-grid">
          {pains.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="pain-card">
                <div className="pain-icon"><Icon name={p.ic} size={20} /></div>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  const steps = [
    { n: "01", h: "Diagnóstico", p: "Analisamos seu negócio, concorrência e oportunidades em 48h e entregamos um PDF com 5 a 10 pontos.", ic: "search" },
    { n: "02", h: "Construção", p: "Site profissional, rápido e otimizado para Google em 7 a 15 dias.", ic: "code" },
    { n: "03", h: "Ativação", p: "Tráfego pago, SEO local e IA no WhatsApp atendendo seus clientes 24h por dia, qualificando leads.", ic: "rocket" },
    { n: "04", h: "Escala", p: "Acompanhamento mensal com relatórios reais e ajustes para crescer mês a mês — não só ficar online.", ic: "trend" },
  ];
  return (
    <section id="metodo">
      <div className="wrap">
        <Reveal className="sh">
          <span className="eyebrow"><span className="dot"></span>Método JI</span>
          <h2>4 passos para o seu negócio aparecer, atrair e converter.</h2>
          <p>Sem promessas vazias. Cada etapa entrega valor concreto e mensurável.</p>
        </Reveal>
        <div className="method-grid">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="method-step">
                <div className="method-num">{s.n}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <div className="ic"><Icon name={s.ic} size={18} /></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SobreSection() {
  return (
    <section>
      <div className="wrap about">
        <Reveal>
          <span className="eyebrow"><span className="dot"></span>Sobre a JI</span>
          <h2 style={{ marginTop: 12 }}>Nascemos para resolver o que outras agências não resolvem.</h2>
          <p style={{ marginTop: 22, fontSize: 17 }}>
            A maioria das agências entrega um site bonito e some. A gente acredita em outra coisa: site só vale a pena se trouxer cliente.
          </p>
          <p style={{ marginTop: 14, fontSize: 17 }}>
            Por isso, a JI Tecnologia une três pilares que ninguém entrega junto: site profissional, tráfego inteligente e atendimento com IA. Tudo pensado para o pequeno e médio negócio local que quer crescer sem depender de indicação.
          </p>
          <p style={{ marginTop: 14, fontSize: 17, color: "var(--ink)", fontWeight: 600 }}>
            Somos parceiros, não fornecedores. Você cresce, a gente cresce junto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section>
      <div className="wrap">
        <Reveal>
          <div className="cta-final">
            <span className="eyebrow cta-eyebrow"><span className="dot" style={{ background: "white" }}></span>Última chamada</span>
            <h2 style={{ marginTop: 14 }}>Seu concorrente já está no Google.<br />E você?</h2>
            <p>
              Solicite seu diagnóstico gratuito agora. Em 48h você recebe um plano personalizado com 5 a 10 pontos de melhoria — mesmo que não feche conosco.
            </p>
            <a className="btn btn-primary" href="#/diagnostico" onClick={(e) => { e.preventDefault(); window.navigate("/diagnostico"); }}>
              Quero meu diagnóstico gratuito <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { ClientStrip, PainSection, MethodSection, SobreSection, CTAFinal });
