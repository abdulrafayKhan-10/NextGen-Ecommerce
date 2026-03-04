import { Link } from 'react-router-dom';
import Title from '../components/Title';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Orders = () => {
  const { orders } = useSelector((state: RootState) => state.orderR);

  if (!orders || orders.length === 0) {
    return (
      <div className='py-12 max-w-5xl mx-auto'>
        <div className='text-center text-3xl mb-12'>
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
          <div className='p-8 text-center'>
            <div className='w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <span className='text-3xl'>📦</span>
            </div>
            <h3 className='text-xl font-bold text-slate-800 mb-2'>No Orders Yet</h3>
            <p className='text-slate-500 mb-8 max-w-md mx-auto'>
              You haven't placed any orders yet. Discover our latest collection and start shopping today!
            </p>
            <Link to='/collection' className='inline-block bg-slate-900 hover:bg-emerald-500 text-white font-semibold py-3 px-8 rounded-full transition-colors shadow-md'>
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='py-12 max-w-5xl mx-auto'>
      <div className='text-center text-3xl mb-12'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='flex flex-col gap-6'>
        {orders.map((order) => (
          <div key={order.id} className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
            <div className='bg-slate-50 border-b border-slate-100 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div className='flex flex-wrap gap-x-8 gap-y-2 text-sm'>
                <div>
                  <p className='text-slate-500 font-medium'>Order Placed</p>
                  <p className='font-bold text-slate-800'>{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className='text-slate-500 font-medium'>Total</p>
                  <p className='font-bold text-slate-800'>${order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className='text-slate-500 font-medium'>Order ID</p>
                  <p className='font-bold text-slate-800'>{order.id}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
                <span className='font-bold text-emerald-600'>{order.status}</span>
              </div>
            </div>

            <div className='p-4 md:p-6'>
              {order.items.map((item, index) => (
                <div key={index} className='flex items-center gap-4 py-4 border-b border-slate-50 last:border-0 last:pb-0'>
                  <div className='w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400'>
                    Img
                  </div>
                  <div className='flex-grow'>
                    <h4 className='font-bold text-slate-800'>{item.product}</h4>
                    <p className='text-slate-500 text-sm'>Qty: {item.quantity}</p>
                  </div>
                  <div className='font-bold text-slate-800'>
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
