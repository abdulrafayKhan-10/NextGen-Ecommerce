import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ProductReadDto } from '../types/Product';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { getProductImages } from '../services/productService';

const ProductItem: React.FC<ProductReadDto> = ({
  id,
  productTitle,
  description,
  price,
  quantity,
  brandName,
}) => {
  const [productImage, setProductImage] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getProductImages(id).then((images: any) => {
        if (images && images.length > 0) {
          setProductImage(images[0].imageURL);
        }
      }).catch(() => {});
    }
  }, [id]);

  const HandleAddToCart = () => {
    const product = {
      product: productTitle,
      quantity: 1,
      unitPrice: price,
      totalPrice: price,
      size: '',
      color: '',
      createdAt: new Date().toISOString(),
    };
    dispatch(addToCart(product));
  };

  return (
    <div className='flex flex-col h-full bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 group'>
      <Link className='flex-grow focus:outline-none' to={/products/ + id}>    
        <div className='overflow-hidden relative pb-[100%] bg-slate-50'>        
          <img
            className='absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
            src={productImage || assets.default_image}
            alt={productTitle}
          />
        </div>
        <div className='p-5 flex flex-col gap-2'>
          <h3 className='font-bold text-lg text-slate-800 line-clamp-1 group-hover:text-emerald-500 transition-colors'>{productTitle}</h3>
          <p className='text-sm text-slate-500 line-clamp-2 min-h-[40px]'>{description}</p>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-xl font-extrabold text-emerald-600'>${price.toFixed(2)}</p>
            <p className='text-xs font-semibold text-slate-400 uppercase tracking-wide bg-slate-100 px-2 py-1 rounded'>{brandName}</p>
          </div>
          <p className='text-xs font-medium text-slate-400 mt-1'>Stock: {quantity > 0 ? <span className='text-emerald-500'>{quantity}</span> : <span className='text-red-500'>Out of stock</span>}</p>
        </div>
      </Link>
      <div className='px-4 pb-4 mt-auto'>
        <button
          onClick={HandleAddToCart}
          disabled={quantity <= 0}
          className='w-full bg-slate-900 hover:bg-emerald-500 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md'
        >
          {quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
