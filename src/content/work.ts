import type { Locale } from "@/lib/i18n";

// Case-study copy. Only facts from the brief are stated; everything else is a visible {{TODO}}.
export type Artifact = "activation" | "tokens" | "reader" | "ledger";
export type CaseBody = {
  title: string;
  tldr: { problem: string; role: string; team: string; timeline: string; platform: string; outcome: string };
  problem: string[];
  found: string[];
  decisions: { title: string; options: string; chose: string; why: string }[];
  solution: string;
  impact: string[];
  next: string[];
};
export type Case = { slug: string; artifact: Artifact } & Record<Locale, CaseBody>;

export const slugs = ["salespoint", "salespoint-design-system", "shamat", "flowance"] as const;

export const cases: Case[] = [
  {
    slug: "salespoint",
    artifact: "activation",
    en: {
      title: "SalesPoint: dealer platform",
      tldr: {
        problem: "Dealers run complex telecom flows all day, at high volume.",
        role: "UX lead and design system owner",
        team: "{{TODO: team size and roles}}",
        timeline: "{{TODO: timeline}}",
        platform: "{{TODO: web / mobile}} · 200+ screens",
        outcome: "Complex telecom operations turned into clear daily flows, on one system across five operators.",
      },
      problem: [
        "SalesPoint is one dealer platform used by five telecom operators. Dealers use it every day for KYC and identity verification, SIM activation (physical and eSIM), billing, ownership transfer, wallets and commissions.",
        "Many of these flows pass through multi-stage, role-based approvals. The job: make them clear enough for high-volume daily use.",
        "{{TODO: constraints, e.g. regulation, legacy systems, dealer device types}}",
      ],
      found: [
        "Business rules differ by role and by operator, so the flows had to carry those rules without showing them as complexity.",
        "{{TODO: research method and 2–3 real insights}}",
      ],
      decisions: [
        { title: "Activation flow", options: "5 competing activation flows, tested side by side.", chose: "{{TODO: winning flow}}", why: "{{TODO: evidence that decided it}}" },
        { title: "Credit-limit pattern", options: "5 competing credit-limit patterns, tested side by side.", chose: "{{TODO: winning pattern}}", why: "{{TODO: evidence that decided it}}" },
        { title: "Migration model", options: "2 migration models, tested side by side.", chose: "{{TODO: winning model}}", why: "{{TODO: evidence that decided it}}" },
      ],
      solution: "Below is an illustrative rebuild of a SIM activation flow with the physical and eSIM paths. It is a simplified demo, not real data or the production screens.",
      impact: ["Dealers now complete KYC, activation, billing and wallet tasks through one consistent set of flows.", "Each new operator launched on the shared system instead of a new design.", "Key flows were chosen through side-by-side testing, not opinion."],
      next: ["{{TODO: what you would do next or learned}}"],
    },
    ar: {
      title: "SalesPoint: منصة الموزّعين",
      tldr: {
        problem: "يتعامل الموزّعون يومياً مع مسارات اتصالات معقّدة وبحجم كبير.",
        role: "قيادة تجربة المستخدم ومالك نظام التصميم",
        team: "{{TODO: حجم الفريق وأدواره}}",
        timeline: "{{TODO: المدة}}",
        platform: "{{TODO: ويب / جوال}} · أكثر من 200 شاشة",
        outcome: "عمليات اتصالات معقّدة تحولت إلى مسارات يومية واضحة، على نظام واحد عبر خمسة مشغّلين.",
      },
      problem: [
        "SalesPoint منصة واحدة للموزّعين تعمل عليها خمسة مشغّلين اتصالات. يستخدمها الموزّعون يومياً للتحقق من الهوية، وتفعيل الشرائح (المادية وeSIM)، والفوترة، ونقل الملكية، والمحافظ، والعمولات.",
        "يمر كثير من هذه المسارات بموافقات متعددة المراحل حسب الدور. المطلوب: جعلها واضحة بما يكفي للاستخدام اليومي المكثّف.",
        "{{TODO: القيود، مثل التنظيمات والأنظمة القديمة وأنواع أجهزة الموزّعين}}",
      ],
      found: [
        "تختلف قواعد العمل باختلاف الدور والمشغّل، فكان على المسارات أن تحمل هذه القواعد دون أن تُظهرها كتعقيد.",
        "{{TODO: منهج البحث و2–3 ملاحظات حقيقية}}",
      ],
      decisions: [
        { title: "مسار التفعيل", options: "5 مسارات تفعيل متنافسة، اختُبرت جنباً إلى جنب.", chose: "{{TODO: المسار الفائز}}", why: "{{TODO: الدليل الذي حسم القرار}}" },
        { title: "نمط الحد الائتماني", options: "5 أنماط متنافسة للحد الائتماني، اختُبرت جنباً إلى جنب.", chose: "{{TODO: النمط الفائز}}", why: "{{TODO: الدليل الذي حسم القرار}}" },
        { title: "نموذج الترحيل", options: "نموذجان للترحيل، اختُبرا جنباً إلى جنب.", chose: "{{TODO: النموذج الفائز}}", why: "{{TODO: الدليل الذي حسم القرار}}" },
      ],
      solution: "فيما يلي إعادة بناء توضيحية لمسار تفعيل شريحة بمساريه المادي وeSIM. هذا نموذج مبسّط، وليس بيانات حقيقية ولا شاشات الإنتاج.",
      impact: ["يُنجز الموزّعون الآن التحقق من الهوية والتفعيل والفوترة ومهام المحفظة عبر مجموعة مسارات واحدة ومتسقة.", "أُطلق كل مشغّل جديد على النظام المشترك بدل تصميم جديد.", "اختيرت المسارات الأساسية بالاختبار جنباً إلى جنب، لا بالرأي."],
      next: ["{{TODO: ما ستفعله لاحقاً أو ما تعلّمته}}"],
    },
  },
  {
    slug: "salespoint-design-system",
    artifact: "tokens",
    en: {
      title: "SalesPoint design system: one system, five brands",
      tldr: {
        problem: "Five operators needed one dealer platform without five separate designs.",
        role: "Design system owner",
        team: "{{TODO: team size and roles}}",
        timeline: "{{TODO: timeline}}",
        platform: "{{TODO: web}} · Figma + {{TODO: code library}}",
        outcome: "Each new operator launched on existing components instead of a new design.",
      },
      problem: [
        "SalesPoint serves Ooredoo, Awaser, Beyond, STC and Starlink. Each has its own brand, and the product has to work in light and dark, Arabic and English (RTL), with different fonts.",
        "{{TODO: what went wrong before the system, if anything}}",
      ],
      found: ["{{TODO: audit findings, e.g. duplicated components or inconsistent patterns}}"],
      decisions: [
        { title: "Brand switching through tokens", options: "{{TODO: options considered}}", chose: "One shared component set, with themes, fonts, direction and brand all switched by tokens.", why: "{{TODO: why}}" },
        { title: "Governance before the library", options: "{{TODO: options considered}}", chose: "Components are reviewed and approved before they enter the library.", why: "{{TODO: why}}" },
        { title: "RTL and fonts inside the system", options: "{{TODO: options considered}}", chose: "Arabic/English mirroring and multiple fonts are built into the components, not patched per screen.", why: "{{TODO: why}}" },
      ],
      solution: "The diagram below uses this site's own token system, built the same way: primitive values, then semantic roles, then components. Switch the brand skin and watch the values change while the components stay the same.",
      impact: ["Each new operator launched on existing components instead of a new design.", "Themes, languages and brands switch through tokens, so one change reaches every brand.", "Components are reviewed before they enter the library, which keeps the system consistent as it grows."],
      next: ["{{TODO: what you would do next or learned}}"],
    },
    ar: {
      title: "نظام تصميم SalesPoint: نظام واحد وخمس علامات",
      tldr: {
        problem: "احتاج خمسة مشغّلين إلى منصة موزّعين واحدة دون خمسة تصاميم منفصلة.",
        role: "مالك نظام التصميم",
        team: "{{TODO: حجم الفريق وأدواره}}",
        timeline: "{{TODO: المدة}}",
        platform: "{{TODO: ويب}} · Figma + {{TODO: مكتبة الكود}}",
        outcome: "أُطلق كل مشغّل جديد على مكوّنات قائمة بدل تصميم جديد.",
      },
      problem: [
        "تخدم SalesPoint كلاً من Ooredoo وAwaser وBeyond وSTC وStarlink. لكل منها علامتها، ويجب أن يعمل المنتج بالوضعين الفاتح والداكن، وبالعربية والإنجليزية (RTL)، وبخطوط مختلفة.",
        "{{TODO: ما الذي كان يتعثّر قبل النظام، إن وُجد}}",
      ],
      found: ["{{TODO: نتائج التدقيق، مثل مكوّنات مكرّرة أو أنماط غير متسقة}}"],
      decisions: [
        { title: "تبديل العلامة عبر الرموز", options: "{{TODO: الخيارات التي دُرست}}", chose: "مجموعة مكوّنات واحدة، يتبدّل فيها الثيم والخط والاتجاه والعلامة عبر الرموز.", why: "{{TODO: السبب}}" },
        { title: "الحوكمة قبل دخول المكتبة", options: "{{TODO: الخيارات التي دُرست}}", chose: "تُراجَع المكوّنات وتُعتمد قبل دخولها المكتبة.", why: "{{TODO: السبب}}" },
        { title: "RTL والخطوط داخل النظام", options: "{{TODO: الخيارات التي دُرست}}", chose: "عكس الاتجاه بين العربية والإنجليزية وتعدد الخطوط مبنيان في المكوّنات، لا مرقّعان في كل شاشة.", why: "{{TODO: السبب}}" },
      ],
      solution: "يستخدم المخطط أدناه نظام الرموز في هذا الموقع نفسه، وهو مبني بالطريقة ذاتها: قيم أولية، ثم أدوار دلالية، ثم مكوّنات. بدّل علامة السمة وراقب القيم تتغير بينما تبقى المكوّنات كما هي.",
      impact: ["أُطلق كل مشغّل جديد على مكوّنات قائمة بدل تصميم جديد.", "تتبدّل الثيمات واللغات والعلامات عبر الرموز، فيصل أي تعديل إلى كل العلامات.", "تُراجَع المكوّنات قبل دخولها المكتبة، فيبقى النظام متسقاً كلما كبر."],
      next: ["{{TODO: ما ستفعله لاحقاً أو ما تعلّمته}}"],
    },
  },
  {
    slug: "shamat",
    artifact: "reader",
    en: {
      title: "Shamat",
      tldr: {
        problem: "A bilingual Arabic/English app built around a Mushaf needs reading that feels right in both languages.",
        role: "Product designer",
        team: "{{TODO: solo or team}}",
        timeline: "In development",
        platform: "{{TODO: iOS / Android}}",
        outcome: "In development.",
      },
      problem: [
        "Shamat is a bilingual Arabic/English app built around a Mushaf. The reading experience and Arabic typography carry the whole product.",
        "{{TODO: who it is for and why it matters}}",
      ],
      found: ["{{TODO: research, reading habits, insights}}"],
      decisions: [
        { title: "RTL-first, not mirrored", options: "{{TODO: options considered}}", chose: "The product is designed in Arabic first; English adapts to it.", why: "{{TODO: why}}" },
        { title: "Arabic typography", options: "{{TODO: typefaces considered}}", chose: "{{TODO: chosen type and sizing}}", why: "{{TODO: why}}" },
      ],
      solution: "A small reader to try: change size and line spacing, and show or hide the diacritics. The text is Surat Al-Fatiha, verses 1 to 4; please check it against your Mushaf source before launch.",
      impact: ["In development, with the reading experience and Arabic typography at its core."],
      next: ["{{TODO: roadmap}}"],
    },
    ar: {
      title: "شامات",
      tldr: {
        problem: "تطبيق ثنائي اللغة يتمحور حول المصحف يحتاج تجربة قراءة مريحة بالعربية والإنجليزية.",
        role: "مصمم المنتج",
        team: "{{TODO: منفرد أم ضمن فريق}}",
        timeline: "قيد التطوير",
        platform: "{{TODO: iOS / Android}}",
        outcome: "قيد التطوير.",
      },
      problem: [
        "شامات تطبيق ثنائي اللغة بالعربية والإنجليزية يتمحور حول المصحف. تجربة القراءة والخط العربي هما ما يقوم عليه المنتج كله.",
        "{{TODO: لمن هو ولماذا يهم}}",
      ],
      found: ["{{TODO: البحث وعادات القراءة والملاحظات}}"],
      decisions: [
        { title: "RTL أولاً، لا مجرد انعكاس", options: "{{TODO: الخيارات التي دُرست}}", chose: "صُمّم المنتج بالعربية أولاً، وتتكيّف الإنجليزية معه.", why: "{{TODO: السبب}}" },
        { title: "الخط العربي", options: "{{TODO: الخطوط التي دُرست}}", chose: "{{TODO: الخط والأحجام المختارة}}", why: "{{TODO: السبب}}" },
      ],
      solution: "قارئ صغير للتجربة: غيّر الحجم وتباعد الأسطر، وأظهر التشكيل أو أخفِه. النص هو سورة الفاتحة، الآيات من 1 إلى 4؛ يُرجى مطابقته مع مصدر المصحف لديك قبل الإطلاق.",
      impact: ["قيد التطوير، وتجربة القراءة والخط العربي في صميمه."],
      next: ["{{TODO: خارطة الطريق}}"],
    },
  },
  {
    slug: "flowance",
    artifact: "ledger",
    en: {
      title: "Flowance",
      tldr: {
        problem: "Personal finance tracking that people keep using, not abandon after a week.",
        role: "Designer and developer",
        team: "Solo",
        timeline: "{{TODO: timeline}}",
        platform: "{{TODO: web / mobile}} · React",
        outcome: "A complete, working product, designed and built end to end.",
      },
      problem: ["Flowance is a personal finance tracker I designed and built end to end as a real product.", "{{TODO: the problem you saw in existing finance apps}}"],
      found: ["{{TODO: research or self-observation, insights}}"],
      decisions: [
        { title: "Fast entry", options: "{{TODO: options considered}}", chose: "{{TODO: how adding a transaction works}}", why: "{{TODO: why}}" },
        { title: "What the home screen shows", options: "{{TODO: options considered}}", chose: "{{TODO: chosen}}", why: "{{TODO: why}}" },
      ],
      solution: "A tiny rebuild of the add-transaction moment. Add an income or expense and watch the balance update. Illustrative data only, kept in your browser.",
      impact: ["A complete, working product, designed and built by one person.", "Proof of my design-to-code range: every screen exists as working code, not only in Figma."],
      next: ["{{TODO: what you would do next or learned}}"],
    },
    ar: {
      title: "Flowance",
      tldr: {
        problem: "تتبّع مالي شخصي يستمر الناس في استخدامه بدل هجره بعد أسبوع.",
        role: "مصمم ومطوّر",
        team: "منفرد",
        timeline: "{{TODO: المدة}}",
        platform: "{{TODO: ويب / جوال}} · React",
        outcome: "منتج متكامل يعمل، صُمّم وبُني من الفكرة حتى الإطلاق.",
      },
      problem: ["Flowance متتبّع للمالية الشخصية صمّمته وبنيته من الفكرة حتى الإطلاق كمنتج حقيقي.", "{{TODO: المشكلة التي رأيتها في تطبيقات المالية الحالية}}"],
      found: ["{{TODO: بحث أو ملاحظة ذاتية، وأبرز الملاحظات}}"],
      decisions: [
        { title: "إدخال سريع", options: "{{TODO: الخيارات التي دُرست}}", chose: "{{TODO: كيف تتم إضافة معاملة}}", why: "{{TODO: السبب}}" },
        { title: "ما تعرضه الشاشة الرئيسية", options: "{{TODO: الخيارات التي دُرست}}", chose: "{{TODO: المختار}}", why: "{{TODO: السبب}}" },
      ],
      solution: "إعادة بناء صغيرة للحظة إضافة معاملة. أضف دخلاً أو مصروفاً وراقب الرصيد يتحدّث. بيانات توضيحية فقط، تبقى في متصفحك.",
      impact: ["منتج متكامل يعمل، صمّمه وبناه شخص واحد.", "دليل على قدرتي من التصميم إلى الكود: كل شاشة موجودة ككود يعمل، لا في Figma فقط."],
      next: ["{{TODO: ما ستفعله لاحقاً أو ما تعلّمته}}"],
    },
  },
];
