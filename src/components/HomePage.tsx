import { useState } from "react";
import { Page } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const stats = [
  { value: "150+", label: "маршрутов", icon: "MapPin" },
  { value: "2.4М", label: "пассажиров", icon: "Users" },
  { value: "98%", label: "вовремя", icon: "CheckCircle" },
  { value: "24/7", label: "поддержка", icon: "Headphones" },
];

const cities = ["Москва", "Санкт-Петербург", "Казань", "Нижний Новгород", "Екатеринбург", "Новосибирск"];

const HomePage = ({ onNavigate }: HomePageProps) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/01f81237-d702-4e5c-8678-28cec993fb55/files/ea82dc85-74ca-4dfc-a844-3766921225e8.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Decorative glow */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full text-xs font-medium text-primary border border-primary/20 mb-6 animate-fade-up">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Онлайн-продажа билетов
            </div>

            <h1 className="font-display text-5xl sm:text-7xl font-black leading-none mb-4 animate-fade-up-1">
              <span className="text-foreground">КУДА</span><br />
              <span className="shimmer-text">ОТПРАВИМСЯ?</span>
            </h1>

            <p className="text-muted-foreground text-lg mb-10 animate-fade-up-2 max-w-lg">
              Более 150 маршрутов по всей России. Удобное бронирование, электронные билеты и личный кабинет пассажира.
            </p>

            {/* Search form */}
            <div className="glass rounded-2xl p-4 sm:p-6 border border-white/10 animate-fade-up-3">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                {/* From */}
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block uppercase tracking-wider">Откуда</label>
                  <div className="relative">
                    <Icon name="MapPin" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                    <input
                      list="cities-from"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Город отправления"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <datalist id="cities-from">
                      {cities.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                </div>

                {/* Swap */}
                <button
                  onClick={swap}
                  className="sm:mb-0 self-end sm:self-auto p-3 glass rounded-xl border border-white/10 hover:border-primary/30 transition-all hover:rotate-180 duration-300 hidden sm:block"
                >
                  <Icon name="ArrowLeftRight" size={16} className="text-primary" />
                </button>

                {/* To */}
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block uppercase tracking-wider">Куда</label>
                  <div className="relative">
                    <Icon name="Navigation" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                    <input
                      list="cities-to"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="Город назначения"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <datalist id="cities-to">
                      {cities.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                </div>

                {/* Date */}
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block uppercase tracking-wider">Дата</label>
                  <div className="relative">
                    <Icon name="Calendar" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Search btn */}
                <button
                  onClick={() => onNavigate("schedule")}
                  className="neon-btn rounded-xl px-6 py-3 font-display font-semibold text-sm uppercase tracking-wider flex items-center gap-2 justify-center whitespace-nowrap"
                >
                  <Icon name="Search" size={16} />
                  Найти
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`glass rounded-2xl p-6 border border-white/8 glass-hover animate-fade-up-${i + 1}`}
            >
              <Icon name={s.icon} size={24} className="text-primary mb-3" />
              <div className="font-display text-3xl font-bold text-foreground">{s.value}</div>
              <div className="text-muted-foreground text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular routes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary text-xs font-medium uppercase tracking-widest mb-1">Популярные</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">МАРШРУТЫ</h2>
          </div>
          <button
            onClick={() => onNavigate("routes")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Все маршруты
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { from: "Москва", to: "Казань", price: "1 200", time: "11ч 30м", departure: "08:00" },
            { from: "Москва", to: "Нижний Новгород", price: "900", time: "4ч 45м", departure: "09:30" },
            { from: "Санкт-Петербург", to: "Москва", price: "1 800", time: "8ч 00м", departure: "22:00" },
            { from: "Казань", to: "Екатеринбург", price: "2 100", time: "14ч 20м", departure: "06:00" },
            { from: "Москва", to: "Воронеж", price: "750", time: "5ч 10м", departure: "07:15" },
            { from: "Екатеринбург", to: "Новосибирск", price: "2 400", time: "12ч 00м", departure: "18:00" },
          ].map((route, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 border border-white/8 glass-hover cursor-pointer"
              onClick={() => onNavigate("schedule")}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-semibold text-foreground">{route.from}</div>
                    <div className="text-xs text-muted-foreground">{route.departure}</div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 px-2">
                    <div className="text-xs text-muted-foreground">{route.time}</div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full border border-primary" />
                      <div className="w-12 h-px bg-gradient-to-r from-primary to-accent" />
                      <Icon name="Bus" size={14} className="text-accent" />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{route.to}</div>
                    <div className="text-xs text-muted-foreground">прибытие</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-xl font-display font-bold neon-text">{route.price} ₽</span>
                <span className="text-xs text-muted-foreground bg-white/5 px-2.5 py-1 rounded-full">от 1 места</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-24">
        <div className="relative glass rounded-3xl p-8 sm:p-12 border border-white/10 overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-5xl font-black text-foreground mb-4">
              ЗАРЕГИСТРИРУЙТЕСЬ<br />
              <span className="shimmer-text">И ПОЛУЧИТЕ СКИДКУ 10%</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Личный кабинет пассажира — история поездок, электронные билеты и эксклюзивные предложения.
            </p>
            <button
              onClick={() => onNavigate("cabinet")}
              className="neon-btn rounded-xl px-8 py-4 font-display text-lg font-semibold uppercase tracking-wider inline-flex items-center gap-3"
            >
              <Icon name="UserPlus" size={20} />
              Открыть кабинет
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
