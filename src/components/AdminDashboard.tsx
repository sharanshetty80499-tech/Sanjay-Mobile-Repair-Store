import React, { useState, useMemo } from 'react';
import { AreaChart, TrendingUp, DollarSign, Hammer, Package, Heart, RefreshCw, Plus, Check, MessageSquare, AlertCircle } from 'lucide-react';
import { Product, RepairBooking, Order, Review } from '../types';

interface AdminDashboardProps {
  products: Product[];
  bookings: RepairBooking[];
  orders: Order[];
  reviews: Review[];
  onRefreshData: () => void;
}

export default function AdminDashboard({ products, bookings, orders, reviews, onRefreshData }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'orders' | 'inventory' | 'reviews'>('overview');
  
  // Inventory form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'smartphones' | 'accessories'>('accessories');
  const [newProdBrand, setNewProdBrand] = useState('Apple');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [inventSuccess, setInventSuccess] = useState(false);

  // Review reply state
  const [replyText, setReplyText] = useState<{ [reviewId: string]: string }>({});

  // Calculations for KPI indices
  const kpis = useMemo(() => {
    const ordersRev = orders
      .filter((o) => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    
    // Sum actual cost of repairs if present, otherwise estimate cost of completed/collected repairs
    const repairsRev = bookings
      .filter((b) => ['ready', 'collected'].includes(b.status))
      .reduce((sum, b) => sum + (b.actualCost || b.estimatedCost), 0);

    const totalRev = ordersRev + repairsRev;

    const pendingRepairs = bookings.filter((b) => !['collected', 'cancelled'].includes(b.status)).length;
    const activeOrders = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length;
    const avgReviewRating = reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

    return {
      totalRev,
      pendingRepairs,
      activeOrders,
      avgReviewRating
    };
  }, [orders, bookings, reviews]);

  // Update booking status
  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes: `Status updated by administrator to ${status.toUpperCase()}.` })
      });

      if (response.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Product Inventory item
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdStock) return;

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProdName,
          category: newProdCategory,
          brand: newProdBrand,
          price: Number(newProdPrice),
          stock: Number(newProdStock),
          description: newProdDesc,
          specs: ['Original Box Layout', 'Assured backup warranty']
        })
      });

      if (response.ok) {
        setInventSuccess(true);
        setNewProdName('');
        setNewProdPrice('');
        setNewProdStock('');
        setNewProdDesc('');
        onRefreshData();
        setTimeout(() => setInventSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit owner reply to review
  const handleSendReply = async (reviewId: string) => {
    const textMsg = replyText[reviewId];
    if (!textMsg || !textMsg.trim()) return;

    try {
      const response = await fetch(`/api/reviews/${reviewId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyText: textMsg })
      });

      if (response.ok) {
        setReplyText((prev) => ({ ...prev, [reviewId]: '' }));
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="admin-dashboard-container" className="py-10 bg-black border-t border-gold-500/15 text-[#e5dec9] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-gold-500 font-mono font-bold tracking-wider uppercase mb-1">
              👑 Sanjay Gold Repairs Controller Desk
            </div>
            <h2 className="text-2xl font-black text-white font-display">Sahar Road Repair & Bench Controller</h2>
          </div>

          <button
            onClick={() => { onRefreshData(); }}
            className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 text-gold-400 rounded-xl text-xs flex items-center justify-center gap-2 border border-gold-500/20 hover:border-gold-500/50 self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-gold-500" /> Refresh Database Logs
          </button>
        </div>

        {/* STATS MATRIX */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#121212] p-5 rounded-2xl border border-gold-500/10 shadow-sm flex items-center gap-4">
            <div className="bg-gold-500/10 p-3 rounded-xl text-gold-400 border border-gold-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Bench Turnover</span>
              <span className="text-lg font-bold font-mono text-gold-400">
                ₹{kpis.totalRev.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="bg-[#121212] p-5 rounded-2xl border border-gold-500/10 shadow-sm flex items-center gap-4">
            <div className="bg-gold-500/10 p-3 rounded-xl text-gold-400 border border-gold-500/20">
              <Hammer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Active Repairs</span>
              <span className="text-lg font-bold font-mono text-gold-400">{kpis.pendingRepairs} slots</span>
            </div>
          </div>

          <div className="bg-[#121212] p-5 rounded-2xl border border-gold-500/10 shadow-sm flex items-center gap-4 opacity-50">
            <div className="bg-gold-500/5 p-3 rounded-xl text-gold-600 border border-gold-500/10">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-mono">Retail sales</span>
              <span className="text-lg font-bold font-mono text-slate-400">Inactive</span>
            </div>
          </div>

          <div className="bg-[#121212] p-5 rounded-2xl border border-gold-500/10 shadow-sm flex items-center gap-4 font-mono">
            <div className="bg-gold-500/10 p-3 rounded-xl text-gold-400 border border-gold-500/20">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-sans">Avg Rating</span>
              <span className="text-lg font-bold font-mono text-gold-400">{kpis.avgReviewRating} / 5.0</span>
            </div>
          </div>
        </div>

        {/* MAIN PANEL AREA */}
        <div className="bg-[#121212] rounded-3xl border border-gold-500/10 shadow-xl overflow-hidden min-h-[500px]">
          
          {/* Subtabs bar */}
          <div className="border-b border-gold-500/10 bg-black/55 p-3 flex flex-wrap gap-1">
            {['overview', 'bookings', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-gold-600 to-gold-805 text-black shadow font-black'
                    : 'text-slate-400 hover:text-gold-400 hover:bg-zinc-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            
            {/* 1. OVERVIEW SCREEN */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">Live Active Repair Queue</h3>
                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                      {bookings.slice(0, 3).map((job) => (
                        <div key={job.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center text-xs">
                          <div>
                            <div className="font-extrabold text-blue-400 font-mono text-xs">{job.id}</div>
                            <div className="text-slate-200 font-semibold">{job.deviceBrand} {job.deviceModel}</div>
                            <div className="text-slate-400">{job.customerName} • {job.scheduledSlot}</div>
                          </div>
                          <div>
                            <span className="bg-orange-500/20 text-orange-400 font-bold px-2 py-1 rounded text-[10px] uppercase">
                              {job.status}
                            </span>
                          </div>
                        </div>
                      ))}
                      {bookings.length === 0 && <p className="text-xs text-slate-500">Wait list empty.</p>}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">Recent Orders Stream</h3>
                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                      {orders.slice(0, 3).map((ord) => (
                        <div key={ord.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center text-xs">
                          <div>
                            <div className="font-extrabold text-teal-400 font-mono text-xs">{ord.id}</div>
                            <div className="text-slate-355 font-semibold">Total: ₹{ord.totalAmount.toLocaleString('en-IN')}</div>
                            <div className="text-slate-400">{ord.customerName} • {ord.items[0]?.name.slice(0, 25)}...</div>
                          </div>
                          <div>
                            <span className="bg-teal-500/20 text-teal-400 font-semibold px-2.5 py-1 rounded text-[10px] uppercase">
                              {ord.status}
                            </span>
                          </div>
                        </div>
                      ))}
                      {orders.length === 0 && <p className="text-xs text-slate-500">No purchases yet.</p>}
                    </div>
                  </div>
                </div>

                {/* Local SEO and Leads tips section */}
                <div className="p-4 bg-blue-500/10 border border-blue-500/25 rounded-2xl text-xs text-blue-200 leading-relaxed flex items-start gap-3">
                  <span className="text-blue-400 font-mono font-bold mt-0.5">ℹ️ SYSTEM ANALYTICS NOTE:</span>
                  <p>
                    Your Mumbai mobile repair store local SEO rank is standing in top <strong className="text-white">3-pack (Andheri East)</strong>. Maintaining repair completion speed &lt; 2 hours directly triggers repeat business. AI assistant diagnosed 4 client inquiries today.
                  </p>
                </div>
              </div>
            )}

            {/* 2. REPAIR BOOKINGS SCREEN */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">Repair Workorders Catalog</h3>
                  <span className="text-xs text-slate-400">Matches: {bookings.length} reservations</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/40">
                        <th className="py-2.5 px-3">Booking ID</th>
                        <th className="py-2.5 px-3">Device & Fault</th>
                        <th className="py-2.5 px-3">Customer Desk</th>
                        <th className="py-2.5 px-3">Schedule Time</th>
                        <th className="py-2.5 px-3">Action status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-800/30">
                          <td className="py-3 px-3 font-mono text-blue-400 font-bold">{booking.id}</td>
                          <td className="py-3 px-3">
                            <div className="font-bold">{booking.deviceBrand} {booking.deviceModel}</div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider italic">
                              issue: {booking.issueType} - "{booking.issueDescription.slice(0,40)}..."
                            </div>
                            {booking.aiDiagnosis && (
                              <div className="text-[9px] text-orange-400 bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/10 mt-1 max-w-xs truncate">
                                🤖 AI: {booking.aiDiagnosis}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 text-slate-352">
                            <div>{booking.customerName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{booking.customerPhone}</div>
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-300">
                            <div>{booking.scheduledDate}</div>
                            <div className="text-[10px] text-slate-500">{booking.scheduledSlot}</div>
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={booking.status}
                              onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                              className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-1 focus:outline-none focus:border-blue-500 font-semibold"
                            >
                              <option value="booked">Booked</option>
                              <option value="assigned">Assigned</option>
                              <option value="diagnosing">Diagnosing</option>
                              <option value="parts_ordered">Parts Ordered</option>
                              <option value="ready">Ready (Fitted)</option>
                              <option value="collected">Collected (Cash Out)</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {bookings.length === 0 && <p className="text-xs text-center py-8 text-slate-500">Wait list empty.</p>}
                </div>
              </div>
            )}

            {/* 3. ORDERS SCREEN */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold text-slate-100 tracking-wider uppercase">Genuine Sales stream</h3>
                  <span className="text-xs text-slate-400">Total transaction orders: {orders.length}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/40">
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Customer & Address</th>
                        <th className="py-2.5 px-3">Cart details</th>
                        <th className="py-2.5 px-3">Transaction total</th>
                        <th className="py-2.5 px-3">Status Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-800/30">
                          <td className="py-3 px-3 font-mono text-teal-400 font-bold">{order.id}</td>
                          <td className="py-3 px-3">
                            <div className="font-bold">{order.customerName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{order.customerPhone}</div>
                            <div className="text-[9px] text-slate-402 truncate max-w-xs">{order.shippingAddress}</div>
                          </td>
                          <td className="py-3 px-3 font-medium text-slate-354">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="block">
                                • {it.name} <span className="text-[10px] text-slate-500">x{it.quantity}</span>
                              </div>
                            ))}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                            ₹{order.totalAmount.toLocaleString('en-IN')}
                            <span className="block text-[9px] text-slate-540 uppercase text-slate-405 font-semibold mt-0.5">
                              {order.paymentMethod} ({order.paymentStatus})
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {orders.length === 0 && <p className="text-xs text-center py-8 text-slate-500">Retail tray empty.</p>}
                </div>
              </div>
            )}

            {/* 4. INVENTORY / PRODUCTS SCREEN */}
            {activeTab === 'inventory' && (
              <div className="space-y-8">
                
                {/* 2-Column layout: add product form and current stock lookup */}
                <div className="grid lg:grid-cols-12 gap-8">
                  
                  {/* form */}
                  <form onSubmit={handleAddProduct} className="lg:col-span-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-500" /> Insert Stock Record
                    </h4>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Product Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BoAt Rockerz Bluetooth Headset"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        className="w-full bg-slate-850 border border-slate-700/80 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Category</label>
                        <select
                          value={newProdCategory}
                          onChange={(e) => setNewProdCategory(e.target.value as any)}
                          className="w-full bg-slate-850 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                        >
                          <option value="accessories">Accessories</option>
                          <option value="smartphones">Smartphones</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Brand</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. BoAt, Apple"
                          value={newProdBrand}
                          onChange={(e) => setNewProdBrand(e.target.value)}
                          className="w-full bg-slate-850 border border-slate-700/80 rounded-xl px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Walk-in Price (₹)</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 1599"
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                          className="w-full bg-slate-850 border border-slate-700/80 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Starting Stock</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 20"
                          value={newProdStock}
                          onChange={(e) => setNewProdStock(e.target.value)}
                          className="w-full bg-slate-850 border border-slate-700/80 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Overview Specs Label</label>
                      <textarea
                        rows={2}
                        placeholder="Premium hardware features under warranty..."
                        value={newProdDesc}
                        onChange={(e) => setNewProdDesc(e.target.value)}
                        className="w-full bg-slate-850 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {inventSuccess && (
                      <div className="p-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs rounded-xl font-bold">
                        ✓ Product catalog updated!
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase"
                    >
                      Publish Record
                    </button>
                  </form>

                  {/* lookup */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-300 font-bold uppercase">Dynamic Product Shelf audit</span>
                      <span className="text-[10px] font-mono text-slate-450">Active listings: {products.length} units</span>
                    </div>

                    <div className="max-h-[380px] overflow-y-auto space-y-2 pr-2">
                      {products.map((p) => (
                        <div key={p.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs flex justify-between items-center">
                          <div>
                            <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">{p.brand}</span>
                            <div className="font-bold text-slate-200 mt-1">{p.name}</div>
                            <div className="text-[11px] text-blue-400 font-mono font-bold">₹{p.price.toLocaleString('en-IN')}</div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-mono text-slate-400 block">Stock Audit</span>
                            <span className={`font-bold font-mono ${p.stock < 5 ? 'text-red-400' : 'text-emerald-400'}`}>
                              {p.stock} items left
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* 5. REVIEWS SCREEN */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">Customer Google + Live Web Reviews</h3>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-xs space-y-3">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <div>
                          <span className="font-bold text-slate-100">{rev.customerName}</span>
                          <span className="block text-[10px] text-slate-450 font-mono">Device: {rev.deviceWorkedOn}</span>
                        </div>
                        <span className="text-amber-400 font-bold font-mono">★ {rev.rating} / 5</span>
                      </div>

                      <p className="text-slate-300 italic">"{rev.comment}"</p>

                      {rev.replyFromOwner ? (
                        <div className="p-3 bg-slate-850/60 border border-slate-800 text-slate-400 rounded-xl leading-relaxed">
                          <span className="font-bold text-slate-300 block mb-0.5">Sanjay Nair Reply:</span>
                          {rev.replyFromOwner}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type professional response to customer..."
                            value={replyText[rev.id] || ''}
                            onChange={(e) => setReplyText({ ...replyText, [rev.id]: e.target.value })}
                            className="flex-1 bg-slate-850 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                          />
                          <button
                            onClick={() => handleSendReply(rev.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl font-bold shadow flex items-center gap-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-white" /> Reply
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
