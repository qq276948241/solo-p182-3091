import { useEffect, useState } from "react";
import { CalendarClock, MapPin, Clock, Sparkles } from "lucide-react";
import {
  getNextMarketDate,
  getCountdown,
  formatDateRange,
  type MarketDateInfo,
  type CountdownInfo,
} from "@/lib/utils";

function padZero(n: number): string {
  return n.toString().padStart(2, "0");
}

export function MarketBanner() {
  const [now, setNow] = useState<Date>(new Date());
  const [marketInfo, setMarketInfo] = useState<MarketDateInfo>(() =>
    getNextMarketDate()
  );
  const [countdown, setCountdown] = useState<CountdownInfo>(() =>
    getCountdown(getNextMarketDate())
  );

  useEffect(() => {
    const tick = () => {
      const currentNow = new Date();
      setNow(currentNow);
      const info = getNextMarketDate(currentNow);
      setMarketInfo(info);
      setCountdown(getCountdown(info, currentNow));
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateText = formatDateRange(marketInfo);
  const { isOngoing, isTodayMarket } = countdown;

  const renderCountdown = () => {
    if (isOngoing) {
      return (
        <div className="flex items-center gap-2 rounded-full bg-mustard-500/20 px-4 py-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mustard-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mustard-500" />
          </span>
          <span className="font-semibold text-mustard-700">
            市集正在进行中 · 快来逛逛吧
          </span>
        </div>
      );
    }

    if (isTodayMarket) {
      return (
        <div className="flex items-center gap-2 rounded-full bg-forest-500/20 px-4 py-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest-500" />
          </span>
          <span className="font-semibold text-forest-700">
            今天就有市集 · 早上 8 点开始
          </span>
        </div>
      );
    }

    const { days, hours, minutes, seconds } = countdown;

    return (
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-medium text-ink-700/70">
          距离下次市集还有
        </span>
        <div className="flex items-baseline gap-1.5 font-display">
          <div className="flex items-baseline">
            <span className="text-3xl font-semibold text-forest-600 md:text-4xl">
              {days}
            </span>
            <span className="ml-1 text-sm font-medium text-forest-500">天</span>
          </div>
          <span className="text-2xl font-semibold text-mustard-500 mx-0.5">·</span>
          <div className="flex items-baseline">
            <span className="text-3xl font-semibold tabular-nums text-forest-600 md:text-4xl">
              {padZero(hours)}
            </span>
            <span className="ml-1 text-sm font-medium text-forest-500">时</span>
          </div>
          <span className="text-2xl font-semibold text-mustard-500 mx-0.5">·</span>
          <div className="flex items-baseline">
            <span className="text-3xl font-semibold tabular-nums text-forest-600 md:text-4xl">
              {padZero(minutes)}
            </span>
            <span className="ml-1 text-sm font-medium text-forest-500">分</span>
          </div>
          <span className="text-2xl font-semibold text-mustard-500 mx-0.5 hidden sm:inline">·</span>
          <div className="hidden items-baseline sm:flex">
            <span className="text-3xl font-semibold tabular-nums text-forest-600 md:text-4xl">
              {padZero(seconds)}
            </span>
            <span className="ml-1 text-sm font-medium text-forest-500">秒</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-forest-50 via-white to-mustard-100/60 shadow-soft border border-cream-200/60 animate-fade-in">
      <div className="relative p-5 sm:p-6 md:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-forest-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-mustard-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {isOngoing ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-mustard-300/50 bg-mustard-100/80 px-3.5 py-1 text-xs font-semibold text-mustard-700">
                  <Sparkles size={13} strokeWidth={2.5} className="text-mustard-500" />
                  开集啦 · 火热进行中
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-300/40 bg-forest-50 px-3.5 py-1 text-xs font-medium text-forest-600">
                  <CalendarClock size={13} strokeWidth={2} />
                  每月最后一个周末
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cream-200 bg-white/80 px-3.5 py-1 text-xs font-medium text-ink-700/70">
                <CalendarClock size={13} strokeWidth={2} className="text-mustard-500" />
                {dateText}
              </span>
            </div>

            {renderCountdown()}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-ink-700/80">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                <MapPin size={15} strokeWidth={2} className="text-forest-500" />
              </span>
              <div className="leading-tight">
                <div className="text-[11px] text-ink-700/50">地点</div>
                <div className="font-medium">小区中心广场</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-ink-700/80">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                <Clock size={15} strokeWidth={2} className="text-mustard-500" />
              </span>
              <div className="leading-tight">
                <div className="text-[11px] text-ink-700/50">营业时间</div>
                <div className="font-medium">周六 8:00-18:00 / 周日 8:00-16:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketBanner;
