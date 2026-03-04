import Title from '../components/Title';

const Contact = () => {
  return (
    <div className='py-12'>
      <div className='text-center text-3xl mb-12'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row'>
        <div className='md:w-1/2 p-10 bg-slate-900 text-white flex flex-col justify-center'>
          <h3 className='text-2xl font-bold text-emerald-400 mb-6'>Get in Touch</h3>
          <p className='text-slate-300 mb-8 leading-relaxed'>
            We'd love to hear from you. Whether you have a question about products, pricing, or anything else, our team is ready to answer all your questions.
          </p>

          <div className='flex flex-col gap-4 text-sm font-medium'>
            <div className='flex items-center gap-3'>
               <span className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400'>📞</span>
               <p>+1-234-567-8900</p>
            </div>
            <div className='flex items-center gap-3'>
               <span className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400'>✉️</span>
               <p>support@dummycorp.xyz</p>
            </div>
            <div className='flex items-center gap-3'>
               <span className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400'>📍</span>
               <p>123 Example Street, Suite 400, Tech City, TX 75001</p>
            </div>
          </div>
        </div>

        <div className='md:w-1/2 p-10'>
           <form className='flex flex-col gap-5'>
              <div>
                <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>Name</label>
                <input type='text' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium' placeholder='John Doe' />
              </div>
              <div>
                <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>Email</label>
                <input type='email' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium' placeholder='john@example.com' />
              </div>
              <div>
                <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>Message</label>
                <textarea rows={4} className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium resize-none' placeholder='How can we help you?'></textarea>
              </div>
              <button className='mt-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3 rounded-lg transition-colors shadow-md'>Send Message</button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
