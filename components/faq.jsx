// FAQ accordion
const { useState: useStateFaq } = React;

const FAQ_ITEMS = [
  {
    q: "Em quanto tempo meu site fica pronto?",
    a: "Sites do plano Presença Local ficam prontos em 7 a 15 dias. Pacotes maiores levam uma análise para informarmos o tempo médio.",
  },
  {
    q: "Preciso entender de tecnologia para contratar?",
    a: "Não. A gente fala a sua língua, traduz tudo e cuida de cada detalhe técnico. Você só precisa focar no seu negócio.",
  },
  {
    q: "O site fica meu ou da JI?",
    a: "100% seu. Domínio, hospedagem e código ficam no seu nome. Você nunca fica refém da gente — se quiser sair, leva tudo embora.",
  },
  {
    q: "Quanto preciso investir em tráfego pago?",
    a: "Recomendamos no mínimo R$ 30/dia (R$ 900/mês) em verba de mídia para o Google. Esse valor vai direto para a plataforma, não para a JI.",
  },
  {
    q: "A IA no WhatsApp substitui um atendente humano?",
    a: "Ela qualifica leads, tira dúvidas e marca horários 24h. Para vendas complexas, ela direciona para você. Resultado: você só fala com quem está pronto para comprar.",
  },
  {
    q: "E se eu já tiver um site?",
    a: "Avaliamos seu site no diagnóstico gratuito. Se tiver boa base, otimizamos. Se não, refazemos do zero.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Entrada de 50% para começar e 50% na entrega. A mensalidade cobre a hospedagem, o domínio e o site permanecer no ar — sem ela, não garantimos que o site continue funcionando.",
  },
  {
    q: "Posso cancelar a mensalidade?",
    a: "Sim, sem multa. Mas atenção: a mensalidade é o que mantém o site hospedado e no ar. Ao cancelar, não garantimos suporte nem que o site continue funcionando.",
  },
];

function FAQSection() {
  const [open, setOpen] = useStateFaq(0);
  return (
    <section id="faq" className="alt">
      <div className="wrap">
        <Reveal className="sh">
          <span className="eyebrow"><span className="dot"></span>FAQ</span>
          <h2>Perguntas que você deve estar fazendo agora.</h2>
          <p>Se a sua não está aqui, é só chamar a gente no WhatsApp.</p>
        </Reveal>
        <div className="faq">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="chev"><Icon name="chevron-down" size={20} /></span>
                </button>
                <div className="faq-a" style={{ maxHeight: isOpen ? 360 : 0 }}>
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FAQSection });
