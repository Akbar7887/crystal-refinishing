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
  typicalTime?: string;
  shortDesc?: string;
  fullDesc?: string;
  iconName?: string;
}

export interface BeforeAfterProject {
  id: string;
  category: 'bathtub' | 'shower' | 'sink' | 'countertop';
  categoryLabel: string;
  title: string;
  description: string;
  location: string;
  beforeImage: string;
  afterImage: string;
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
    features: [
      "Transforms outdated laminate, tile, or cultured marble",
      "Available in modern solid or decorative stone-fleck looks",
      "Seals grout lines and micro-scratches seamlessly",
      "Zero tear-out dust or plumbing re-configuration",
      "Popular choice for apartment turns and rental upgrades"
    ]
  }
];

export const BEFORE_AFTER_GALLERY: BeforeAfterProject[] = [
  {
    id: "ba-bathtub-1",
    category: "bathtub",
    categoryLabel: "Bathtubs",
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
