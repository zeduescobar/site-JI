// Cases page
function CasesPage() {
  return (
    <main data-screen-label="Cases">
      <div className="page-header">
        <div className="wrap">
          <a className="back" href="#/" onClick={(e) => { e.preventDefault(); window.navigate("/"); }}><Icon name="arrow-left" size={14} /> Voltar para início</a>
          <span className="eyebrow" style={{ marginTop: 24, display: "block" }}><span className="dot"></span>Cases de sucesso</span>
          <h1>Projetos reais, clientes reais.</h1>
          <p>Sites, sistemas e estratégias entregues pela JI Tecnologia — no ar e gerando resultado.</p>
        </div>
      </div>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="case-grid">
            {CASES.map((c, i) => (
              <Reveal key={i} delay={i * 60}>
                <CaseCard c={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTAFinal />
    </main>
  );
}

Object.assign(window, { CasesPage });
