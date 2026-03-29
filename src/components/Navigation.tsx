import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, BookOpen, Info, Mail, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/customize', label: '定制旅游', icon: Sparkles },
    { path: '/culture', label: '黄檗文化', icon: BookOpen },
    { path: '/attractions', label: '景点展示', icon: MapPin },
    { path: '/about', label: '关于我们', icon: Info },
    { path: '/contact', label: '联系方式', icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 shadow-2xl backdrop-blur-lg bg-opacity-95 border-b border-stone-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-30">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-white mt-2">印象黄檗</h1>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 font-semibold text-sm md:text-base ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'text-stone-300 hover:bg-stone-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-stone-700/50 transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-stone-800/95 backdrop-blur-lg border-t border-stone-700/30 animate-fade-in">
          <div className="px-4 py-4 md:py-6 space-y-2 md:space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 md:gap-4 px-5 md:px-7 py-3 md:py-4 rounded-2xl transition-all duration-300 font-semibold text-base md:text-lg ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'text-stone-300 hover:bg-stone-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}