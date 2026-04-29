// Home page
function HomePage() {
  return (
    <main data-screen-label="Home">
      <Hero />
      <ClientStrip />
      <PainSection />
      <MethodSection />
      <PricingSection />
      <CasesSection />
      <SobreSection />
      <FAQSection />
      <CTAFinal />
    </main>
  );
}

Object.assign(window, { HomePage });
