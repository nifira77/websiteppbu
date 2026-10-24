import React from 'react';
import { PesantrenProvider, usePesantren } from './context/PesantrenContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SambutanPengasuh } from './components/SambutanPengasuh';
import { VisiMisi } from './components/VisiMisi';
import { ProgramPendidikan } from './components/ProgramPendidikan';
import { KegiatanSantri } from './components/KegiatanSantri';
import { GaleriPesantren } from './components/GaleriPesantren';
import { PengurusYayasan } from './components/PengurusYayasan';
import { FasilitasSection } from './components/FasilitasSection';
import { TestimoniSection } from './components/TestimoniSection';
import { DataSantriSection } from './components/DataSantriSection';
import { PendaftaranPSB } from './components/PendaftaranPSB';
import { Footer } from './components/Footer';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';

const MainContent: React.FC = () => {
  const { activeView } = usePesantren();

  if (activeView === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfc]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SambutanPengasuh />
        <VisiMisi />
        <ProgramPendidikan />
        <KegiatanSantri />
        <GaleriPesantren />
        <PengurusYayasan />
        <FasilitasSection />
        <TestimoniSection />
        <DataSantriSection />
        <PendaftaranPSB />
      </main>
      <Footer />
      <LiveChatWidget />
      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <PesantrenProvider>
      <MainContent />
    </PesantrenProvider>
  );
}
