import { SearchType } from '../types/Search';
import { IoSearch } from 'react-icons/io5';

const Search = (props: SearchType) => {
  return (
    <div className='search flex-grow max-w-md relative'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
         <IoSearch className='text-slate-400 w-5 h-5' />
      </div>
      <input
        type='search'
        id='search'
        name='search'
        className='w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow text-slate-700 placeholder-slate-400 font-medium'
        value={props.searchValue}
        placeholder='Search for products...'
        onChange={props.onHandleSearchChange}
      />
    </div>
  );
};

export default Search;
