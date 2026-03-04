import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center text-center px-4'>
      <div className='bg-white p-12 rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full'>
        <h1 className='text-9xl font-black text-slate-900 mb-4 drop-shadow-md'>
          4<span className='text-emerald-500'>0</span>4
        </h1>
        <h2 className='text-2xl font-bold text-slate-800 mb-4'>Page Not Found</h2>
        <p className='text-slate-500 mb-8 max-w-sm mx-auto'>
          We searched high and low, but we couldn't find the page you're looking for. It might have been moved or doesn't exist anymore.
        </p>
        <Link 
          to='/' 
          className='inline-block bg-slate-900 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg'
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
