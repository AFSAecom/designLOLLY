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
  const [variantsByProductId, setVariantsByProductId] = useState<Record<string, ProductVariant[]>>({});
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.lolly_name.toLowerCase().includes(query) ||
      product.inspired_name.toLowerCase().includes(query) ||
      product.inspired_brand.toLowerCase().includes(query) ||
      product.top_notes.toLowerCase().includes(query) ||
      product.heart_notes.toLowerCase().includes(query) ||
      product.base_notes.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#FBF0E9] p-6">
      <h1 className="text-2xl font-bold text-[#805050] mb-4">Catalogue Lolly</h1>
      <input
        type="text"
        placeholder="Rechercher un parfum..."
        className="w-full mb-6 p-2 border rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl shadow-md">
            <img src={product.image_url} alt={product.lolly_name} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="text-lg font-semibold text-[#805050]">{product.lolly_name}</h2>
            <p className="italic text-sm text-[#AD9C92]">Inspiré de {product.inspired_name} – {product.inspired_brand}</p>
            <p className="mt-2"><strong>Notes de tête :</strong> {product.top_notes}</p>
            <p><strong>Notes de cœur :</strong> {product.heart_notes}</p>
            <p><strong>Notes de fond :</strong> {product.base_notes}</p>
            <p className="text-sm mt-2">{product.description}</p>
            {variantsByProductId[product.id]?.map((variant) => (
              <div key={variant.id} className="mt-2 text-sm text-[#805050]">
                {variant.volume} ml – {priceFormatter.format(variant.price)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
