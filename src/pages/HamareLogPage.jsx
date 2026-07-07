import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaArrowRight, FaUsers, FaHome, FaSeedling, FaStar } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

export default function HamareLogPage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { lang } = useLanguage();
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/portfolio-website/kp-kasana-portfolio`)
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data && resData.data.hamareLog) {
          setData(resData.data.hamareLog);
        }
      })
      .catch(err => console.error('Error fetching HamareLog data:', err));
  }, []);
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

if (!data) return <div className="min-h-screen bg-[#4a0d0d] flex items-center justify-center text-white text-2xl font-bold">Loading...</div>;

const priorities = data.priorities?.items || [];
const news = data.updates?.items || [];

const getIcon = (iconStr) => {
  switch (iconStr) {
    case 'FaUsers': return <FaUsers className="text-3xl" style={{ color: '#FFD700' }} />;
    case 'FaHome': return <FaHome className="text-3xl" style={{ color: '#4ade80' }} />;
    case 'FaSeedling': return <FaSeedling className="text-3xl" style={{ color: '#a3e635' }} />;
    case 'FaStar': return <FaStar className="text-3xl" style={{ color: '#FFD700' }} />;
    default: return <FaStar className="text-3xl text-[#FFD700]" />;
  }
};

return (
  <div className="bg-[#4a0d0d] min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black">
    {/* Dark overlay for navbar compatibility */}
    <div className="bg-[#4a0d0d] absolute top-0 w-full h-[80px] z-50"></div>
    <div className="relative z-[60]">
      <Navbar />
    </div>

    <main className="pt-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center bg-cover bg-center" style={{ backgroundImage: "url('/hmarelog4.jpeg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a0d0d]/90 via-[#4a0d0d]/70 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-8xl font-black mb-2 tracking-tight leading-none" style={{ fontFamily: 'sans-serif' }}>
              {lang === 'hi' ? data.hero?.titleLine1Hi : data.hero?.titleLine1} <span className="text-[#FFD700]">{lang === 'hi' ? data.hero?.titleLine2Hi : data.hero?.titleLine2}</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {lang === 'hi' ? data.hero?.subtitleHi : data.hero?.subtitle}
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 font-medium">
              {lang === 'hi' ? data.hero?.descriptionLine1Hi : data.hero?.descriptionLine1}<br />
              <span className="text-[#FFD700]">{lang === 'hi' ? data.hero?.descriptionLine2Hi : data.hero?.descriptionLine2}</span>
            </p>
          </motion.div>


        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-[#330808] border-y border-[#FFD700]/30 py-6 relative z-20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/10">
            {data.stats?.map((stat, i) => (
              <div key={i} className="px-4">
                <div className="flex justify-center items-center gap-3 mb-1">
                  {getIcon(stat.icon)}
                  <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-gray-400 text-sm">{lang === 'hi' ? stat.labelHi : stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VIDEO & QUOTE SECTION */}
      <section className="bg-white py-20 w-full">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#FFD700]/50 aspect-video group cursor-pointer"
            onClick={toggleVideo}
          >
            <video
              ref={videoRef}
              src="/HMarelogVideo.mp4"
              className="w-full h-full object-contain bg-black"
              onEnded={() => setIsPlaying(false)}
              playsInline
            />
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/40 transition-all border border-white/50">
                  <FaPlay className="text-white ml-1" size={24} />
                </div>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{lang === 'hi' ? data.videoQuote?.titleLine1Hi : data.videoQuote?.titleLine1}</h2>
            <h2 className="text-3xl md:text-4xl font-bold text-[#FF9900] mb-6">{lang === 'hi' ? data.videoQuote?.titleLine2Hi : data.videoQuote?.titleLine2}</h2>

            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></span>
              <span className="text-[#FFD700]">❖</span>
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></span>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {lang === 'hi' ? data.videoQuote?.desc1Hi : data.videoQuote?.desc1}
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              <span className="text-[#FF9900] font-bold">{lang === 'hi' ? data.videoQuote?.desc2PrefixHi : data.videoQuote?.desc2Prefix}</span> {lang === 'hi' ? data.videoQuote?.desc2SuffixHi : data.videoQuote?.desc2Suffix}
            </p>

            <button className="bg-[#FF9900] hover:bg-[#FFD700] text-black font-bold py-3 px-8 rounded text-lg transition-colors shadow-lg">
              {lang === 'hi' ? data.videoQuote?.buttonTextHi : data.videoQuote?.buttonText}
            </button>
          </motion.div>
        </div>
      </section>

      {/* PRIORITIES SECTION */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="h-[1px] w-16 md:w-32 bg-[#FFD700]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-center">{lang === 'hi' ? data.priorities?.titleHi : data.priorities?.title}</h2>
          <span className="h-[1px] w-16 md:w-32 bg-[#FFD700]"></span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {priorities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="rounded-xl overflow-hidden mb-4 border-2 border-[#FFD700]/20 shadow-lg aspect-[3/4] bg-black/10">
                <img src={item.image} alt={lang === 'hi' ? item.titleHi : item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-[#FFD700] font-bold text-lg mb-2 text-center">{lang === 'hi' ? item.titleHi : item.title}</h3>
              <p className="text-sm text-gray-300 text-center leading-relaxed">{lang === 'hi' ? item.descHi : item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUOTE BANNER */}
      <section className="my-12 py-16 relative overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #FF6B00, #3E0A05, #FF6B00)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.4)] shrink-0">
              <img src="/Kp%20image.png" alt="K.P. Kasana" className="w-full h-full object-cover object-top bg-white" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold leading-relaxed mb-4 text-white">
              {lang === 'hi' ? data.quoteBanner?.quoteTextHi : data.quoteBanner?.quoteText}
            </h3>
            <p className="text-xl text-[#FFD700] font-bold">{lang === 'hi' ? data.quoteBanner?.authorNameHi : data.quoteBanner?.authorName}</p>
          </motion.div>
        </div>
      </section>

      {/* LATEST UPDATES */}
      <section className="py-16 px-6 max-w-7xl mx-auto mb-20">
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="h-[1px] w-16 md:w-32 bg-[#FFD700]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-center">{lang === 'hi' ? data.updates?.titleHi : data.updates?.title}</h2>
          <span className="h-[1px] w-16 md:w-32 bg-[#FFD700]"></span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {news.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white text-black rounded-lg overflow-hidden shadow-xl"
            >
              <div className="h-40 overflow-hidden relative bg-black/10">
                <img src={item.image} alt={lang === 'hi' ? item.titleHi : item.title} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-2 font-bold">{lang === 'hi' ? item.dateHi : item.date}</p>
                <h3 className="font-bold text-lg mb-2 text-[#4a0d0d]">{lang === 'hi' ? item.titleHi : item.title}</h3>
                <p className="text-sm text-gray-700">{lang === 'hi' ? item.descHi : item.desc}</p>
                <button className="mt-4 text-[#FF9900] font-bold flex items-center gap-2 hover:text-[#4a0d0d] transition-colors text-sm">
                  {lang === 'hi' ? 'और पढ़ें' : 'Read More'} <FaArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button className="border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-semibold py-2 px-8 rounded transition-colors">
            {lang === 'hi' ? (data.updates?.buttonTextHi || 'सभी समाचार देखें') : (data.updates?.buttonText || 'View All News')}
          </button>
        </div>
      </section>

    </main>

    <Footer />
  </div>
  );
}
