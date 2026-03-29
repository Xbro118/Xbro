import { MapPin, Phone, Mail, Clock, Users, Send, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('感谢您的留言！我们会尽快回复您。');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: '地址',
      value: '日本东京都千代田区神田神保町1-1',
      description: '欢迎到访咨询'
    },
    {
      icon: Phone,
      title: '电话',
      value: '+81-3-1234-5678',
      description: '工作日 9:00-18:00'
    },
    {
      icon: Mail,
      title: '邮箱',
      value: 'contact@huangbo-culture.jp',
      description: '24小时内回复'
    },
    {
      icon: Clock,
      title: '工作时间',
      value: '周一至周五 9:00-18:00',
      description: '节假日休息'
    }
  ];

  const faqs = [
    {
      question: '如何定制黄檗文化旅行？',
      answer: '您可以通过我们的在线定制平台填写需求，AI会为您生成专属的旅行方案。'
    },
    {
      question: '旅行费用包含哪些内容？',
      answer: '费用包含住宿、交通、景点门票、导游服务等，具体根据您的定制方案确定。'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaf9] via-[#f5f5f4] to-[#e7e5e4] pt-20 md:pt-24 lg:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 lg:py-36">
        <div className="text-center mb-16 md:mb-20 lg:mb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-orange-50/20 to-amber-50/30 rounded-3xl blur-3xl -z-10"></div>
          <div className="relative">
            <h1 className="text-display font-serif mb-6 md:mb-8 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 bg-clip-text text-transparent">
              联系我们
            </h1>
            <p className="text-heading text-stone-600 font-light max-w-3xl mx-auto leading-relaxed">
              期待与您交流，为您提供专业的黄檗文化旅行咨询服务
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-8 mt-6">
              <div className="flex items-center gap-2 text-stone-500">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">专业团队</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">快速响应</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">定制服务</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-20 lg:mb-24">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-stone-100/50 p-8 md:p-10 transition-all duration-500 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-heading font-serif text-stone-900">
                  发送消息
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="space-y-3">
                  <label className="block text-body-large font-semibold text-stone-700 mb-3 flex items-center gap-2">
                    <span className="text-amber-500">*</span>姓名
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none text-stone-800 placeholder-stone-400"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-body-large font-semibold text-stone-700 mb-3 flex items-center gap-2">
                    <span className="text-amber-500">*</span>邮箱
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none text-stone-800 placeholder-stone-400"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-body-large font-semibold text-stone-700 mb-3">
                    电话
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none text-stone-800 placeholder-stone-400"
                      placeholder="请输入您的电话（可选）"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-body-large font-semibold text-stone-700 mb-3 flex items-center gap-2">
                    <span className="text-amber-500">*</span>主题
                  </label>
                  <div className="relative">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none text-stone-800 appearance-none cursor-pointer"
                    >
                      <option value="">请选择咨询主题</option>
                      <option value="定制旅行">定制旅行</option>
                      <option value="文化咨询">文化咨询</option>
                      <option value="商务合作">商务合作</option>
                      <option value="其他">其他</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-body-large font-semibold text-stone-700 mb-3 flex items-center gap-2">
                    <span className="text-amber-500">*</span>消息内容
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none text-stone-800 placeholder-stone-400 resize-none"
                      placeholder="请详细描述您的需求或问题..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full py-4 md:py-5 text-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    发送消息
                  </div>
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-stone-100/50 p-8 md:p-10 transition-all duration-500 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-heading font-serif text-stone-900">
                    联系信息
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div
                        key={index}
                        className="group/item relative overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100/80 rounded-xl p-5 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 border-2 border-transparent hover:border-amber-200/50"
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-200/20 to-amber-300/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-subheading font-bold text-stone-900 mb-1.5">{info.title}</h3>
                            <p className="text-body text-stone-700 font-medium mb-1 truncate">{info.value}</p>
                            <p className="text-body-small text-stone-500">{info.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-stone-100/50 p-8 md:p-10 transition-all duration-500 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-heading font-serif text-stone-900">
                  常见问题
                </h2>
              </div>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="group/faq relative overflow-hidden bg-gradient-to-br from-white to-stone-50 border-2 border-stone-200 rounded-xl hover:border-amber-300 hover:shadow-md hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600 opacity-0 group-hover/faq:opacity-100 transition-opacity duration-300"></div>
                      <div className="p-5">
                        <h4 className="text-body-large font-semibold text-stone-900 mb-2 group-hover/faq:text-amber-700 transition-colors">{faq.question}</h4>
                        <p className="text-body text-stone-600 leading-relaxed">{faq.answer}</p>
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