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

export default function Catalogue() {
  const [products, setProducts] = useState<Product[]>([]);
  const [variantsByProductId, setVariantsByProductId] = useState<Record<string, ProductVariant[]>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const priceFormatter = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: productData, error: productError } = await supabase.from('products').select('*');
      const { data: variantData, error: variantError } = await supabase.from('product_variants').select('*');

      if (productError || variantError) {
        console.error('Erreur chargement données', productError || variantError);
      } else {
        setProducts(productData || []);

        const groupedVariants = (variantData || []).reduce((acc, variant) => {
          if (!acc[variant.product_id]) acc[variant.product_id] = [];
          acc[variant.product_id].push(variant);
          return acc;
        }, {} as Record<string, ProductVariant[]>);

        setVariantsByProductId(groupedVariants);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.lolly_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.inspired_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.inspired_brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.top_notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.heart_notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.base_notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-lolly-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-playfair font-semibold text-lolly-contrast mb-8 text-center">
          Catalogue Lolly
        </h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Rechercher un parfum..."
            className="w-full max-w-md p-3 border border-lolly-gray/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lolly-primary bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center text-lolly-gray">Chargement...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-lolly-gray">Aucun parfum trouvé</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col"
              >
                <img
                  src={product.image_url}
                  alt={product.lolly_name}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h2 className="text-xl font-playfair font-semibold text-lolly-contrast">
                  {product.lolly_name}
                </h2>
                <p className="italic text-sm text-lolly-gray mb-2">
                  Inspiré de {product.inspired_name} – {product.inspired_brand}
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Notes de tête :</strong> {product.top_notes}
                  </p>
                  <p>
                    <strong>Notes de cœur :</strong> {product.heart_notes}
                  </p>
                  <p>
                    <strong>Notes de fond :</strong> {product.base_notes}
                  </p>
                </div>
                {product.description && (
                  <p className="text-sm text-gray-600 mt-2 flex-1">
                    {product.description}
                  </p>
                )}
                <div className="mt-4 space-y-1 text-sm font-medium">
                  {variantsByProductId[product.id]?.map((variant) => (
                    <p key={variant.id}>
                      {variant.volume} ml – {priceFormatter.format(variant.price)} TND
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
