import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CosmicBackground } from './components/CosmicBackground';
import { GridOverlay } from './components/GridOverlay';
import { ParticleField } from './components/ParticleField';
import { AmbientLights } from './components/AmbientLights';
import { MouseFollower } from './components/MouseFollower';
import { HeroSection } from './components/HeroSection';
import { SystemStatus } from './components/SystemStatus';
import { MobiusMantra } from './components/MobiusMantra';
import { FlowingQuadrants } from './components/FlowingQuadrants';
import { FooterRules } from './components/FooterRules';
import { ModernNavBar, ModernNavLink } from './components/ModernNav';
import { LifeSystemPage } from './pages/LifeSystemPage';
import { ItemsPage } from './pages/ItemsPage';
import { LifeSystemProvider } from './contexts/LifeSystemContext';
import { Sparkles, Menu, X, Package, Layers } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
      setMobileMenuOpen(false);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string, tab?: string) => {
    if (tab) {
      window.location.hash = `${page}#${tab}`;
    } else {
      window.location.hash = page;
    }
  };

  return (
    <LifeSystemProvider>
      {currentPage === 'system' ? (
        <LifeSystemPage />
      ) : currentPage === 'items' ? (
        <ItemsPage />
      ) : (
        <div className="min-h-screen bg-[#04070F] text-white relative overflow-x-hidden" style={{ perspective: '1200px' }}>
          <CosmicBackground />
          <GridOverlay />
          <AmbientLights />
          <ParticleField />
          <MouseFollower />

          {/* Navigation */}
          <ModernNavBar>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#42F5DC] to-[#28D5C6] flex items-center justify-center transform-3d"
                  style={{
                    boxShadow: '0 4px 16px rgba(66, 245, 220, 0.3), 0 0 30px rgba(66, 245, 220, 0.1)',
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: 9999,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-[#04070F]" />
                  </motion.div>
                </motion.div>
                <span className="text-xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Lorena Universe OS
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-2">
                <ModernNavLink 
                  active={currentPage === 'home'} 
                  onClick={() => navigate('home')}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  宇宙地图
                </ModernNavLink>
                <ModernNavLink 
                  active={currentPage === 'system'} 
                  onClick={() => navigate('system')}
                  icon={<Layers className="w-4 h-4" />}
                >
                  生活系统
                </ModernNavLink>
                <ModernNavLink 
                  active={currentPage === 'items'} 
                  onClick={() => navigate('items')}
                  icon={<Package className="w-4 h-4" />}
                >
                  物品管理
                </ModernNavLink>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-[#42F5DC] hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 flex flex-col gap-2 pt-4 border-t border-white/10">
                <ModernNavLink 
                  active={currentPage === 'home'} 
                  onClick={() => navigate('home')}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  宇宙地图
                </ModernNavLink>
                <ModernNavLink 
                  active={currentPage === 'system'} 
                  onClick={() => navigate('system')}
                  icon={<Layers className="w-4 h-4" />}
                >
                  生活系统
                </ModernNavLink>
                <ModernNavLink 
                  active={currentPage === 'items'} 
                  onClick={() => navigate('items')}
                  icon={<Package className="w-4 h-4" />}
                >
                  物品管理
                </ModernNavLink>
              </div>
            )}
          </ModernNavBar>

          {/* Hero Section */}
          <div style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
            <HeroSection />
          </div>

          {/* System Status Metrics */}
          <div style={{ transform: 'translateZ(5px)', transformStyle: 'preserve-3d' }}>
            <SystemStatus />
          </div>

          {/* Central Mantra - Möbius */}
          <div style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}>
            <MobiusMantra />
          </div>
          
          {/* Flowing Quadrants */}
          <div style={{ transform: 'translateZ(8px)', transformStyle: 'preserve-3d' }}>
            <FlowingQuadrants onNavigate={navigate} />
          </div>

          {/* Footer */}
          <div style={{ transform: 'translateZ(3px)', transformStyle: 'preserve-3d' }}>
            <FooterRules />
          </div>
        </div>
      )}
    </LifeSystemProvider>
  );
}