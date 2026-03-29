import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin, Calendar, Users } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import ScrollingTicker from '../components/ScrollingTicker';
import { announcements } from '../data/announcements';

export default function HomePage() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI智能定制',
      description: '基于您的需求，AI为您生成专属黄檗文化旅行方案',
      color: 'from-amber-500 to-amber-600',
      accent: 'from-amber-400 to-amber-500',
      id: 'ai-customization'
    },
    {
      icon: MapPin,
      title: '深度文化体验',
      description: '探索黄檗文化的深厚底蕴和历史传承',
      color: 'from-emerald-500 to-emerald-600',
      accent: 'from-emerald-400 to-emerald-500',
      id: 'cultural-experience'
    },
    {
      icon: Calendar,
      title: '专业行程规划',
      description: '精心设计每一段旅程，确保最佳体验',
      color: 'from-blue-500 to-blue-600',
      accent: 'from-blue-400 to-blue-500',
      id: 'itinerary-planning'
    },
    {
      icon: Users,
      title: '个性化服务',
      description: '根据您的偏好定制专属旅行方案',
      color: 'from-purple-500 to-purple-600',
      accent: 'from-purple-400 to-purple-500',
      id: 'personalized-service'
    }
  ];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, featureId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const element = document.getElementById(featureId);
      if (element) {
        element.click();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaf9] via-[#f5f5f4] to-[#e7e5e4] pt-20 md:pt-24 lg:pt-28">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-stone-900/3 to-stone-900/5"></div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 lg:py-36">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-16 md:mb-20 lg:mb-24">
              <div className="lg:w-1/4 flex-shrink-0 w-full">
                <ScrollingTicker announcements={announcements} />
              </div>
              <div className="lg:w-3/4 flex-1 text-center">
                <h1 className="text-display font-serif mb-6 md:mb-8 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
                  印象黄檗
                </h1>
                <p className="text-heading text-stone-600 font-light max-w-3xl mx-auto">
                  黄檗文化主题旅行定制专家
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-12 md:mb-16 lg:mb-20 px-2 sm:px-0" role="list" aria-label="功能特性列表">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    id={feature.id}
                    className="group relative bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl active:shadow-xl active:scale-95 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${feature.title}: ${feature.description}`}
                    onKeyDown={(e) => handleKeyDown(e, feature.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} aria-hidden="true"></div>
                    
                    <div className="relative z-10 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col items-center justify-center h-full min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
                      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 group-hover:rotate-3 active:scale-95 transition-all duration-500`} aria-hidden="true">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl sm:rounded-2xl"></div>
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white relative z-10 group-hover:animate-pulse" aria-hidden="true" />
                        <div className={`absolute -inset-1 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                      </div>
                      
                      <div className="text-center w-full flex flex-col items-center">
                        <h3 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold text-stone-900 mb-2 sm:mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-stone-800 group-hover:to-stone-600 group-hover:bg-clip-text transition-all duration-300 group-focus:outline-none group-focus:ring-2 group-focus:ring-amber-500 group-focus:ring-offset-2 rounded leading-tight whitespace-nowrap">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed text-center group-hover:text-stone-700 transition-colors duration-300 max-w-[240px] sm:max-w-[280px]">
                          {feature.description}
                        </p>
                      </div>
                      
                      <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right`} aria-hidden="true"></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="group relative bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center overflow-hidden transition-all duration-500 hover:scale-[1.02]" role="region" aria-label="行动号召区域">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-white to-amber-300 opacity-50" aria-hidden="true"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" aria-hidden="true"></div>
              
              <div className="relative z-10">
                <h2 className="text-heading sm:text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-4 sm:mb-5 md:mb-6 lg:mb-8 font-bold">
                  开始您的黄檗文化之旅
                </h2>
                <p className="text-base sm:text-lg md:text-body-large lg:text-xl text-amber-50 mb-6 sm:mb-7 md:mb-8 lg:mb-10 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto">
                  填写您的旅行需求，AI将为您生成专属的黄檗文化主题旅行方案
                </p>
                <Link
                  to="/customize"
                  className="group/btn relative inline-flex items-center gap-3 sm:gap-4 md:gap-4 lg:gap-5 px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 lg:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-lg lg:text-xl font-bold bg-white text-amber-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                  aria-label="立即定制您的黄檗文化旅行方案"
                >
                  立即定制
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white rounded-xl sm:rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}