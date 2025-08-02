// src/pages/Catalogue.tsx

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

export default function Catalogue() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')

      if (error) console.error('Erreur chargement produits', error)
      else setProducts(data || [])

      setLoading(false)
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase()
    if (!query) return true
    return (
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
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2"
      />
      {loading ? (
        <p>Chargement...</p>
      ) : filteredProducts.length === 0 ? (
        <p>Aucun parfum trouvé</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md p-4">
              <img
                src={product.image_url}
                alt={product.lolly_name}
                className="w-full h-48 object-cover rounded-xl mb-2"
              />
              <h2 className="text-xl font-semibold">{product.lolly_name}</h2>
              <p className="text-sm italic text-gray-500">
                Inspiré de {product.inspired_name} – {product.inspired_brand}
              </p>
              <p className="text-sm mt-2">
                <strong>Notes de tête :</strong> {product.top_notes}
                <br />
                <strong>Notes de cœur :</strong> {product.heart_notes}
                <br />
                <strong>Notes de fond :</strong> {product.base_notes}
              </p>
              <p className="text-sm mt-2 text-gray-600">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
