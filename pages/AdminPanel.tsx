
import React, { useState, useMemo } from 'react';
import { Order, MenuItem, OrderStatus, Category } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AdminPanelProps {
  orders: Order[];
  menu: MenuItem[];
  updateMenu: (menu: MenuItem[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ orders, menu, updateMenu }) => {
  const [tab, setTab] = useState<'ANALYTICS' | 'MENU'>('ANALYTICS');

  // Analytics logic
  const revenueData = useMemo(() => {
    // Basic day-of-week revenue simulation
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const summary: Record<string, number> = {};
    
    orders.forEach(o => {
      const day = days[new Date(o.timestamp).getDay()] || 'Sun';
      if (o.status === OrderStatus.COMPLETED) {
        summary[day] = (summary[day] || 0) + o.totalAmount;
      }
    });

    return days.map(d => ({ name: d, revenue: summary[d] || 0 }));
  }, [orders]);

  const paxData = useMemo(() => {
    const summary: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    orders.forEach(o => {
      const p = Math.min(6, o.pax);
      summary[p] = (summary[p] || 0) + 1;
    });
    return Object.entries(summary).map(([k, v]) => ({ name: `${k} Pax`, value: v }));
  }, [orders]);

  const toggleAvailability = (itemId: string) => {
    const newMenu = menu.map(m => m.id === itemId ? { ...m, isAvailable: !m.isAvailable } : m);
    updateMenu(newMenu);
  };

  const updateMarketPrice = (itemId: string, newPrice: number) => {
    const newMenu = menu.map(m => m.id === itemId ? { ...m, price: newPrice } : m);
    updateMenu(newMenu);
  };

  const COLORS = ['#4f46e5', '#818cf8', '#c7d2fe', '#e2e8f0'];

  return (
    <div className="space-y-8">
      <div className="flex border-b">
        <button 
          onClick={() => setTab('ANALYTICS')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-all ${tab === 'ANALYTICS' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
        >
          Business Analytics
        </button>
        <button 
          onClick={() => setTab('MENU')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-all ${tab === 'MENU' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
        >
          Menu Management
        </button>
      </div>

      {tab === 'ANALYTICS' ? (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-6">Revenue by Day</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-6">Pax Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paxData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paxData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4 flex-wrap">
                {paxData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    {d.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <h3 className="font-bold text-slate-800 mb-6">Recent Completed Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-slate-400 font-medium">
                    <th className="pb-4">Order ID</th>
                    <th className="pb-4">Table</th>
                    <th className="pb-4">Pax</th>
                    <th className="pb-4">Time</th>
                    <th className="pb-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.filter(o => o.status === OrderStatus.COMPLETED).slice(0, 10).map(o => (
                    <tr key={o.id} className="border-b last:border-0">
                      <td className="py-4 font-mono text-slate-500">{o.id}</td>
                      <td className="py-4 font-bold">{o.tableNumber}</td>
                      <td className="py-4">{o.pax}</td>
                      <td className="py-4 text-slate-500">{o.timestamp}</td>
                      <td className="py-4 text-right font-black">${o.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                    <span className="text-xs text-slate-400">{item.category}</span>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${item.isAvailable ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {item.isAvailable ? 'Active' : 'Hidden'}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Availability</span>
                    <button 
                      onClick={() => toggleAvailability(item.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.isAvailable ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Pricing Type</span>
                    <span className="font-medium text-slate-700">{item.isMarketPrice ? 'Market Based' : 'Fixed Price'}</span>
                  </div>

                  {item.isMarketPrice && (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400">Current Market Price ($)</label>
                      <input 
                        type="number" 
                        value={item.price} 
                        onChange={(e) => updateMarketPrice(item.id, parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-50 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter daily price..."
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
