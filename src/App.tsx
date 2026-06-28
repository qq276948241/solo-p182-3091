import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import StallDetail from "@/pages/StallDetail";
import Favorites from "@/pages/Favorites";
import { Navbar } from "@/components/Navbar";
import { Leaf } from "lucide-react";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stall/:id" element={<StallDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="border-t border-cream-200/80 bg-white/60">
          <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-700/60 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-forest-500 text-white">
                <Leaf size={12} strokeWidth={2.5} />
              </span>
              <span className="font-medium text-ink-700/80">周末农贸市集</span>
              <span>·</span>
              <span>每月最后一个周末 · 中心广场见</span>
            </div>
            <span>© {new Date().getFullYear()} Community Market · Made with ♥</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}
