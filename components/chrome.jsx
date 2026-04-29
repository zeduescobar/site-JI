// Top nav, footer, theme toggle
const { useState: useStateChrome, useEffect: useEffectChrome } = React;

function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}>
      <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
    </button>
  );
}

function useIsMobile(breakpoint = 880) {
  const [isMobile, setIsMobile] = useStateChrome(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffectChrome(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

function Nav({ route, theme, onToggleTheme }) {
  const [open, setOpen] = useStateChrome(false);
  const isMobile = useIsMobile(880);

  // Fecha o menu ao trocar de rota / pressionar ESC / clicar fora
  useEffectChrome(() => { setOpen(false); }, [route]);
  useEffectChrome(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const link = (path, label) => (
    <a
      className={`nav-link ${route === path ? "active" : ""}`}
      href={`#${path}`}
      onClick={(e) => { e.preventDefault(); window.navigate(path); setOpen(false); }}
    >{label}</a>
  );

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Logo />
        <nav
          id="primary-nav"
          className={`nav-links ${isMobile ? "nav-links--mobile" : ""} ${open ? "open" : ""}`}
          aria-hidden={isMobile && !open}
        >
          {link("/", "Início")}
          {link("/servicos", "Serviços")}
          {link("/cases", "Cases")}
          <a
            className="nav-link"
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              if (route !== "/") window.navigate("/");
              setTimeout(() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
            }}
          >FAQ</a>
        </nav>
        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a className="btn btn-primary btn-sm nav-cta" href="#/diagnostico" onClick={(e) => { e.preventDefault(); window.navigate("/diagnostico"); }}>
            Diagnóstico grátis <Icon name="arrow-right" size={14} />
          </a>
          {isMobile && (
            <button
              className="nav-burger"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="primary-nav"
              onClick={() => setOpen(o => !o)}
            >
              <Icon name={open ? "x" : "menu"} size={22} />
            </button>
          )}
        </div>
      </div>
      {isMobile && open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
    </header>
  );
}

function Footer() {
  const go = (e, p) => { e.preventDefault(); window.navigate(p); };
  const WHATS = "5511942805862";
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Logo />
            <p style={{ marginTop: 16, fontSize: 14, maxWidth: 320 }}>
              Sites, IA e tráfego pago para pequenos negócios locais que querem parar de depender só do boca a boca.
            </p>
          </div>
          <div>
            <h4>Serviços</h4>
            <div className="foot-list">
              <a href="#/servicos" onClick={(e) => go(e, "/servicos")}>Criação de sites</a>
              <a href="#/servicos" onClick={(e) => go(e, "/servicos")}>Tráfego pago</a>
              <a href="#/servicos" onClick={(e) => go(e, "/servicos")}>ChatBot com IA</a>
              <a href="#/servicos" onClick={(e) => go(e, "/servicos")}>Aplicativos</a>
            </div>
          </div>
          <div>
            <h4>Empresa</h4>
            <div className="foot-list">
              <a href="#/cases" onClick={(e) => go(e, "/cases")}>Cases de sucesso</a>
              <a href="#/" onClick={(e) => go(e, "/")}>Sobre a JI</a>
              <a href="#/diagnostico" onClick={(e) => go(e, "/diagnostico")}>Diagnóstico grátis</a>
            </div>
          </div>
          <div>
            <h4>Contato</h4>
            <div className="foot-list">
              <a href="mailto:contato@jitecnologia.com.br">contato@jitecnologia.com.br</a>
              <a href={`https://wa.me/${WHATS}`} target="_blank" rel="noopener noreferrer">WhatsApp: (11) 94280-5862</a>
              <span>Mogi das Cruzes — SP</span>
              <span>Atendimento: 9h às 19h</span>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 JI Tecnologia. Todos os direitos reservados.</span>
          <span className="foot-cnpj">LGPD compliant</span>
          <span><a href="#">Política de Privacidade</a> · <a href="#">Termos</a></span>
        </div>
      </div>

      {/* WhatsApp flutuante */}
      <a
        href={`https://wa.me/${WHATS}?text=${encodeURIComponent("Olá! Vim pelo site da JI Tecnologia.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab"
        aria-label="Falar no WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
}

Object.assign(window, { Nav, Footer, ThemeToggle });
