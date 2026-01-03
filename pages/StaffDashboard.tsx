
import React, { useState } from 'react';
import { Order, OrderStatus, MenuItem } from '../types';

interface StaffDashboardProps {
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  menu: MenuItem[];
  addOrder: (order: Order) => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ orders, updateOrderStatus }) => {
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'HISTORY'>('ACTIVE');

  const filteredOrders = orders.filter(o => 
    activeTab === 'ACTIVE' 
      ? [OrderStatus.PENDING, OrderStatus.PREPARING, OrderStatus.SERVED].includes(o.status)
      : [OrderStatus.COMPLETED, OrderStatus.CANCELLED].includes(o.status)
  );

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.PENDING: return 'bg-amber-100 text-amber-700 border-amber-200';
      case OrderStatus.PREPARING: return 'bg-blue-100 text-blue-700 border-blue-200';
      case OrderStatus.SERVED: return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case OrderStatus.COMPLETED: return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Order Management</h2>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('ACTIVE')}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'ACTIVE' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
          >
            Active Orders
          </button>
          <button 
            onClick={() => setActiveTab('HISTORY')}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'HISTORY' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
          >
            History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">No {activeTab.toLowerCase()} orders at the moment.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="p-4 border-b flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-xl">Table {order.tableNumber}</span>
                    <span className="text-xs text-slate-400">ID: {order.id}</span>
                  </div>
                  <p className="text-xs text-slate-500">{order.timestamp} • {order.pax} Pax</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="p-4 flex-grow space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-indigo-600">{item.quantity}x</span>
                        <span className="font-bold text-slate-700">{item.name}</span>
                      </div>
                      {(item.customizations.spiciness !== 'None' || item.customizations.notes) && (
                        <div className="text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-500 italic">
                          {item.customizations.spiciness !== 'None' && `Spicy: ${item.customizations.spiciness}`}
                          {item.customizations.notes && ` • ${item.customizations.notes}`}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-400 group-hover:text-slate-600 transition-colors">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded-b-2xl border-t mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-500 font-medium">Total Amount</span>
                  <span className="text-lg font-black text-slate-800">${order.totalAmount}</span>
                </div>
                
                {activeTab === 'ACTIVE' && (
                  <div className="flex gap-2">
                    {order.status === OrderStatus.PENDING && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, OrderStatus.PREPARING)}
                        className="flex-grow bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-indigo-700"
                      >
                        Accept
                      </button>
                    )}
                    {order.status === OrderStatus.PREPARING && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, OrderStatus.SERVED)}
                        className="flex-grow bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700"
                      >
                        Served
                      </button>
                    )}
                    {order.status === OrderStatus.SERVED && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, OrderStatus.COMPLETED)}
                        className="flex-grow bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700"
                      >
                        Bill Paid
                      </button>
                    )}
                    {order.status !== OrderStatus.SERVED && order.status !== OrderStatus.COMPLETED && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, OrderStatus.CANCELLED)}
                        className="px-3 bg-red-50 text-red-500 border border-red-100 rounded-lg text-sm font-bold hover:bg-red-100"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
