// Serviços page — tabs by service category
const { useState: useStateSvc } = React;

const SERVICES = [
  {
    id: "sites",
    name: "Criação de Sites",
    icon: "globe",
    h: "Sites profissionais que vendem — não só decoram.",
    lead: "Site rápido, otimizado para Google e pronto em até 15 dias. A partir de R$ 2.500. Garantia de 30 dias ou 100% do dinheiro de volta.",
    features: [
      { ic: "spark", h: "Design clean + conversão", p: "Layout que não confunde o cliente. Cada seção pensada para levar à ação." },
      { ic: "trend", h: "PageSpeed 90+", p: "Site rápido em mobile e desktop. Google ama, cliente também." },
      { ic: "shield", h: "SSL, LGPD e sitemap", p: "Tudo configurado: certificado, política de privacidade e Search Console." },
      { ic: "code", h: "Código limpo e seu", p: "Tecnologia moderna (Next.js + Tailwind). O código fica no seu nome." },
    ],
  },
  {
    id: "trafego",
    name: "Tráfego Pago",
    icon: "target",
    h: "Tráfego que traz cliente pronto para comprar.",
    lead: "Gestão profissional de Google Ads, com relatório mensal e foco obsessivo em ROAS — não em likes.",
    features: [
      { ic: "search", h: "Google Ads de alta intenção", p: "Mira nas palavras de quem está pronto para fechar — não só pesquisando." },
      { ic: "chart", h: "Campanhas com criativo testado", p: "Variações testadas semanalmente. O que não converte, sai do ar." },
      { ic: "chart", h: "Relatório mensal sem enrolação", p: "Quanto investiu, quanto retornou, o que vamos ajustar. Em uma página." },
      { ic: "target", h: "Geo-segmentação por bairro", p: "Anúncio só para quem está na sua área de atendimento. Verba não vaza." },
    ],
  },
  {
    id: "ia",
    name: "ChatBot com IA",
    icon: "bot",
    h: "Atendimento 24h — sua equipe foca só em quem está pronto.",
    lead: "Robô inteligente que atende, qualifica e agenda no WhatsApp 24h. Sua equipe só fala com lead quente.",
    features: [
      { ic: "phone", h: "Integração WhatsApp Business", p: "Oficial, sem risco de banimento. Funciona no número que você já tem." },
      { ic: "calendar", h: "Agenda automática", p: "Marca horários direto na sua agenda Google Calendar / sistema próprio." },
      { ic: "spark", h: "Treinada com seu negócio", p: "Aprende seus serviços, preços e tom de voz. Não soa robô genérico." },
      { ic: "users", h: "Hand-off para humano", p: "Detecta caso complexo e passa para você com o resumo da conversa." },
    ],
  },
  {
    id: "apps",
    name: "Aplicativos",
    icon: "phone",
    h: "App próprio para clientes recorrentes — Android e iOS.",
    lead: "Para clínicas, escritórios e lojas com base de clientes que merece app próprio. Lançamento nas duas lojas em 30-45 dias.",
    features: [
      { ic: "phone", h: "Android + iOS nativo", p: "Publicado em Google Play e App Store no seu nome de empresa." },
      { ic: "calendar", h: "Agendamento e fidelidade", p: "Cliente agenda direto no app. Pontos, cashback e recorrência inclusos." },
      { ic: "wifi", h: "Notificações push", p: "Comunicação direta — sem depender de algoritmo de rede social." },
      { ic: "chart", h: "Painel de métricas", p: "Você vê o que cada cliente faz, quando volta e qual canal trouxe ele." },
    ],
  },
];

function SvcMockSites() {
  return (
    <div className="svc-mock" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
        <i style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }}></i>
        <i style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E" }}></i>
        <i style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }}></i>
        <span className="mono" style={{ marginLeft: 12, fontSize: 11, color: "var(--ink-3)" }}>seunegocio.com.br</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>PageSpeed Insights</div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ padding: "2px 8px", borderRadius: 12, background: "var(--green-50)", color: "var(--green)", fontSize: 11, fontWeight: 700 }}>97</span>
          <span style={{ padding: "2px 8px", borderRadius: 12, background: "var(--green-50)", color: "var(--green)", fontSize: 11, fontWeight: 700 }}>SEO 100</span>
        </div>
      </div>
      <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>Sua promessa de valor aqui.</div>
        <p style={{ fontSize: 14, color: "var(--ink-2)" }}>Subheadline que reforça o benefício e elimina objeção principal do cliente.</p>
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <span className="btn btn-primary btn-sm" style={{ pointerEvents: "none" }}>Quero saber mais</span>
          <span className="btn btn-secondary btn-sm" style={{ pointerEvents: "none" }}>Ver portfólio</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ aspectRatio: "1.6", borderRadius: 8, background: "linear-gradient(135deg, var(--blue-50), var(--violet-50))", border: "1px solid var(--line)" }}></div>
        ))}
      </div>
    </div>
  );
}

function SvcMockTrafego() {
  const bars = [62, 78, 54, 91, 73, 88, 95];
  return (
    <div className="svc-mock">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Conversões / dia</div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--ink)" }}>+47</div>
          <div style={{ fontSize: 13, color: "var(--green)", fontWeight: 600 }}>↑ 184% vs mês anterior</div>
        </div>
        <div style={{ background: "var(--green-50)", color: "var(--green)", padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>ROAS 4.2x</div>
      </div>
      <div style={{ marginTop: 32, display: "flex", alignItems: "flex-end", gap: 8, height: 160 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === bars.length - 1 ? "var(--grad)" : "var(--bg-soft)", borderRadius: 6, transition: "height .6s" }}></div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-3)" }}>
        {["seg", "ter", "qua", "qui", "sex", "sáb", "dom"].map(d => <span key={d}>{d}</span>)}
      </div>
      <div style={{ marginTop: 24, padding: 16, background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--ink-2)" }}>Investido (Google Ads)</span>
          <span style={{ fontWeight: 700, color: "var(--ink)" }}>R$ 1.847</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 10 }}>
          <span style={{ color: "var(--ink-2)" }}>Receita atribuída</span>
          <span style={{ fontWeight: 700, color: "var(--green)" }}>R$ 7.756</span>
        </div>
      </div>
    </div>
  );
}

function SvcMockIA() {
  return (
    <div className="svc-mock" style={{ background: "linear-gradient(180deg, #ECE5DD 0%, #E1D8C8 100%)", padding: 0, overflow: "hidden" }}>
      <div className="wa-bar" style={{ borderRadius: 0 }}>
        <div className="av">JI</div>
        <div>
          <div className="nm">Atendente IA · seu negócio</div>
          <div className="st">online · responde em segundos</div>
        </div>
      </div>
      <div className="wa-body" style={{ padding: 20 }}>
        <div className="wa-msg them">Oi! Quanto custa uma limpeza de pele?</div>
        <div className="wa-msg me bot">
          Olá! 😊 Nossa limpeza de pele profunda custa R$ 180 (1h30). Tenho horário amanhã às 10h ou quinta às 16h. Qual prefere?
          <div className="meta">11:24 ✓✓</div>
        </div>
        <div className="wa-msg them">Quinta 16h tá bom</div>
        <div className="wa-msg me bot">
          Perfeito! Reservei para você. Posso confirmar seu nome e CPF para o cadastro?
          <div className="meta">11:24 ✓✓</div>
        </div>
        <div style={{ margin: "16px 0 0", textAlign: "center", fontSize: 11, color: "var(--ink-3)" }}>
          ↑ qualificou e agendou em 47 segundos · sem você
        </div>
      </div>
    </div>
  );
}

function SvcMockApps() {
  return (
    <div className="svc-mock" style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "var(--bg-soft)" }}>
      <div style={{ width: 220, background: "var(--ink)", borderRadius: 32, padding: 8, boxShadow: "var(--shadow-lg)" }}>
        <div style={{ background: "var(--bg)", borderRadius: 26, height: 420, padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Olá, Maria 👋</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Próxima sessão</div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--grad)" }}></div>
          </div>
          <div style={{ background: "var(--grad)", borderRadius: 14, padding: 14, color: "white" }}>
            <div style={{ fontSize: 11, opacity: 0.85 }}>Quinta-feira · 16h00</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>Limpeza de pele profunda</div>
            <div style={{ fontSize: 11, marginTop: 8, opacity: 0.85 }}>com Dra. Ana · 1h30</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Agendar", "Histórico", "Pontos", "Indique"].map(t => (
              <div key={t} style={{ background: "var(--bg-soft)", borderRadius: 10, padding: "12px 10px", fontSize: 11, fontWeight: 600 }}>{t}</div>
            ))}
          </div>
          <div style={{ marginTop: "auto", textAlign: "center", fontSize: 10, color: "var(--ink-3)" }}>seu app · sua marca</div>
        </div>
      </div>
    </div>
  );
}

function ServicosPage() {
  const [active, setActive] = useStateSvc("sites");
  const svc = SERVICES.find(s => s.id === active);
  const Mock = { sites: SvcMockSites, trafego: SvcMockTrafego, ia: SvcMockIA, apps: SvcMockApps }[active];
  return (
    <main data-screen-label="Servicos">
      <div className="page-header">
        <div className="wrap">
          <a className="back" href="#/" onClick={(e) => { e.preventDefault(); window.navigate("/"); }}><Icon name="arrow-left" size={14} /> Voltar para início</a>
          <span className="eyebrow" style={{ marginTop: 24, display: "block" }}><span className="dot"></span>Serviços</span>
          <h1>Tudo que seu negócio local precisa para crescer no digital.</h1>
          <p>Quatro frentes integradas que trabalham juntas — porque site sem tráfego não vende, e tráfego sem IA queima orçamento.</p>
        </div>
      </div>

      <section className="tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="svc-tabs">
            {SERVICES.map(s => (
              <button key={s.id} className={active === s.id ? "on" : ""} onClick={() => setActive(s.id)}>
                <Icon name={s.icon} size={16} /> &nbsp;{s.name}
              </button>
            ))}
          </div>
          <div className="svc-detail">
            <div>
              <h2>{svc.h}</h2>
              <p className="lead">{svc.lead}</p>
              <ul className="feature-list">
                {svc.features.map((f, i) => (
                  <li key={i}>
                    <div className="ic"><Icon name={f.ic} size={16} /></div>
                    <div>
                      <strong>{f.h}</strong>
                      <span>{f.p}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className="btn btn-primary" href="#/diagnostico" onClick={(e) => { e.preventDefault(); window.navigate("/diagnostico"); }}>
                  Pedir diagnóstico <Icon name="arrow-right" size={14} />
                </a>
                <a className="btn btn-secondary" href="#/" onClick={(e) => { e.preventDefault(); window.navigate("/"); setTimeout(() => document.getElementById("pacotes")?.scrollIntoView({ behavior: "smooth" }), 80); }}>
                  Ver pacotes
                </a>
              </div>
            </div>
            <Mock />
          </div>
        </div>
      </section>

      <CTAFinal />
    </main>
  );
}

Object.assign(window, { ServicosPage });
