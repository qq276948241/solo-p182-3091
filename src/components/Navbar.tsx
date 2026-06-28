import { Link, useLocation } from "react-router-dom";
import { Heart, Leaf, Calendar } from "lucide-react";
import { useFavoriteStore } from "@/store/useFavoriteStore";

export function Navbar() {
  const location = useLocation();
  const count = useFavoriteStore((s) => s.stallIds.length);
  const isFavPage = location.pathname === "/favorites";

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200/80 bg-cream-100/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-500 text-white">
            <Leaf size={20} strokeWidth={2} />
          </span>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold text-forest-600 tracking-wide">
              周末农贸市集
            </div>
            <div className="text-[11px] text-ink-700/60">Monthly Market</div>
          </div>
        </Link>

        <div className="hidden items-center gap-1.5 rounded-full bg-mustard-100/70 px-4 py-1.5 md:flex">
          <Calendar size={14} className="text-mustard-600" strokeWidth={2} />
          <span className="text-xs font-medium text-mustard-700">
            本月 · 最后一个周末
          </span>
        </div>

        <nav className="flex items-center gap-2">
          <Link to="/" className="btn-ghost hidden sm:inline-flex">
            全部摊位
          </Link>
          <Link
            to="/favorites"
            className={`${isFavPage ? "bg-forest-50 !text-forest-600" : ""} btn-ghost`}
          >
            <Heart
              size={16}
              strokeWidth={2}
              className={count > 0 ? "fill-mustard-500 text-mustard-500" : ""}
            />
            <span className="hidden sm:inline">我的收藏</span>
            {count > 0 && (
              <span className="ml-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-mustard-500 px-1.5 text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
