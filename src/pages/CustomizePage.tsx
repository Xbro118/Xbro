import React, { useState, useEffect } from 'react';
import { Loader2, Map, Calendar, Users, Wallet, Clock, Coffee, Heart, Target, Sparkles, ArrowRight, CheckCircle2, AlertCircle, Share2, Download, X, Zap, Wand2, Star, Compass } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FormData {
  days: number;
  people: number;
  budget: string;
  pace: '休闲' | '适中' | '紧凑';
  foodAndLodging: string;
  interests: string[];
  goal: string;
}

export default function CustomizePage() {
  const [formData, setFormData] = useState<FormData>({
    days: 3,
    people: 2,
    budget: '5000-10000元',
    pace: '适中',
    foodAndLodging: '特色素食与文化民宿',
    interests: ['历史溯源', '禅修体验'],
    goal: '寻根问祖，深度体验黄檗文化'
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  useEffect(() => {
    if (result && !loading) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [result, loading]);

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const generateItinerary = async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `请根据以下用户需求，生成一份专属的黄檗文化旅行线路：
旅行天数：${formData.days}天
出行人数：${formData.people}人
预算区间：${formData.budget}
出行节奏：${formData.pace}
食宿偏好：${formData.foodAndLodging}
兴趣方向：${formData.interests.join('、')}
核心目标：${formData.goal}`;
      
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-da0938bec0644c0db6256f1e036a720b'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `你是「印象黄檗」专属的黄檗文化主题旅行定制专家，深耕黄檗文化历史与官方文旅资源，专为海外华侨与黄檗文化爱好者，生成匹配用户个性化需求、专业有文化深度、可落地执行的标准化专属旅行线路。

【核心生成规则】
1.  所有线路100%紧扣黄檗文化核心，全程围绕用户选择的兴趣方向与旅行目标设计，拒绝无关大众化旅游点位，每一个行程节点都必须标注对应的黄檗文化价值与讲解亮点
2.  严格匹配用户提交的所有参数：旅行天数、出行人数、预算区间、出行节奏、食宿偏好、兴趣方向、核心目标，不得出现与用户需求不符的安排
3.  线路设计贴合海外华侨用户需求，突出文化根脉溯源、家国情怀、黄檗文化的历史价值与国际影响力，兼顾文化深度与旅行舒适度
4.  所有点位、体验项目、食宿推荐均来自「印象黄檗」官方资源库，不得生成资源库以外的虚假点位
5.  行程动线逻辑合理，同区域点位集中排布，避免折返赶路，完全匹配用户选择的出行节奏
6.  严格遵守宗教场所管理规定，合规设计禅修、参拜等体验项目，表述严谨规范

【线路固定输出结构】
生成的线路必须包含以下4个部分，结构清晰、易懂可执行：
一、行程总览
二、每日详细行程（核心部分，按天拆分）
三、预算明细
四、出行须知与配套服务`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `请求失败：${response.status}`);
      }

      const data = await response.json();
      const resultText = data.choices?.[0]?.message?.content || data.message || '未能生成线路，请重试。';
      setResult(resultText);
    } catch (err: any) {
      console.error('生成错误：', err);
      setError(err.message || '生成过程中发生错误，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaf9] via-[#f5f5f4] to-[#e7e5e4] pt-16 md:pt-20 lg:pt-24 relative overflow-hidden">
      {/* 背景装饰层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-orange-500/5 to-amber-600/8"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/6 via-teal-500/4 to-emerald-600/6"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/6 via-indigo-500/4 to-blue-600/6"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/6 via-pink-500/4 to-purple-600/6"></div>
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-400/25 to-transparent rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-purple-400/25 to-transparent rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-gradient-to-bl from-blue-400/25 to-transparent rounded-full blur-[80px] animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-emerald-400/25 to-transparent rounded-full blur-[90px] animate-pulse"></div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 animate-fade-up">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-xl border-emerald-400/30">
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <p className="font-bold text-lg">专属线路生成成功！</p>
              <p className="text-emerald-100 text-sm">AI已为您精心打造完美旅程</p>
            </div>
          </div>
        </div>
      )}

      {/* 复制成功提示 */}
      {copySuccess && (
        <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 animate-fade-up">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span>已复制到剪贴板</span>
          </div>
        </div>
      )}

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent mb-4 md:mb-6">
            定制您的专属旅程
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-stone-600 font-light leading-relaxed">
            填写需求，AI为您生成专属方案
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {/* 左侧表单 */}
          <div className="lg:col-span-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
              <div className="relative bg-gradient-to-br from-white/98 to-white/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-2 border-white/50 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.25)] transition-all duration-500 p-5 sm:p-6 md:p-8 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500"></div>
                
                <div className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                    {/* 旅行天数 */}
                    <div className="space-y-2.5">
                      <label className="text-sm font-bold text-stone-800 flex items-center gap-2.5">
                        <Calendar className="w-4.5 h-4.5 text-amber-600" />
                        <span className="bg-gradient-to-r from-amber-50 to-amber-100 px-2.5 py-1 rounded-lg text-amber-800 font-semibold text-sm">旅行天数</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={formData.days}
                          onChange={e => {
                            const val = parseInt(e.target.value);
                            setFormData({...formData, days: isNaN(val) ? 1 : val});
                          }}
                          className="w-full bg-gradient-to-br from-white/90 to-white/70 border-2 border-stone-200 rounded-xl px-4 py-3 text-base font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:border-amber-500 transition-all duration-300 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">天</span>
                      </div>
                    </div>

                    {/* 出行人数 */}
                    <div className="space-y-2.5">
                      <label className="text-sm font-bold text-stone-800 flex items-center gap-2.5">
                        <Users className="w-4.5 h-4.5 text-amber-600" />
                        <span className="bg-gradient-to-r from-amber-50 to-amber-100 px-2.5 py-1 rounded-lg text-amber-800 font-semibold text-sm">出行人数</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={formData.people}
                          onChange={e => {
                            const val = parseInt(e.target.value);
                            setFormData({...formData, people: isNaN(val) ? 1 : val});
                          }}
                          className="w-full bg-gradient-to-br from-white/90 to-white/70 border-2 border-stone-200 rounded-xl px-4 py-3 text-base font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:border-amber-500 transition-all duration-300 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">人</span>
                      </div>
                    </div>

                    {/* 预算区间 */}
                    <div className="space-y-2.5">
                      <label className="text-sm font-bold text-stone-800 flex items-center gap-2.5">
                        <Wallet className="w-4.5 h-4.5 text-amber-600" />
                        <span className="bg-gradient-to-r from-amber-50 to-amber-100 px-2.5 py-1 rounded-lg text-amber-800 font-semibold text-sm">预算区间</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.budget}
                          onChange={e => setFormData({...formData, budget: e.target.value})}
                          className="w-full bg-gradient-to-br from-white/90 to-white/70 border-2 border-stone-200 rounded-xl px-4 py-3 text-base font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:border-amber-500 transition-all duration-300 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 appearance-none cursor-pointer"
                        >
                          <option value="3000元以下">3000元以下 (简约体验)</option>
                          <option value="3000-5000元">3000-5000元 (舒适文化游)</option>
                          <option value="5000-10000元">5000-10000元 (深度品质游)</option>
                          <option value="10000元以上">10000元以上 (尊享定制游)</option>
                        </select>
                        <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* 出行节奏 */}
                    <div className="space-y-2.5">
                      <label className="text-sm font-bold text-stone-800 flex items-center gap-2.5">
                        <Clock className="w-4.5 h-4.5 text-amber-600" />
                        <span className="bg-gradient-to-r from-amber-50 to-amber-100 px-2.5 py-1 rounded-lg text-amber-800 font-semibold text-sm">出行节奏</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['休闲', '适中', '紧凑'].map(pace => (
                          <button
                            key={pace}
                            onClick={() => setFormData({...formData, pace: pace as any})}
                            className={`relative py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                              formData.pace === pace 
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50' 
                                : 'bg-gradient-to-br from-stone-100 to-stone-200 text-stone-700 hover:from-stone-200 hover:to-stone-300 border-2 border-transparent hover:shadow-lg hover:shadow-stone-500/10'
                            }`}
                          >
                            {pace}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 食宿偏好 */}
                    <div className="space-y-2.5">
                      <label className="text-sm font-bold text-stone-800 flex items-center gap-2.5">
                        <Coffee className="w-4.5 h-4.5 text-amber-600" />
                        <span className="bg-gradient-to-r from-amber-50 to-amber-100 px-2.5 py-1 rounded-lg text-amber-800 font-semibold text-sm">食宿偏好</span>
                      </label>
                      <input
                        type="text"
                        value={formData.foodAndLodging}
                        onChange={e => setFormData({...formData, foodAndLodging: e.target.value})}
                        placeholder="例如：特色素食与文化民宿"
                        className="w-full bg-gradient-to-br from-white/90 to-white/70 border-2 border-stone-200 rounded-xl px-4 py-3 text-base font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:border-amber-500 transition-all duration-300 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10"
                      />
                    </div>

                    {/* 兴趣方向 */}
                    <div className="space-y-2.5 md:col-span-2 lg:col-span-3">
                      <label className="text-sm font-bold text-stone-800 flex items-center gap-2.5">
                        <Heart className="w-4.5 h-4.5 text-amber-600" />
                        <span className="bg-gradient-to-r from-amber-50 to-amber-100 px-2.5 py-1 rounded-lg text-amber-800 font-semibold text-sm">兴趣方向</span>
                        <span className="text-stone-400 text-xs font-medium">(多选)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['历史溯源', '禅修体验', '建筑艺术', '饮食文化', '书法碑刻', '茶道体验'].map(interest => (
                          <button
                            key={interest}
                            onClick={() => handleInterestToggle(interest)}
                            className={`relative py-2 px-3 rounded-full text-xs font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 border-2 flex items-center gap-1 ${
                              formData.interests.includes(interest)
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50'
                                : 'bg-gradient-to-br from-white/90 to-white/70 text-stone-700 hover:from-amber-50 hover:to-amber-100 border-stone-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10'
                            }`}
                          >
                            {formData.interests.includes(interest) && (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 核心目标 */}
                    <div className="space-y-2.5 md:col-span-2 lg:col-span-3">
                      <label className="text-sm font-bold text-stone-800 flex items-center gap-2.5">
                        <Target className="w-4.5 h-4.5 text-amber-600" />
                        <span className="bg-gradient-to-r from-amber-50 to-amber-100 px-2.5 py-1 rounded-lg text-amber-800 font-semibold text-sm">核心目标</span>
                      </label>
                      <textarea
                        value={formData.goal}
                        onChange={e => setFormData({...formData, goal: e.target.value})}
                        rows={2}
                        className="w-full bg-gradient-to-br from-white/90 to-white/70 border-2 border-stone-200 rounded-xl px-4 py-3 text-base font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:border-amber-500 transition-all duration-300 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 resize-none"
                        placeholder="请描述您此次旅行最想达成的目标..."
                      />
                    </div>

                    {/* 生成按钮 */}
                    <div className="md:col-span-2 lg:col-span-3">
                      <button
                        onClick={generateItinerary}
                        disabled={loading || formData.interests.length === 0 || !formData.goal.trim()}
                        className="relative w-full py-3.5 text-base font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50 hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>正在为您定制专属线路...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <Wand2 className="w-5 h-5" />
                            <span>生成专属黄檗文化之旅</span>
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============== 修复8：右侧结果面板 ============== */}
          <div className="lg:col-span-12">
            {/* 错误提示 */}
            {error && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl opacity-60 blur-xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-red-50 to-red-100/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-2 border-red-300 p-6 md:p-8 shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl opacity-50 blur-xl animate-pulse"></div>
                      <AlertCircle className="w-9 h-9 text-red-600 flex-shrink-0 relative z-10" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-red-800 mb-3">生成失败</h3>
                      <p className="text-base md:text-lg text-red-700 leading-relaxed">{error}</p>
                      <button 
                        onClick={() => setError(null)}
                        className="mt-5 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95"
                      >
                        重新填写
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 生成结果 */}
            {result && !error && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700"></div>
                <div className="relative bg-gradient-to-br from-white/98 to-white/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-2 border-white/50 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"></div>
                  
                  {/* 结果头部 */}
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 md:px-8 py-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-2xl blur-xl"></div>
                          <div className="relative w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-amber-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-serif font-bold text-white">您的专属黄檗文化之旅</h3>
                          <p className="text-amber-100 text-xs md:text-sm mt-1">AI为您精心定制的旅行方案</p>
                        </div>
                      </div>
                      <button 
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(result);
                            setCopySuccess(true);
                          } catch (err) {
                            setError('复制失败，请手动复制');
                          }
                        }}
                        className="relative w-10 h-10 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                        title="复制内容"
                      >
                        <Share2 className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                      </button>
                    </div>
                  </div>

                  {/* Markdown 内容 */}
                  <div className="p-5 md:p-6 prose prose-stone max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {result}
                    </ReactMarkdown>
                  </div>

                  {/* 操作按钮 */}
                  <div className="p-5 md:p-6 flex gap-3">
                    <button 
                      onClick={() => {
                        const blob = new Blob([result], { type: 'text/markdown' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = '黄檗文化旅行方案.md';
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="flex-1 h-11 bg-gradient-to-br from-white/80 to-white/60 border-2 border-stone-200 rounded-2xl flex items-center justify-center gap-2 md:gap-3 text-stone-700 font-semibold hover:border-amber-400 hover:shadow-lg transition-all"
                    >
                      <Download className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                      <span className="text-sm md:text-base">下载方案</span>
                    </button>
                    
                    <button 
                      onClick={() => setResult(null)}
                      className="h-11 w-11 bg-stone-100 hover:bg-stone-200 rounded-2xl flex items-center justify-center text-stone-700 font-semibold hover:shadow-lg transition-all"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 空状态 */}
            {!result && !error && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-stone-200 to-stone-300 rounded-3xl opacity-60 blur-xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-white/98 to-white/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-2 border-dashed border-stone-300 p-8 md:p-10 text-center">
                  <div className="relative z-10">
                    <div className="relative w-24 h-24 bg-gradient-to-br from-stone-200 to-stone-300 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-inner mx-auto">
                      <div className="absolute -inset-2 bg-gradient-to-br from-stone-300 to-stone-400 rounded-2xl opacity-50 blur-xl animate-pulse"></div>
                      <Map className="w-12 h-12 text-stone-400 relative z-10" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-stone-600 mb-3 md:mb-4">等待生成专属线路</h3>
                    <p className="text-base md:text-lg text-stone-500 max-w-md mx-auto leading-relaxed mb-6 md:mb-8">
                      请在左侧填写您的出行需求，我们的 AI 定制专家将为您生成一份深度、专业的黄檗文化主题旅行方案。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                      <div className="relative group/feature flex flex-col items-center gap-2.5 bg-gradient-to-br from-white/80 to-white/60 px-4 py-3.5 rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                        <div className="relative w-10 h-10 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center group-hover/feature:scale-110 transition-transform duration-300">
                          <Zap className="w-5 h-5 text-amber-600" />
                        </div>
                        <span className="text-stone-700 font-semibold text-xs md:text-sm">AI智能定制</span>
                      </div>
                      <div className="relative group/feature flex flex-col items-center gap-2.5 bg-gradient-to-br from-white/80 to-white/60 px-4 py-3.5 rounded-2xl border border-stone-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
                        <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center group-hover/feature:scale-110 transition-transform duration-300">
                          <Star className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-stone-700 font-semibold text-xs md:text-sm">深度文化体验</span>
                      </div>
                      <div className="relative group/feature flex flex-col items-center gap-2.5 bg-gradient-to-br from-white/80 to-white/60 px-4 py-3.5 rounded-2xl border border-stone-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                        <div className="relative w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center group-hover/feature:scale-110 transition-transform duration-300">
                          <Compass className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-stone-700 font-semibold text-xs md:text-sm">专业行程规划</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}