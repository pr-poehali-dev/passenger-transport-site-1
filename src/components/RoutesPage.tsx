import { useState } from "react";
import { Page } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface RoutesPageProps {
  onNavigate: (page: Page) => void;
}

const regions = ["Все", "Центр", "Север", "Урал", "Сибирь"];

const routes = [
  {
    id: 1, from: "Москва", to: "Казань", region: "Центр",
    distance: "820 км", duration: "11ч 30м", frequency: "Ежедневно",
    priceFrom: 1200, stops: ["Владимир", "Нижний Новгород"],
    popular: true,
  },
  {
    id: 2, from: "Москва", to: "Нижний Новгород", region: "Центр",
    distance: "410 км", duration: "4ч 45м", frequency: "5 рейсов в день",
    priceFrom: 900, stops: ["Владимир"],
    popular: true,
  },
  {
    id: 3, from: "Санкт-Петербург", to: "Москва", region: "Север",
    distance: "700 км", duration: "8ч 00м", frequency: "Ежедневно",
    priceFrom: 1800, stops: ["Тверь"],
    popular: false,
  },
  {
    id: 4, from: "Казань", to: "Екатеринбург", region: "Урал",
    distance: "970 км", duration: "14ч 20м", frequency: "3 раза в неделю",
    priceFrom: 2100, stops: ["Ижевск", "Пермь"],
    popular: false,
  },
  {
    id: 5, from: "Москва", to: "Воронеж", region: "Центр",
    distance: "520 км", duration: "5ч 10м", frequency: "Ежедневно",
    priceFrom: 750, stops: ["Тула", "Елец"],
    popular: true,
  },
  {
    id: 6, from: "Екатеринбург", to: "Новосибирск", region: "Сибирь",
    distance: "1900 км", duration: "12ч 00м", frequency: "Ежедневно",
    priceFrom: 2400, stops: ["Тюмень", "Омск"],
    popular: false,
  },
  {
    id: 7, from: "Нижний Новгород", to: "Казань", region: "Центр",
    distance: "380 км", duration: "4ч 45м", frequency: "4 рейса в день",
    priceFrom: 600, stops: [],
    popular: false,
  },
  {
    id: 8, from: "Москва", to: "Санкт-Петербург", region: "Север",
    distance: "700 км", duration: "8ч 30м", frequency: "Ежедневно",
    priceFrom: 1600, stops: ["Тверь"],
    popular: true,
  },
];

const RoutesPage = ({ onNavigate }: RoutesPageProps) => {
  const [region, setRegion] = useState("Все");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = routes.filter(r => region === "Все" || r.region === region);

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="mb-8 animate-fade-up">
        <p className="text-primary text-xs font-medium uppercase tracking-widest mb-1">Все направления</p>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground">МАРШРУТЫ</h1>
      </div>

      {/* Region filter */}
      <div className="flex gap-2 flex-wrap mb-6 animate-fade-up-1">
        {regions.map(r => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              region === r
                ? "neon-btn"
                : "glass border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/20"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Routes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up-2">
        {filtered.map((route) => {
          const isExpanded = expandedId === route.id;
          return (
            <div
              key={route.id}
              className={`glass rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded ? "border-primary/30 shadow-[0_0_20px_rgba(0,212,255,0.1)]" : "border-white/8 glass-hover"
              }`}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* From - Arrow - To */}
                    <div>
                      <div className="font-display font-bold text-xl text-foreground">{route.from}</div>
                      <div className="text-xs text-muted-foreground">{route.region}</div>
                    </div>
                    <div className="flex flex-col items-center px-2">
                      <div className="text-xs text-muted-foreground mb-1">{route.duration}</div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full border-2 border-primary" />
                        <div className="w-10 sm:w-16 h-0.5 bg-gradient-to-r from-primary to-accent" />
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{route.distance}</div>
                    </div>
                    <div>
                      <div className="font-display font-bold text-xl text-foreground">{route.to}</div>
                      <div className="text-xs text-muted-foreground">{route.frequency}</div>
                    </div>
                  </div>

                  {route.popular && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-medium shrink-0">
                      Популярный
                    </span>
                  )}
                </div>

                {/* Price + Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div>
                    <span className="text-xs text-muted-foreground">от </span>
                    <span className="font-display text-2xl font-bold neon-text">{route.priceFrom} ₽</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : route.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass border border-white/10 text-muted-foreground hover:text-foreground text-sm transition-all"
                    >
                      <Icon name="Info" size={14} />
                      Подробнее
                    </button>
                    <button
                      onClick={() => onNavigate("schedule")}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg neon-btn text-sm font-semibold"
                    >
                      <Icon name="Ticket" size={14} />
                      Купить
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded stops */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-white/5 pt-4 bg-primary/3 animate-fade-up">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">Остановки</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm font-medium text-foreground">{route.from}</span>
                    </div>
                    {route.stops.map((stop) => (
                      <div key={stop} className="flex items-center gap-2">
                        <div className="w-4 h-px bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full border border-white/30" />
                        <span className="text-sm text-muted-foreground">{stop}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-px bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-sm font-medium text-foreground">{route.to}</span>
                    </div>
                  </div>
                  {route.stops.length === 0 && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Icon name="Zap" size={14} className="text-primary" />
                      Прямой рейс без остановок
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoutesPage;
