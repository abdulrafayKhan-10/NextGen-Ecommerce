import Logo from '../components/Logo';

const Footer = () => {
  return (
    <div className='bg-slate-900 text-slate-300 py-12 px-8 mt-40 border-t border-slate-800 shadow-inner'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm max-w-7xl mx-auto'>
        <div>
          <div className='mb-5'>
            <Logo />
          </div>
          <p className='w-full md:w-2/3 leading-relaxed text-slate-400'>
            Welcome to the NextGen E-Commerce platform. Experience unparalleled quality and service. We strive to bring you the best products with top-tier customer support.
          </p>
        </div>
        <div>
          <p className='text-xl font-bold mb-5 text-emerald-400 uppercase tracking-widest'>Company</p>
          <ul className='flex flex-col gap-3 text-slate-400'>
            <li className='hover:text-emerald-400 cursor-pointer transition-colors'>Home</li>
            <li className='hover:text-emerald-400 cursor-pointer transition-colors'>About us</li>
            <li className='hover:text-emerald-400 cursor-pointer transition-colors'>Delivery</li>
            <li className='hover:text-emerald-400 cursor-pointer transition-colors'>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-bold mb-5 text-emerald-400 uppercase tracking-widest'>Contact Us</p>
          <ul className='flex flex-col gap-3 text-slate-400'>
            <li className='hover:text-emerald-400 cursor-pointer transition-colors'>+1-234-567-8900</li>
            <li className='hover:text-emerald-400 cursor-pointer transition-colors'>support@dummycorp.xyz</li>
            <li className='hover:text-emerald-400 cursor-pointer transition-colors'>123 Example Street, Suite 400<br/>Tech City, TX 75001</li>
          </ul>
        </div>
      </div>
      <div className='max-w-7xl mx-auto'>
        <hr className='border-slate-800' />
        <p className='py-5 text-sm text-center text-slate-500'>Copyright © {new Date().getFullYear()} NextGen Platform - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
