import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchUser } from '../services/userService';
import Title from '../components/Title';
import { UserReadDto } from '../types/User';

const UserProfile = () => {
  const [userData, setUserData] = useState<UserReadDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { userId, token } = useSelector((state: RootState) => state.authR);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userId) {
          const data = await fetchUser(userId);
          setUserData(data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [userId, token]);

  if (loading) return <div className='py-12 max-w-4xl mx-auto text-center'>Loading profile...</div>;

  return (
    <div className='py-12 max-w-4xl mx-auto'>
      <div className='text-center text-3xl mb-12'>
        <Title text1={'USER'} text2={'PROFILE'} />
      </div>
      
      {error ? (
        <div className='text-center text-red-500 py-10 bg-white rounded-2xl shadow-sm border border-slate-100'>
          <p>{error}</p>
        </div>
      ) : userData ? (
        <div className='bg-white p-10 rounded-2xl shadow-xl border border-slate-100'>
          <div className='flex items-center gap-6 border-b border-slate-100 pb-8 mb-8'>
            <div className='w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-4xl font-bold'>
              {userData.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className='text-2xl font-bold text-slate-800'>{userData.name}</h2>
              <p className='text-slate-500'>{userData.email}</p>
              <div className='mt-2 inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider'>
                {userData.role || 'Member'}
              </div>
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-slate-50 p-6 rounded-xl border border-slate-100'>
              <h3 className='text-sm font-bold text-slate-400 uppercase tracking-wide mb-4'>Delivery Information</h3>
              <div className='space-y-4 text-slate-700 font-medium'>
                <div>
                  <span className='block text-xs font-bold text-slate-400 mb-1'>Phone Number</span>
                  {userData.phone || 'Not provided'}
                </div>
                <div>
                  <span className='block text-xs font-bold text-slate-400 mb-1'>Country</span>
                  {userData.country || 'Not provided'}
                </div>
                <div>
                  <span className='block text-xs font-bold text-slate-400 mb-1'>City</span>
                  {userData.city || 'Not provided'}
                </div>
              </div>
            </div>
            
            <div className='bg-slate-50 p-6 rounded-xl border border-slate-100'>
              <h3 className='text-sm font-bold text-slate-400 uppercase tracking-wide mb-4'>Account Details</h3>
              <div className='space-y-4 text-slate-700 font-medium'>
                <div>
                  <span className='block text-xs font-bold text-slate-400 mb-1'>Account Created</span>
                  {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                </div>
                <div>
                  <span className='block text-xs font-bold text-slate-400 mb-1'>Status</span>
                  <span className='text-emerald-500 font-bold'>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center text-slate-500 py-10 bg-white rounded-2xl shadow-sm border border-slate-100'>
          <p>No user data available. Please login.</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
