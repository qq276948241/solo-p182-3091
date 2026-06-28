import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Clock,
  Sparkles,
  Quote,
} from "lucide-react";
import stallsData from "@/data/stalls.json";
import type { Stall } from "@/types/stall";
import { CATEGORY_TEXT, CATEGORY_LABEL } from "@/types/stall";
import { ProductCard } from "@/components/ProductCard";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { StallCard } from "@/components/StallCard";
import { cn } from "@/lib/utils";

const stalls = stallsData as Stall[];

export function StallDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stall = stalls.find((s) => s.id === id);

  const isFavorite = useFavoriteStore((s) => s.isFavorite(id ?? ""));
  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);

  if (!stall) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-4 text-5xl">🍂</div>
        <h2 className="font-display text-2xl font-semibold text-ink-800">
          找不到这个摊位
        </h2>
        <p className="mt-2 text-sm text-ink-700/60">也许它这个月没有出摊呢</p>
        <Link to="/" className="btn-primary mt-6">
          <ArrowLeft size={16} /> 回到全部摊位
        </Link>
      </div>
    );
  }

  const sameCategory = stalls
    .filter((s) => s.category === stall.category && s.id !== stall.id)
    .slice(0, 3);

  const categoryColor =
    stall.category === "vegetable"
      ? "bg-forest-500"
      : stall.category === "bakery"
      ? "bg-mustard-500"
      : "bg-ink-800";

  const accentBg =
    stall.category === "vegetable"
      ? "from-forest-50 via-white to-white"
      : stall.category === "bakery"
      ? "from-mustard-100/50 via-white to-white"
      : "from-cream-200 via-white to-white";

  return (
    <div className="container pb-20 pt-6 md:pt-8 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-ink-700 transition-all hover:bg-white hover:text-forest-600 hover:shadow"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        返回上一页
      </button>

      <div className="relative overflow-hidden rounded-3xl shadow-soft border border-cream-200/60 mb-8">
        <div className="aspect-[21/9] w-full overflow-hidden bg-cream-100 md:aspect-[21/7]">
          <img
            src={stall.coverImage}
            alt={stall.name}
            className="h-full w-full object-cover"
          />
        </div>
        <button
          onClick={() => toggleFavorite(stall.id)}
          className={cn(
            "absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-110 md:right-6 md:top-6",
            isFavorite
              ? "bg-mustard-500 text-white shadow-lg"
              : "bg-white/90 text-ink-800 shadow"
          )}
          aria-label={isFavorite ? "取消收藏" : "收藏摊位"}
        >
          <Heart size={20} strokeWidth={2.25} className={isFavorite ? "fill-white" : ""} />
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-10">
          <section className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className={cn("chip text-white", categoryColor)}>
                {CATEGORY_TEXT[stall.category]}
              </span>
              <span className="chip bg-cream-200 text-ink-800">
                {CATEGORY_LABEL[stall.category]}
              </span>
              <span className="chip border border-forest-300/40 bg-forest-50 text-forest-700">
                {stall.products.length} 件货品
              </span>
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-wide text-ink-900 md:text-4xl">
              {stall.name}
            </h1>
            <div
              className={`rounded-2xl bg-gradient-to-br p-6 border border-cream-200/60 ${accentBg}`}
            >
              <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-forest-600">
                <Sparkles size={13} strokeWidth={2} />
                摊主介绍
              </div>
              <p className="text-[15px] leading-8 text-ink-800">
                {stall.description}
              </p>
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-end justify-between border-b border-cream-200 pb-3">
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                本周供应
              </h2>
              <span className="text-xs text-ink-700/50">
                现场以实际为准
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {stall.products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>

          {sameCategory.length > 0 && (
            <section>
              <div className="mb-5 border-b border-cream-200 pb-3">
                <h2 className="font-display text-2xl font-semibold text-ink-900">
                  同品类也逛逛
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {sameCategory.map((s, i) => (
                  <StallCard key={s.id} stall={s} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="card-base p-6 space-y-5">
            <h3 className="font-display text-lg font-semibold text-ink-900 border-b border-cream-200 pb-3">
              摊位信息
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-600">
                  <MapPin size={16} strokeWidth={2} />
                </span>
                <div>
                  <div className="text-xs text-ink-700/50">摊位位置</div>
                  <div className="font-medium text-ink-800">{stall.location}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mustard-100 text-mustard-700">
                  <Clock size={16} strokeWidth={2} />
                </span>
                <div>
                  <div className="text-xs text-ink-700/50">营业时间</div>
                  <div className="font-medium leading-relaxed text-ink-800 whitespace-pre-line">
                    {stall.businessHours.replace(" / ", "\n")}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleFavorite(stall.id)}
              className={cn(
                "w-full transition-all",
                isFavorite ? "btn-secondary" : "btn-primary"
              )}
            >
              <Heart
                size={16}
                strokeWidth={2.25}
                className={isFavorite ? "fill-mustard-500 text-mustard-500" : ""}
              />
              {isFavorite ? "已收藏 · 点击取消" : "收藏这个摊位"}
            </button>
          </div>

          <div className="card-base p-6">
            <div className="flex items-center gap-4">
              <img
                src={stall.ownerAvatar}
                alt={stall.ownerName}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-mustard-300/50 ring-offset-2 ring-offset-white"
              />
              <div>
                <div className="text-xs text-ink-700/50">摊主</div>
                <div className="font-display text-lg font-semibold text-ink-900">
                  {stall.ownerName}
                </div>
              </div>
            </div>
            <div className="relative mt-5 rounded-xl bg-cream-100/60 p-4 pl-5">
              <Quote
                size={18}
                className="absolute -left-1 -top-2 text-mustard-500"
                strokeWidth={2.5}
              />
              <p className="text-sm italic leading-relaxed text-ink-700/90 pl-2">
                {stall.ownerQuote}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default StallDetail;
