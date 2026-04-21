import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import { CAR_LISTINGS } from '../data/listings'
import { CarCard, PageHeader } from '../components/ui'

export default function Cars() {
  const navigate = useNavigate()
  const [search,       setSearch]       = useState('')
  const [minPrice,     setMinPrice]     = useState(0)
  const [maxPrice,     setMaxPrice]     = useState(100000)
  const [trans,        setTrans]        = useState([])
  const [category,     setCategory]     = useState([])
  const [sort,         setSort]         = useState('newest')
  const [sidebarOpen,  setSidebarOpen]  = useState(false)

  const toggleArr = (arr, setArr, val) =>
    arr.includes(val) ? setArr(arr.filter(v => v !== val)) : setArr([...arr, val])

  const filtered = CAR_LISTINGS
    .filter(c => {
      const searchOk  = !search || c.title.toLowerCase().includes(search.toLowerCase())
      const priceOk   = c.price >= minPrice && c.price <= maxPrice
      const transOk   = trans.length === 0 || trans.includes(c.transmission)
      const catOk     = category.length === 0 || category.includes(c.category)
      return searchOk && priceOk && transOk && catOk
    })
    .sort((a, b) =>
      sort === 'price-asc'  ? a.price - b.price :
      sort === 'price-desc' ? b.price - a.price :
      sort === 'year-asc'   ? a.year - b.year  :
      b.year - a.year
    )

  const FilterPanel = () => (
    <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
      <div className="font-serif text-gold text-lg mb-6">Filter Cars</div>

      {/* Search */}
      <div className="mb-5">
        <label className="label-gold">Search</label>
        <input
          className="input-dark"
          placeholder="Make, model, year..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Price */}
      <div className="mb-5 pb-5 border-b border-border">
        <label className="label-gold">Max Price: €{maxPrice.toLocaleString()}</label>
        <input
          type="range" min={0} max={100000} step={1000} value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full mt-2 accent-gold"
        />
        <div className="flex justify-between text-muted text-[10px] mt-1">
          <span>€0</span><span>€100,000</span>
        </div>
      </div>

      {/* Transmission */}
      <div className="mb-5 pb-5 border-b border-border">
        <label className="label-gold">Transmission</label>
        <div className="space-y-2 mt-2">
          {['Manual', 'Automatic'].map(t => (
            <label key={t} className="flex items-center gap-2 text-sm text-muted cursor-pointer hover:text-cream">
              <input
                type="checkbox"
                checked={trans.includes(t)}
                onChange={() => toggleArr(trans, setTrans, t)}
                className="accent-gold"
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-5 pb-5 border-b border-border">
        <label className="label-gold">Category</label>
        <div className="space-y-2 mt-2">
          {['classic', 'modern', 'trade'].map(cat => (
            <label key={cat} className="flex items-center gap-2 text-sm text-muted cursor-pointer hover:text-cream capitalize">
              <input
                type="checkbox"
                checked={category.includes(cat)}
                onChange={() => toggleArr(category, setCategory, cat)}
                className="accent-gold"
              />
              {cat === 'modern' ? 'Modern Classic' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="label-gold">Sort By</label>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="input-dark cursor-pointer mt-1"
          style={{ background: '#222' }}
        >
          <option value="newest">Newest First</option>
          <option value="year-asc">Oldest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <button
        onClick={() => { setSearch(''); setMaxPrice(100000); setTrans([]); setCategory([]) }}
        className="w-full flex items-center justify-center gap-2 border border-border text-muted rounded-xl py-2.5 text-xs font-semibold hover:border-gold/40 hover:text-gold transition-colors"
      >
        <X size={13} /> Clear Filters
      </button>
    </div>
  )

  return (
    <div className="page-enter min-h-screen">
      <PageHeader
        eyebrow="No Bidding Required"
        title="Cars For Sale"
        subtitle="Buy directly at a fixed price. All vehicles hand-selected and personally vetted by David Golding."
      />

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar – desktop */}
          <div className="hidden lg:block">
            <FilterPanel />
          </div>

          {/* Main */}
          <div>
            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <div className="text-muted text-sm">{filtered.length} cars found</div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 border border-border rounded-xl px-4 py-2 text-sm font-semibold hover:border-gold/40 transition-colors"
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
            </div>

            <div className="hidden lg:block text-muted text-sm mb-6">{filtered.length} cars found</div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((car, i) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <CarCard car={car} onClick={() => navigate(`/cars/${car.id}`)} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted">
                <div className="text-5xl mb-4">🔍</div>
                <div className="font-serif text-xl text-cream mb-2">No cars found</div>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 bottom-0 w-80 overflow-y-auto p-4"
          >
            <div className="flex justify-end mb-2">
              <button onClick={() => setSidebarOpen(false)} className="text-muted hover:text-cream"><X size={20} /></button>
            </div>
            <FilterPanel />
          </motion.div>
        </div>
      )}
    </div>
  )
}
