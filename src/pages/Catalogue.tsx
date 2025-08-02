import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  Input,
} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "../lib/supabase";

interface Product {
  id: string;
  lolly_name: string;
  inspired_name: string;
  inspired_brand: string;
  top_notes: string;
  heart_notes: string;
  base_notes: string;
  olfactive_family: string;
  description: string;
  image_url: string;
  product_code: string;
  gender?: string;
  season?: string;
}

interface ProductVariant {
  id: string;
  product_id: string;
  volume: number;
  price: number;
}

const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'TND',
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

export default function Catalogue() {
  const [products, setProducts] = useState<Product[]>([]);
  const [variantsByProductId, setVariantsByProductId] =
    useState<Record<string, ProductVariant[]>>({});
  const [nameSearch, setNameSearch] = useState("");
  const [noteSearch, setNoteSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("tous");
  const [seasonFilter, setSeasonFilter] = useState("toutes");
  const [familyFilter, setFamilyFilter] = useState("toutes");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: productsData, error: productsError } = await supabase.from('products').select('*');
      const { data: variantsData, error: variantsError } = await supabase.from('product_variants').select('*');

      if (productsError || variantsError) {
        console.error('Erreur de chargement des données');
        return;
      }

      setProducts(productsData || []);
      const groupedVariants: Record<string, ProductVariant[]> = {};
      (variantsData || []).forEach((variant) => {
        if (!groupedVariants[variant.product_id]) {
          groupedVariants[variant.product_id] = [];
        }
        groupedVariants[variant.product_id].push(variant);
      });
      setVariantsByProductId(groupedVariants);
    };

    fetchData();
  }, []);

  const uniqueFamilies = Array.from(
    new Set(products.map((p) => p.olfactive_family).filter(Boolean)),
  );

  const filteredProducts = products.filter((product) => {
    const nameQuery = nameSearch.toLowerCase();
    const noteQuery = noteSearch.toLowerCase();

    const matchesName =
      nameQuery === "" ||
      product.lolly_name.toLowerCase().includes(nameQuery) ||
      product.inspired_name.toLowerCase().includes(nameQuery) ||
      product.inspired_brand.toLowerCase().includes(nameQuery);

    const matchesNotes =
      noteQuery === "" ||
      product.top_notes.toLowerCase().includes(noteQuery) ||
      product.heart_notes.toLowerCase().includes(noteQuery) ||
      product.base_notes.toLowerCase().includes(noteQuery) ||
      product.olfactive_family.toLowerCase().includes(noteQuery);

    const matchesGender =
      genderFilter === "tous" ||
      product.gender?.toLowerCase() === genderFilter.toLowerCase();
    const matchesSeason =
      seasonFilter === "toutes" ||
      product.season?.toLowerCase() === seasonFilter.toLowerCase();
    const matchesFamily =
      familyFilter === "toutes" ||
      product.olfactive_family.toLowerCase() === familyFilter.toLowerCase();

    return (
      matchesName &&
      matchesNotes &&
      matchesGender &&
      matchesSeason &&
      matchesFamily
    );
  });

  const volumes = [15, 30, 50, 100];

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-lolly-background p-6 font-montserrat">
      <h1 className="text-2xl font-playfair font-bold text-lolly-contrast mb-6">
        Catalogue Lolly
      </h1>

      {/* Search fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          placeholder="Rechercher par nom inspiré ou marque..."
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          className="border-2 border-lolly-contrast/30 focus:border-lolly-primary"
        />
        <Input
          placeholder="Notes et familles olfactives..."
          value={noteSearch}
          onChange={(e) => setNoteSearch(e.target.value)}
          className="border-2 border-lolly-contrast/30 focus:border-lolly-primary"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select value={genderFilter} onValueChange={setGenderFilter}>
          <SelectTrigger className="border-2 border-lolly-contrast/30">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les genres</SelectItem>
            <SelectItem value="femme">Femme</SelectItem>
            <SelectItem value="homme">Homme</SelectItem>
            <SelectItem value="mixte">Mixte</SelectItem>
          </SelectContent>
        </Select>

        <Select value={seasonFilter} onValueChange={setSeasonFilter}>
          <SelectTrigger className="border-2 border-lolly-contrast/30">
            <SelectValue placeholder="Saison" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toutes">Toutes saisons</SelectItem>
            <SelectItem value="été">Été</SelectItem>
            <SelectItem value="hiver">Hiver</SelectItem>
            <SelectItem value="printemps">Printemps</SelectItem>
            <SelectItem value="automne">Automne</SelectItem>
          </SelectContent>
        </Select>

        <Select value={familyFilter} onValueChange={setFamilyFilter}>
          <SelectTrigger className="border-2 border-lolly-contrast/30">
            <SelectValue placeholder="Famille olfactive" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toutes">Toutes familles</SelectItem>
            {uniqueFamilies.map((fam) => (
              <SelectItem key={fam} value={fam.toLowerCase()}>
                {fam}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-lolly-contrast">
          Aucun parfum ne correspond à votre recherche.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-y-2"
            >
              <div className="relative">
                <img
                  src={product.image_url}
                  alt={product.lolly_name}
                  className="w-full h-40 object-cover rounded-2xl"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      favorites[product.id]
                        ? "fill-lolly-primary text-lolly-primary"
                        : "text-lolly-contrast"
                    }`}
                  />
                </button>
              </div>
              <h2 className="text-lg font-playfair font-semibold text-lolly-contrast">
                {product.lolly_name}
              </h2>
              <p className="italic text-sm text-lolly-gray">
                {product.inspired_name} – {product.inspired_brand}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Notes de tête :</span> {product.top_notes}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Notes de cœur :</span> {product.heart_notes}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Notes de fond :</span> {product.base_notes}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Famille olfactive :</span> {product.olfactive_family}
              </p>
              <p className="text-sm">{product.description}</p>
              <p className="text-xs text-lolly-gray">
                Code produit : {product.product_code}
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {volumes.map((volume) => {
                  const variant = variantsByProductId[product.id]?.find(
                    (v) => v.volume === volume,
                  );
                  return variant ? (
                    <button
                      key={volume}
                      className="border border-lolly-gray/30 rounded-full px-2 py-1 text-xs text-lolly-contrast"
                    >
                      {volume} ml – {priceFormatter.format(variant.price)}
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
