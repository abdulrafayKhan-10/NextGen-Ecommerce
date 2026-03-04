import { ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchAllCategoriesThunk } from '../redux/thunks/categoryThunks';
import { CategoryReadDto } from '../types/Category';

const Filters = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categoryR
  );

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk());
  }, [dispatch]);

  const handleCategoryFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Update selected category when a category checkbox is clicked
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
      setSelectedCategory(null); // Deselect when removing
    } else {
      setCategory((prev) => [...prev, value]);
      setSelectedCategory(value); // Set selected category
    }
  };

  const handleSubCategoryFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error}</p>;
  }

  return (
    <div className='w-full'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='text-xl font-bold text-slate-800 flex items-center cursor-pointer gap-2 uppercase tracking-wide justify-between sm:justify-start mb-6'
        >
          FILTERS
          <span className="sm:hidden text-emerald-500 text-sm border border-emerald-500 rounded px-2 py-1">{showFilter ? 'Hide' : 'Show'}</span>
        </p>

        <div className={`transition-all duration-300 ${showFilter ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden sm:opacity-100 sm:max-h-[1000px]'}`}>

          <div className='mb-6'>
            <p className='text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2'>Categories</p>
            <div className='flex flex-col gap-3 text-slate-700 font-medium'>
              {categories.length === 0 && <p className='text-sm text-slate-400 italic'>No categories available</p>}
              {categories.map((cat: CategoryReadDto) => (
                <div key={cat.id} className='bg-slate-50 rounded-lg p-3 border border-slate-100 transition-colors hover:border-emerald-200'>
                  <label className='flex items-center gap-3 cursor-pointer group'>
                    <input
                      className='w-4 h-4 text-emerald-600 bg-white border-slate-300 rounded focus:ring-emerald-500 cursor-pointer accent-emerald-500'
                      type='checkbox'
                      value={cat.categoryName}
                      onChange={handleCategoryFilter}
                    />
                    <span className='group-hover:text-emerald-600 transition-colors'>{cat.categoryName}</span>
                  </label>

                  {selectedCategory === cat.categoryName && cat.subCategories.length > 0 && (
                      <div className='ml-6 mt-3 flex flex-col gap-2 pl-3 border-l-2 border-slate-200'>
                        {cat.subCategories.map((subCat) => (
                          <label className='flex items-center gap-3 cursor-pointer group text-sm' key={subCat.id}>
                            <input
                              className='w-3.5 h-3.5 text-emerald-600 bg-white border-slate-300 rounded focus:ring-emerald-500 cursor-pointer accent-emerald-500'
                              type='checkbox'
                              value={subCat.categoryName}
                              onChange={handleSubCategoryFilter}
                            />
                            <span className='text-slate-600 group-hover:text-emerald-500 transition-colors'>{subCat.categoryName}</span>
                          </label>
                        ))}
                      </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Filters;
