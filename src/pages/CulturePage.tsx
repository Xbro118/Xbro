import { useState } from 'react';
import { BookOpen, ScrollText, Sparkles, Users, MapPin, ChevronRight, Clock, Globe } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import ScrollingTicker from '../components/ScrollingTicker';
import { announcements } from '../data/announcements';

export default function CulturePage() {
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);

  const handleTimelineKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveTimelineItem(activeTimelineItem === index ? null : index);
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      setActiveTimelineItem(index < timeline.length - 1 ? index + 1 : 0);
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      setActiveTimelineItem(index > 0 ? index - 1 : timeline.length - 1);
    }
  };
  const cultureAspects = [
    {
      icon: ScrollText,
      title: '黄檗宗历史',
      description: '黄檗宗源于中国禅宗临济宗黄檗派，由隐元禅师于1654年东渡日本后创立。该宗派融合了中国禅宗思想与日本文化特色，形成了独特的修行体系和文化传统，成为日本禅宗三大宗派之一。',
      details: [
        '隐元禅师（1592-1673），俗姓林，名隆琦，字曾昺，号子房，福建福清人',
        '明万历四十八年（1620年）于福清黄檗山万福寺剃度出家',
        '崇祯八年（1635年）成为佛教临济宗正式传法者，后任万福寺住持',
        '1654年率弟子30余人东渡日本，1876年黄檗宗正式独立为日本禅宗三大宗派之一'
      ]
    },
    {
      icon: BookOpen,
      title: '核心教义',
      description: '黄檗宗的核心教义强调直指人心，见性成佛。修行者通过坐禅、公案参究等方式，直接体验佛性，不依赖文字和理论。隐元禅师将明代临济宗黄檗派的心法完整传承至日本。',
      details: [
        '直指人心，见性成佛的根本理念，强调直接体悟佛性',
        '重视实际修行体验而非理论探讨，注重实修实证',
        '师徒传承和口传心授的传统，保持法脉纯正',
        '融合日常生活与修行实践，将禅意融入日常'
      ]
    },
    {
      icon: Sparkles,
      title: '文化影响',
      description: '黄檗文化不仅局限于宗教修行，还深刻影响了日本的艺术、建筑、茶道、书法、中医等多个领域。隐元禅师将明代禅宗仪轨、建筑风格、茶道文化、中医诊疗等整套中华文化传入日本。',
      details: [
        '建筑风格：黄檗样建筑风格简洁朴素，融合中日建筑特色',
        '茶道文化：茶禅一体的修行方式，推广明代茶道礼仪',
        '书法艺术：以禅意为指导的书法风格，隐元书法在日本备受推崇',
        '园林设计：枯山水庭园的禅意美学，体现禅宗思想'
      ]
    },
    {
      icon: Users,
      title: '现代传承',
      description: '如今黄檗文化仍在世界各地传承和发展。日本黄檗宗拥有众多寺院和禅修中心，中国福清黄檗祖庭于20世纪80年代启动修复重建，逐步重回禅文化圣地地位，成为中日文化交流的重要纽带。',
      details: [
        '日本黄檗宗拥有超过500座寺院，信徒遍布全国',
        '福清黄檗山万福寺历经战乱损毁后全面修复重建',
        '黄檗文化成为中日民间友好、东亚文明互鉴的核心文化纽带',
        '现代禅修中心的普及，为现代人提供心灵寄托和修行场所'
      ]
    }
  ];

  const timeline = [
    { 
      year: '唐代', 
      event: '开山立基，禅脉定型', 
      period: '公元789年 - 9世纪中期',
      description: '正干禅师在福建福清黄檗山开山建寺，初名"般若堂"，唐德宗赐名"建福禅寺"。希运禅师住持黄檗山，大力弘扬禅宗无心心法，确立核心禅学体系，成为后世临济宗的核心发源地，黄檗禅脉自此正式成型。',
      icon: '🏛️️'
    },
    { 
      year: '宋元明', 
      event: '祖庭兴衰，静待重振', 
      period: '1614年 - 1651年',
      description: '明神宗御赐"万福禅寺"匾额，祖庭地位大幅提升。隐元禅师于明万历四十八年（1620年）剃度出家，崇祯八年（1635年）成为佛教临济宗正式传法者，后任万福寺住持，全力重整禅风、完善法脉传承，让衰败的祖庭重回鼎盛，为后续黄檗文化东传日本做好全面铺垫。',
      icon: '🏯️'
    },
    { 
      year: '明末清初', 
      event: '东渡日本，开宗传世', 
      period: '1654年 - 1876年',
      description: '63岁的隐元禅师率弟子30余人从厦门启航东渡日本弘法，在京都宇治仿福清祖庭规制建成新的黄檗山万福寺，正式创立日本黄檗宗。将明代禅宗仪轨、建筑、茶道、中医等整套中华文化传入日本。1876年黄檗宗正式独立，成为与临济宗、曹洞宗并列的日本禅宗三大宗派之一。',
      icon: '⛵'
    },
    { 
      year: '近现代至今', 
      event: '跨洋传承，活化交流', 
      period: '19世纪至今',
      description: '日本黄檗宗发展迅速，拥有超过500座寺院，信徒遍布全国。中国福清黄檗祖庭历经战乱损毁，20世纪80年代启动全面修复重建，逐步重回禅文化圣地地位。黄檗文化成为中日民间友好、东亚文明互鉴的核心文化纽带，持续推动两国文化交流。',
      icon: '🌏'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaf9] via-[#f5f5f4] to-[#e7e5e4] pt-20 md:pt-24 lg:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
        <div className="relative mb-20 md:mb-24 lg:mb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/10 rounded-3xl blur-3xl animate-pulse-glow"></div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <div className="lg:w-1/4 flex-shrink-0 w-full">
              <ScrollingTicker announcements={announcements} />
            </div>
            <div className="lg:w-3/4 flex-1 text-center">
              <h1 className="text-display font-serif mb-6 md:mb-8 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
                黄檗文化
              </h1>
              <p className="text-heading text-stone-600 font-light max-w-3xl mx-auto">
                探索千年传承的禅意文化，<br />
                感受黄檗宗的深厚底蕴。
              </p>
            </div>
          </div>

          <div className="relative mt-12 md:mt-16 lg:mt-20 mb-16 md:mb-20 lg:mb-24">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5 rounded-3xl blur-3xl animate-pulse-glow"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                <div className="group relative bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl border border-white/40 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl md:rounded-2xl"></div>
                        <span className="text-2xl md:text-3xl">🏛️</span>
                      </div>
                      <h3 className="text-subheading font-bold text-stone-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-700 group-hover:to-amber-900 group-hover:bg-clip-text transition-all duration-300">
                        建筑艺术
                      </h3>
                    </div>
                    <p className="text-body text-stone-700 leading-relaxed group-hover:text-stone-800 transition-colors duration-300 mb-4">
                      黄檗山建筑采用中国明朝样式的伽蓝配置，建筑风格纯用中国式，雕工来自福建泉州，融合中日建筑特色。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-body text-stone-700 group-hover:text-stone-800 transition-colors duration-300">
                        <div className="relative w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="leading-relaxed">明朝样式伽蓝配置，完整传承明代建筑规制</span>
                      </li>
                      <li className="flex items-start gap-3 text-body text-stone-700 group-hover:text-stone-800 transition-colors duration-300">
                        <div className="relative w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="leading-relaxed">福建泉州雕工技艺，精湛工艺传承至今</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl border border-white/40 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl md:rounded-2xl"></div>
                        <span className="text-2xl md:text-3xl">🎵</span>
                      </div>
                      <h3 className="text-subheading font-bold text-stone-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-700 group-hover:to-amber-900 group-hover:bg-clip-text transition-all duration-300">
                        梵呗音乐
                      </h3>
                    </div>
                    <p className="text-body text-stone-700 leading-relaxed group-hover:text-stone-800 transition-colors duration-300 mb-4">
                      黄檗宗特色梵呗使用黄檗唐音（明代南京官话音），直接继承了中国明代的法式梵呗，含有以4拍为基调的音乐元素。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-body text-stone-700 group-hover:text-stone-800 transition-colors duration-300">
                        <div className="relative w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="leading-relaxed">黄檗唐音传承明代南京官话音韵</span>
                      </li>
                      <li className="flex items-start gap-3 text-body text-stone-700 group-hover:text-stone-800 transition-colors duration-300">
                        <div className="relative w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="leading-relaxed">4拍为基调的音乐元素，庄严神圣</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl border border-white/40 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl md:rounded-2xl"></div>
                        <span className="text-2xl md:text-3xl">🍵</span>
                      </div>
                      <h3 className="text-subheading font-bold text-stone-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-700 group-hover:to-amber-900 group-hover:bg-clip-text transition-all duration-300">
                        茶道文化
                      </h3>
                    </div>
                    <p className="text-body text-stone-700 leading-relaxed group-hover:text-stone-800 transition-colors duration-300 mb-4">
                      隐元禅师将煎茶的饮用方式、器具与礼仪带入日本，福清煎茶道成为日本煎茶道的祖源地。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-body text-stone-700 group-hover:text-stone-800 transition-colors duration-300">
                        <div className="relative w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="leading-relaxed">福清煎茶道，日本煎茶道祖源地</span>
                      </li>
                      <li className="flex items-start gap-3 text-body text-stone-700 group-hover:text-stone-800 transition-colors duration-300">
                        <div className="relative w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="leading-relaxed">明代江南茶文化，影响日本百姓生活方式</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 mb-20 md:mb-24 lg:mb-28">
          {cultureAspects.map((aspect, index) => {
            const Icon = aspect.icon;
            return (
              <div
                key={index}
                className="group relative interactive-card bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl border border-white/40 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="article"
                tabIndex={0}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-600/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 p-8 md:p-10 lg:p-12">
                  <div className="flex items-start gap-5 md:gap-6 mb-8">
                    <div className="relative w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl md:rounded-2xl"></div>
                      <Icon className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white relative z-10 group-hover:animate-pulse" />
                      <div className="absolute -inset-1 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl md:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-subheading font-bold text-stone-900 mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-700 group-hover:to-amber-900 group-hover:bg-clip-text transition-all duration-300 truncate">
                        {aspect.title}
                      </h2>
                      <p className="text-body-large text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">
                        {aspect.description}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 md:space-y-4">
                    {aspect.details.map((detail, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-4 text-body text-stone-700 group-hover:text-stone-800 transition-colors duration-300"
                      >
                        <div className="relative w-2.5 h-2.5 bg-amber-500 rounded-full mt-2 md:mt-2.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300">
                          <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-0 group-hover:opacity-30"></div>
                        </div>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative mb-24 md:mb-28 lg:mb-32">
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-12 md:mb-14 lg:mb-16 animate-fade-in-up">
              <div className="h-px w-24 md:w-32 lg:w-40 bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="flex items-center gap-2.5 bg-amber-50 px-6 py-3 rounded-full shadow-md shadow-amber-200/30">
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-base md:text-lg lg:text-xl font-semibold text-amber-700">千年传承</span>
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="h-px w-24 md:w-32 lg:w-40 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>

            <h2 className="text-heading font-serif text-stone-900 mb-16 md:mb-18 lg:mb-20 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              黄檗文化发展历程
            </h2>
            <p className="text-body-large text-stone-600 text-center max-w-4xl mx-auto mb-16 md:mb-18 lg:mb-20 leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
              黄檗文化历经千年风雨，成为中日文化交流的重要桥梁。
            </p>

            <div className="relative">
              <div className="absolute left-4 md:left-8 lg:left-12 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 rounded-full shadow-xl shadow-amber-500/30 animate-pulse"></div>
              <div className="md:space-y-10 md:space-y-14 lg:space-y-16 md:pl-14 md:pl-20 lg:pl-24 overflow-x-auto md:overflow-visible">
                <div className="flex md:flex-col gap-8 md:gap-10 lg:gap-12 md:space-y-10 md:space-y-14 lg:space-y-16 min-w-max md:min-w-0 pb-6 md:pb-0">
                  {timeline.map((item, index) => (
                    <div 
                      key={index} 
                      className="relative group animate-fade-in-up flex-shrink-0 md:flex-shrink"
                      style={{ animationDelay: `${0.3 + index * 0.15}s` }}
                      role="article"
                      tabIndex={0}
                      onKeyDown={(e) => handleTimelineKeyDown(e, index)}
                      onClick={() => setActiveTimelineItem(activeTimelineItem === index ? null : index)}
                      aria-label={`${item.event}，${item.period}`}
                    >
                      <div className="flex items-center gap-5 md:gap-8 lg:gap-10">
                        <div className="flex flex-col items-center justify-center">
                          <div className={`relative w-24 h-24 md:w-28 md:h-32 lg:w-32 lg:h-36 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0 transition-all duration-500 cursor-pointer ${activeTimelineItem === index ? 'scale-110 ring-4 ring-amber-400 ring-offset-2 shadow-2xl shadow-amber-500/40' : 'group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl'}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
                            <div className="text-3xl md:text-4xl lg:text-5xl mb-2">{item.icon}</div>
                            <div className="text-sm md:text-base lg:text-lg font-bold text-white">{item.year}</div>
                          </div>
                        </div>
                        <div className="flex-1 pt-5 md:pt-6 lg:pt-7 min-w-[320px] md:min-w-0">
                          <div className="bg-gradient-to-br from-white/98 to-white/90 backdrop-blur-xl rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/60 shadow-lg hover:shadow-2xl hover:border-amber-300/70 transition-all duration-300 p-6 md:p-8 lg:p-10 group-hover:-translate-y-1.5 group-hover:scale-[1.02] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-600/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                              <div className="flex items-center gap-4 md:gap-5 lg:gap-6 mb-5 md:mb-6 lg:mb-7">
                                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md hover:scale-110 transition-transform duration-300">
                                  <Clock className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-amber-700" />
                                </div>
                                <div className="flex-1">
                                  <h3 className={`text-base md:text-lg lg:text-subheading font-bold mb-3 md:mb-4 lg:mb-5 transition-all duration-300 ${activeTimelineItem === index ? 'text-transparent bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text' : 'text-stone-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-700 group-hover:to-amber-900 group-hover:bg-clip-text'}`}>
                                    {item.event}
                                  </h3>
                                </div>
                              </div>
                              <p className="text-body-large text-stone-700 leading-relaxed group-hover:text-stone-800 transition-colors duration-300 text-sm md:text-base lg:text-lg">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}