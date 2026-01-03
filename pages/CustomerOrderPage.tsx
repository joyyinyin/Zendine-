
import React, { useState, useMemo } from 'react';
import { MenuItem, Category, Order, OrderItem, OrderStatus } from '../types';
import { TABLES } from '../constants';
import { getMenuRecommendation } from '../services/geminiService';

interface CustomerOrderPageProps {
  menu: MenuItem[];
  addOrder: (order: Order) => void;
  table: string | null;
  setTable: (table: string | null) => void;
}

const CustomerOrderPage: React.FC<CustomerOrderPageProps> = ({ menu, addOrder, table, setTable }) => {
  const [pax, setPax] = useState(1);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [filter, setFilter] = useState<Category | 'ALL'>('ALL');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isOrderConfirming, setIsOrderConfirming] = useState(false);

  const filteredMenu = useMemo(() => {
    return filter === 'ALL' ? menu : menu.filter(m => m.category === filter);
  }, [menu, filter]);

  const addToCart = (item: MenuItem) => {
    const existing = cart.find(c => c.menuItemId === item.id);
    if (existing) {
      setCart(cart.map(c => c.menuItemId === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, {
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        customizations: { 
          spiciness: item.spicinessLevel > 0 ? 'Medium' : 'None', 
          drinkTiming: 'With meal' 
        }
      }]);
    }
  };

  const updateCartItem = (index: number, updates: Partial<OrderItem>) => {
    const newCart = [...cart];
    newCart[index] = { ...newCart[index], ...updates };
    setCart(newCart);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleAiRecommendation = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    const recommendation = await getMenuRecommendation(aiPrompt, menu);
    setAiResponse(recommendation || '');
    setIsAiLoading(false);
  };

  const submitOrder = () => {
    if (!table) return;
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      tableNumber: table,
      pax,
      timestamp: new Date().toLocaleString(),
      items: cart,
      totalAmount,
      status: OrderStatus.PENDING
    };
    addOrder(newOrder);
    setCart([]);
    setIsOrderConfirming(false);
    alert('Order submitted successfully!');
  };

  const renderSpiciness = (level: number) => {
    if (level === 0) return null;
    return (
      <div className="flex gap-0.5">
        {[...Array(level)].map((_, i) => (
          <span key={i} className="text-red-500 text-xs">🌶️</span>
        ))}
      </div>
    );
  };

  if (!table) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center animate-fade-in px-4">
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-100">Z</div>
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-4">癮食堂 雲南特色私廚</h2>
        <p className="text-slate-500 mb-10 leading-relaxed">請選擇您的桌號，或選擇外帶開始點餐。</p>
        <div className="grid grid-cols-2 gap-4">
          {TABLES.map(t => (
            <button
              key={t}
              onClick={() => setTable(t)}
              className="p-6 border border-slate-200 rounded-2xl bg-white hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-lg hover:shadow-indigo-50 transition-all text-lg font-bold text-slate-700"
            >
              {t === 'Takeout' ? '外帶' : `${t} 號桌`}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32">
      {/* AI Assistant */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-black mb-1">✨ AI 智能推薦</h3>
          <p className="text-indigo-100 text-sm mb-6 opacity-90">不知道吃什麼？告訴我您的喜好，讓我為您推薦！</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="例如：我想要點幾道適合小孩吃的、不辣的料理..." 
              className="flex-grow bg-white/10 border border-white/20 placeholder-white/50 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiRecommendation()}
            />
            <button 
              onClick={handleAiRecommendation}
              disabled={isAiLoading}
              className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 active:scale-95 transition-all disabled:opacity-50"
            >
              {isAiLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  分析中
                </span>
              ) : '送出'}
            </button>
          </div>
          {aiResponse && (
            <div className="mt-6 p-5 bg-black/10 backdrop-blur-md rounded-2xl text-sm leading-relaxed border border-white/5">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-white/50 mb-2">Recommendation</span>
              "{aiResponse}"
            </div>
          )}
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      </section>

      {/* Menu Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-slate-800">精選菜單</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide no-scrollbar">
          {(['ALL', ...Object.values(Category)] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                filter === cat 
                ? 'bg-slate-800 text-white border-slate-800 shadow-md shadow-slate-200' 
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat === 'ALL' ? '全部品項' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map(item => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              {item.isRecommended && (
                <div className="absolute top-3 left-3 bg-amber-400 text-white text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                  <span>✦ 推薦料理</span>
                </div>
              )}
              {item.spicinessLevel > 0 && (
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  {renderSpiciness(item.spicinessLevel)}
                </div>
              )}
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-black text-lg text-slate-800">{item.name}</h4>
                <span className="font-black text-indigo-600">
                  {item.isMarketPrice ? '時價' : `$${item.price}`}
                </span>
              </div>
              <p className="text-slate-400 text-xs mb-5 flex-grow line-clamp-2 leading-relaxed">{item.description}</p>
              <button
                disabled={!item.isAvailable}
                onClick={() => addToCart(item)}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  item.isAvailable 
                  ? 'bg-slate-100 text-slate-800 hover:bg-indigo-600 hover:text-white active:scale-95' 
                  : 'bg-slate-50 text-slate-300 cursor-not-allowed line-through'
                }`}
              >
                {item.isAvailable ? '加入購物車' : '已售罄'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary (Floating Bottom) */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 p-5 flex items-center justify-between z-40 animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-black tracking-widest">總計估計</span>
              <span className="text-2xl font-black text-slate-800">${totalAmount}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOrderConfirming(true)}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 active:scale-95 transition-all"
          >
            去結帳
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {isOrderConfirming && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-pop">
            <div className="p-8 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-2xl font-black text-slate-800">確認訂單</h2>
                <p className="text-slate-400 text-xs mt-1">請再次確認餐點內容與備註</p>
              </div>
              <button onClick={() => setIsOrderConfirming(false)} className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">✕</button>
            </div>
            
            <div className="p-8 space-y-8 flex-grow overflow-y-auto">
              {/* Table Info */}
              <div className="grid grid-cols-2 gap-6 p-6 bg-indigo-50/50 border border-indigo-100 rounded-3xl">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">桌號</label>
                  <p className="font-black text-xl text-indigo-900">{table}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">人數</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setPax(Math.max(1, pax - 1))} className="w-8 h-8 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">－</button>
                    <span className="font-black text-xl text-indigo-900 w-4 text-center">{pax}</span>
                    <button onClick={() => setPax(pax + 1)} className="w-8 h-8 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">＋</button>
                  </div>
                </div>
                <div className="col-span-2 border-t border-indigo-100 pt-4 flex justify-between items-center text-sm text-indigo-700/70">
                  <span className="flex items-center gap-2">📅 {new Date().toLocaleDateString()}</span>
                  <span className="flex items-center gap-2">🕒 {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">餐點清單</h3>
                {cart.map((item, idx) => (
                  <div key={idx} className="bg-white group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-600">{item.quantity}x</div>
                        <div>
                          <h4 className="font-black text-slate-800">{item.name}</h4>
                          <p className="text-xs text-indigo-600 font-bold">${item.price * item.quantity}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                    
                    {/* Customizations */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-14">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">辣度調整</label>
                        <select 
                          className="w-full bg-slate-50 border-none rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-indigo-500"
                          value={item.customizations.spiciness}
                          onChange={(e) => updateCartItem(idx, { customizations: { ...item.customizations, spiciness: e.target.value as any } })}
                        >
                          <option>None (不辣)</option>
                          <option>Mild (微辣)</option>
                          <option>Medium (中辣)</option>
                          <option>Hot (大辣)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">飲料/甜點上菜時間</label>
                        <select 
                          className="w-full bg-slate-50 border-none rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-indigo-500"
                          value={item.customizations.drinkTiming}
                          onChange={(e) => updateCartItem(idx, { customizations: { ...item.customizations, drinkTiming: e.target.value as any } })}
                        >
                          <option>With meal (隨餐)</option>
                          <option>Before meal (先上)</option>
                          <option>After meal (後上)</option>
                        </select>
                      </div>
                      <div className="col-span-full">
                        <label className="text-[10px] font-black text-slate-400 uppercase">特殊備註 (例如：醬分開、不加蔥)</label>
                        <input 
                          type="text" 
                          placeholder="在此輸入您的特別需求..." 
                          className="w-full bg-slate-50 border-none rounded-xl px-3 py-3 text-xs font-medium focus:ring-2 focus:ring-indigo-500 mt-1"
                          value={item.customizations.notes || ''}
                          onChange={(e) => updateCartItem(idx, { customizations: { ...item.customizations, notes: e.target.value } })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="p-8 border-t bg-slate-50 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">預估總額</span>
                <span className="text-4xl font-black text-slate-800">${totalAmount}</span>
              </div>
              <button 
                onClick={submitOrder}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 active:scale-[0.98] transition-all"
              >
                確認並送出訂單
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slide-up {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes pop {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-pop { animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
};

export default CustomerOrderPage;
