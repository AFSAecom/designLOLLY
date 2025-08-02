import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  lolly_name: string;
  inspired_name: string;
  inspired_brand: string;
  top_notes: string;
  heart_notes: string;
  base_notes: string;
  description: string;
  image_url: string;
  family: string;
  gender: string;
  season: string;
  code: string;
}

interface ProductVariant {
  id: string;
  product_id: string;
  volume: number;
  price: number;
}

export default function Catalogue() {
  const [products, setProducts] = useState<Product[]>([]);
  const [variantsByProductId, setVariantsByProductId] = useState<Record<string, ProductVariant[]>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredientQuery, setIngredientQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');

  const priceFormatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*');

      if (productError) {
        console.error('Erreur chargement produits', productError);
        return;
      }

      const { data: variantData, error: variantError } = await supabase
        .from('product_variants')
        .select('*');

      if (variantError) {
        console.error('Erreur chargement variantes', variantError);
        return;
      }

      const groupedVariants: Record<string, ProductVariant[]> = {};
      variantData.forEach((variant) => {
        if (!groupedVariants[variant.product_id]) {
          groupedVariants[variant.product_id] = [];
        }
        groupedVariants[variant.product_id].push(variant);
      });

      setProducts(productData);
      setVariantsByProductId(groupedVariants);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchName =
      product.inspired_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.inspired_brand?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchIngredient =
      product.top_notes?.toLowerCase().includes(ingredientQuery.toLowerCase()) ||
      product.heart_notes?.toLowerCase().includes(ingredientQuery.toLowerCase()) ||
      product.base_notes?.toLowerCase().includes(ingredientQuery.toLowerCase()) ||
      product.family?.toLowerCase().includes(ingredientQuery.toLowerCase());

    const matchGender = selectedGender ? product.gender === selectedGender : true;
    const matchSeason = selectedSeason ? product.season === selectedSeason : true;
    const matchFamily = selectedFamily ? product.family === selectedFamily : true;

    return matchName && matchIngredient && matchGender && matchSeason && matchFamily;
  });

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Catalogue Lolly</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un parfum, marque..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Rechercher par ingrédients ou famille..."
          value={ingredientQuery}
          onChange={(e) => setIngredientQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} className="p-2 border rounded">
          <option value="">Genre</option>
          <option value="femme">Femme</option>
          <option value="homme">Homme</option>
          <option value="mixte">Mixte</option>
        </select>
        <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)} className="p-2 border rounded">
          <option value="">Saison</option>
          <option value="ete">Été</option>
          <option value="hiver">Hiver</option>
          <option value="printemps">Printemps</option>
          <option value="automne">Automne</option>
        </select>
        <select value={selectedFamily} onChange={(e) => setSelectedFamily(e.target.value)} className="p-2 border rounded">
          <option value="">Famille olfactive</option>
          <option value="floral">Floral</option>
          <option value="boisé">Boisé</option>
          <option value="oriental">Oriental</option>
          <option value="frais">Frais</option>
          <option value="gourmand">Gourmand</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>Aucun parfum trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow p-4">
              <img src={product.image_url} alt={product.lolly_name} className="w-full h-40 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{product.lolly_name}</h2>
              <p className="italic text-sm">Inspiré de {product.inspired_name} – {product.inspired_brand}</p>
              <p className="mt-1 text-sm"><strong>Notes de tête :</strong> {product.top_notes}</p>
              <p className="text-sm"><strong>Notes de coeur :</strong> {product.heart_notes}</p>
              <p className="text-sm"><strong>Notes de fond :</strong> {product.base_notes}</p>
              <p className="text-sm mt-2">{product.description}</p>
              <p className="text-xs mt-1 text-gray-500">Code produit : {product.code}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {(variantsByProductId[product.id] || []).map((variant) => (
                  <button key={variant.id} className="border px-3 py-1 rounded-full text-sm">
                    {variant.volume} ml – {priceFormatter.format(variant.price)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
