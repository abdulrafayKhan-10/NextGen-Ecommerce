import Title from '../components/Title';

const About = () => {
  return (
    <div className='py-12 px-4'>
      <div className='text-center text-3xl mb-16'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col md:flex-row mb-16'>
           <div className='md:w-1/2 min-h-[300px] bg-slate-800 relative hidden md:block'>
             {/* placeholder illustration using minimal css elements */}
             <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                 <div className="w-1/2 h-1/2 rounded-full bg-emerald-500/10 blur-3xl absolute top-10 right-10"></div>
                 <div className="w-64 h-64 border-[16px] border-emerald-400 opacity-20 rounded-full"></div>
             </div>
           </div>
           <div className='md:w-1/2 p-10 md:p-14 flex flex-col justify-center'>
             <h2 className='text-3xl font-extrabold text-slate-900 mb-6'>NextGen <span className='text-emerald-500'>Vision</span></h2>
             <p className='text-slate-600 leading-relaxed mb-6'>
               Founded with a passion for quality and innovation, NextGen represents a leap forward in the e-commerce space. Our mission is to provide an unmatched shopping experience that combines cutting-edge technology with premium products.
             </p>
             <p className='text-slate-600 leading-relaxed'>
               We believe that shopping should be fast, secure, and inspiring. We meticulously curate our catalog to ensure that every item you purchase meets our rigorous standards of quality and sustainability.
             </p>
           </div>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          <div className='bg-white p-8 rounded-2xl shadow-md border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300'>
             <div className='w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold'>01</div>
             <h4 className='text-xl font-bold text-slate-800 mb-3'>Quality First</h4>
             <p className='text-slate-500 text-sm leading-relaxed'>Every product passes through strict quality control. Compromise is not in our vocabulary.</p>
          </div>
          <div className='bg-white p-8 rounded-2xl shadow-md border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300 xl:-translate-y-4'>
             <div className='w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold'>02</div>
             <h4 className='text-xl font-bold text-slate-800 mb-3'>Customer Success</h4>
             <p className='text-slate-500 text-sm leading-relaxed'>We do not just sell products; we deliver experiences. Support is integrated at every step.</p>
          </div>
          <div className='bg-white p-8 rounded-2xl shadow-md border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300'>
             <div className='w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold'>03</div>
             <h4 className='text-xl font-bold text-slate-800 mb-3'>Fast Delivery</h4>
             <p className='text-slate-500 text-sm leading-relaxed'>Partnering with top logistics channels, we ensure what you buy arrives safe and sound quickly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
