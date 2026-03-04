import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';

import { AppDispatch, RootState } from '../redux/store';
import ProductItem from '../components/ProductItem';
import Filters from '../components/Filters';
import Title from '../components/Title';
import Sort from '../components/Sort';
import Search from '../components/Search';
import { ProductReadDto } from '../types/Product';
import { fetchAllProductThunk } from '../redux/thunks/productThunks';

const Collection = () => {
  const itemsPerPage = 5;
  const dispatch: AppDispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
    totalPages,
  } = useSelector((state: RootState) => state.productR);

  const [sortCriteria, setSortCriteria] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sorting handler
  const handleSortingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  // Search handler
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  // Fetch products when page, sort criteria, or search value changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(
          fetchAllProductThunk({
            page: currentPage,
            perPage: itemsPerPage,
            search: searchValue,
            sort: sortCriteria,
          })
        );
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, [currentPage, sortCriteria, searchValue, dispatch]);

  // Pagination handler
  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex flex-col sm:flex-row gap-6 pt-10 pb-20'>
      <div className='w-full sm:w-1/4'>
        <div className='bg-white p-6 rounded-xl shadow-md border border-slate-100'>
          <Filters />
        </div>
      </div>

      <div className='flex-1 flex flex-col gap-6'>
        <div className='bg-white p-6 rounded-xl shadow-md border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4'>
          <Search
            searchValue={searchValue}
            onHandleSearchChange={handleSearchChange}
          />
          <Sort
            sortCriteria={sortCriteria}
            onHandleSortChange={handleSortingChange}
          />
        </div>

        <div className='bg-white p-8 rounded-xl shadow-md border border-slate-100'>
          <Title text1='ALL' text2='PRODUCTS' />

          {error ? (
            <div className='text-center py-10'>
               <p className='text-red-500 font-bold text-lg mb-2'>Oops! Connection Error.</p>
               <p className='text-slate-500'>We couldn't connect to the server. Please ensure the backend is running.</p>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-8'>
                {products.length > 0 ? (
                  products.map((item: ProductReadDto) => (
                    <ProductItem
                      key={item.id}
                      id={item.id}
                      productTitle={item.productTitle}
                      price={item.price}
                      categoryId={item.categoryId}
                      description={item.description}
                      brandName={item.brandName}
                      quantity={item.quantity}
                      createdAt={''}
                    />
                  ))
                ) : (
                  <div className='col-span-full py-10 text-center text-slate-500'>
                    No products found matching your criteria
                  </div>
                )}
              </div>

              {!loading && totalPages > 1 && (
                <div className='mt-10 flex justify-center'>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant='outlined'
                    shape='rounded'
                    color="primary"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
