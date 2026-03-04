import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className='relative w-full h-[80vh] bg-slate-900 flex items-center justify-center overflow-hidden'>
      {/* Background Image Overlay */}
      <div 
        className='absolute inset-0 bg-cover bg-center opacity-40'
        style={{ backgroundImage: `url(${assets.hero})` }}
      />
      <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900 opacity-80'></div>

      <div className='relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto'>
        <div className='flex items-center gap-3 mb-6'>
          <span className='w-12 h-[2px] bg-emerald-400'></span>
          <p className='text-emerald-400 font-bold tracking-widest uppercase text-sm md:text-base shadow-sm'>
            Discover NextGen Quality
          </p>
          <span className='w-12 h-[2px] bg-emerald-400'></span>
        </div>

        <h1 className='text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8 tracking-tight'>
          Elevate Your Lifestyle With <span className="text-emerald-400">Exclusive</span> Gear
        </h1>

        <p className='text-slate-300 text-lg md:text-xl max-w-2xl mb-10'>
          Experience unparalleled design and performance. Uncover the finest selection of premium products curated just for you.
        </p>

        <button className='bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-10 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 shadow-xl'>
          Explore The Collection
        </button>
      </div>
    </div>
  );
};

export default Hero;
