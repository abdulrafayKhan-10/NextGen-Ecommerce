import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductThunk } from '../redux/thunks/productThunks';
import { addToCart } from '../redux/slices/cartSlice';
import { AppDispatch, RootState } from '../redux/store';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state: RootState) => state.productR);
  
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductThunk(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        product: product.productTitle,
        quantity: quantity,
        unitPrice: product.price,
        totalPrice: product.price * quantity,
        size: '',
        color: '',
        createdAt: new Date().toISOString(),
      };
      dispatch(addToCart(cartItem));
      // Optional: Add visual feedback instead of immediate redirect
      // navigator('/cart'); 
    }
  };

  if (loading) return <div className='py-20 text-center text-xl text-slate-500'>Loading product details...</div>;
  if (error) return <div className='py-20 text-center text-red-500'>Error loading product: {error}</div>;
  if (!product) return <div className='py-20 text-center text-slate-500'>Product not found.</div>;

  return (
    <div className='py-12 max-w-6xl mx-auto'>
      <div className='mb-8'>
        <button 
          onClick={() => navigate(-1)} 
          className='text-slate-500 hover:text-emerald-500 font-medium transition-colors flex items-center gap-2'
        >
          <span>&larr;</span> Back
        </button>
      </div>

      <div className='bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row'>
        {/* Image Section */}
        <div className='md:w-1/2 p-10 bg-slate-50 flex items-center justify-center border-r border-slate-100'>
          <img 
            src={assets.default_image || 'https://via.placeholder.com/500'} 
            alt={product.productTitle} 
            className='max-w-full h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-500'
          />
        </div>

        {/* Product Info Section */}
        <div className='md:w-1/2 p-10 lg:p-14 flex flex-col justify-center'>
          <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 bg-slate-100 self-start px-3 py-1 rounded'>{product.brandName}</h2>
          <h1 className='text-3xl lg:text-4xl font-extrabold text-slate-800 mb-4 leading-tight'>{product.productTitle}</h1>
          
          <div className='flex items-center gap-4 mb-6'>
            <p className='text-4xl font-extrabold text-emerald-600'>${product.price?.toFixed(2)}</p>
            {product.quantity > 0 ? (
              <span className='px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full'>In Stock ({product.quantity})</span>
            ) : (
              <span className='px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full'>Out of Stock</span>
            )}
          </div>

          <p className='text-slate-500 leading-relaxed mb-8'>
            {product.description || 'No description available for this product. Check back later for more details.'}
          </p>

          {/* Controls */}
          <div className='flex items-center gap-4 mt-auto pt-6 border-t border-slate-100'>
            <div className='flex items-center border border-slate-200 rounded-lg bg-slate-50'>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className='px-4 py-3 text-slate-500 hover:text-slate-800 transition-colors font-bold'
                disabled={quantity <= 1}
              >-</button>
              <span className='w-10 text-center font-bold text-slate-800'>{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                className='px-4 py-3 text-slate-500 hover:text-slate-800 transition-colors font-bold'
                disabled={quantity >= product.quantity}
              >+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={product.quantity <= 0}
              className='flex-grow bg-slate-900 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          {/* Extra Info */}
          <div className='mt-8 flex flex-col gap-2 text-sm text-slate-400 font-medium'>
            <p className='flex items-center gap-2'><span>✓</span> 100% Original Product.</p>
            <p className='flex items-center gap-2'><span>✓</span> Free Delivery on orders over $50.</p>
            <p className='flex items-center gap-2'><span>✓</span> Easy return and exchange policy within 14 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// // import { fetchSingleProductData } from '../redux/slices/productSlice';
// import { useEffect, useState } from 'react';
// import { AppDispatch, RootState } from '../redux/store';
// import { assets } from '../assets/assets';

// const ProductDetail = () => {
//   const navigate = useNavigate();
//   const { productId } = useParams<string>();
//   const dispatch: AppDispatch = useDispatch();
//   const { product, loading, error } = useSelector(
//     (state: RootState) => state.productR
//   );
//   const [image, setImage] = useState<string>('');
//   const [rating, setRating] = useState<number>(0);

//   // const addToCart = async(itemId, size) => {
//   //   let cartData = structuredClone(cartItems);
//   //   if(cartData[itemid]){
//   //     if(cartData[itemId][size]){
//   //       cartData[itemId][size] += 1;
//   //     }
//   //     else{
//   //       cartData[itemId][size] = 1,
//   //     }
//   //   }
//   // }

//   useEffect(() => {
//     if (productId) {
//       let url = `https://dummyjson.com/products/${productId}`;
//       dispatch(fetchSingleProductData(url));
//     }
//   }, [dispatch, productId]);

//   // Set the first image when the product is fetched
//   useEffect(() => {
//     if (product && product.images.length > 0) {
//       setImage(product.images[0]); // Set the first image as the main image
//       setRating(product.rating); // Set the rating from the product data
//     }
//   }, [product]);
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   const handleBack = () => {
//     navigate('/');
//   };

//   // Helper function to generate an array of stars based on rating
//   const renderStars = (rating: number) => {
//     const totalStars = 5;
//     const filledStars = Math.floor(rating); // Full stars
//     const emptyStars = totalStars - filledStars;

//     return (
//       <>
//         {Array(filledStars)
//           .fill(null)
//           .map((_, index) => (
//             <img
//               key={index}
//               src={assets.star}
//               alt='filled star'
//               className='w-3.5'
//             />
//           ))}
//         {Array(emptyStars)
//           .fill(null)
//           .map((_, index) => (
//             <img
//               key={index}
//               src={assets.star_dull}
//               alt='empty star'
//               className='w-3.5'
//             />
//           ))}
//       </>
//     );
//   };

//   return product ? (
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//       <button
//         onClick={handleBack}
//         className=' bg-black text-white px-5 py-3 text-sm active:bg-gray-700 rounded'
//       >
//         Back
//       </button>
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
//         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//           <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
//             {product.images.map((item: string, index: number) => (
//               <img
//                 onClick={() => setImage(item)}
//                 src={item}
//                 key={index}
//                 className='w-[24%] sm:w-[80%] sm:mb-3 flex-shrink-0 cursor-pointer'
//                 alt=''
//               />
//             ))}
//           </div>
//           <div className='w-full sm:w-[50%] '>
//             {/* Should put default image */}
//             <img src={image} className='w-[80%] h-auto' alt='' />
//           </div>
//           {
//             <div className='flex-1'>
//               <h1 className='font-medium text-2xl mt-2'>{product.title}</h1>
//               {/* Dynamic star rating */}
//               <div className='flex items-center gap-1 mt-2'>
//                 {renderStars(rating)}
//                 <p className='pl-2'>({rating.toFixed(1)})</p>
//               </div>
//               <p className='mt-5 text-3xl font-medium'>€ {product.price}</p>
//               <p className='mt-5 text-gray-500 md:w-4/5'>
//                 € {product.description}
//               </p>
//               <div className='flex flex-col gap-4 my-8'>
//                 <p>Select Size</p>
//                 {/* For size */}
//                 {/* <div className='flex gap-2'>
//                   {
//                     product.size.map((item, index)=>(
//                       <button  key={index}>{item}</button>
//                     ))
//                   }
//                 </div> */}
//               </div>
//               <div className='flex flex-col gap-4 my-8'>
//                 <p>Select Color</p>
//                 {/* For color */}
//                 {/* <div className='flex gap-2'>
//                   {
//                     product.color.map((item, index)=>(
//                       <button key={index}>{item}</button>
//                     ))
//                   }
//                 </div> */}
//               </div>
//               <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded'>
//                 ADD TO CART
//               </button>
//               <hr className='mt-8 sm:w-4/5' />
//               <div className='text-sm tex-gray-500 mt-5 flex flex-col gap-1'>
//                 <p>100% Original Product.</p>
//               </div>
//             </div>
//           }
//         </div>
//       </div>
//       <div className='mt-20'>
//         <div className='flex'>
//           <b className='border px-5 py-3 text-sm'>Warranty</b>
//           <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
//         </div>
//         <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
//           <p>{product.warrantyInformation}</p>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className='opacity-0'></div>
//   );
// };

// export default ProductDetail;
