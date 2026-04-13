import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "bookings" | "tickets" | "profile";

const bookings = [
  {
    id: "BK-2847", route: "Москва → Казань", date: "15 апреля 2026", departure: "08:00",
    arrival: "19:30", seat: "14А", status: "active", price: 1200, bus: "TR-101",
  },
  {
    id: "BK-2391", route: "Москва → Воронеж", date: "2 апреля 2026", departure: "07:15",
    arrival: "12:25", seat: "7Б", status: "done", price: 750, bus: "TR-105",
  },
  {
    id: "BK-2103", route: "Нижний Новгород → Казань", date: "20 марта 2026", departure: "13:00",
    arrival: "17:45", seat: "22В", status: "done", price: 600, bus: "TR-108",
  },
];

const CabinetPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("bookings");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  if (!isLoggedIn) {
    return (
      <div className="pt-24 pb-24 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md animate-fade-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl neon-btn flex items-center justify-center mx-auto mb-4 animate-float">
              <Icon name="User" size={28} />
            </div>
            <h1 className="font-display text-3xl font-black text-foreground">ЛИЧНЫЙ КАБИНЕТ</h1>
            <p className="text-muted-foreground text-sm mt-2">Войдите, чтобы увидеть ваши билеты и бронирования</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10">
            <form onSubmit={e => { e.preventDefault(); setIsLoggedIn(true); }} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Email</label>
                <div className="relative">
                  <Icon name="Mail" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    required
                    type="email"
                    value={loginForm.email}
                    onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="ivan@example.ru"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Пароль</label>
                <div className="relative">
                  <Icon name="Lock" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    required
                    type="password"
                    value={loginForm.password}
                    onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>

              <button type="submit" className="neon-btn rounded-xl py-3.5 font-display font-semibold text-base uppercase tracking-wider mt-2 flex items-center gap-2 justify-center">
                <Icon name="LogIn" size={16} />
                Войти в кабинет
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-white/5 text-center">
              <p className="text-sm text-muted-foreground">
                Нет аккаунта?{" "}
                <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Зарегистрироваться
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-up">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl neon-btn flex items-center justify-center shrink-0 font-display font-bold text-xl">
            ИИ
          </div>
          <div>
            <h1 className="font-display text-2xl font-black text-foreground">ИВАН ИВАНОВ</h1>
            <p className="text-muted-foreground text-sm">ivan@example.ru · Пассажир с 2024 года</p>
          </div>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-2 px-4 py-2.5 glass border border-white/10 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
        >
          <Icon name="LogOut" size={14} />
          Выйти
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-fade-up-1">
        {[
          { label: "Поездок", value: "12", icon: "Bus" },
          { label: "Км пройдено", value: "8 420", icon: "MapPin" },
          { label: "Потрачено", value: "14 200 ₽", icon: "CreditCard" },
          { label: "Бонусы", value: "430 ✦", icon: "Star" },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl p-4 border border-white/8">
            <Icon name={s.icon} size={16} className="text-primary mb-2" />
            <div className="font-display font-bold text-xl text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 glass rounded-xl p-1 border border-white/8 mb-6 w-full sm:w-fit animate-fade-up-2">
        {([
          { id: "bookings", label: "Бронирования", icon: "Calendar" },
          { id: "tickets", label: "Билеты", icon: "Ticket" },
          { id: "profile", label: "Профиль", icon: "Settings" },
        ] as { id: Tab; label: string; icon: string }[]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "neon-btn"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name={tab.icon} size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings tab */}
      {activeTab === "bookings" && (
        <div className="flex flex-col gap-4 animate-fade-up">
          {bookings.map((b) => (
            <div
              key={b.id}
              className={`glass rounded-2xl border overflow-hidden transition-all ${
                b.status === "active" ? "border-primary/20" : "border-white/8"
              }`}
            >
              <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    b.status === "active" ? "bg-primary/10 border border-primary/20" : "bg-white/5 border border-white/10"
                  }`}>
                    <Icon name="Bus" size={18} className={b.status === "active" ? "text-primary" : "text-muted-foreground"} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{b.route}</div>
                    <div className="text-sm text-muted-foreground">{b.date} · {b.departure} → {b.arrival}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Рейс {b.bus} · Место {b.seat}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    b.status === "active" ? "status-active" : "status-done"
                  }`}>
                    {b.status === "active" ? "Предстоит" : "Завершено"}
                  </span>
                  <span className="font-display font-bold text-lg neon-text">{b.price} ₽</span>
                </div>
              </div>

              {b.status === "active" && (
                <div className="border-t border-primary/10 bg-primary/3 px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Icon name="Info" size={14} />
                    <span>Бесплатная отмена до 15 апреля 06:00</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 glass border border-white/10 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-all">
                      <Icon name="Download" size={13} />
                      Скачать билет
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 hover:bg-red-500/15 transition-all">
                      <Icon name="X" size={13} />
                      Отменить
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tickets tab */}
      {activeTab === "tickets" && (
        <div className="animate-fade-up">
          {bookings.filter(b => b.status === "active").map(b => (
            <div key={b.id} className="glass rounded-2xl border border-primary/20 overflow-hidden mb-4">
              {/* Ticket design */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-bold text-2xl text-foreground tracking-wide">ТРАНС<span className="neon-text">ПОРТ</span></span>
                  <span className="text-xs font-mono text-muted-foreground border border-white/10 px-2 py-1 rounded">{b.id}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-3xl font-display font-black text-foreground">МСК</div>
                    <div className="text-muted-foreground text-sm">Москва</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-muted-foreground mb-1">15 апреля 2026</div>
                    <div className="w-full flex items-center">
                      <div className="w-2 h-2 rounded-full border-2 border-primary" />
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-accent" />
                      <Icon name="Bus" size={20} className="text-accent mx-1" />
                      <div className="flex-1 h-0.5 bg-accent" />
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">11ч 30м</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-display font-black text-foreground">КЗН</div>
                    <div className="text-muted-foreground text-sm">Казань</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-dashed border-white/10 px-6 py-4 flex flex-wrap gap-6">
                {[
                  ["Отправление", "08:00"],
                  ["Место", b.seat],
                  ["Рейс", b.bus],
                  ["Цена", `${b.price} ₽`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{k}</div>
                    <div className="font-display font-bold text-lg text-foreground">{v}</div>
                  </div>
                ))}
                <div className="ml-auto">
                  <button className="neon-btn px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
                    <Icon name="Download" size={14} />
                    Скачать PDF
                  </button>
                </div>
              </div>
            </div>
          ))}

          {bookings.filter(b => b.status === "active").length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Icon name="Ticket" size={40} className="mx-auto mb-3 opacity-30" />
              <p>Нет активных билетов</p>
            </div>
          )}
        </div>
      )}

      {/* Profile tab */}
      {activeTab === "profile" && (
        <div className="glass rounded-2xl border border-white/8 p-6 sm:p-8 max-w-xl animate-fade-up">
          <h3 className="font-display font-bold text-xl text-foreground mb-6">ЛИЧНЫЕ ДАННЫЕ</h3>
          <div className="flex flex-col gap-4">
            {[
              { label: "Имя", value: "Иван", icon: "User" },
              { label: "Фамилия", value: "Иванов", icon: "User" },
              { label: "Email", value: "ivan@example.ru", icon: "Mail" },
              { label: "Телефон", value: "+7 (999) 000-00-00", icon: "Phone" },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">{f.label}</label>
                <div className="relative">
                  <Icon name={f.icon} size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    defaultValue={f.value}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>
            ))}
            <button className="neon-btn rounded-xl py-3 font-display font-semibold text-sm uppercase tracking-wider mt-2 flex items-center gap-2 justify-center">
              <Icon name="Save" size={15} />
              Сохранить изменения
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabinetPage;
