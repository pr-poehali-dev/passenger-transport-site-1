import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import SchedulePage from "@/components/SchedulePage";
import RoutesPage from "@/components/RoutesPage";
import ContactsPage from "@/components/ContactsPage";
import CabinetPage from "@/components/CabinetPage";

export type Page = "home" | "schedule" | "routes" | "contacts" | "cabinet";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage onNavigate={setCurrentPage} />;
      case "schedule": return <SchedulePage />;
      case "routes": return <RoutesPage onNavigate={setCurrentPage} />;
      case "contacts": return <ContactsPage />;
      case "cabinet": return <CabinetPage />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
    </div>
  );
};

export default Index;
