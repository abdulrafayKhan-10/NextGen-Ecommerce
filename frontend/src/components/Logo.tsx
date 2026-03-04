import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Logo = () => {
  return (
    <Link to={'/'}>
      <span className='text-3xl font-extrabold text-emerald-400 tracking-widest font-sans drop-shadow-md'>
        NEXT<span className='text-white'>GEN</span>
      </span>
    </Link>
  );
};

export default Logo;
