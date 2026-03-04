import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch } from 'react-icons/io5';
import { FaCartPlus } from 'react-icons/fa';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { CgProfile } from 'react-icons/cg';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, MenuItem, MenuList, Paper } from '@mui/material';
import Logo from '../components/Logo';
import { AppDispatch, RootState } from '../redux/store'; // Ensure correct imports
import { logoutUserThunk } from '../redux/thunks/authThunks';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const signOut = useSignOut();
  const totalQuantity = useSelector((state: RootState) =>
    state.cartR.cartItems.reduce((total, item) => total + item.quantity, 0)
  );
  const isLoggedIn = useSelector(
    (state: RootState) => state.authR.authenticated
  );
  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
    document.cookie = `${name}_state=; Max-Age=0; path=/;`;
    document.cookie = `${name}_type=; Max-Age=0; path=/;`;
  };

  const handleLogout = () => {
    signOut();
    dispatch(logoutUserThunk());
    deleteCookie('_auth');
    navigate('/');
  };

  useEffect(() => {}, [isLoggedIn]);

  return (
    <div className='flex items-center justify-between py-4 px-8 font-semibold bg-slate-900 text-white shadow-xl w-full sticky top-0 z-50'>
      <Logo />
      <ul className='sm:flex gap-8 text-sm text-slate-300 hidden uppercase tracking-wider'>
        <NavLink className='hover:text-emerald-400 transition-colors' to={'/'}>
          <p>Home</p>
        </NavLink>
        <NavLink
          className='hover:text-emerald-400 transition-colors'
          to={'/collection'}
        >
          <p>Collection</p>
        </NavLink>
        <NavLink className='hover:text-emerald-400 transition-colors' to={'/Contact'}>
          <p>Contact</p>
        </NavLink>
        <NavLink className='hover:text-emerald-400 transition-colors' to={'/about'}>
          <p>About</p>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>

        <div className='group relative'>
          <Link to={'/login'} className='hover:text-emerald-400 transition-colors'>
            <CgProfile className='w-6 h-6' />
          </Link>
          {isLoggedIn && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
              <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-slate-800 text-slate-300 rounded shadow-lg border border-slate-700'>
                <Link to={'/dashboard/user/profile'}>
                  <p className='cursor-pointer hover:text-emerald-400 transition-colors'>My Profile</p>
                </Link>
                <Link to={'/orders'}>
                  <p className='cursor-pointer hover:text-emerald-400 transition-colors'>Orders</p>
                </Link>
                <Button onClick={handleLogout} className="!justify-start !p-0 !min-w-0" sx={{textTransform: 'none', color: 'inherit'}}>
                  <p className='cursor-pointer hover:text-red-400 transition-colors'>Logout</p>
                </Button>
              </div>
            </div>
          )}
        </div>

        <Link to='/cart' className='relative hover:text-emerald-400 transition-colors'>
          <FaCartPlus className='w-6 h-6' />
          {totalQuantity > 0 && (
            <span className='absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm'>
              {totalQuantity}
            </span>
          )}
        </Link>
        <div
          onClick={() => setVisible(true)}
          className='w-6 cursor-pointer sm:hidden hover:text-emerald-400 transition-colors'
        >
          <MenuIcon />
        </div>
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <Paper>
          <MenuList>
            {['Home', 'Collection', 'Contact', 'About'].map((item) => (
              <MenuItem
                key={item}
                onClick={() => setVisible(false)}
                component={Link}
                to={`/${item.toLowerCase()}`}
                sx={{
                  backgroundColor: 'inherit',
                  '&:hover': {
                    backgroundColor: 'lightblue',
                  },
                  padding: '10px',
                }}
              >
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </div>
    </div>
  );
};

export default Navbar;
