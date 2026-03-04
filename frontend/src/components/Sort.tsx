import { SortType } from '../types/Sort';

const Sort = (props: SortType) => {
  return (
    <div className='sort flex items-center gap-3'>
      <label htmlFor='sortBy' className='font-bold text-slate-500 uppercase tracking-wide text-xs whitespace-nowrap'>
        Sort By
      </label>
      <select 
         value={props.sortCriteria} 
         onChange={props.onHandleSortChange}
         className='bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 outline-none font-medium cursor-pointer shadow-sm min-w-[140px]'
      >
        <option value=''>Featured</option>
        <option value='low-high'>Price: Low to High</option>
        <option value='high-low'>Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sort;
