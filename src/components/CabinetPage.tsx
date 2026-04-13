import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { api, User, Booking } from "@/lib/api";

type Tab = "bookings" | "tickets" | "profile";
type AuthMode = "login" | "register";

const CabinetPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("bookings");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [profileForm, setProfileForm] = useState({ name: "", phone: "" });

  useEffect(() => {
    api.getMe().then(u => {
      if (u) {
        setUser(u);
        setProfileForm({ name: u.name, phone: u.phone });
        loadBookings();
      }
      setLoading(false);
    });
  }, []);

  const loadBookings = async () => {
    const data = await api.getBookings();
    setBookings(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setAuthLoading(true);
    try {
      const res = await api.login(loginForm.email, loginForm.password);
      setUser(res.user);
      setProfileForm({ name: res.user.name, phone: res.user.phone });
      loadBookings();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setAuthLoading(true);
    try {
      const res = await api.register(regForm.name, regForm.email, regForm.password, regForm.phone);
      setUser(res.user);
      setProfileForm({ name: res.user.name, phone: res.user.phone });
      loadBookings();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
    setBookings([]);
  };

  const handleCancelBooking = async (id: number) => {
    await api.cancelBooking(id);
    loadBookings();
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateProfile(profileForm.name, profileForm.phone);
    setUser(u => u ? { ...u, ...profileForm } : u);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground text-sm">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-24 pb-24 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md animate-fade-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl neon-btn flex items-center justify-center mx-auto mb-4 animate-float">
              <Icon name="User" size={28} />
            </div>
            <h1 className="font-display text-3xl font-black text-foreground">ЛИЧНЫЙ КАБИНЕТ</h1>
            <p className="text-muted-foreground text-sm mt-2">
              {authMode === "login" ? "Войдите в свой аккаунт" : "Создайте аккаунт пассажира"}
            </p>
          </div>

          <div className="flex gap-1 glass rounded-xl p-1 border border-white/8 mb-5">
            <button onClick={() => { setAuthMode("login"); setError(""); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${authMode === "login" ? "neon-btn" : "text-muted-foreground hover:text-foreground"}`}>
              Войти
            </button>
            <button onClick={() => { setAuthMode("register"); setError(""); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${authMode === "register" ? "neon-btn" : "text-muted-foreground hover:text-foreground"}`}>
              Регистрация
            </button>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10">
            {error && (
              <div className="mb-4 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <Icon name="AlertCircle" size={14} />
                {error}
              </div>
            )}

            {authMode === "login" ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Email</label>
                  <div className="relative">
                    <Icon name="Mail" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input required type="email" value={loginForm.email}
                      onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="ivan@example.ru"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Пароль</label>
                  <div className="relative">
                    <Icon name="Lock" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input required type="password" value={loginForm.password}
                      onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors" />
                  </div>
                </div>
                <button type="submit" disabled={authLoading}
                  className="neon-btn rounded-xl py-3.5 font-display font-semibold text-base uppercase tracking-wider mt-1 flex items-center gap-2 justify-center disabled:opacity-60">
                  {authLoading
                    ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    : <Icon name="LogIn" size={16} />}
                  {authLoading ? "Входим..." : "Войти"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                {[
                  { key: "name", label: "Имя", placeholder: "Иван Иванов", icon: "User", type: "text" },
                  { key: "email", label: "Email", placeholder: "ivan@example.ru", icon: "Mail", type: "email" },
                  { key: "phone", label: "Телефон", placeholder: "+7 (999) 000-00-00", icon: "Phone", type: "tel" },
                  { key: "password", label: "Пароль", placeholder: "Минимум 6 символов", icon: "Lock", type: "password" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">{f.label}</label>
                    <div className="relative">
                      <Icon name={f.icon} size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input required={f.key !== "phone"} type={f.type}
                        value={regForm[f.key as keyof typeof regForm]}
                        onChange={e => setRegForm(r => ({ ...r, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors" />
                    </div>
                  </div>
                ))}
                <button type="submit" disabled={authLoading}
                  className="neon-btn rounded-xl py-3.5 font-display font-semibold text-base uppercase tracking-wider mt-1 flex items-center gap-2 justify-center disabled:opacity-60">
                  {authLoading
                    ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    : <Icon name="UserPlus" size={16} />}
                  {authLoading ? "Регистрируем..." : "Зарегистрироваться"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  const activeBookings = bookings.filter(b => b.status === "active");
  const totalSpent = bookings.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-up">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl neon-btn flex items-center justify-center shrink-0 font-display font-bold text-xl">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-2xl font-black text-foreground">{user.name.toUpperCase()}</h1>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 glass border border-white/10 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-white/20 transition-all">
          <Icon name="LogOut" size={14} />
          Выйти
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-fade-up-1">
        {[
          { label: "Поездок", value: bookings.length.toString(), icon: "Bus" },
          { label: "Активных", value: activeBookings.length.toString(), icon: "Calendar" },
          { label: "Потрачено", value: totalSpent > 0 ? `${totalSpent.toLocaleString("ru")} ₽` : "—", icon: "CreditCard" },
          { label: "Бонусы", value: totalSpent > 0 ? `${Math.floor(totalSpent * 0.03)} ✦` : "0 ✦", icon: "Star" },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl p-4 border border-white/8">
            <Icon name={s.icon} size={16} className="text-primary mb-2" />
            <div className="font-display font-bold text-xl text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 glass rounded-xl p-1 border border-white/8 mb-6 w-full sm:w-fit animate-fade-up-2">
        {([
          { id: "bookings", label: "Бронирования", icon: "Calendar" },
          { id: "tickets", label: "Билеты", icon: "Ticket" },
          { id: "profile", label: "Профиль", icon: "Settings" },
        ] as { id: Tab; label: string; icon: string }[]).map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "neon-btn" : "text-muted-foreground hover:text-foreground"}`}>
            <Icon name={tab.icon} size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "bookings" && (
        <div className="flex flex-col gap-4 animate-fade-up">
          {bookings.length === 0 && (
            <div className="text-center py-16 text-muted-foreground glass rounded-2xl border border-white/8">
              <Icon name="Calendar" size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">Нет бронирований</p>
              <p className="text-sm mt-1">Купите первый билет в разделе «Расписание»</p>
            </div>
          )}
          {bookings.map(b => (
            <div key={b.id} className={`glass rounded-2xl border overflow-hidden transition-all ${b.status === "active" ? "border-primary/20" : "border-white/8"}`}>
              <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${b.status === "active" ? "bg-primary/10 border border-primary/20" : "bg-white/5 border border-white/10"}`}>
                    <Icon name="Bus" size={18} className={b.status === "active" ? "text-primary" : "text-muted-foreground"} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{b.route_from} → {b.route_to}</div>
                    <div className="text-sm text-muted-foreground">{b.departure_date} · {b.departure_time} → {b.arrival_time}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Рейс {b.bus_id} · Место {b.seat} · {b.booking_code}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${b.status === "active" ? "status-active" : b.status === "cancelled" ? "status-pending" : "status-done"}`}>
                    {b.status === "active" ? "Предстоит" : b.status === "cancelled" ? "Отменено" : "Завершено"}
                  </span>
                  <span className="font-display font-bold text-lg neon-text">{b.price} ₽</span>
                </div>
              </div>
              {b.status === "active" && (
                <div className="border-t border-primary/10 bg-primary/3 px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Icon name="Info" size={14} />
                    Бесплатная отмена за 2 часа до отправления
                  </div>
                  <button onClick={() => handleCancelBooking(b.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 hover:bg-red-500/15 transition-all">
                    <Icon name="X" size={13} />
                    Отменить
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "tickets" && (
        <div className="animate-fade-up">
          {activeBookings.length === 0 && (
            <div className="text-center py-16 text-muted-foreground glass rounded-2xl border border-white/8">
              <Icon name="Ticket" size={40} className="mx-auto mb-3 opacity-30" />
              <p>Нет активных билетов</p>
            </div>
          )}
          {activeBookings.map(b => (
            <div key={b.id} className="glass rounded-2xl border border-primary/20 overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-bold text-2xl text-foreground tracking-wide">ТРАНС<span className="neon-text">ПОРТ</span></span>
                  <span className="text-xs font-mono text-muted-foreground border border-white/10 px-2 py-1 rounded">{b.booking_code}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-3xl font-display font-black text-foreground">{b.route_from.slice(0, 3).toUpperCase()}</div>
                    <div className="text-muted-foreground text-sm">{b.route_from}</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-muted-foreground mb-1">{b.departure_date}</div>
                    <div className="w-full flex items-center">
                      <div className="w-2 h-2 rounded-full border-2 border-primary" />
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-accent" />
                      <Icon name="Bus" size={20} className="text-accent mx-1" />
                      <div className="flex-1 h-0.5 bg-accent" />
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-display font-black text-foreground">{b.route_to.slice(0, 3).toUpperCase()}</div>
                    <div className="text-muted-foreground text-sm">{b.route_to}</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-dashed border-white/10 px-6 py-4 flex flex-wrap gap-6">
                {[["Отправление", b.departure_time], ["Место", b.seat], ["Рейс", b.bus_id], ["Цена", `${b.price} ₽`]].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{k}</div>
                    <div className="font-display font-bold text-lg text-foreground">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "profile" && (
        <div className="glass rounded-2xl border border-white/8 p-6 sm:p-8 max-w-xl animate-fade-up">
          <h3 className="font-display font-bold text-xl text-foreground mb-6">ЛИЧНЫЕ ДАННЫЕ</h3>
          {profileSaved && (
            <div className="mb-4 flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
              <Icon name="CheckCircle" size={14} />
              Данные сохранены
            </div>
          )}
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
            {[
              { key: "name", label: "Имя", icon: "User" },
              { key: "phone", label: "Телефон", icon: "Phone" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">{f.label}</label>
                <div className="relative">
                  <Icon name={f.icon} size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input value={profileForm[f.key as keyof typeof profileForm]}
                    onChange={e => setProfileForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors" />
                </div>
              </div>
            ))}
            <div>
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Email</label>
              <div className="relative">
                <Icon name="Mail" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={user.email} disabled
                  className="w-full bg-white/3 border border-white/5 rounded-xl pl-9 pr-4 py-3 text-sm text-muted-foreground cursor-not-allowed" />
              </div>
            </div>
            <button type="submit" className="neon-btn rounded-xl py-3 font-display font-semibold text-sm uppercase tracking-wider mt-2 flex items-center gap-2 justify-center">
              <Icon name="Save" size={15} />
              Сохранить изменения
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CabinetPage;
