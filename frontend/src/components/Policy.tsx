import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-8 text-center py-20 text-slate-800'>
      <div className='bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-1/3'>
        <ChangeCircleIcon sx={{ fontSize: 48, color: '#10b981' }} className='mb-4 drop-shadow' />
        <p className='font-bold text-lg mb-2'>Easy Exchange Policy</p>
        <p className='text-sm text-slate-500'>Hassle-free exchanges within 30 days for any reason. We make it simple.</p>
      </div>
      <div className='bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-1/3'>
        <HighQualityIcon sx={{ fontSize: 48, color: '#10b981' }} className='mb-4 drop-shadow' />
        <p className='font-bold text-lg mb-2'>Premium Quality</p>
        <p className='text-sm text-slate-500'>We guarantee top-tier materials and craftsmanship on all our NextGen items.</p>
      </div>
      <div className='bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-1/3'>
        <SupportAgentIcon sx={{ fontSize: 48, color: '#10b981' }} className='mb-4 drop-shadow' />
        <p className='font-bold text-lg mb-2'>24/7 Dedicated Support</p>
        <p className='text-sm text-slate-500'>Our NextGen team is always available to help you with any issue you might have.</p>
      </div>
    </div>
  );
};

export default Policy;
