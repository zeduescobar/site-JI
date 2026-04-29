// Home page — components looked up at render time to avoid Babel async-load race
function HomePage() {
  // Resolve all cross-file components at render time (window is fully populated by then)
  const _Hero          = window.Hero;
  const _ClientStrip   = window.ClientStrip;
  const _PainSection   = window.PainSection;
  const _MethodSection = window.MethodSection;
  const _PricingSection= window.PricingSection;
  const _CasesSection  = window.CasesSection;
  const _SobreSection  = window.SobreSection;
  const _FAQSection    = window.FAQSection;
  const _CTAFinal      = window.CTAFinal;
  return (
    <main data-screen-label="Home">
      <_Hero />
      <_ClientStrip />
      <_PainSection />
      <_MethodSection />
      <_PricingSection />
      <_CasesSection />
      <_SobreSection />
      <_FAQSection />
      <_CTAFinal />
    </main>
  );
}

Object.assign(window, { HomePage });
