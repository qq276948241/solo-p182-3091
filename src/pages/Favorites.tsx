import { Link } from "react-router-dom";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import stallsData from "@/data/stalls.json";
import type { Stall } from "@/types/stall";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { CATEGORY_TEXT } from "@/types/stall";
import { cn } from "@/lib/utils";

const stalls = stallsData as Stall[];

export function Favorites() {
  const favIds = useFavoriteStore((s) => s.stallIds);
  const removeFavorite = useFavoriteStore((s) => s.removeFavorite);

  const favs = favIds
    .map((id) => stalls.find((s) => s.id === id))
    .filter((s): s is Stall => !!s);

  return (
    <div className="container pb-20 pt-8 md:pt-10 animate-fade-in">
      <section className="mb-10">
        <div className="flex flex-col gap-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-mustard-100 px-4 py-1.5 text-sm font-medium text-mustard-700">
            <Heart size={14} className="fill-mustard-500 text-mustard-500" strokeWidth={2} />
            我的收藏
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-wide text-forest-700 md:text-4xl">
            收藏的摊位
          </h1>
          <p className="text-sm text-ink-700/70">
            提前逛逛，周末直奔你最爱的小摊子
          </p>
        </div>
      </section>

      {favs.length === 0 ? (
        <section className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cream-200 bg-white/60 px-6 py-20 text-center animate-fade-in">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cream-100 text-5xl">
            🌿
          </div>
          <h2 className="font-display text-2xl font-semibold text-ink-900">
            还没有收藏摊位
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-700/65">
            逛逛市集，遇到喜欢的摊位，点一下卡片右上角的小爱心就可以收藏起来啦。
          </p>
          <Link to="/" className="btn-primary mt-8">
            去逛逛全部摊位
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </section>
      ) : (
        <>
          <div className="mb-5 flex items-baseline justify-between">
            <p className="text-sm text-ink-700/70">
              共收藏
              <span className="mx-1 font-semibold text-mustard-600">
                {favs.length}
              </span>
              个摊位
            </p>
          </div>
          <div className="space-y-4">
            {favs.map((s, i) => {
              const categoryColor =
                s.category === "vegetable"
                  ? "bg-forest-500"
                  : s.category === "bakery"
                  ? "bg-mustard-500"
                  : "bg-ink-800";

              return (
                <article
                  key={s.id}
                  className="group flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-card transition-all hover:shadow-cardHover sm:flex-row sm:items-center animate-slide-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Link
                    to={`/stall/${s.id}`}
                    className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-cream-100 sm:aspect-[5/4] sm:w-48"
                  >
                    <img
                      src={s.coverImage}
                      alt={s.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={cn(
                        "absolute left-2 top-2 chip text-white text-[11px]",
                        categoryColor
                      )}
                    >
                      {CATEGORY_TEXT[s.category]}
                    </span>
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link to={`/stall/${s.id}`}>
                      <h3 className="font-display text-xl font-semibold text-ink-900 transition-colors hover:text-forest-600">
                        {s.name}
                      </h3>
                    </Link>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-700/70">
                      {s.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-ink-700/60">
                      <span className="inline-flex items-center gap-1">
                        📍 {s.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        🛒 {s.products.length} 件货品
                      </span>
                      <span className="inline-flex items-center gap-1">
                        👤 {s.ownerName}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch">
                    <Link
                      to={`/stall/${s.id}`}
                      className="btn-primary flex-1 sm:w-28"
                    >
                      查看详情
                    </Link>
                    <button
                      onClick={() => removeFavorite(s.id)}
                      className="btn-ghost border border-cream-200 text-ink-700/70 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      aria-label="移除收藏"
                    >
                      <Trash2 size={16} strokeWidth={2} />
                      <span className="hidden sm:inline">移除</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link to="/" className="btn-secondary">
              继续逛其他摊位
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
