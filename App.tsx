
import React, { useState, useEffect } from 'react';
import { UserRole, Order, MenuItem, OrderStatus } from './types';
import { INITIAL_MENU } from './constants';
import CustomerOrderPage from './pages/CustomerOrderPage';
import StaffDashboard from './pages/StaffDashboard';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('CUSTOMER');
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('zen_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('zen_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentTable, setCurrentTable] = useState<string | null>(null);

  // Sync with LocalStorage for demo purposes
  useEffect(() => {
    localStorage.setItem('zen_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zen_menu', JSON.stringify(menu));
  }, [menu]);

  const addOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const updateMenu = (newMenu: MenuItem[]) => {
    setMenu(newMenu);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role={role} setRole={setRole} currentTable={currentTable} setCurrentTable={setCurrentTable} />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {role === 'CUSTOMER' && (
          <CustomerOrderPage 
            menu={menu} 
            addOrder={addOrder} 
            table={currentTable} 
            setTable={setCurrentTable}
          />
        )}
        
        {role === 'STAFF' && (
          <StaffDashboard 
            orders={orders} 
            updateOrderStatus={updateOrderStatus} 
            menu={menu}
            addOrder={addOrder}
          />
        )}
        
        {role === 'ADMIN' && (
          <AdminPanel 
            orders={orders} 
            menu={menu} 
            updateMenu={updateMenu} 
          />
        )}
      </main>

      <footer className="bg-white border-t p-4 text-center text-slate-400 text-sm">
        &copy; 2024 ZenDine Smart Restaurant System. Built for excellence.
      </footer>
    </div>
  );
};

export default App;
