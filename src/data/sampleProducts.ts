export interface Product {
  id: string;
  code: string;
  lollyName: string;
  inspiredName: string;
  sourceBrand: string;
  olfactoryFamily: string;
  image: string;
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  sizes: {
    "15ml": number;
    "30ml": number;
    "50ml": number;
    "100ml": number;
  };
  gender: "homme" | "femme" | "mixte";
  season: "été" | "hiver" | "toute saison";
}

export const sampleProducts: Product[] = [
  {
    id: "1",
    code: "P001",
    lollyName: "Mystique Noir",
    inspiredName: "Black Opium",
    sourceBrand: "Yves Saint Laurent",
    olfactoryFamily: "Oriental Épicé",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&q=80",
    description:
      "Un parfum envoûtant aux notes de café noir et de vanille, parfait pour les soirées élégantes.",
    notes: {
      top: ["Poire", "Fleur d'oranger", "Poivre rose"],
      heart: ["Café", "Jasmin", "Amande amère"],
      base: ["Vanille", "Patchouli", "Cèdre"],
    },
    sizes: { "15ml": 25, "30ml": 45, "50ml": 65, "100ml": 95 },
    gender: "femme",
    season: "hiver",
  },
  {
    id: "2",
    code: "P002",
    lollyName: "Rose Éternelle",
    inspiredName: "La Vie Est Belle",
    sourceBrand: "Lancôme",
    olfactoryFamily: "Floral Fruité",
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=300&q=80",
    description:
      "Une fragrance florale délicate qui célèbre la joie de vivre avec ses notes de rose et d'iris.",
    notes: {
      top: ["Cassis", "Poire"],
      heart: ["Iris", "Jasmin", "Fleur d'oranger"],
      base: ["Praline", "Vanille", "Patchouli"],
    },
    sizes: { "15ml": 28, "30ml": 48, "50ml": 68, "100ml": 98 },
    gender: "femme",
    season: "toute saison",
  },
  {
    id: "3",
    code: "P003",
    lollyName: "Océan Bleu",
    inspiredName: "Bleu de Chanel",
    sourceBrand: "Chanel",
    olfactoryFamily: "Boisé Aromatique",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80",
    description:
      "Un parfum masculin frais et sophistiqué, évoquant la liberté et l'élégance moderne.",
    notes: {
      top: ["Citron", "Menthe", "Poivre rose"],
      heart: ["Gingembre", "Noix de muscade", "Jasmin"],
      base: ["Cèdre", "Santal", "Ambre"],
    },
    sizes: { "15ml": 30, "30ml": 50, "50ml": 70, "100ml": 100 },
    gender: "homme",
    season: "été",
  },
  {
    id: "4",
    code: "P004",
    lollyName: "Ambre Doré",
    inspiredName: "Amber Oud",
    sourceBrand: "Tom Ford",
    olfactoryFamily: "Oriental Boisé",
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=300&q=80",
    description:
      "Une composition luxueuse et mystérieuse alliant l'ambre précieux au oud envoûtant.",
    notes: {
      top: ["Rose", "Safran"],
      heart: ["Oud", "Ambre"],
      base: ["Santal", "Vanille", "Musc"],
    },
    sizes: { "15ml": 35, "30ml": 55, "50ml": 75, "100ml": 110 },
    gender: "mixte",
    season: "hiver",
  },
  {
    id: "5",
    code: "P005",
    lollyName: "Jardin Secret",
    inspiredName: "Flowerbomb",
    sourceBrand: "Viktor & Rolf",
    olfactoryFamily: "Floral Oriental",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&q=80",
    description:
      "Un bouquet floral explosif et sensuel, véritable jardin secret de féminité.",
    notes: {
      top: ["Bergamote", "Thé"],
      heart: ["Sambac", "Orchidée", "Freesia", "Rose"],
      base: ["Patchouli", "Musc", "Vanille"],
    },
    sizes: { "15ml": 32, "30ml": 52, "50ml": 72, "100ml": 105 },
    gender: "femme",
    season: "toute saison",
  },
  {
    id: "6",
    code: "P006",
    lollyName: "Cuir Intense",
    inspiredName: "Tuscan Leather",
    sourceBrand: "Tom Ford",
    olfactoryFamily: "Cuir",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&q=80",
    description:
      "Un parfum de caractère au cuir noble, symbole de sophistication et de puissance.",
    notes: {
      top: ["Thym", "Safran", "Framboise"],
      heart: ["Cuir", "Jasmin"],
      base: ["Ambre", "Bois de santal", "Suède"],
    },
    sizes: { "15ml": 38, "30ml": 58, "50ml": 78, "100ml": 115 },
    gender: "mixte",
    season: "hiver",
  },
];

