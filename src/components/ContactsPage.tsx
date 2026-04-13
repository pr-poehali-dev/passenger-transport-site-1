import { useState } from "react";
import Icon from "@/components/ui/icon";

const contacts = [
  { icon: "Phone", label: "Телефон", value: "+7 (800) 555-12-34", hint: "Бесплатно по России", color: "text-primary" },
  { icon: "Mail", label: "Email", value: "info@transport.ru", hint: "Ответим за 2 часа", color: "text-accent" },
  { icon: "MessageCircle", label: "Telegram", value: "@transport_support", hint: "Онлайн с 8:00 до 22:00", color: "text-primary" },
  { icon: "MapPin", label: "Офис", value: "Москва, ул. Тверская, 1", hint: "Пн–Пт 9:00–18:00", color: "text-accent" },
];

const ContactsPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="mb-10 animate-fade-up">
        <p className="text-primary text-xs font-medium uppercase tracking-widest mb-1">Свяжитесь с нами</p>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground">КОНТАКТЫ</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Contact cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {contacts.map((c, i) => (
            <div
              key={c.label}
              className={`glass rounded-2xl p-5 border border-white/8 glass-hover animate-fade-up-${i + 1}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${c.color}`}>
                  <Icon name={c.icon} size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{c.label}</div>
                  <div className="font-semibold text-foreground">{c.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.hint}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Work hours */}
          <div className="glass rounded-2xl p-5 border border-white/8 animate-fade-up-4">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="font-medium text-foreground text-sm uppercase tracking-wider font-display">Режим работы</span>
            </div>
            <div className="space-y-2">
              {[
                ["Понедельник – Пятница", "08:00 – 20:00"],
                ["Суббота", "09:00 – 18:00"],
                ["Воскресенье", "10:00 – 16:00"],
                ["Кол-центр", "24/7"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                  <span className="text-sm text-muted-foreground">{day}</span>
                  <span className="text-sm font-medium text-foreground">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8 border border-white/8 animate-fade-up-2">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center animate-float">
                <Icon name="CheckCircle" size={32} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">Заявка отправлена!</h3>
              <p className="text-muted-foreground max-w-xs">
                Мы получили ваше сообщение и свяжемся с вами в течение 2 часов.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", phone: "", message: "" }); }}
                className="mt-2 px-6 py-3 glass border border-white/10 rounded-xl text-sm font-medium hover:border-primary/30 transition-all text-foreground"
              >
                Отправить ещё
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-bold text-foreground mb-1">Напишите нам</h2>
              <p className="text-muted-foreground text-sm mb-6">Ответим на любые вопросы о маршрутах и билетах</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Ваше имя</label>
                  <div className="relative">
                    <Icon name="User" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Иван Иванов"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Телефон</label>
                  <div className="relative">
                    <Icon name="Phone" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      required
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+7 (999) 000-00-00"
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Сообщение</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Ваш вопрос или сообщение..."
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors resize-none"
                  />
                </div>

                <button type="submit" className="neon-btn rounded-xl py-3.5 font-display font-semibold text-base uppercase tracking-wider flex items-center gap-2 justify-center mt-1">
                  <Icon name="Send" size={16} />
                  Отправить сообщение
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
