import { useState } from "react";
import { Page } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "schedule", label: "Расписание", icon: "Clock" },
  { id: "routes", label: "Маршруты", icon: "MapPin" },
  { id: "contacts", label: "Контакты", icon: "Phone" },
];

const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg neon-btn flex items-center justify-center">
              <Icon name="Bus" size={18} />
            </div>
            <span className="font-display text-xl font-bold tracking-wider text-white">
              ТРАНС<span className="neon-text">ПОРТ</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Cabinet button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("cabinet")}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                currentPage === "cabinet"
                  ? "neon-btn"
                  : "glass border border-white/10 text-foreground hover:border-primary/30"
              }`}
            >
              <Icon name="User" size={15} />
              Кабинет
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-muted-foreground hover:text-foreground p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 px-4 py-3 flex flex-col gap-1 animate-fade-up">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                currentPage === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { onNavigate("cabinet"); setMenuOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold neon-btn mt-1"
          >
            <Icon name="User" size={16} />
            Личный кабинет
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
