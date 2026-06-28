import { useMemo, useState } from "react";
import { Search, CalendarDays, MapPin, SlidersHorizontal } from "lucide-react";
import stallsData from "@/data/stalls.json";
import type { Stall, Category } from "@/types/stall";
import { StallCard } from "@/components/StallCard";
import { MarketBanner } from "@/components/MarketBanner";

type FilterKey = "all" | Category;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "全部摊位" },
  { key: "vegetable", label: "🥬 蔬菜" },
  { key: "handmade", label: "🧶 手作" },
  { key: "bakery", label: "🥐 烘焙" },
];

const stalls = stallsData as Stall[];

export function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    return stalls.filter((s) => {
      const matchCategory = filter === "all" || s.category === filter;
      if (!matchCategory) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.ownerName.toLowerCase().includes(q) ||
        s.products.some((p) => p.name.toLowerCase().includes(q))
      );
    });
  }, [search, filter]);

  const catCount = (cat: FilterKey) =>
    cat === "all"
      ? stalls.length
      : stalls.filter((s) => s.category === cat).length;

  return (
    <div className="container pb-20 pt-8 md:pt-10">
      <section className="mb-8">
        <MarketBanner />
      </section>

      <section className="mb-10 animate-fade-in">
        <div className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-forest-50 via-white to-mustard-100/60 p-6 md:p-10 shadow-soft border border-cream-200/60">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-mustard-300/50 bg-mustard-100/60 px-3.5 py-1 text-xs font-medium text-mustard-700">
              <CalendarDays size={13} strokeWidth={2} />
              每月最后一个周末 · 中心广场
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-300/40 bg-forest-50 px-3.5 py-1 text-xs font-medium text-forest-600">
              <MapPin size={13} strokeWidth={2} />
              A / B / C 三区共 {stalls.length} 个摊位
            </span>
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold leading-tight tracking-wide text-forest-700 md:text-5xl">
              本月周末市集
              <span className="mx-3 text-mustard-500">·</span>
              <span className="text-ink-800">一起来逛逛吧</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-700/70 md:text-base">
              这里有农户清晨采摘的新鲜蔬菜、手艺人一针一线做的小物、还有烘焙师凌晨揉好的热面包。每个摊位都是一个小小的故事。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={17}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/40"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索摊位名、货品或摊主……"
            className="input-field"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-xs text-ink-700/50 hover:bg-cream-200"
            >
              清除
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1 text-xs text-ink-700/50">
            <SlidersHorizontal size={14} />
            品类
          </span>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`chip transition-all ${
                  active
                    ? "bg-forest-500 text-white shadow-md"
                    : "border border-cream-200 bg-white text-ink-700 hover:bg-forest-50 hover:text-forest-600"
                }`}
              >
                {f.label}
                <span
                  className={`ml-1.5 rounded-full px-1.5 text-[10px] ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-cream-200 text-ink-700/60"
                  }`}
                >
                  {catCount(f.key)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        {results.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-cream-200 bg-white/50 text-center animate-fade-in">
            <div className="mb-3 text-4xl">🥕</div>
            <p className="font-display text-lg text-ink-800">没有找到匹配的摊位</p>
            <p className="mt-1 text-sm text-ink-700/60">换个关键词或品类试试吧</p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-baseline justify-between">
              <p className="text-sm text-ink-700/70">
                共 <span className="font-semibold text-forest-600">{results.length}</span> 个摊位
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((s, i) => (
                <StallCard key={s.id} stall={s} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;
