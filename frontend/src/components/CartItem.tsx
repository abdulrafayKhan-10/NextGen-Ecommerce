import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ProductReadDto } from '../types/Product';

const CartItem: React.FC<ProductReadDto> = ({
  id,
  productTitle,
}) => {
  return (
    <Link className='block w-full h-full' to={`/products/${id}`}>
      <div className='w-full h-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center relative group'>
        <img
          className='absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
          src={assets.default_image}
          alt={productTitle}
        />
      </div>
    </Link>
  );
};

export default CartItem;
