import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "PROMO SPESIAL",
    title: "Diskon Hingga 50% Hari Ini",
    description:
      "Dapatkan penawaran barang elektronik dan fashion terbaik dengan harga paling hemat bulan ini.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Belanja Sekarang",
  },
  {
    id: 2,
    badge: "KOLEKSI TERBARU",
    title: "Gadget & Elektronik Canggih",
    description:
      "Temukan berbagai pilihan smartphone, laptop, dan aksesori modern dengan garansi resmi.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Lihat Produk",
  },
  {
    id: 3,
    badge: "FASHION TREND 2026",
    title: "Gaya Elegan Setiap Hari",
    description:
      "Upgrade penampilanmu dengan pakaian dan gaya masa kini dari brand-brand pilihan.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Jelajahi Sekarang",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play slider setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-lg mb-8 border border-slate-200 group bg-white">
      <div className="relative bg-white min-h-70 md:min-h-85 flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover opacity-30 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent" />
        </div>

        {/* Teks & Konten Promo (Tema Terang) */}
        <div className="relative z-10 px-8 md:px-14 max-w-xl text-slate-900">
          <span className="inline-block bg-blue-100 text-blue-700 font-bold px-3 py-1 mb-3 rounded-lg text-xs tracking-wide">
            {slides[currentIndex].badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 transition-all duration-500">
            {slides[currentIndex].title}
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            {slides[currentIndex].description}
          </p>
          <button className="mt-6 btn bg-blue-600 hover:bg-blue-700 text-white border-none font-semibold px-6 rounded-xl shadow-md shadow-blue-600/20 transition-all">
            {slides[currentIndex].buttonText}
          </button>
        </div>
      </div>

      {/* Navigasi Tombol Panah */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 hover:bg-blue-600 hover:text-white transition-all shadow-md opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 hover:bg-blue-600 hover:text-white transition-all shadow-md opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indikator Titik */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              currentIndex === index
                ? "w-8 bg-blue-600"
                : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
