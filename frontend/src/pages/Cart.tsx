import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { removeFromCart, updateCartItem } from '../redux/slices/cartSlice';
import { CartItemReadDto } from '../types/CartItem';
import CartItem from '../components/CartItem';
import Title from '../components/Title';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice, loading, error } = useSelector(
    (state: RootState) => state.cartR
  );

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    // Ensure the quantity is not less than 1
    if (quantity < 1) return;

    const updatedItem = cartItems.find((item) => item.id === id);
    if (updatedItem) {
      dispatch(updateCartItem({ ...updatedItem, quantity }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className='py-12 max-w-5xl mx-auto'>
      <div className='text-center text-3xl mb-12'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartItems.length === 0 ? (
        <div className='text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100'>
          <p className='text-slate-500 text-lg mb-6'>Your cart is looking a little empty.</p>
          <button 
             onClick={() => navigate('/collection')}
             className='bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors shadow-md'>
             Start Shopping
          </button>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='lg:w-2/3 flex flex-col gap-4'>
            {cartItems.map((item: CartItemReadDto) => (
              <div key={item.id} className='flex items-center gap-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow'>
                <div className='w-24 h-24 flex-shrink-0'>
                   <CartItem
                      id={item.id}
                      productTitle={item.product}
                      price={item.unitPrice}
                      categoryId={''}
                      description={item.size}
                      brandName={item.color}
                      quantity={1}
                      createdAt={''}
                    />
                </div>

                <div className='flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                   <div>
                      <h4 className='font-bold text-slate-800 text-lg'>{item.product}</h4>
                      <p className='text-emerald-600 font-extrabold'>${item.unitPrice.toFixed(2)}</p>
                   </div>

                   <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-lg border border-slate-200 w-auto self-start'>
                     <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className='w-8 h-8 flex items-center justify-center bg-white text-slate-600 rounded shadow-sm hover:bg-slate-100 transition-colors'
                      >
                        -
                      </button>
                      <span className='font-bold text-slate-700 min-w-[20px] text-center'>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className='w-8 h-8 flex items-center justify-center bg-white text-slate-600 rounded shadow-sm hover:bg-slate-100 transition-colors'
                      >
                        +
                      </button>
                   </div>

                   <button
                      onClick={() => handleRemoveItem(item.id)}
                      className='text-red-500 hover:text-red-600 font-medium text-sm self-start sm:self-center transition-colors px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg'
                    >
                      Remove
                   </button>
                </div>
              </div>
            ))}
          </div>

          <div className='lg:w-1/3'>
             <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24'>
                <h3 className='text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4'>Order Summary</h3>
                <div className='flex justify-between text-slate-600 mb-4'>
                   <span>Subtotal</span>
                   <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-slate-600 mb-4'>
                   <span>Shipping</span>
                   <span>Free</span>
                </div>
                <div className='flex justify-between font-extrabold text-xl text-slate-900 border-t border-slate-100 pt-4 mt-6'>
                   <span>Total</span>
                   <span className='text-emerald-600'>${totalPrice.toFixed(2)}</span>
                </div>

                <button 
                   onClick={() => navigate('/checkout')}
                   className='w-full mt-8 bg-slate-900 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-colors shadow-md'>
                   Proceed to Checkout
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
