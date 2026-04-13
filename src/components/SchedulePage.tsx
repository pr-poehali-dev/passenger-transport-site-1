import { useState } from "react";
import Icon from "@/components/ui/icon";

const allFlights = [
  { id: "TR-101", from: "Москва", to: "Казань", departure: "08:00", arrival: "19:30", duration: "11ч 30м", price: 1200, seats: 12, type: "Экспресс" },
  { id: "TR-102", from: "Москва", to: "Нижний Новгород", departure: "09:30", arrival: "14:15", duration: "4ч 45м", price: 900, seats: 5, type: "Стандарт" },
  { id: "TR-103", from: "Санкт-Петербург", to: "Москва", departure: "22:00", arrival: "06:00", duration: "8ч 00м", price: 1800, seats: 0, type: "Ночной" },
  { id: "TR-104", from: "Казань", to: "Екатеринбург", departure: "06:00", arrival: "20:20", duration: "14ч 20м", price: 2100, seats: 18, type: "Стандарт" },
  { id: "TR-105", from: "Москва", to: "Воронеж", departure: "07:15", arrival: "12:25", duration: "5ч 10м", price: 750, seats: 3, type: "Экспресс" },
  { id: "TR-106", from: "Екатеринбург", to: "Новосибирск", departure: "18:00", arrival: "06:00", duration: "12ч 00м", price: 2400, seats: 22, type: "Ночной" },
  { id: "TR-107", from: "Москва", to: "Санкт-Петербург", departure: "10:00", arrival: "18:30", duration: "8ч 30м", price: 1600, seats: 8, type: "Экспресс" },
  { id: "TR-108", from: "Нижний Новгород", to: "Казань", departure: "13:00", arrival: "17:45", duration: "4ч 45м", price: 600, seats: 14, type: "Стандарт" },
];

const types = ["Все", "Экспресс", "Стандарт", "Ночной"];

const SchedulePage = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Все");
  const [sortBy, setSortBy] = useState<"price" | "departure">("departure");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = allFlights
    .filter(f =>
      (filterType === "Все" || f.type === filterType) &&
      (
        f.from.toLowerCase().includes(search.toLowerCase()) ||
        f.to.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => sortBy === "price" ? a.price - b.price : a.departure.localeCompare(b.departure));

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="mb-8 animate-fade-up">
        <p className="text-primary text-xs font-medium uppercase tracking-widest mb-1">Актуальное</p>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground">РАСПИСАНИЕ</h1>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4 border border-white/8 mb-6 flex flex-col sm:flex-row gap-3 animate-fade-up-1">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по городу..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filterType === t
                  ? "neon-btn"
                  : "glass border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("departure")}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${sortBy === "departure" ? "text-primary border border-primary/30 bg-primary/5" : "text-muted-foreground border border-white/8 hover:text-foreground"}`}
          >
            <Icon name="Clock" size={13} />
            По времени
          </button>
          <button
            onClick={() => setSortBy("price")}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${sortBy === "price" ? "text-primary border border-primary/30 bg-primary/5" : "text-muted-foreground border border-white/8 hover:text-foreground"}`}
          >
            <Icon name="TrendingUp" size={13} />
            По цене
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl border border-white/8 overflow-hidden animate-fade-up-2">
        <div className="hidden sm:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_120px] gap-4 px-6 py-3 border-b border-white/5">
          {["Рейс", "Маршрут", "Отправление", "Прибытие", "В пути", "Цена", ""].map((h, i) => (
            <div key={i} className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{h}</div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-40" />
            <p>Рейсы не найдены</p>
          </div>
        )}

        {filtered.map((f, i) => {
          const isSelected = selected === f.id;
          const noSeats = f.seats === 0;

          return (
            <div
              key={f.id}
              className={`border-b border-white/5 last:border-0 transition-all duration-200 ${
                isSelected ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-white/2"
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Mobile layout */}
              <div className="sm:hidden p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">{f.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    f.type === "Экспресс" ? "text-primary bg-primary/10 border border-primary/20" :
                    f.type === "Ночной" ? "text-accent bg-accent/10 border border-accent/20" :
                    "text-muted-foreground bg-white/5 border border-white/10"
                  }`}>{f.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{f.from}</span>
                  <Icon name="ArrowRight" size={14} className="text-primary" />
                  <span className="font-semibold">{f.to}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{f.departure} → {f.arrival} · {f.duration}</span>
                  <span className="font-display font-bold neon-text">{f.price} ₽</span>
                </div>
                <button
                  disabled={noSeats}
                  onClick={() => setSelected(isSelected ? null : f.id)}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    noSeats ? "bg-white/5 text-muted-foreground cursor-not-allowed" :
                    isSelected ? "bg-primary/20 border border-primary text-primary" : "neon-btn"
                  }`}
                >
                  {noSeats ? "Нет мест" : isSelected ? "Выбрано ✓" : "Купить билет"}
                </button>
              </div>

              {/* Desktop layout */}
              <div className="hidden sm:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_120px] gap-4 items-center px-6 py-4">
                <div>
                  <div className="font-mono text-xs text-primary font-bold">{f.id}</div>
                  <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                    f.type === "Экспресс" ? "text-primary bg-primary/10 border border-primary/20" :
                    f.type === "Ночной" ? "text-accent bg-accent/10 border border-accent/20" :
                    "text-muted-foreground bg-white/5 border border-white/10"
                  }`}>{f.type}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{f.from}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full border border-primary/60" />
                    <div className="w-8 h-px bg-gradient-to-r from-primary/60 to-accent/60" />
                    <Icon name="ArrowRight" size={12} className="text-accent/60" />
                  </div>
                  <span className="font-medium text-foreground">{f.to}</span>
                </div>

                <div className="font-semibold text-foreground">{f.departure}</div>
                <div className="text-muted-foreground">{f.arrival}</div>

                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Icon name="Clock" size={13} />
                  {f.duration}
                </div>

                <div>
                  <div className="font-display font-bold text-lg neon-text">{f.price} ₽</div>
                  <div className={`text-xs mt-0.5 ${noSeats ? "text-destructive" : f.seats <= 5 ? "text-yellow-400" : "text-muted-foreground"}`}>
                    {noSeats ? "Мест нет" : `${f.seats} мест`}
                  </div>
                </div>

                <button
                  disabled={noSeats}
                  onClick={() => setSelected(isSelected ? null : f.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    noSeats ? "bg-white/5 text-muted-foreground cursor-not-allowed" :
                    isSelected ? "bg-primary/10 border border-primary text-primary" : "neon-btn"
                  }`}
                >
                  {noSeats ? "Нет мест" : isSelected ? "Выбрано ✓" : "Купить"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="mt-4 glass rounded-2xl p-5 border border-primary/20 bg-primary/5 animate-fade-up flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Icon name="Ticket" size={24} className="text-primary" />
            <div>
              <div className="font-semibold text-foreground">Рейс {selected} выбран</div>
              <div className="text-sm text-muted-foreground">Перейдите в личный кабинет для оформления</div>
            </div>
          </div>
          <button className="neon-btn px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2">
            <Icon name="ShoppingCart" size={15} />
            Оформить билет
          </button>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
