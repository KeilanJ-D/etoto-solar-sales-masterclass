'use client'

import Image from 'next/image'
import { Check, Sparkles } from 'lucide-react'

export interface ProductPickerItem {
  sku: string
  brand: string
  name: string
  /** Image path under /public, e.g. /products/batteries/TESLA.png */
  imagePath: string
  /** Primary spec line, e.g. "13.5 kWh" or "470W" */
  primarySpec: string
  /** Optional secondary spec line, e.g. "All-in-one inverter" */
  secondarySpec?: string
  /** £ per unit (number or 'Included') */
  pricePerUnit?: number | 'Included'
  badge?: string
  /** True if this SKU lands in the recommendation engine band */
  isRecommended?: boolean
}

interface ProductPickerProps {
  label: string
  items: ProductPickerItem[]
  selectedSku: string | null
  onSelect: (sku: string) => void
  /** Optional hint shown above the grid */
  hint?: string
  /** Render in compact 2/4-col grid (for big lists) instead of 1/2/3-col */
  compact?: boolean
  emptyMessage?: string
}

export default function ProductPicker({
  label,
  items,
  selectedSku,
  onSelect,
  hint,
  compact = false,
  emptyMessage = 'No products available.',
}: ProductPickerProps) {
  const gridClass = compact
    ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="text-sm font-semibold text-slate-900">{label}</label>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
          {emptyMessage}
        </div>
      ) : (
        <div className={gridClass}>
          {items.map((item) => {
            const isSelected = item.sku === selectedSku
            return (
              <button
                key={item.sku}
                type="button"
                onClick={() => onSelect(item.sku)}
                className={`group relative text-left rounded-xl border-2 bg-white p-3 transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-[#E8192C] shadow-md ring-2 ring-[#E8192C]/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                aria-pressed={isSelected}
              >
                {/* Badges row */}
                <div className="flex items-center gap-1 mb-2 min-h-[20px]">
                  {item.isRecommended && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      Recommended
                    </span>
                  )}
                  {item.badge && !item.isRecommended && (
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Image */}
                <div className="bg-slate-50 rounded-lg h-24 sm:h-28 flex items-center justify-center mb-2 overflow-hidden">
                  <Image
                    src={item.imagePath}
                    alt={`${item.brand} ${item.name}`}
                    width={140}
                    height={100}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>

                {/* Brand + name */}
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
                  {item.brand}
                </p>
                <p className="text-sm font-bold text-slate-900 leading-tight mb-1.5 truncate">
                  {item.name}
                </p>

                {/* Specs */}
                <p className="text-xs text-slate-700 font-medium">{item.primarySpec}</p>
                {item.secondarySpec && (
                  <p className="text-[11px] text-slate-500">{item.secondarySpec}</p>
                )}

                {/* Price */}
                {item.pricePerUnit !== undefined && (
                  <p className="mt-2 text-xs font-bold text-slate-900">
                    {item.pricePerUnit === 'Included' ? (
                      <span className="text-emerald-600">Included</span>
                    ) : (
                      <>£{item.pricePerUnit.toLocaleString()}<span className="text-slate-500 font-normal"> /unit</span></>
                    )}
                  </p>
                )}

                {/* Selected check overlay */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#E8192C] text-white flex items-center justify-center shadow">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
