'use client'

import { useEffect, useState } from 'react'

type Category = {
  id: string
  name: string
  slug: string
  image: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kategorier</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white shadow p-4 rounded-md">
            <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover rounded-md mb-2" />
            <h2 className="text-lg font-semibold">{cat.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}