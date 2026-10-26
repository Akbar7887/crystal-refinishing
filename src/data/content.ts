import heroBathtubImg from '../assets/images/hero_refinished_bathtub_1792552968180.jpg';
import serviceBathtubImg from '../assets/images/service_bathtub_refinishing_1792552969891.jpg';
import serviceShowerImg from '../assets/images/service_shower_base_1792552970456.jpg';
import serviceSinkImg from '../assets/images/service_sink_refinishing_1792552971398.jpg';
import serviceCounterImg from '../assets/images/service_countertop_refinishing_1792552971722.jpg';

import beforeBathtubImg from '../assets/images/before_worn_bathtub_1792552988799.jpg';
import beforeShowerImg from '../assets/images/before_worn_shower_1792552988713.jpg';
import beforeSinkImg from '../assets/images/before_worn_sink_1792552990607.jpg';
import beforeCounterImg from '../assets/images/before_worn_counter_1792552989069.jpg';

export const BRAND_ASSETS = {
  logo: '/assets/aistudio/AB7A214F-F20A-4601-8968-5E424D83C42F_64cebb11.png',
  coverPhoto: '/assets/aistudio/Cover_photo_0c38c054.png',
  cardBanner: '/assets/aistudio/card2_12695ae3.png',
  flyer: '/assets/aistudio/Flyer_7db2a62c.png',
};

export {
  heroBathtubImg,
  serviceBathtubImg,
  serviceShowerImg,
  serviceSinkImg,
  serviceCounterImg,
  beforeBathtubImg,
  beforeShowerImg,
  beforeSinkImg,
  beforeCounterImg
};

export interface RefinishingService {
  id: string;
  title: string;
  category: 'bathtub' | 'shower' | 'sink' | 'countertop';
  tagline: string;
  description: string;
  ctaText: string;
  image: string;
  fallbackImage?: string;
  features: string[];
  startingPrice?: string;
  priceRange?: string;
  replacementCost?: string;
  typicalSavings?: string;
  typicalTime?: string;
  shortDesc?: string;
  fullDesc?: string;
  iconName?: string;
}

export interface BeforeAfterProject {
  id: string;
  category: 'bathtub' | 'shower' | 'sink' | 'countertop' | 'color-change' | 'jacuzzi';
  categoryLabel: string;
  title: string;
  description: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  compositeImage?: string;
  tag?: string;
  transformationHighlights: string[];
}

export const BUSINESS_INFO = {
  name: "Crystal Refinishing",
  legalEntity: "888Stars LLC",
  tagline: "Restore the Shine. Renew Your Tub.",
  headline: "Professional Bathtub & Bathroom Refinishing in Austin, TX",
  subheadline: "Restore the beauty of your bathtub, shower, sink, or countertop without the high cost of replacement.",
  location: "Austin, Texas, USA",
  servingArea: "Austin, Texas & Surrounding Areas",
  logo: BRAND_ASSETS.logo,
  coverPhoto: BRAND_ASSETS.coverPhoto,
  cardBanner: BRAND_ASSETS.cardBanner,
  flyer: BRAND_ASSETS.flyer,
  primaryContact: {
    name: "Akbar",
    phone: "512-905-5823",
    phoneRaw: "5129055823"
  },
  secondaryContact: {
    name: "Alex",
    phone: "737-207-1024",
    phoneRaw: "7372071024"
  },
  email: "888starsllc@gmail.com",
  hours: "Monday – Saturday: 8:00 AM – 6:00 PM",
  targetAudiences: [
    "Homeowners",
    "Property management companies",
    "Apartment complex managers",
    "Landlords and rental property owners",
    "Real estate investors",
    "Residential property maintenance companies"
  ]
};

export const REFINISHING_SERVICES: RefinishingService[] = [
  {
    id: "bathtub-refinishing",
    category: "bathtub",
    title: "Bathtub Refinishing",
    tagline: "Smooth, Glossy Enamel Restoration",
    description: "Restore your worn, stained, or outdated bathtub with a fresh, smooth, glossy finish. Refinishing can be an affordable alternative to replacing an existing bathtub.",
    ctaText: "Get a Bathtub Refinishing Estimate",
    image: serviceBathtubImg,
    startingPrice: "$510",
    priceRange: "Starting at $510",
    replacementCost: "$2,500 – $4,000+",
    typicalSavings: "Save up to 75%",
    typicalTime: "3–4 hrs (Ready in 24 hrs)",
    features: [
      "Smooth, high-gloss white or almond finish",
      "Addresses chips, scratches, and mineral discoloration",
      "Preserves existing plumbing and wall surround",
      "Completed in hours, ready for use shortly after curing",
      "Substantial cost savings compared to full demolition"
    ]
  },
  {
    id: "shower-base-refinishing",
    category: "shower",
    title: "Shower Base Refinishing",
    tagline: "Clean, Bright Pan Restoration",
    description: "Refresh the appearance of worn shower bases and restore a clean, bright finish without the expense of full replacement.",
    ctaText: "Get a Shower Base Estimate",
    image: serviceShowerImg,
    startingPrice: "$395",
    priceRange: "Starting at $395",
    replacementCost: "$1,800 – $3,200+",
    typicalSavings: "Save up to 80%",
    typicalTime: "2–3 hrs (Ready in 24 hrs)",
    features: [
      "Ideal for fiberglass, acrylic, and cast iron pans",
      "Restores dingy, hard-to-clean porous floors",
      "Eliminates unsightly yellowing and mineral build-up",
      "Reinforces waterproof surface integrity",
      "Fast turnaround minimizing bathroom downtime"
    ]
  },
  {
    id: "sink-refinishing",
    category: "sink",
    title: "Sink Refinishing",
    tagline: "Porcelain & Vanity Basin Renewal",
    description: "Improve the appearance of worn bathroom sinks with professional refinishing designed to give the surface a fresh, renewed look.",
    ctaText: "Get a Sink Refinishing Estimate",
    image: serviceSinkImg,
    startingPrice: "$295",
    priceRange: "Starting at $295",
    replacementCost: "$500 – $950+",
    typicalSavings: "Save up to 70%",
    typicalTime: "1.5–2 hrs (Ready in 24 hrs)",
    features: [
      "Suitable for pedestal sinks, drop-ins, and undermounts",
      "Repairs small chips, crazing, and dull spots",
      "Matches bathtub sheen for a cohesive bathroom aesthetic",
      "Eliminates the cost of vanity cabinet alterations",
      "Smooth, easy-to-clean sanitary surface"
    ]
  },
  {
    id: "countertop-refinishing",
    category: "countertop",
    title: "Countertop Refinishing",
    tagline: "Modern Surface Renewal Without Replacement",
    description: "Refresh the appearance of suitable worn countertops with a renewed finish as an alternative to replacement.",
    ctaText: "Get a Countertop Estimate",
    image: serviceCounterImg,
    startingPrice: "$260",
    priceRange: "$260 – $390",
    replacementCost: "$1,500 – $3,000+",
    typicalSavings: "Save up to 75%",
    typicalTime: "2–4 hrs (Ready in 24 hrs)",
    features: [
      "Transforms outdated laminate, tile, or cultured marble",
      "Available in modern solid or decorative stone-fleck looks",
      "Seals grout lines and micro-scratches seamlessly",
      "Zero tear-out dust or plumbing re-configuration",
      "Popular choice for apartment turns and rental upgrades"
    ]
  }
];

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  priceSub?: string;
  warranty?: string;
  description: string;
  replacementCost?: string;
  savings?: string;
  duration?: string;
  cureTime?: string;
  features: string[];
  popular?: boolean;
  serviceId: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "pricing-bathtub-reglazing",
    name: "Bathtub Reglazing",
    badge: "Most Popular",
    price: "Starting at $510",
    priceSub: "Standard Tub",
    warranty: "5-Year Warranty",
    description: "Complete professional restoration for standard porcelain, cast iron, or acrylic bathtubs.",
    replacementCost: "$2,500 – $4,500+",
    savings: "Save up to 75%",
    duration: "3–4 Hours",
    cureTime: "Ready in 24 hrs",
    popular: true,
    serviceId: "bathtub-refinishing",
    features: [
      "Complete surface preparation",
      "Professional-grade coating",
      "5-year warranty",
      "Same-day service available"
    ]
  },
  {
    id: "pricing-shower-base",
    name: "Shower Base Refinishing",
    badge: "High Demand",
    price: "Starting at $395",
    priceSub: "Per Pan",
    warranty: "4-Year Warranty",
    description: "Deep cleaning and non-slip durable refinishing for fiberglass, acrylic, and cast iron shower pans.",
    replacementCost: "$1,800 – $3,200+",
    savings: "Save up to 80%",
    duration: "2–3 Hours",
    cureTime: "Ready in 24 hrs",
    popular: false,
    serviceId: "shower-base-refinishing",
    features: [
      "Deep cleaning & repair",
      "Non-slip coating",
      "4-year warranty",
      "Quick turnaround"
    ]
  },
  {
    id: "pricing-sink-repair",
    name: "Sink Repair & Refinishing",
    badge: "Affordable Renewal",
    price: "Starting at $295",
    priceSub: "Per Basin",
    warranty: "3-Year Warranty",
    description: "Chip and crack repair with high-gloss white finish for vanity basins, drop-ins, and pedestals.",
    replacementCost: "$500 – $950+",
    savings: "Save up to 70%",
    duration: "1.5–2 Hours",
    cureTime: "Ready in 24 hrs",
    popular: false,
    serviceId: "sink-refinishing",
    features: [
      "Chip & crack repair",
      "Gloss white color",
      "3-year warranty",
      "Affordable pricing"
    ]
  },
  {
    id: "pricing-chip-repair",
    name: "Chip Repair Service",
    badge: "Fast & Precise",
    price: "Starting at $150",
    priceSub: "Per Spot Repair",
    warranty: "1-Year Warranty",
    description: "Precision small chip and ding repair with seamless color matching and fast turnaround.",
    replacementCost: "Avoid Demolition",
    savings: "Save 90%+",
    duration: "1–2 Hours",
    cureTime: "Fast Curing",
    popular: false,
    serviceId: "bathtub-refinishing",
    features: [
      "Small chip repair",
      "Seamless finish",
      "1-year warranty",
      "Fast service"
    ]
  },
  {
    id: "pricing-fiberglass-tub",
    name: "Fiberglass Tub Restoration",
    badge: "Pour-On Application",
    price: "Starting at $510",
    priceSub: "Full Restoration",
    warranty: "5-Year Warranty",
    description: "Structural repair and heavy-duty pour-on liquid enamel application for long-lasting like-new durability.",
    replacementCost: "$3,000 – $5,000+",
    savings: "Save up to 75%",
    duration: "3–4 Hours",
    cureTime: "Ready in 24 hrs",
    popular: false,
    serviceId: "bathtub-refinishing",
    features: [
      "Structural repair",
      "Pour-on application",
      "5-year warranty",
      "Like-new finish"
    ]
  },
  {
    id: "pricing-tile-refinishing",
    name: "Tile Refinishing",
    badge: "Full Surround",
    price: "Starting at $950",
    priceSub: "Full Tile Surround",
    warranty: "4-Year Warranty",
    description: "Grout line repair, tile resurfacing, and pour-on application for a seamless waterproof bathroom surround.",
    replacementCost: "$4,500 – $7,500+",
    savings: "Save up to 80%",
    duration: "4–6 Hours",
    cureTime: "Ready in 24 hrs",
    popular: false,
    serviceId: "bathtub-refinishing",
    features: [
      "Grout repair",
      "Tile resurfacing",
      "Pour-on application",
      "4-year warranty"
    ]
  }
];


export const BEFORE_AFTER_GALLERY: BeforeAfterProject[] = [
  {
    id: "ba-bathtub-rust-drain",
    category: "bathtub",
    categoryLabel: "Bathtubs",
    tag: "Severe Rust Removal",
    title: "Heavy Drain Rust & Mineral Staining Restoration",
    description: "Deep chemical rust neutralization, mechanical acid etching, and multi-layer bright white liquid porcelain refinishing.",
    location: "Austin, TX (Hyde Park)",
    beforeImage: "/assets/aistudio/3132E4E4-6762-4079-B8DB-B016B0EB4E04_4_5005_c_c9998919.jpeg",
    afterImage: "/assets/aistudio/3132E4E4-6762-4079-B8DB-B016B0EB4E04_4_5005_c_c9998919.jpeg",
    compositeImage: "/assets/aistudio/3132E4E4-6762-4079-B8DB-B016B0EB4E04_4_5005_c_c9998919.jpeg",
    transformationHighlights: [
      "Completely removed heavy rust channel down to the drain",
      "Applied corrosion inhibitor and proprietary bonding agent",
      "Restored smooth, high-gloss brilliant white finish"
    ]
  },
  {
    id: "ba-bathtub-no-marks",
    category: "bathtub",
    categoryLabel: "Bathtubs",
    tag: "Zero Orange Peel",
    title: "Deep Grime & Caulk Edge Enamel Re-Glaze",
    description: "Heavy grime, mineral scaling, and caulk line degradation renewed into an ultra-smooth porcelain surface with no brush marks or lines.",
    location: "Austin, TX (Riverside)",
    beforeImage: "/assets/aistudio/47DDFA3E-0A79-45F0-8B2F-E2BFF87517CE_81d5d7c3.png",
    afterImage: "/assets/aistudio/47DDFA3E-0A79-45F0-8B2F-E2BFF87517CE_81d5d7c3.png",
    compositeImage: "/assets/aistudio/47DDFA3E-0A79-45F0-8B2F-E2BFF87517CE_81d5d7c3.png",
    transformationHighlights: [
      "No orange peel texture, no lines, and zero brush marks",
      "Sanitized and sealed perimeter tile caulk joints",
      "Commercial-grade pour-on glaze ready in 24 hours"
    ]
  },
  {
    id: "ba-bathtub-peeling-diy",
    category: "bathtub",
    categoryLabel: "Bathtubs",
    tag: "Peeling Paint Stripped",
    title: "Failed DIY Epoxy Paint Stripping & Permanent Refinish",
    description: "Stripped extensive flaking DIY paint down to the original cast iron substrate, primed with cross-linking silane, and glazed.",
    location: "Austin, TX (Central East Austin)",
    beforeImage: "/assets/aistudio/42543BA9-EF08-40FB-B7DE-52AF08EAD003_aa60d8b6.png",
    afterImage: "/assets/aistudio/42543BA9-EF08-40FB-B7DE-52AF08EAD003_aa60d8b6.png",
    compositeImage: "/assets/aistudio/42543BA9-EF08-40FB-B7DE-52AF08EAD003_aa60d8b6.png",
    transformationHighlights: [
      "100% stripped failing and flaking DIY tub kit coating",
      "Mechanically smoothed base to eliminate all ridges",
      "Applied permanent non-peeling molecular bonding enamel"
    ]
  },
  {
    id: "ba-jacuzzi-pink-modern",
    category: "color-change",
    categoryLabel: "Color Modernization",
    tag: "Pink to Gloss White",
    title: "Dated Pink Garden Whirlpool Tub Modernization",
    description: "Modernized an outdated 1980s pink / mauve acrylic whirlpool tub into crisp architectural white while preserving jet function.",
    location: "Austin, TX (Westlake Hills)",
    beforeImage: "/assets/aistudio/A0C206B3-8E30-4596-9F8C-66BB3876D1C5_efd5e59a.png",
    afterImage: "/assets/aistudio/A0C206B3-8E30-4596-9F8C-66BB3876D1C5_efd5e59a.png",
    compositeImage: "/assets/aistudio/A0C206B3-8E30-4596-9F8C-66BB3876D1C5_efd5e59a.png",
    transformationHighlights: [
      "Eliminated retro mauve/pink color with zero tub removal",
      "Meticulously masked jet nozzles and tile surround",
      "Saved homeowner over $5,500 compared to full demolition"
    ]
  },
  {
    id: "ba-bathtub-yellowed-deep",
    category: "bathtub",
    categoryLabel: "Bathtubs",
    tag: "Yellowing & Oxidation",
    title: "Severely Yellowed Soaking Tub Surface Renewal",
    description: "Deep chemical prep removed 15+ years of hard water mineral discoloration, followed by ultra-high gloss liquid enamel.",
    location: "Cedar Park, TX",
    beforeImage: "/assets/aistudio/D89770FD-CFD7-450F-86AD-CB7617B22852_7c7da67a.png",
    afterImage: "/assets/aistudio/D89770FD-CFD7-450F-86AD-CB7617B22852_7c7da67a.png",
    compositeImage: "/assets/aistudio/D89770FD-CFD7-450F-86AD-CB7617B22852_7c7da67a.png",
    transformationHighlights: [
      "Replaced dull yellowed finish with brilliant white luster",
      "Resistant to Austin hard water stains and scuffs",
      "Completed in 3.5 hours with virtually zero fumes"
    ]
  },
  {
    id: "ba-bathtub-chips-cast-iron",
    category: "bathtub",
    categoryLabel: "Bathtubs",
    tag: "Deep Chip Repair",
    title: "Raw Cast Iron Impact Chip Repair & Coating",
    description: "Filled and bonded multiple deep black impact gouges on the bathtub floor down to raw metal before applying the final porcelain glaze.",
    location: "Round Rock, TX",
    beforeImage: "/assets/aistudio/2FA870AE-7CED-4E11-A5AE-DA869924D856_259a6e5c.png",
    afterImage: "/assets/aistudio/2FA870AE-7CED-4E11-A5AE-DA869924D856_259a6e5c.png",
    compositeImage: "/assets/aistudio/2FA870AE-7CED-4E11-A5AE-DA869924D856_259a6e5c.png",
    transformationHighlights: [
      "Precision-filled 6+ deep chipped areas on the floor basin",
      "Seamless finish with zero visible patch lines",
      "Heavy-duty impact resistance and 5-year warranty"
    ]
  },
  {
    id: "ba-bathtub-subway-tile",
    category: "bathtub",
    categoryLabel: "Bathtubs",
    tag: "Subway Tile Surround",
    title: "Vintage Cast Iron Tub & Subway Tile Refresh",
    description: "Revived a discolored, dull tub basin in a classic subway tile bathroom, achieving an immaculate reflective showroom gloss.",
    location: "Pflugerville, TX",
    beforeImage: "/assets/aistudio/EB303B2A-E7E0-4DA5-B676-3208DC411F58_87718dfc.png",
    afterImage: "/assets/aistudio/EB303B2A-E7E0-4DA5-B676-3208DC411F58_87718dfc.png",
    compositeImage: "/assets/aistudio/EB303B2A-E7E0-4DA5-B676-3208DC411F58_87718dfc.png",
    transformationHighlights: [
      "Restored deep porcelain sheen matching clean white tile",
      "Sealed vulnerable corners and caulk transitions",
      "Silky smooth underfoot feel with anti-slip option"
    ]
  },
  {
    id: "ba-color-change-almond",
    category: "color-change",
    categoryLabel: "Color Modernization",
    tag: "Almond to Gloss White",
    title: "1970s Almond / Beige Bathtub Color Conversion",
    description: "Transformed an outdated 1970s beige/almond bathtub and tile enclosure into modern high-gloss bright white without replacement.",
    location: "Austin, TX (Barton Hills)",
    beforeImage: "/assets/aistudio/5F27DCA8-0A20-4FFF-BFFE-4FAB95809325_a8a5164f.png",
    afterImage: "/assets/aistudio/5F27DCA8-0A20-4FFF-BFFE-4FAB95809325_a8a5164f.png",
    compositeImage: "/assets/aistudio/5F27DCA8-0A20-4FFF-BFFE-4FAB95809325_a8a5164f.png",
    transformationHighlights: [
      "Converted dark dated almond surface to vibrant bright white",
      "Brightened entire bathroom lighting and aesthetic",
      "Saved property owner thousands over replacement costs"
    ]
  },
  {
    id: "ba-bathtub-1",
    category: "bathtub",
    categoryLabel: "Bathtubs",
    tag: "Interactive Slider",
    title: "Porcelain Cast Iron Bathtub Transformation",
    description: "Deep surface cleaning, etching, chip repair, and multi-layer glossy white enamel refinishing.",
    location: "Austin, TX (South Congress)",
    beforeImage: beforeBathtubImg,
    afterImage: serviceBathtubImg,
    transformationHighlights: [
      "Removed heavy rust and mineral staining",
      "Patched porcelain chips around the drain",
      "Smooth, high-gloss brilliant white finish"
    ]
  },
  {
    id: "ba-shower-1",
    category: "shower",
    categoryLabel: "Shower Bases",
    tag: "Interactive Slider",
    title: "Fiberglass Walk-In Shower Pan Refinishing",
    description: "Restored yellowed, dull fiberglass shower pan with a bright, clean, water-resistant surface.",
    location: "Austin, TX (Mueller)",
    beforeImage: beforeShowerImg,
    afterImage: serviceShowerImg,
    transformationHighlights: [
      "Eliminated ground-in yellowing and grime",
      "Repaired micro-cracks in the fiberglass base",
      "Clean, modern bright white appearance"
    ]
  },
  {
    id: "ba-sink-1",
    category: "sink",
    categoryLabel: "Sinks",
    tag: "Interactive Slider",
    title: "Vintage Porcelain Bathroom Sink Reglazing",
    description: "Refreshed a dull, chipped bathroom vanity basin to mirror-like brilliance without replacing the countertop.",
    location: "Austin, TX (The Domain)",
    beforeImage: beforeSinkImg,
    afterImage: serviceSinkImg,
    transformationHighlights: [
      "Repaired edge chips and hairline scratches",
      "Restored smooth porcelain luster",
      "Matches the refinished bathtub"
    ]
  },
  {
    id: "ba-counter-1",
    category: "countertop",
    categoryLabel: "Countertops",
    tag: "Interactive Slider",
    title: "Cultured Marble Vanity Countertop Renewal",
    description: "Modernized an outdated yellowed cultured marble vanity top with a durable multi-tone stone-effect finish.",
    location: "Round Rock, TX (Rental Property)",
    beforeImage: beforeCounterImg,
    afterImage: serviceCounterImg,
    transformationHighlights: [
      "Covered burn marks and discoloration",
      "Applied modern stone-texture finish",
      "Saved owner hundreds over stone replacement"
    ]
  }
];

export const WHY_CHOOSE_US_BENEFITS = [
  {
    title: "Affordable Alternative to Replacement",
    description: "Save significantly compared to the cost of purchasing a new tub, hiring plumbers, tearing out tile, and disposing of heavy debris.",
    icon: "PiggyBank"
  },
  {
    title: "Attention to Detail",
    description: "Every surface is thoroughly cleaned, mechanically prepped, and coated with meticulous care for a uniform, lasting finish.",
    icon: "CheckCircle2"
  },
  {
    title: "Professional Service",
    description: "Respectful technicians who mask surroundings, use professional ventilation, and leave your bathroom neat and tidy.",
    icon: "Shield"
  },
  {
    title: "Clear Communication",
    description: "Upfront pricing, realistic surface assessments, and direct access to Akbar and Alex throughout your project.",
    icon: "MessageSquare"
  },
  {
    title: "Residential & Rental Property Services",
    description: "Experienced with both custom family homes and quick-turnaround apartment complexes, rentals, and portfolio properties.",
    icon: "Building2"
  },
  {
    title: "Convenient Estimate Requests",
    description: "Text or email photos of your tub or surface for a fast, straightforward estimate without high-pressure sales.",
    icon: "Clock"
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Request a Free Estimate",
    description: "Contact us by phone, text, or website form. Share a couple of quick photos or describe your surface."
  },
  {
    number: "02",
    title: "Assess the Surface",
    description: "We review the requested service, evaluate the condition of your tub, shower, sink, or counter, and determine whether refinishing is suitable."
  },
  {
    number: "03",
    title: "Prepare & Refinish",
    description: "The surface is meticulously prepared, repaired if necessary, and refinished using professional processes, primers, and durable coatings."
  },
  {
    number: "04",
    title: "Enjoy the Renewed Look",
    description: "The customer receives a refreshed, beautiful like-new surface along with straightforward care and cleaning instructions."
  }
];

export const SERVICE_AREAS = [
  {
    name: "Austin Central & Downtown",
    communities: "Downtown, Central Austin, SoCo, Tarrytown, Hyde Park, Clarksville",
    zips: ["78701", "78702", "78703", "78704", "78705", "78751"]
  },
  {
    name: "North Austin & Tech Corridor",
    communities: "The Domain, Mueller, Wells Branch, North Burnet, Anderson Mill",
    zips: ["78758", "78759", "78723", "78752", "78757", "78727"]
  },
  {
    name: "South & Southwest Austin",
    communities: "Circle C Ranch, Sunset Valley, Shady Hollow, Oak Hill, Slaughter",
    zips: ["78745", "78748", "78749", "78739", "78744"]
  },
  {
    name: "Round Rock, Pflugerville & Georgetown",
    communities: "Round Rock, Pflugerville, Georgetown, Brushy Creek",
    zips: ["78664", "78665", "78681", "78660", "78626", "78633"]
  },
  {
    name: "Cedar Park, Leander & Liberty Hill",
    communities: "Cedar Park, Leander, Crystal Falls, Whitestone",
    zips: ["78613", "78641", "78642"]
  },
  {
    name: "Westlake Hills, Lakeway & Bee Cave",
    communities: "Westlake Hills, Lakeway, Bee Cave, Lake Travis",
    zips: ["78746", "78734", "78738", "78733"]
  },
  {
    name: "Buda, Kyle & San Marcos",
    communities: "Buda, Kyle, Plum Creek, San Marcos",
    zips: ["78610", "78640", "78666"]
  },
  {
    name: "Manor, Del Valle & Bastrop County",
    communities: "Manor, Del Valle, Elgin",
    zips: ["78653", "78617", "78621"]
  }
];

export type ServiceItem = RefinishingService;
export const CORE_SERVICES = REFINISHING_SERVICES;
