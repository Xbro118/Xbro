import { MapPin, Phone, ChevronLeft, ChevronRight, Share2, CheckCircle2, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import ScrollingTicker from '../components/ScrollingTicker';
import { announcements } from '../data/announcements';

interface Location {
  id: number;
  name: string;
  address: string;
  description: string;
  phone: string;
  gradient: string;
  detailUrl: string;
  imagePath: string;
}

export default function AttractionsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [copiedLocation, setCopiedLocation] = useState<number | null>(null);
  const itemsPerPage = 3;

  const locations: Location[] = [
    {
      id: 1,
      name: '福清黄檗山万福寺',
      address: '福建省福清市渔溪镇黄檗山',
      description: '黄檗文化发源地，隐元禅师的出家地，日本黄檗宗的祖庭。',
      phone: '0591-85236771',
      gradient: 'from-amber-500 via-orange-500 to-amber-600',
      detailUrl: 'https://baike.baidu.com/item/%E4%B8%87%E7%A6%8F%E5%AF%BA/70452?fromModule=search-result_lemma',
      imagePath: '/figure/1.jpg'
    },
    {
      id: 2,
      name: '宇治万福寺',
      address: '日本京都府宇治市宇治山内',
      description: '日本黄檗宗大本山，明代建筑风格，国家重要文化财。',
      phone: '+81-774-32-3900',
      gradient: 'from-emerald-500 via-teal-500 to-emerald-600',
      detailUrl: 'https://baike.baidu.com/item/%E4%B8%87%E7%A6%8F%E5%AF%BA/23719132#:~:text=%EE%80%80%E4%B8%87%E7%A6%8F%E5%AF%BA%EE%80%81%E4%BD%8D%E4%BA%8E%E6%97%A5%E6%9C%AC%E4%BA%AC%E9%83%BD%E5%BA%9C%EE%80%80%E5%AE%87%E6%B2%BB%EE%80%81%E5%B8%82%E4%BA%94%E4%B8%AA%E5%BA%84%E4%B8%89%E7%95%AA%E5%89%B2%EF%BC%8C%E7%94%B1%E7%A6%8F%E5%B7%9E%E7%A6%8F%E6%B8%85%E4%BA%BA%E9%9A%90%E5%85%83%E7%A6%85%E5%B8%88%E5%9C%A8%E5%BE%B7%E5%B7%9D%E5%B9%95%E5%BA%9C%E5%9B%9B%E4%BB%A3%E5%B0%86%E5%86%9B%E7%9A%84%E5%8D%8F%E5%8A%A9%E4%B8%8B%E4%BA%8E1661%E5%B9%B4%E5%88%9B%E5%BB%BA%EF%BC%8C%E5%B1%9E%E4%BD%9B%E6%95%99%E9%BB%84%E6%AA%97%E5%AE%97%E5%A4%A7%E6%9C%AC%E5%B1%B1%EF%BC%8C%E5%B1%B1%E5%8F%B7%E9%BB%84%E6%AA%97%E5%B1%B1%E3%80%82',
      imagePath: '/figure/2.jpg'
    },
    {
      id: 3,
      name: '黄檗山宝藏院',
      address: '日本京都府宇治市宇治山内',
      description: '收藏六万多件铁眼禅师版雕版木，日本近代印刷术发祥地。',
      phone: '+81-774-32-3900',
      gradient: 'from-blue-500 via-indigo-500 to-blue-600',
      detailUrl: 'https://www.hozoin.net/access',
      imagePath: '/figure/3.jpg'
    },
    {
      id: 4,
      name: '隐元文化馆',
      address: '福建省福清市上迳镇东林村',
      description: '展示黄檗文化对日本社会的广泛影响，隐元东渡故事。',
      phone: '0591-85685678',
      gradient: 'from-purple-500 via-pink-500 to-purple-600',
      detailUrl: 'https://news.fznews.com.cn/fuqing/20230927/8Fc22J6F04.shtml',
      imagePath: '/figure/4.jpg'
    },
    {
      id: 5,
      name: '长崎兴福寺',
      address: '日本长崎县长崎市寺町',
      description: '长崎四福寺之一，黄檗宗寺院，眼镜桥建造者墨子如定主持。',
      phone: '+81-95-823-7231',
      gradient: 'from-rose-500 via-red-500 to-rose-600',
      detailUrl: 'https://baike.baidu.com/item/%E5%85%B4%E7%A6%8F%E5%AF%BA/23719195',
      imagePath: '/figure/5.jpg'
    },
    {
      id: 6,
      name: '长崎福济寺',
      address: '日本长崎县长崎市筑后町',
      description: '建于1628年，分紫山，祭祀妈祖，黄檗宗重要寺院。',
      phone: '+81-95-822-8250',
      gradient: 'from-cyan-500 via-sky-500 to-cyan-600',
      detailUrl: 'https://baike.baidu.com/item/%E7%A6%8F%E6%B5%8E%E5%AF%BA/9943278',
      imagePath: '/figure/6.jpg'
    },
    {
      id: 7,
      name: '大阪法云禅寺',
      address: '日本大阪府大阪市天王寺区',
      description: '黄檗三傑之一慧極道明禅師于1672年开山，黄檗宗寺院。',
      phone: '+81-6-6771-3311',
      gradient: 'from-violet-500 via-purple-500 to-violet-600',
      detailUrl: 'https://osaka-info.jp/zh-CHS/spot/hounji/',
      imagePath: '/figure/7.jpg'
    },
    {
      id: 8,
      name: '东京向福寺',
      address: '日本东京都墨田区向岛',
      description: '三百多年前创建的黄檗宗寺庙，中国建筑风格特色明显。',
      phone: '+81-3-3611-3311',
      gradient: 'from-fuchsia-500 via-pink-500 to-fuchsia-600',
      detailUrl: 'https://cn.tripadvisor.com/Attraction_Review-g14134348-d3778494-Reviews-Kofukuji_Temple-Mukou_jima_Sumida_Tokyo_Tokyo_Prefecture_Kanto.html',
      imagePath: '/figure/8.jpg'
    },
    {
      id: 9,
      name: '神奈川绍太寺',
      address: '日本神奈川县小田原市长兴山',
      description: '黄檗宗寺院，以普茶料理闻名，春日局墓所在。',
      phone: '+81-465-23-3311',
      gradient: 'from-teal-500 via-emerald-500 to-teal-600',
      detailUrl: 'https://japan-geographic.tv/kanagawa/odawara-shotaiji.html',
      imagePath: '/figure/9.jpg'
    }
  ];

  const totalPages = Math.ceil(locations.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLocations = locations.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handleShare = async (location: Location) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?location=${location.id}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: location.name,
          text: location.description,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedLocation(location.id);
        setTimeout(() => setCopiedLocation(null), 2000);
      }
    } catch (err) {
      console.error('分享失败:', err);
    }
  };

  const handleViewDetails = (location: Location) => {
    window.open(location.detailUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaf9] via-[#f5f5f4] to-[#e7e5e4] pt-20 md:pt-24 lg:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20">
          <div className="lg:w-1/4 flex-shrink-0 w-full">
            <ScrollingTicker announcements={announcements} />
          </div>
          <div className="lg:w-3/4 flex-1 text-center">
            <h1 className="text-display font-serif mb-6 md:mb-8 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
              黄檗文化景点
            </h1>
            <p className="text-heading text-stone-600 font-light max-w-3xl mx-auto">踏访千年文脉圣地，体悟黄檗宗禅韵悠长</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16">
          {currentLocations.map((location) => (
            <div
              key={location.id}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                <div className={`h-48 md:h-56 bg-gradient-to-br ${location.gradient} flex items-center justify-center overflow-hidden relative`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
                  <img 
                    src={location.imagePath} 
                    alt={location.name}
                    className="w-full h-full object-cover relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-5 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-stone-900 mb-3 group-hover:text-amber-700 transition-colors duration-300 line-clamp-1">
                    {location.name}
                  </h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm md:text-base text-stone-600">
                      <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{location.address}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm md:text-base text-stone-600">
                      <Phone className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="font-mono">{location.phone}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-5 line-clamp-3 min-h-[4.5rem]">
                    {location.description}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
                    <button 
                      onClick={() => handleViewDetails(location)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>查看详情</span>
                    </button>
                    <button 
                      onClick={() => handleShare(location)}
                      className="flex items-center justify-center w-10 h-10 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 relative"
                      title="分享"
                    >
                      {copiedLocation === location.id ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-stone-200 rounded-full shadow-lg hover:border-amber-400 hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalPages <= 1}
          >
            <ChevronLeft className="w-6 h-6 text-stone-700" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage 
                    ? 'bg-amber-500 scale-125' 
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-stone-200 rounded-full shadow-lg hover:border-amber-400 hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalPages <= 1}
          >
            <ChevronRight className="w-6 h-6 text-stone-700" />
          </button>
        </div>

        <div className="text-center mt-4 text-sm text-stone-500">
          显示 {startIndex + 1}-{Math.min(endIndex, locations.length)} / 共 {locations.length} 个地点
        </div>
      </div>
    </div>
  );
}
