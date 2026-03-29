import { Heart, Users, Globe, Award, Sparkles } from 'lucide-react';
import type { KeyboardEvent } from 'react';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: '文化传承',
      description: '我们致力于传承和发扬黄檗文化的深厚底蕴，为海外华侨和文化爱好者提供深入了解黄檗文化的平台。',
      color: 'from-rose-500 to-rose-600',
      accent: 'from-rose-400 to-rose-500',
      id: 'cultural-heritage'
    },
    {
      icon: Users,
      title: '专业服务',
      description: '拥有专业的文化研究团队，为您提供最专业、最深入的黄檗文化体验。',
      color: 'from-blue-500 to-blue-600',
      accent: 'from-blue-400 to-blue-500',
      id: 'professional-service'
    },
    {
      icon: Globe,
      title: '国际视野',
      description: '立足中日文化交流，以国际化的视角推广黄檗文化，促进不同文化间的理解与融合。',
      color: 'from-emerald-500 to-emerald-600',
      accent: 'from-emerald-400 to-emerald-500',
      id: 'global-vision'
    },
    {
      icon: Award,
      title: '品质保证',
      description: '严格把控服务质量，确保每一次旅行体验都达到最高标准，让客户满意是我们的终极目标。',
      color: 'from-amber-500 to-amber-600',
      accent: 'from-amber-400 to-amber-500',
      id: 'quality-assurance'
    }
  ];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, valueId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const element = document.getElementById(valueId);
      if (element) {
        element.click();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaf9] via-[#f5f5f4] to-[#e7e5e4] pt-20 md:pt-24 lg:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 lg:py-36">
        <div className="mb-16 md:mb-20 lg:mb-24">
          <div className="group relative inline-block mb-6 md:mb-8 lg:mb-10 w-full">
            <h2 className="text-display font-serif bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent text-center relative z-10 transition-all duration-300 group-hover:scale-105 cursor-default">
              我们的使命
            </h2>
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-amber-700/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 group-hover:w-full" aria-hidden="true"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
          </div>
          <div className="group relative w-full">
            <p className="text-body-large text-stone-600 leading-relaxed max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20 text-center cursor-default text-sm sm:text-base md:text-lg lg:text-xl">
              印象黄檗致力于成为连接中日文化交流的桥梁，通过专业的黄檗文化旅行定制服务，
              让海外华侨和文化爱好者能够深入了解和体验这一独特的文化传统。
              我们相信，每一次旅行都是一次文化的探索和心灵的洗礼。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-16 md:mb-20 lg:mb-24" role="list" aria-label="核心价值观列表">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  id={value.id}
                  className="group relative bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl active:shadow-xl active:scale-95 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${value.title}: ${value.description}`}
                  onKeyDown={(e) => handleKeyDown(e, value.id)}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} aria-hidden="true"></div>
                  
                  <div className="relative z-10 p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col items-center justify-center h-full min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                    <div className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${value.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl mb-5 sm:mb-6 md:mb-7 group-hover:scale-110 group-hover:rotate-3 active:scale-95 transition-all duration-500`} aria-hidden="true">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl sm:rounded-2xl"></div>
                      <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white relative z-10 group-hover:animate-pulse" aria-hidden="true" />
                      <div className={`absolute -inset-1 bg-gradient-to-br ${value.color} rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                    </div>
                    
                    <div className="text-center w-full flex flex-col items-center">
                      <h3 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold text-stone-900 mb-3 sm:mb-4 md:mb-5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-stone-800 group-hover:to-stone-600 group-hover:bg-clip-text transition-all duration-300 group-focus:outline-none group-focus:ring-2 group-focus:ring-offset-2 rounded leading-tight whitespace-nowrap">
                        {value.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed text-center group-hover:text-stone-700 transition-colors duration-300 max-w-[260px] sm:max-w-[300px]">
                        {value.description}
                      </p>
                    </div>
                    
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right`} aria-hidden="true"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}