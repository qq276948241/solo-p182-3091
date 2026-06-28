import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Stall } from "@/types/stall";
import { CATEGORY_LABEL, CATEGORY_TEXT } from "@/types/stall";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { cn } from "@/lib/utils";

interface StallCardProps {
  stall: Stall;
  index?: number;
}

export function StallCard({ stall, index = 0 }: StallCardProps) {
  const isFavorite = useFavoriteStore((s) => s.isFavorite(stall.id));
  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);

  const categoryColor =
    stall.category === "vegetable"
      ? "bg-forest-500 text-white"
      : stall.category === "bakery"
      ? "bg-mustard-500 text-white"
      : "bg-ink-800 text-white";

  const tagBg =
    stall.category === "vegetable"
      ? "bg-forest-50 text-forest-600"
      : stall.category === "bakery"
      ? "bg-mustard-100 text-mustard-700"
      : "bg-cream-200 text-ink-800";

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(stall.id);
  };

  return (
    <Link
      to={`/stall/${stall.id}`}
      className={cn("card-base group block animate-slide-up")}
      style={{ animationDelay: `${Math.min(index * 40, 600)}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={stall.coverImage}
          alt={stall.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className={cn("chip", categoryColor)}>
            {CATEGORY_TEXT[stall.category]}
          </span>
          <button
            type="button"
            onClick={handleFav}
            aria-label={isFavorite ? "取消收藏" : "收藏摊位"}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-all hover:scale-110 hover:bg-white",
              isFavorite && "bg-mustard-500/95 text-white"
            )}
          >
            <Heart
              size={16}
              strokeWidth={2.25}
              className={isFavorite ? "fill-white" : ""}
            />
          </button>
        </div>
      </div>

      <div className="space-y-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight text-ink-900">
            {stall.name}
          </h3>
          <span className={cn("shrink-0 chip", tagBg)}>
            {CATEGORY_LABEL[stall.category]}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-700/75">
          {stall.description}
        </p>
        <div className="flex items-center justify-between border-t border-cream-200 pt-3 text-xs text-ink-700/60">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
            {stall.location}
          </span>
          <span>{stall.products.length} 件货品</span>
        </div>
      </div>
    </Link>
  );
}
