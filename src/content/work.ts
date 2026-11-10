import type { Locale } from "@/lib/i18n";

// Case-study copy (EN + AR). Written from Hamza's own description of the work; no invented metrics.
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
      title: "Telecom dealer platform for five operators",
      tldr: {
        problem: "Dealers for Ooredoo, stc, Omantel, Awasr and Beyond ONE run complex telecom operations all day, at high volume.",
        role: "UX lead and design system owner",
        team: "Product owner, business analysts, the design team I lead, front-end, back-end and QA",
        timeline: "2022 – today, shipping in releases",
        platform: "Web (responsive) and mobile app · 200+ screens",
        outcome: "Complex telecom operations, including a full commission engine, turned into clear daily flows on one shared system.",
      },
      problem: [
        "SalesPoint (the product's internal name) is the platform dealers of five telecom operators use every day: KYC and identity checks, SIM activation (physical and eSIM), billing, ownership transfer, wallets, and the commission engine that pays them.",
        "Many of these flows go through multi-stage, role-based approvals, and every operator has its own rules. The job: make all of it clear enough for people who do it hundreds of times a day, often at a busy counter with a customer waiting.",
        "Constraints: telecom regulation and KYC rules, existing back-end systems we had to design around, and dealers on everything from desktop browsers to mid-range phones.",
      ],
      found: [
        "Business rules change by role and by operator, so the flows had to carry those rules without showing them as complexity.",
        "I ran the discovery directly with the business: workshops and client meetings with each operator, walk-throughs of the existing processes, and requirements I wrote and agreed with them before any screen was drawn.",
        "Three things stood out: dealers lose the most time on re-entering data after a rejection, commissions were the most disputed area because dealers couldn't see how they were calculated, and approval steps were invisible, so dealers didn't know who was holding a request.",
      ],
      decisions: [
        {
          title: "Activation flow",
          options: "Five competing activation flows, tested side by side: from one long form to fully separate physical and eSIM paths.",
          chose: "One guided stepper that asks physical or eSIM first, then only shows the steps that apply, with the customer's data carried forward.",
          why: "In side-by-side reviews with operators and dealers it had the fewest back-steps and the fewest 'what do I do now?' moments, and it kept one mental model for both SIM types.",
        },
        {
          title: "Commission engine",
          options: "A plain statement table, a dashboard of totals, or a breakdown that explains each payout.",
          chose: "A breakdown view: every commission shows the rule that produced it, the sale it came from and its approval status.",
          why: "Commission disputes came from not understanding the numbers. Showing the 'why' next to each amount answered most questions before they reached support.",
        },
        {
          title: "Approvals and credit limits",
          options: "Five credit-limit patterns and two migration models, tested side by side.",
          chose: "A visible approval timeline on every request (who has it, what's next), and credit limits shown as a live meter at the point of sale.",
          why: "Dealers and supervisors could see status without calling anyone, and the meter prevented sales that would have been rejected later.",
        },
      ],
      solution: "Below is an illustrative rebuild of the SIM activation flow with the physical and eSIM paths. It is a simplified demo, not real data or the production screens.",
      impact: [
        "Dealers complete KYC, activation, billing, wallet and commission tasks through one consistent set of flows.",
        "Every new operator launched on the shared system instead of a new design.",
        "Key flows were chosen through side-by-side testing with the business, not opinion, and I followed each release with client feedback sessions to check the flows worked for real users.",
      ],
      next: [
        "Instrument the main flows with analytics so improvements can be measured release by release.",
        "Bring dealers into regular usability sessions, not only operator stakeholders.",
      ],
    },
    ar: {
      title: "منصة موزّعين لخمس شركات اتصالات",
      tldr: {
        problem: "يُنجز موزّعو Ooredoo وstc وOmantel وAwasr وBeyond ONE عمليات اتصالات معقّدة طوال اليوم وبحجم كبير.",
        role: "قيادة تجربة المستخدم ومالك نظام التصميم",
        team: "مالك المنتج، ومحللو الأعمال، وفريق التصميم الذي أقوده، وفرق الواجهة الأمامية والخلفية والجودة",
        timeline: "من 2022 حتى اليوم، بإصدارات متتالية",
        platform: "ويب متجاوب وتطبيق جوال · أكثر من 200 شاشة",
        outcome: "عمليات اتصالات معقّدة، منها محرّك عمولات كامل، تحولت إلى مسارات يومية واضحة على نظام واحد مشترك.",
      },
      problem: [
        "SalesPoint (الاسم الداخلي للمنتج) هي المنصة التي يستخدمها موزّعو خمس شركات اتصالات يومياً: التحقق من الهوية، وتفعيل الشرائح (المادية وeSIM)، والفوترة، ونقل الملكية، والمحافظ، ومحرّك العمولات الذي يحسب مستحقاتهم.",
        "تمر كثير من هذه المسارات بموافقات متعددة المراحل حسب الدور، ولكل شركة قواعدها. المطلوب: جعل كل ذلك واضحاً لأشخاص يكررونه مئات المرات يومياً، غالباً على كاونتر مزدحم والعميل ينتظر.",
        "القيود: تنظيمات الاتصالات وقواعد التحقق من الهوية، وأنظمة خلفية قائمة صمّمنا حولها، وموزّعون يعملون من متصفحات الكمبيوتر حتى الهواتف المتوسطة.",
      ],
      found: [
        "تختلف قواعد العمل باختلاف الدور والشركة، فكان على المسارات أن تحمل هذه القواعد دون أن تُظهرها كتعقيد.",
        "أدرت مرحلة الاكتشاف مباشرة مع العميل: ورش عمل واجتماعات مع كل شركة، ومراجعة العمليات القائمة خطوة بخطوة، ومتطلبات كتبتها واتفقنا عليها قبل رسم أي شاشة.",
        "برزت ثلاث نقاط: أكثر وقت يضيع في إعادة إدخال البيانات بعد الرفض، والعمولات أكثر منطقة عليها اعتراضات لأن الموزّع لا يرى كيف حُسبت، وخطوات الموافقة كانت غير ظاهرة فلا يعرف الموزّع عند من يقف طلبه.",
      ],
      decisions: [
        {
          title: "مسار التفعيل",
          options: "خمسة مسارات تفعيل متنافسة اختُبرت جنباً إلى جنب: من نموذج طويل واحد إلى مسارين منفصلين تماماً للشريحة المادية وeSIM.",
          chose: "خطوات موجَّهة تسأل أولاً: شريحة مادية أم eSIM، ثم تعرض الخطوات المناسبة فقط، مع نقل بيانات العميل تلقائياً.",
          why: "في المراجعات مع الشركات والموزّعين كان الأقل رجوعاً للخلف والأقل لحظات «شو أعمل هلق؟»، وأبقى منطقاً واحداً لنوعي الشريحة.",
        },
        {
          title: "محرّك العمولات",
          options: "جدول كشف بسيط، أو لوحة مجاميع، أو تفصيل يشرح كل مبلغ.",
          chose: "عرض تفصيلي: كل عمولة تُظهر القاعدة التي ولّدتها، والعملية التي جاءت منها، وحالة اعتمادها.",
          why: "الاعتراضات على العمولات كانت سببها عدم فهم الأرقام. إظهار «السبب» بجانب كل مبلغ أجاب عن أغلب الأسئلة قبل أن تصل للدعم.",
        },
        {
          title: "الموافقات والحدود الائتمانية",
          options: "خمسة أنماط للحد الائتماني ونموذجان للترحيل، اختُبرت جنباً إلى جنب.",
          chose: "خط زمني ظاهر للموافقة على كل طلب (عند من، وما الخطوة التالية)، والحد الائتماني كمؤشر حي في لحظة البيع.",
          why: "صار الموزّع والمشرف يريان الحالة دون اتصال بأحد، ومنع المؤشر عمليات بيع كانت سترفض لاحقاً.",
        },
      ],
      solution: "فيما يلي إعادة بناء توضيحية لمسار تفعيل شريحة بمساريه المادي وeSIM. هذا نموذج مبسّط، وليس بيانات حقيقية ولا شاشات الإنتاج.",
      impact: [
        "يُنجز الموزّعون التحقق من الهوية والتفعيل والفوترة والمحافظ والعمولات عبر مجموعة مسارات واحدة ومتسقة.",
        "أُطلقت كل شركة جديدة على النظام المشترك بدل تصميم جديد.",
        "اختيرت المسارات الأساسية بالاختبار جنباً إلى جنب مع العميل لا بالرأي، وتابعت كل إصدار بجلسات ملاحظات مع العميل للتأكد أن المسارات تعمل للمستخدمين الحقيقيين.",
      ],
      next: ["إضافة قياس للاستخدام على المسارات الأساسية حتى يُقاس كل تحسين من إصدار لإصدار.", "إشراك الموزّعين أنفسهم في جلسات اختبار دورية، لا ممثلي الشركات فقط."],
    },
  },
  {
    slug: "salespoint-design-system",
    artifact: "tokens",
    en: {
      title: "Multi-brand design system: brands, modes and languages in one app",
      tldr: {
        problem: "One product had to look native for every brand, in light and dark, Arabic and English, with different fonts, without separate designs.",
        role: "Design system owner and design team lead",
        team: "The design team I lead, with front-end engineers implementing the tokens and components",
        timeline: "2022 – today, evolving with each release",
        platform: "Figma library with tokens · web and mobile components",
        outcome: "Each new operator and brand launched on existing components instead of a new design.",
      },
      problem: [
        "The platform serves Ooredoo, Awasr, Beyond ONE, stc and Omantel. Beyond ONE alone runs two brands, FRiENDi mobile and Virgin Mobile, on the same app, each with its own colours and fonts.",
        "Every screen had to work in light and dark, Arabic and English (RTL), with different type families per brand. Designing each combination by hand would have meant dozens of versions of every screen.",
      ],
      found: [
        "An audit of the existing screens showed the same components rebuilt with small differences per brand, colours hard-coded inside components, and RTL fixed screen by screen instead of in the system.",
        "Engineers were re-implementing the same patterns for each brand because there was no single source of truth they could trust.",
      ],
      decisions: [
        {
          title: "Brand switching through tokens",
          options: "A separate Figma library per brand, a shared library with per-brand overrides, or one component set driven entirely by tokens.",
          chose: "One shared component set, with theme, brand, font and direction all switched by tokens.",
          why: "It's the only option where one fix reaches every brand at once, and it matches how engineers build themes in code.",
        },
        {
          title: "Governance before the library",
          options: "Open contribution, a single gatekeeper, or a review step with clear acceptance criteria.",
          chose: "Components are reviewed and approved against written criteria before they enter the library.",
          why: "As more designers contributed, review kept the system consistent without slowing the team down, and gave engineers confidence that what's in the library is final.",
        },
        {
          title: "RTL and fonts inside the system",
          options: "Mirror screens at the end, maintain separate Arabic files, or build direction and type into the components.",
          chose: "Arabic/English mirroring and per-brand fonts are built into the components, not patched per screen.",
          why: "Arabic stops being an afterthought: every new screen is right in both languages from the first draft.",
        },
      ],
      solution: "The diagram below uses this site's own token system, built the same way: primitive values, then semantic roles, then components. Switch the brand skin and watch the values change while the components stay the same.",
      impact: [
        "Each new operator and brand launched on existing components instead of a new design.",
        "Themes, languages, fonts and brands switch through tokens, so one change reaches every brand.",
        "Components are reviewed before they enter the library, which keeps the system consistent as the team grows.",
      ],
      next: ["Publish the tokens as a shared package so design and code update from one source automatically.", "Add usage documentation and do's and don'ts for each component, for new designers joining the team."],
    },
    ar: {
      title: "نظام تصميم متعدد العلامات: علامات ووضعان ولغتان في تطبيق واحد",
      tldr: {
        problem: "كان على منتج واحد أن يبدو أصيلاً لكل علامة، بالوضعين الفاتح والداكن، وبالعربية والإنجليزية، وبخطوط مختلفة، دون تصاميم منفصلة.",
        role: "مالك نظام التصميم وقائد فريق التصميم",
        team: "فريق التصميم الذي أقوده، مع مطوري الواجهة الذين نفّذوا الرموز والمكوّنات",
        timeline: "من 2022 حتى اليوم، يتطور مع كل إصدار",
        platform: "مكتبة Figma برموز التصميم · مكوّنات للويب والجوال",
        outcome: "أُطلقت كل شركة وعلامة جديدة على مكوّنات قائمة بدل تصميم جديد.",
      },
      problem: [
        "تخدم المنصة Ooredoo وAwasr وBeyond ONE وstc وOmantel. وBeyond ONE وحدها تشغّل علامتين، FRiENDi mobile وVirgin Mobile، على التطبيق نفسه، لكل منهما ألوانها وخطوطها.",
        "كان على كل شاشة أن تعمل بالوضعين الفاتح والداكن، وبالعربية والإنجليزية (RTL)، وبعائلة خطوط مختلفة لكل علامة. تصميم كل تركيبة يدوياً كان يعني عشرات النسخ من كل شاشة.",
      ],
      found: [
        "أظهر تدقيق الشاشات القائمة المكوّنات نفسها مُعاد بناؤها بفروقات صغيرة لكل علامة، وألواناً مثبّتة داخل المكوّنات، واتجاه RTL يُصلَح شاشة بشاشة بدل أن يكون في النظام.",
        "كان المطوّرون يعيدون بناء الأنماط نفسها لكل علامة، لأنه لا يوجد مصدر واحد موثوق يعتمدون عليه.",
      ],
      decisions: [
        {
          title: "تبديل العلامة عبر الرموز",
          options: "مكتبة Figma منفصلة لكل علامة، أو مكتبة مشتركة مع تعديلات لكل علامة، أو مجموعة مكوّنات واحدة تحرّكها الرموز بالكامل.",
          chose: "مجموعة مكوّنات واحدة، يتبدّل فيها الثيم والعلامة والخط والاتجاه عبر الرموز.",
          why: "هو الخيار الوحيد الذي يصل فيه أي إصلاح إلى كل العلامات دفعة واحدة، ويطابق طريقة بناء المطوّرين للثيمات في الكود.",
        },
        {
          title: "الحوكمة قبل دخول المكتبة",
          options: "مساهمة مفتوحة، أو شخص واحد يقرر، أو خطوة مراجعة بمعايير قبول واضحة.",
          chose: "تُراجَع المكوّنات وتُعتمد وفق معايير مكتوبة قبل دخولها المكتبة.",
          why: "مع زيادة عدد المصممين، حافظت المراجعة على اتساق النظام دون إبطاء الفريق، وأعطت المطوّرين ثقة بأن ما في المكتبة نهائي.",
        },
        {
          title: "RTL والخطوط داخل النظام",
          options: "عكس الشاشات في النهاية، أو ملفات عربية منفصلة، أو بناء الاتجاه والخط داخل المكوّنات.",
          chose: "عكس الاتجاه بين العربية والإنجليزية وخطوط كل علامة مبنية في المكوّنات، لا مرقّعة في كل شاشة.",
          why: "لم تعد العربية فكرة لاحقة: كل شاشة جديدة صحيحة باللغتين من أول مسودة.",
        },
      ],
      solution: "يستخدم المخطط أدناه نظام الرموز في هذا الموقع نفسه، وهو مبني بالطريقة ذاتها: قيم أولية، ثم أدوار دلالية، ثم مكوّنات. بدّل علامة السمة وراقب القيم تتغير بينما تبقى المكوّنات كما هي.",
      impact: [
        "أُطلقت كل شركة وعلامة جديدة على مكوّنات قائمة بدل تصميم جديد.",
        "تتبدّل الثيمات واللغات والخطوط والعلامات عبر الرموز، فيصل أي تعديل إلى كل العلامات.",
        "تُراجَع المكوّنات قبل دخولها المكتبة، فيبقى النظام متسقاً كلما كبر الفريق.",
      ],
      next: ["نشر الرموز كحزمة مشتركة حتى يتحدّث التصميم والكود من مصدر واحد تلقائياً.", "إضافة توثيق استخدام وأمثلة «افعل ولا تفعل» لكل مكوّن، للمصممين الجدد في الفريق."],
    },
  },
  {
    slug: "shamat",
    artifact: "reader",
    en: {
      title: "Shamat: Quran reading, website and app",
      tldr: {
        problem: "A bilingual Arabic/English Quran (Mushaf) product needs reading that feels right in both languages, on the web and on the phone.",
        role: "Product designer and front-end developer",
        team: "Solo: design, front end and release",
        timeline: "Website redesigned and live; mobile app built from zero",
        platform: "Website (React) · iOS and Android app (React Native)",
        outcome: "A calm, Arabic-first reading experience, redesigned on the web and rebuilt from zero as a mobile app.",
      },
      problem: [
        "Shamat is a bilingual Arabic/English product built around the Mushaf. The reading experience and Arabic typography carry the whole product.",
        "It's for people who read daily, often in short moments: on the commute, between prayers, before sleep. They need to find their place instantly and read comfortably for a long time, in Arabic or with English beside it.",
      ],
      found: [
        "Reading comfort comes from type size, line spacing and contrast more than from features. Most apps add features and make the page busier.",
        "People rarely read from the beginning; they continue from where they stopped, so 'continue reading' matters more than any menu.",
        "Many Arabic apps are designed in English and mirrored at the end, and it shows in alignment, numerals and punctuation.",
      ],
      decisions: [
        {
          title: "RTL-first, not mirrored",
          options: "Design in English and mirror, design two separate layouts, or design in Arabic first and adapt English to it.",
          chose: "The product is designed in Arabic first; English adapts to it.",
          why: "The Quran text is Arabic, so the reading layout has to be right in Arabic before anything else.",
        },
        {
          title: "Arabic typography",
          options: "A system Arabic font, a general Naskh text face, or a dedicated Quran typeface.",
          chose: "A dedicated Quran typeface for the text, a clean Arabic UI font for the interface, and reader controls for size, spacing and diacritics.",
          why: "The Quran face respects the script and diacritics; separating it from the UI font keeps menus readable, and the controls let each reader set their own comfort.",
        },
      ],
      solution: "A small reader to try: change size and line spacing, and show or hide the diacritics. The text is Surat Al-Fatiha, verses 1 to 4.",
      impact: [
        "A calm, distraction-free reading experience with Arabic typography at its core.",
        "Shipped twice: the website redesigned end to end, and the mobile app built from zero, both with front-end code I wrote.",
      ],
      next: ["Bookmarks and reading streaks synced between the website and the app.", "Audio recitation with verse-by-verse highlighting."],
    },
    ar: {
      title: "شامات: قراءة القرآن، موقعاً وتطبيقاً",
      tldr: {
        problem: "منتج قرآني ثنائي اللغة يحتاج تجربة قراءة مريحة بالعربية والإنجليزية، على الويب وعلى الجوال.",
        role: "مصمم المنتج ومطوّر الواجهة الأمامية",
        team: "منفرد: التصميم والواجهة الأمامية والإطلاق",
        timeline: "الموقع أعيد تصميمه وهو شغّال؛ التطبيق بُني من الصفر",
        platform: "موقع (React) · تطبيق iOS وAndroid (React Native)",
        outcome: "تجربة قراءة هادئة تبدأ بالعربية، أعيد تصميمها على الويب وبُنيت من الصفر كتطبيق جوال.",
      },
      problem: [
        "شامات منتج ثنائي اللغة بالعربية والإنجليزية يتمحور حول المصحف. تجربة القراءة والخط العربي هما ما يقوم عليه المنتج كله.",
        "هو لمن يقرأ يومياً، غالباً في لحظات قصيرة: في الطريق، بين الصلوات، قبل النوم. يحتاجون أن يجدوا مكانهم فوراً ويقرؤوا براحة لوقت طويل، بالعربية أو مع الإنجليزية بجانبها.",
      ],
      found: [
        "راحة القراءة تأتي من حجم الخط وتباعد الأسطر والتباين أكثر من الميزات. أغلب التطبيقات تضيف ميزات فتزدحم الصفحة.",
        "نادراً ما يقرأ الناس من البداية؛ يكملون من حيث توقفوا، فـ«متابعة القراءة» أهم من أي قائمة.",
        "كثير من التطبيقات العربية تُصمَّم بالإنجليزية وتُعكس في النهاية، ويظهر ذلك في المحاذاة والأرقام وعلامات الترقيم.",
      ],
      decisions: [
        {
          title: "RTL أولاً، لا مجرد انعكاس",
          options: "التصميم بالإنجليزية ثم العكس، أو تصميمان منفصلان، أو التصميم بالعربية أولاً وتكييف الإنجليزية معه.",
          chose: "صُمّم المنتج بالعربية أولاً، وتتكيّف الإنجليزية معه.",
          why: "نص القرآن عربي، فلا بد أن تكون صفحة القراءة صحيحة بالعربية قبل أي شيء.",
        },
        {
          title: "الخط العربي",
          options: "خط النظام العربي، أو خط نسخ عام، أو خط مخصص للمصحف.",
          chose: "خط مخصص للمصحف للنص، وخط عربي واضح للواجهة، وأدوات للقارئ للحجم والتباعد والتشكيل.",
          why: "خط المصحف يحترم الرسم والتشكيل؛ وفصله عن خط الواجهة يُبقي القوائم واضحة، والأدوات تترك لكل قارئ راحته.",
        },
      ],
      solution: "قارئ صغير للتجربة: غيّر الحجم وتباعد الأسطر، وأظهر التشكيل أو أخفِه. النص هو سورة الفاتحة، الآيات من 1 إلى 4.",
      impact: ["تجربة قراءة هادئة بلا مشتتات، والخط العربي في صميمها.", "أُطلق مرتين: الموقع أعيد تصميمه بالكامل، والتطبيق بُني من الصفر، وكلاهما بكود واجهة كتبته بنفسي."],
      next: ["حفظ العلامات وسلسلة القراءة مع مزامنة بين الموقع والتطبيق.", "تلاوة صوتية مع تظليل الآية التي تُقرأ."],
    },
  },
  {
    slug: "flowance",
    artifact: "ledger",
    en: {
      title: "Flowance: personal finance, designed and built",
      tldr: {
        problem: "Personal finance tracking that people keep using, not abandon after a week.",
        role: "Designer and developer",
        team: "Solo",
        timeline: "Idea to working product, built from zero",
        platform: "Web app · React",
        outcome: "A complete, working product, designed and built end to end.",
      },
      problem: [
        "Flowance is a personal finance tracker I designed and built end to end as a real product.",
        "Most finance apps fail in the same place: adding a transaction takes too long, so people stop after a few days and the data becomes useless.",
      ],
      found: [
        "Tracking only survives if adding a transaction takes a few seconds; every extra field costs users.",
        "People want one answer when they open the app, 'how much do I have left?', not a page of charts.",
      ],
      decisions: [
        {
          title: "Fast entry",
          options: "A full form with every field, a multi-step wizard, or one line with smart defaults.",
          chose: "One quick entry: amount first, income or expense as a single toggle, category as one tap, date defaults to today.",
          why: "It cuts adding a transaction to a couple of taps, which is what keeps people tracking after the first week.",
        },
        {
          title: "What the home screen shows",
          options: "A dashboard of charts, a transaction list, or one clear balance with recent activity.",
          chose: "One clear 'left this month' balance at the top, recent transactions under it, charts one tap away.",
          why: "It answers the question people open the app for, in one glance, and keeps detail for when they want it.",
        },
      ],
      solution: "A tiny rebuild of the add-transaction moment. Add an income or expense and watch the balance update. Illustrative data only, kept in your browser.",
      impact: ["A complete, working product, designed and built by one person.", "Proof of my design-to-code range: every screen exists as working code, not only in Figma."],
      next: ["Monthly budgets per category with gentle alerts.", "Recurring transactions and a simple export for accountants."],
    },
    ar: {
      title: "Flowance: إدارة المالية الشخصية، تصميماً وبناءً",
      tldr: {
        problem: "تتبّع مالي شخصي يستمر الناس في استخدامه بدل هجره بعد أسبوع.",
        role: "مصمم ومطوّر",
        team: "منفرد",
        timeline: "من الفكرة إلى منتج يعمل، مبني من الصفر",
        platform: "تطبيق ويب · React",
        outcome: "منتج متكامل يعمل، صُمّم وبُني من الفكرة حتى الإطلاق.",
      },
      problem: [
        "Flowance متتبّع للمالية الشخصية صمّمته وبنيته من الفكرة حتى الإطلاق كمنتج حقيقي.",
        "أغلب تطبيقات المالية تفشل في المكان نفسه: إضافة معاملة تأخذ وقتاً طويلاً، فيتوقف الناس بعد أيام وتصبح البيانات بلا فائدة.",
      ],
      found: ["التتبّع يستمر فقط إذا كانت إضافة المعاملة تأخذ ثوانٍ؛ كل حقل إضافي يخسّرك مستخدمين.", "يريد الناس جواباً واحداً عند فتح التطبيق: «كم بقي معي؟»، لا صفحة مليئة بالرسوم البيانية."],
      decisions: [
        {
          title: "إدخال سريع",
          options: "نموذج كامل بكل الحقول، أو معالج من عدة خطوات، أو سطر واحد بقيم افتراضية ذكية.",
          chose: "إدخال سريع واحد: المبلغ أولاً، ودخل أو مصروف بزر واحد، والفئة بلمسة، والتاريخ افتراضياً اليوم.",
          why: "يختصر إضافة المعاملة إلى لمستين تقريباً، وهذا ما يُبقي الناس على التتبّع بعد الأسبوع الأول.",
        },
        {
          title: "ما تعرضه الشاشة الرئيسية",
          options: "لوحة رسوم بيانية، أو قائمة معاملات، أو رصيد واحد واضح مع آخر الحركات.",
          chose: "رصيد «المتبقي هذا الشهر» واضح في الأعلى، وآخر المعاملات تحته، والرسوم البيانية على بُعد لمسة.",
          why: "يجيب عن السؤال الذي يفتح الناس التطبيق لأجله بنظرة واحدة، ويترك التفاصيل لمن يريدها.",
        },
      ],
      solution: "إعادة بناء صغيرة للحظة إضافة معاملة. أضف دخلاً أو مصروفاً وراقب الرصيد يتحدّث. بيانات توضيحية فقط، تبقى في متصفحك.",
      impact: ["منتج متكامل يعمل، صمّمه وبناه شخص واحد.", "دليل على قدرتي من التصميم إلى الكود: كل شاشة موجودة ككود يعمل، لا في Figma فقط."],
      next: ["ميزانيات شهرية لكل فئة مع تنبيهات لطيفة.", "معاملات متكررة وتصدير بسيط للمحاسب."],
    },
  },
];
