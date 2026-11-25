// =============================================================================
// MACPL site content. Plain text only (HTML is escaped by the templates).
// Edit here, then run `node _src/build.mjs` to regenerate the .html pages.
// Style: sentence case; card descriptions ≤ 15 words; section intros one line.
// =============================================================================

// ---- Capabilities (homepage preview + capabilities.html) ---------------------
// Images: tube bending, heat treatment and plasma cutting are stills from the hero video;
// welding (burak kose / Unsplash) and casting (Provincial Archives of Alberta / Wikimedia Commons) are stock.
// TODO: replace stock photos with MACPL plant photography; confirm specs with MACPL engineering.
export const capabilities = [
  {
    id: 'tube-bending', n: '01', title: 'Tube bending', meta: 'CNC cold and robotic hot bending',
    img: 'assets/img/capabilities/tube-bending.jpg', alt: 'Robot loading a red-hot tube into a bending press',
    short: 'Cold and hot bending on CNC and robotic lines, with induction heating.',
    chips: ['CNC cold bending', 'Robotic hot bending', 'Induction heating'],
    statLabel: 'Capacity', stat: '2,000+ parts a day, cold and hot',
    long: 'Induction heaters and hydraulic presses work as one multi-machine cell. Robots handle every part, from raw tube to finished tray.',
    specs: ['CNC cold bending', 'Robotic hot bending with induction heating', 'Hydraulic forming presses', 'Robotic handling, raw tube to tray']
  },
  {
    id: 'welding', n: '02', title: 'Welding and fabrication', meta: 'Two-stage welding of heavy fabrications',
    img: 'assets/img/capabilities/welding.jpg', alt: 'Welder at work with sparks flying',
    short: 'Trained welders and robotic cells produce consistent, reliable joints on heavy fabrications.',
    chips: ['Tack welding', 'Full welding', 'Overhead conveyors'],
    statLabel: 'Training', stat: 'In-house Welding Training Centre',
    long: 'Heavy fabrications are welded in two stages. Child parts are tack-welded to the main component first, which simplifies full welding. Overhead conveyors keep material moving.',
    specs: ['Tack, then full welding', 'Robotic welding cells', 'Overhead material conveyors', 'In-house Welding Training Centre']
  },
  {
    id: 'heat-treatment', n: '03', title: 'Heat treatment', meta: 'Furnaces designed and built in-house',
    img: 'assets/img/capabilities/heat-treatment.jpg', alt: 'Bent tubes on a rack leaving a glowing furnace',
    short: 'In-house furnaces deliver the required microstructure under tightly controlled parameters.',
    chips: ['Stress relieving', 'Normalising', 'In-house furnaces'],
    statLabel: 'Furnaces', stat: 'Designed and built in-house',
    long: 'Heat treatment follows welding to relieve stress and restore strength. Because we build our own furnaces, we monitor and correct process parameters quickly.',
    specs: ['Stress relieving', 'Normalising', 'In-house furnace design and build', 'Close control of process parameters']
  },
  {
    id: 'casting', n: '04', title: 'Aluminium gravity die casting', meta: 'Nearly 20 years of die casting',
    img: 'assets/img/capabilities/casting.jpg', alt: 'Foundry workers pouring molten metal',
    short: 'Gravity die castings from in-house alloy, with strict control for zero blow holes.',
    chips: ['Gravity die', 'In-house alloy', 'Zero blow holes'],
    statLabel: 'Experience', stat: 'Nearly 20 years of die casting',
    long: 'We cast aluminium components across a wide size range. Alloy is prepared in-house, which lowers material cost and keeps its chemistry under our control.',
    specs: ['Gravity die casting, wide size range', 'Alloy prepared in-house', 'Process control for zero blow holes', 'Nearly 20 years of experience']
  },
  {
    id: 'plasma-cutting', n: '05', title: 'Plasma and gas cutting', meta: 'Profile cutting for fabricated parts',
    img: 'assets/img/capabilities/plasma-cutting.jpg', alt: 'Plasma torch cutting a steel plate',
    short: 'Plasma and gas profile cutting for accurate plate blanks.',
    chips: ['Plasma cutting', 'Gas cutting', 'Profile blanks'],
    statLabel: 'In-house', stat: 'Blanks feed our own fabrication lines',
    long: 'Plate for heavy fabrications is profile-cut on plasma and gas machines. Cutting in-house keeps blank quality, lead time and material use under our control.',
    specs: ['Plasma profile cutting', 'Gas cutting for thick plate', 'Blanks for earth-moving fabrications', 'Direct feed to welding lines']
  },
  {
    id: 'assembly', n: '06', title: 'Components and assemblies', meta: 'From child parts to full assemblies',
    img: 'assets/img/capabilities/assembly.jpg', alt: 'Telescopic suspension fork assembly made by MACPL',
    short: 'Steering, suspension and chassis assemblies built from our own child parts.',
    chips: ['Steering columns', 'Suspension forks', 'Chassis frames'],
    statLabel: 'Scope', stat: 'Child parts to finished assemblies',
    long: 'We supply finished assemblies: steering columns and suspension forks for two- and three-wheelers, front axles for tractors and chassis frames for earth-moving equipment.',
    specs: ['Steering column assemblies', 'Telescopic suspension forks, including EV', 'Under-bracket and front fork assemblies', 'Front axle and chassis frame assemblies']
  }
];

// ---- Products ---------------------------------------------------------------
export const productCategories = [
  { id: 'agri', n: '01', title: 'Agriculture', desc: 'Front axle assemblies for tractors.', img: 'p01-front-axle-tractor.jpg' },
  { id: 'earth', n: '02', title: 'Earth moving', desc: 'Bucket links, dozer blades, engine frames, link arms, chassis frames and star plates.', img: 'p03-dozer-blade.jpg' },
  { id: '3w', n: '03', title: '3 wheelers', desc: 'Front forks, steering columns and EV suspension forks.', img: 'p11-steering-column-3w-cargo.jpg' },
  { id: '2w', n: '04', title: '2 wheelers & EV', desc: 'Under-bracket assemblies and EV suspension forks.', img: 'p18-suspension-fork-2w-ev-disc.jpg' }
];

// TODO: confirm product names and one-line descriptions with MACPL.
export const products = [
  ['agri', 'Front axle assembly for tractors', 'Front axle assembly for agricultural tractors.', 'p01-front-axle-tractor.jpg'],
  ['earth', 'Bucket link for excavators', 'Heavy fabricated link for the bucket linkage.', 'p02-bucket-link.jpg'],
  ['earth', 'Dozer blade for excavators', 'Fabricated dozer blade for excavators.', 'p03-dozer-blade.jpg'],
  ['earth', 'Engine frame for excavators', 'Welded frame carrying the excavator engine.', 'p04-engine-frame.jpg'],
  ['earth', 'Link', 'Fabricated link for earth-moving equipment.', 'p05-link.jpg'],
  ['earth', 'Link arm for excavators', 'Heavy-duty fabricated link arm, type A.', 'p06-link-arm-a.jpg'],
  ['earth', 'Link arm for excavators', 'Heavy-duty fabricated link arm, type B.', 'p07-link-arm-b.jpg'],
  ['earth', 'Rear chassis frame for vibrating compactor', 'Welded rear chassis frame for vibrating compactors.', 'p08-rear-chassis-frame.jpg'],
  ['earth', 'Star plate for crawler frames', 'Profile-cut plate for crawler frames.', 'p09-star-plate.jpg'],
  ['3w', 'Front fork for 3-wheel cargo vehicle', 'Front fork for three-wheel cargo vehicles.', 'p10-front-fork-3w-cargo.jpg'],
  ['3w', 'Steering column for 3-wheel cargo vehicle', 'Steering column for three-wheel cargo vehicles.', 'p11-steering-column-3w-cargo.jpg'],
  ['3w', 'Steering column for 3-wheel passenger vehicle', 'Steering column for passenger three-wheelers, type A.', 'p12-steering-column-3w-passenger-a.jpg'],
  ['3w', 'Steering column for 3-wheel passenger vehicle', 'Steering column for passenger three-wheelers, type B.', 'p13-steering-column-3w-passenger-b.jpg'],
  ['3w', 'Telescopic suspension fork, 3-wheeler EV', '700 kg transport payload, Ø 41 mm.', 'p14-suspension-fork-3w-ev-41.jpg'],
  ['3w', 'Telescopic suspension fork, 3-wheeler EV', '680 kg transport payload, Ø 30 mm.', 'p15-suspension-fork-3w-ev-30.jpg'],
  ['2w', 'Under-bracket assembly, front suspension fork', 'Powder-coated, for motorcycles, type A.', 'p16-underbracket-a.jpg'],
  ['2w', 'Under-bracket assembly, front suspension fork', 'Powder-coated, for motorcycles, type B.', 'p17-underbracket-b.jpg'],
  ['2w', 'Telescopic suspension fork, 2-wheeler EV', 'Ø 30 mm, disc-brake assembly.', 'p18-suspension-fork-2w-ev-disc.jpg'],
  ['2w', 'Telescopic suspension fork, 2-wheeler EV', 'Ø 30 mm, drum-brake assembly.', 'p19-suspension-fork-2w-ev-drum.jpg']
].map(([cat, name, desc, img], i) => ({ cat, name, desc, img, code: 'P-' + String(i + 1).padStart(2, '0') }));

// ---- News (the homepage shows the first three) --------------------------------
// Six stories keep every grid row full (3 per row; 2 per filter).
export const newsCategories = [
  { id: 'certifications', label: 'Certifications' },
  { id: 'events', label: 'Events' },
  { id: 'csr', label: 'CSR' }
];

export const news = [
  {
    cat: 'certifications', tag: 'Certification', date: '', dateLabel: 'Date TBC', // TODO: certification date
    title: 'MACPL achieves ISO 9001, ISO 14001 and OHSAS 18001 certification',
    excerpt: 'Quality, environment and safety systems certified by TÜV Nord auditors.',
    body: ['MACPL has implemented integrated quality, environment and occupational health and safety management systems, certified to ISO 9001, ISO 14001 and OHSAS 18001 by TÜV Nord auditors.'],
    img: 'assets/img/news/iso-certification.jpg', w: 800, h: 450, alt: 'MACPL employees at a training session'
  },
  {
    cat: 'csr', tag: 'Environment', date: '2016-06-05', dateLabel: '5 June 2016',
    title: 'World Environment Day: 130 trees planted at MIDC Waluj',
    excerpt: 'The MACPL team planted around 130 trees along the main road of MIDC Waluj.',
    body: ['On World Environment Day, 5 June 2016, the MACPL team planted around 130 trees along the main road of MIDC Waluj as part of the AITG Go Green initiative.'],
    img: 'assets/img/news/world-environment-day-2016.jpg', w: 800, h: 450, alt: 'MACPL team volunteers on World Environment Day'
  },
  // DEMO PLACEHOLDERS — replace with real stories
  {
    placeholder: true, cat: 'events', tag: 'Events', date: '', dateLabel: 'Date TBC',
    title: 'Safety week across all three plants',
    excerpt: 'Placeholder. Replace with a real event: drills, training and safety awards.',
    body: ['Placeholder story for the demo. Replace it with a real event from MACPL.'],
    img: 'assets/img/capabilities/welding.jpg', w: 960, h: 720, alt: 'Welder at work'
  },
  {
    placeholder: true, cat: 'events', tag: 'Events', date: '', dateLabel: 'Date TBC',
    title: 'MACPL at an industry exhibition',
    excerpt: 'Placeholder. Replace with a trade fair or customer event.',
    body: ['Placeholder story for the demo. Replace it with details of a trade fair or customer event.'],
    img: 'assets/img/capabilities/assembly.jpg', w: 960, h: 720, alt: 'Telescopic suspension fork assembly'
  },
  {
    placeholder: true, cat: 'csr', tag: 'CSR', date: '', dateLabel: 'Date TBC',
    title: 'Community health camp near MIDC Waluj',
    excerpt: 'Placeholder. Replace with an activity under the company’s CSR policy.',
    body: ['Placeholder story for the demo. Replace it with a CSR activity carried out under the company’s CSR policy.'],
    img: 'assets/img/capabilities/tube-bending.jpg', w: 960, h: 720, alt: 'Robot loading a red-hot tube into a bending press'
  },
  {
    placeholder: true, cat: 'certifications', tag: 'Certification', date: '', dateLabel: 'Date TBC',
    title: 'Surveillance audit completed',
    excerpt: 'Placeholder. Replace with a recent audit or certification renewal.',
    body: ['Placeholder story for the demo. Replace it with a recent audit or certification renewal.'],
    img: 'assets/img/capabilities/plasma-cutting.jpg', w: 960, h: 720, alt: 'Plasma torch cutting a steel plate'
  }
];

// ---- People -----------------------------------------------------------------
// TODO: add portraits (square, at least 240x240) and set `photo: 'assets/img/people/<file>.jpg'`.
export const board = [
  {
    name: 'Ram Bhogale', role: 'Chairman',
    summary: 'Mechanical engineer; twice President of MACCIA.',
    bio: ['Mechanical engineer with 38 years of business experience across engineering, finance, banking and healthcare management.',
      'Ramchandra Neelkanth Bhogale has chaired the trusts of a banking institute and a hospital, both of which grew under his leadership. He led the Chamber of Marathwada Industries and Agriculture (CMIA) and was twice elected President of the Maharashtra Chamber of Commerce, Industry and Agriculture (MACCIA).']
  },
  {
    name: 'Ajit Soundalgekar', role: 'Managing director',
    summary: '33+ years in tool and die design and auto components.',
    bio: ['Mechanical engineer with more than 33 years in tool and die design and auto-component manufacturing.',
      'Ajit Gopal Soundalgekar has led the business through every business cycle. His technical expertise lets the company develop complex, critical parts and keep improving process and product quality.']
  },
  {
    name: 'Dr. Sunil Deshpande', role: 'Director, administration',
    summary: 'Radiologist with 20 years in hospital administration.',
    bio: ['Radiologist turned hospital administrator with 20 years of administrative leadership.',
      'Dr. Sunil Ramchandra Deshpande turned a loss-making hospital profitable and helped build a new facility with modern medical equipment. His disciplined approach to administration now supports the group’s engineering businesses.']
  },
  {
    name: 'Dr. Ulhas Gaoli', role: 'Director',
    summary: '40+ years with large corporates; former MD, MAVIM Ltd.',
    bio: ['More than 40 years with large corporates; former Managing Director of MAVIM Ltd.',
      'Dr. Gaoli holds a post-graduate degree in public administration and a doctorate in business administration. He has served as Vice President of Garware Polyester Ltd., advises the boards of SKODA Auto and the Bagla Group, and guides AITG companies on legal compliance and finance.']
  },
  {
    name: 'Mukund Bhogale', role: 'Director',
    summary: 'Chemical engineer; Managing Director, Nirlep Appliances.',
    bio: ['Chemical engineer (UDCT Mumbai) and Managing Director of Nirlep Appliances, with 35 years in business.',
      'Mukund Neelkanth Bhogale led Nirlep’s change of identity and its expansion into the Gulf, Europe and Latin America. He sits on the audit committee of the AITG board.']
  },
  {
    name: 'Nityanand Bhogale', role: 'Director',
    summary: 'Innovator with 25+ years in process automation.',
    bio: ['Chemical technology graduate and innovator with more than 25 years of experience.',
      'Nityanand Bhogale developed machines that automate processes at Nirlep. He founded Bhogale Paints & Coatings, which developed its own non-stick coating and industrial paints, and later a coating application division for the automobile sector.']
  }
];

// TODO: management one-line summaries and profiles to be supplied by MACPL.
export const management = [
  { name: 'Shrikant Damani', role: 'Accounts & finance head', summary: 'Leads accounts, finance and statutory compliance.' },
  { name: 'Rajendra Bhandari', role: 'Materials head', summary: 'Leads purchasing, supply chain and stores.' },
  { name: 'Ganesh Jadhav', role: 'HR head', summary: 'Leads recruitment, training and employee relations.' },
  { name: 'Anant Adhav', role: 'Plant head, Unit 1', summary: 'Runs production and operations at Unit 1.' },
  { name: 'Vivek Deshpande', role: 'Plant head, Unit 2', summary: 'Runs production and operations at Unit 2.' },
  { name: 'Avinash Kude', role: 'Plant head, Unit 3', summary: 'Runs production and operations at Unit 3.' }
].map((p) => ({ ...p, bio: [p.summary, 'Full profile to be provided by MACPL.'] }));

// ---- Careers (DEMO PLACEHOLDERS) ------------------------------------------------
export const openings = [
  { title: 'Quality engineer', location: 'Waluj, Chhatrapati Sambhajinagar', experience: '2–5 years', note: 'Diploma or BE (Mechanical). In-process and final inspection of welded assemblies.' },
  { title: 'Robotic welding programmer', location: 'Waluj, Chhatrapati Sambhajinagar', experience: '3–6 years', note: 'Programming and fixture prove-out for robotic MIG welding cells.' },
  { title: 'Production supervisor, tube bending', location: 'Waluj, Chhatrapati Sambhajinagar', experience: '2–4 years', note: 'Shift supervision of CNC and robotic tube-bending lines.' }
];

// ---- Inner-page hero (all pages except Home) ---------------------------------------
// chips: [label, href, filter?, icon?]. `filter` sets the page's category filter on click (products, news).
// Images: assets/img/page-hero/<page>-1600.webp and -800.webp (placeholders: plant stills / stock).
export const pageHeroes = {
  about: {
    caption: 'Robotic hot bending', eyebrow: 'Since 1997', title: 'Engineering safety into every component',
    intro: 'Founded in 1997, MACPL develops and builds safety-critical components for more than a dozen OEMs.',
    chipsLabel: 'On this page',
    chips: [['Overview', '#overview'], ['Vision & values', '#vision-values'], ['Board', '#board'], ['Management', '#management']]
  },
  capabilities: {
    caption: 'Profile cutting', eyebrow: 'Under one roof', title: 'Six core manufacturing capabilities',
    intro: 'Every critical process stays in-house, so quality, cost and lead time stay under our control.',
    chipsLabel: 'Jump to a capability',
    chips: [['Tube bending', '#tube-bending'], ['Welding', '#welding'], ['Heat treatment', '#heat-treatment'], ['Casting', '#casting'], ['Cutting', '#plasma-cutting'], ['Assemblies', '#assembly']]
  },
  products: {
    caption: 'Plasma-cut star plate', eyebrow: 'What we make', title: 'Components for every vehicle segment',
    intro: 'Steering, suspension and chassis components and assemblies for agriculture, construction and mobility OEMs.',
    chipsLabel: 'Filter by sector',
    chips: [['Agriculture', '?cat=agri', 'agri'], ['Earth moving', '?cat=earth', 'earth'], ['3 wheelers', '?cat=3w', '3w'], ['2 wheelers & EV', '?cat=2w', '2w']]
  },
  'investor-relations': {
    caption: 'Heat-treatment furnace', eyebrow: 'Transparency', title: 'Investor information and disclosures',
    intro: 'Financial results, statutory filings and policies of Marathwada Auto Compo Pvt. Ltd.',
    chipsLabel: 'Go to',
    chips: [['Financial results', '#financial-results'], ['Annual returns', '#annual-returns'], ['Policies', '#policies'], ['Investor contact', '#shareholder-info']]
  },
  news: {
    caption: 'Casting', eyebrow: 'Newsroom', title: 'News, certifications and events',
    intro: 'Certifications, initiatives and life across our three plants.',
    chipsLabel: 'Filter by topic',
    chips: [['Certifications', '?cat=certifications', 'certifications'], ['Events', '?cat=events', 'events'], ['CSR', '?cat=csr', 'csr']]
  },
  careers: {
    caption: 'Induction heating', eyebrow: 'Join MACPL', title: 'Build a career in precision manufacturing',
    intro: 'Join a skilled team building safety-critical components, backed by in-house training.',
    chipsLabel: 'On this page',
    chips: [['Open roles', '#openings'], ['Apply now', '#apply']]
  }
};
