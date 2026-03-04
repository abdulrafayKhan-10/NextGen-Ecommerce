import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import { RootState } from '../redux/store';
import { clearCart } from '../redux/slices/cartSlice';
import { addOrder } from '../redux/slices/orderSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state: RootState) => state.cartR);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'stripe') {
      toast.info('Initiating Stripe Secure Checkout...', { autoClose: 1500 });
      
      // Simulate Stripe's network delay for dummy processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Stripe successfully charged the dummy card
      toast.success('Stripe Payment Successful!');
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Order placed successfully!');
    }

    // Save order strictly for frontend demonstration
    const newOrder = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: cartItems,
      totalAmount: totalPrice,
      date: new Date().toISOString(),
      status: 'Paid',
    };
    dispatch(addOrder(newOrder));

    // Clear cart and redirect
    dispatch(clearCart());
    setIsProcessing(false);
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className='py-12 max-w-5xl mx-auto'>
        <div className='text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100'>
          <h2 className='text-2xl font-bold text-slate-800 mb-4'>Checkout Complete</h2>
          <p className='text-slate-500 text-lg mb-6'>Your cart is empty. Have you already placed your order?</p>
          <button 
             onClick={() => navigate('/collection')}
             className='bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors shadow-md'>
             Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='py-12 max-w-6xl mx-auto'>
      <div className='text-center text-3xl mb-12'>
        <Title text1={'SECURE'} text2={'CHECKOUT'} />
      </div>

      <div className='flex flex-col lg:flex-row gap-10'>
        {/* Checkout Form */}
        <div className='lg:w-2/3'>
          <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-6'>
             <h3 className='text-xl font-bold text-slate-800 mb-6'>Shipping Information</h3>
             <form id='checkout-form' onSubmit={handlePlaceOrder} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='md:col-span-2'>
                  <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>Full Name</label>
                  <input required type='text' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500' placeholder='John Doe' />
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>Email Address</label>
                  <input required type='email' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500' placeholder='john@example.com' />
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>Address</label>
                  <input required type='text' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500' placeholder='123 Main St, Apt 4B' />
                </div>
                <div>
                  <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>City</label>
                  <input required type='text' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500' placeholder='New York' />
                </div>
                <div>
                  <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>Zip Code</label>
                  <input required type='text' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500' placeholder='10001' />
                </div>
             </form>
          </div>
          
          <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-100'>
             <h3 className='text-xl font-bold text-slate-800 mb-6'>Payment Method</h3>
             {/* Mock Payment Options */}
             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
               <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                 <input 
                   type='radio' 
                   name='payment' 
                   value='stripe'
                   checked={paymentMethod === 'stripe'}
                   onChange={(e) => setPaymentMethod(e.target.value)}
                   className='text-emerald-500 w-4 h-4' 
                 />
                 <span className='font-bold text-slate-800 flex items-center gap-2'>Stripe (Credit Card)</span>
               </label>
               <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                 <input 
                   type='radio' 
                   name='payment' 
                   value='paypal'
                   checked={paymentMethod === 'paypal'}
                   onChange={(e) => setPaymentMethod(e.target.value)}
                     className='text-emerald-500 w-4 h-4' 
                 />
                 <span className='font-bold text-slate-800'>PayPal</span>
               </label>
             </div>
             
             {paymentMethod === 'stripe' && (
                <div className='mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl'>
                   <p className='text-sm text-slate-500 mb-3'>You will be securely processed by Stripe. Test cards are enabled.</p>
                   <div className='space-y-3'>
                      <input disabled type='text' placeholder='Card Number: 4242 4242 4242 4242' className='w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-400 text-sm cursor-not-allowed' />
                      <div className='flex gap-3'>
                         <input disabled type='text' placeholder='MM/YY' className='w-1/2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-400 text-sm cursor-not-allowed' />
                         <input disabled type='text' placeholder='CVC' className='w-1/2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-400 text-sm cursor-not-allowed' />
                      </div>
                   </div>
                </div>
             )}
          </div>
        </div>

        {/* Order Summary */}
        <div className='lg:w-1/3'>
          <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-100 sticky top-24'>
             <h3 className='text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4'>Order Summary</h3>
             
             <div className='max-h-[300px] overflow-y-auto mb-6 flex flex-col gap-4 pr-2'>
               {cartItems.map((item) => (
                 <div key={item.id} className='flex gap-4 justify-between items-center'>
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 bg-slate-100 rounded flex items-center justify-center text-xs text-slate-400'>Img</div>
                      <div>
                        <p className='font-bold text-slate-800 text-sm line-clamp-1'>{item.product}</p>
                        <p className='text-xs text-slate-500'>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className='font-bold text-emerald-600'>${(item.unitPrice * item.quantity).toFixed(2)}</p>
                 </div>
               ))}
             </div>

             <div className='border-t border-slate-100 pt-4 mb-4'>
               <div className='flex justify-between text-slate-600 mb-2'>
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
               </div>
               <div className='flex justify-between text-slate-600 mb-2'>
                  <span>Shipping</span>
                  <span className='text-emerald-500 font-medium'>Free</span>
               </div>
               <div className='flex justify-between font-extrabold text-xl text-slate-900 mt-4 pt-4 border-t border-slate-200'>
                  <span>Total</span>
                  <span className='text-emerald-600'>${totalPrice.toFixed(2)}</span>
               </div>
             </div>

             <button 
                type='submit' 
                form='checkout-form' 
                disabled={isProcessing}
                className='w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-4 rounded-xl transition-colors shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
                {isProcessing ? 'Processing Payment...' : (paymentMethod === 'stripe' ? 'Pay Securely with Stripe' : 'Place Order')}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
