import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Product {
  id: string
  lolly_name: string
  inspired_name: string
  inspired_brand: string
  top_notes: string
  heart_notes: string
  base_notes: string
  description: string
  image_url: string
}

interface ProductVariant {
  id: string
  product_id: string
  volume: number
  price: number
}

export default function Catalogue() {
  const [products, setProducts] = useState<Product[]>([])
  const [variantsByProductId, setVariantsByProductId] = useState<
    Record<string, ProductVariant[]>
  >({})
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const priceFormatter = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')

      const { data: variantsData, error: variantsError } = await supabase
        .from('product_variants')
        .select('*')

      if (productsError || variantsError) {
        console.error('Erreur chargement', productsError, variantsError)
        return
      }

      setProducts(productsData || [])

      const variantsMap: Record<string, ProductVariant[]> = {}
      variantsData?.forEach((variant) => {
        if (!variantsMap[variant.product_id]) {
          variantsMap[variant.product_id] = []
        }
        variantsMap[variant.product_id].push(variant)
      })

      setVariantsByProductId(variantsMap)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase()
    return (
      product.lolly_name.toLowerCase().includes(query) ||
      product.inspired_name.toLowerCase().includes(query) ||
      product.inspired_brand.toLowerCase().includes(query) ||
      product.top_notes.toLowerCase().includes(query) ||
      product.heart_notes.toLowerCase().includes(query) ||
      product.base_notes.toLowerCase().includes(query)
    )
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Catalogue Lolly</h1>

      <input
        type="text"
        placeholder="Rechercher un parfum..."
        className="mb-4 p-2 border rounded w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading ? (
        <p>Chargement...</p>
      ) : filteredProducts.length === 0 ? (
        <p>Aucun parfum trouvé</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded p-4 shadow">
              <img
                src={product.image_url}
                alt={product.lolly_name}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-bold">{product.lolly_name}</h2>
              <p className="italic text-sm text-gray-600">
                Inspiré de {product.inspired_name} – {product.inspired_brand}
              </p>
              <p>
                <strong>Notes de tête :</strong> {product.top_notes}
              </p>
              <p>
                <strong>Notes de cœur :</strong> {product.heart_notes}
              </p>
              <p>
                <strong>Notes de fond :</strong> {product.base_notes}
              </p>
              <p className="text-sm mt-1">{product.description}</p>

              {variantsByProductId[product.id] &&
                variantsByProductId[product.id].map((variant) => (
                  <p key={variant.id} className="text-sm mt-2">
                    {variant.volume} ml – {priceFormatter.format(variant.price)} TND
                  </p>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
    </div>
  )
}
