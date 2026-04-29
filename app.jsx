// App: routing + theme
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "auto"
}/*EDITMODE-END*/;

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("ji-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {}
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

function App() {
  const [route, setRoute] = useStateApp(window.location.hash.replace(/^#/, "") || "/");
  const [theme, setTheme] = useStateApp(getInitialTheme());

  // Routing
  useEffectApp(() => {
    window.navigate = (p) => { window.location.hash = p; };
    const onHash = () => {
      const h = window.location.hash.replace(/^#/, "") || "/";
      // Não força scroll-to-top se for âncora interna (#faq, #metodo, #pacotes)
      const isAnchor = h.startsWith("/") === false && !h.includes("/");
      setRoute(h);
      if (!isAnchor) window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Aplica tema + persiste
  useEffectApp(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("ji-theme", theme); } catch (e) {}
  }, [theme]);

  // Acompanha mudanças do sistema enquanto o usuário não escolheu manualmente
  useEffectApp(() => {
    if (!window.matchMedia) return;
    let userChose = false;
    try { userChose = !!localStorage.getItem("ji-theme-explicit"); } catch (e) {}
    if (userChose) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setTheme(e.matches ? "dark" : "light");
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("ji-theme-explicit", "1"); } catch (e) {}
  };

  let Page;
  if (route === "/" || route === "") Page = HomePage;
  else if (route === "/servicos") Page = ServicosPage;
  else if (route === "/cases") Page = CasesPage;
  else if (route === "/diagnostico") Page = DiagnosticoPage;
  else Page = HomePage;

  return (
    <>
      <Nav route={route === "" ? "/" : route} theme={theme} onToggleTheme={toggleTheme} />
      <div id="main">
        <Page />
      </div>
      <Footer />
      {window.TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Tema">
            <TweakRadio
              label="Modo"
              value={theme}
              onChange={(v) => { setTheme(v); try { localStorage.setItem("ji-theme-explicit", "1"); } catch (e) {} }}
              options={[{ value: "light", label: "Claro" }, { value: "dark", label: "Escuro" }]}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
