// Cases section — projetos reais
const CASES = [
  {
    initials: "VC",
    logo: "assets/logo-vaicom (2).jpg",
    name: "VaiCom Saúde",
    seg: "Corretora de Planos de Saúde · SP",
    color: "blue",
    url: "https://www.planosobam.com.br/",
    urlLabel: "planosobam.com.br",
    what: "Site gerador de leads orgânicos para corretora de planos de saúde.",
    solution: "Desenvolvimento do site planosobam.com.br com foco em captação orgânica via Google, páginas otimizadas por plano e integração com equipe comercial.",
    tags: ["Site profissional", "SEO orgânico", "Geração de leads"],
  },
  {
    initials: "LC",
    logo: "assets/logolivie.png",
    name: "Clínica Livie",
    seg: "Saúde Integrada · Dra. Livia Escobar",
    color: "violet",
    url: "https://www.livieclinica.com.br/",
    urlLabel: "livieclinica.com.br",
    what: "Site institucional da clínica da Dra. Livia Escobar.",
    solution: "Site institucional completo com apresentação dos serviços, corpo clínico e agendamento online, otimizado para Google Meu Negócio e SEO local.",
    tags: ["Site institucional", "SEO local", "Google Meu Negócio"],
  },
  {
    initials: "VC",
    logo: "assets/logo-vaicom (2).jpg",
    name: "Sistema de Leads — VaiCom",
    seg: "Plataforma interna · Corretora",
    color: "green",
    image: "assets/sistema-leads-vai-com.png",
    what: "Sistema de gerenciamento de leads e filiados.",
    solution: "Plataforma web para gestão de leads gerados por indicação de filiados, controle de status, funnels de conversão e painel administrativo para a equipe comercial.",
    tags: ["Sistema web", "Gestão de leads", "Painel administrativo"],
  },
];

function CaseTags({ tags }) {
  return (
    <div className="case-tags">
      {tags.map((t, i) => <span key={i} className="case-tag">{t}</span>)}
    </div>
  );
}

function CaseCard({ c }) {
  return (
    <div className="case">
      <div className="case-head">
        {c.logo
          ? <div className="case-avatar case-avatar--logo"><img src={c.logo} alt={c.name} /></div>
          : <div className="case-avatar">{c.initials}</div>
        }
        <div>
          <div className="case-name">{c.name}</div>
          <div className="case-seg">{c.seg}</div>
        </div>
      </div>

      <div className="case-row">
        <div className="lb">O que foi feito</div>
        <div className="vl">{c.what}</div>
      </div>
      <div className="case-row">
        <div className="lb">Detalhes</div>
        <div className="vl">{c.solution}</div>
      </div>

      <CaseTags tags={c.tags} />

      {c.url && (
        <a href={c.url} target="_blank" rel="noopener noreferrer" className="case-link">
          <Icon name="globe" size={14} />
          {c.urlLabel}
        </a>
      )}
    </div>
  );
}

function CasesSection() {
  return (
    <section>
      <div className="wrap">
        <Reveal className="sh">
          <span className="eyebrow"><span className="dot"></span>Cases</span>
          <h2>Projetos reais, clientes reais.</h2>
          <p>Trabalhos entregues pela JI Tecnologia — sites, sistemas e estratégias que estão no ar gerando resultado.</p>
        </Reveal>
        <div className="case-grid">
          {CASES.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <CaseCard c={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CasesSection, CASES, CaseCard });
