import type { Product } from "@/types/stall";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-white/70 transition-all hover:border-forest-100 hover:shadow-card animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.note && (
          <span className="absolute left-2 top-2 rounded-full bg-mustard-500 px-2.5 py-0.5 text-[11px] font-medium text-white shadow">
            {product.note}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h4 className="font-medium text-ink-800">{product.name}</h4>
        <div className="mt-auto flex items-baseline justify-between">
          <div>
            <span className="font-display text-lg font-semibold text-forest-600">
              ¥{product.price}
            </span>
            <span className="ml-1 text-[11px] text-ink-700/50">
              {product.unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
