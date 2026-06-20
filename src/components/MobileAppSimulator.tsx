import React, { useState, useMemo } from 'react';
import { Smartphone, ShoppingBag, Hammer, FileText, Bell, MessageCircle, AlertTriangle, ArrowRight, UserCheck, Shield, CreditCard, ChevronRight, Send, Check } from 'lucide-react';
import { Product, RepairBooking, Order, AppNotification } from '../types';
import { STORE_CONTACT } from '../data/mockData';

interface MobileAppSimulatorProps {
  products: Product[];
  bookings: RepairBooking[];
  orders: Order[];
  notifications: AppNotification[];
  onRefreshData: () => void;
}

export default function MobileAppSimulator({ products, bookings, orders, notifications, onRefreshData }: MobileAppSimulatorProps) {
  const [activeTab, setActiveTab] = useState<'shop' | 'repair' | 'track' | 'notifications'>('repair');
  
  // Simulated Authentication state
  const [userEmail, setUserEmail] = useState('sharanshetty80499@gmail.com'); // Pre filled as logged-in user in AI Studio
  const [userPhone, setUserPhone] = useState('+91 99300 80499');
  const [userName, setUserName] = useState('Sharan Shetty');
  const [isRegistered, setIsRegistered] = useState(true);

  // Cart / Purchase state flow
  const [cartItem, setCartItem] = useState<Product | null>(null);
  const [shippingAddress, setShippingAddress] = useState('Dura Complex, Sahar Road, Andheri East, Mumbai');
  const [paymentStep, setPaymentStep] = useState<'details' | 'upi_qr' | 'success'>('details');
  const [orderPlaced, setOrderPlaced] = useState<any>(null);

  // Repair Booking state flow in mobile
  const [repairStep, setRepairStep] = useState<'input' | 'upi_payment' | 'successful'>('input');
  const [deviceBrand, setDeviceBrand] = useState('OnePlus');
  const [deviceModel, setDeviceModel] = useState('OnePlus Nord CE 3');
  const [issueType, setIssueType] = useState<'screen' | 'battery' | 'charging' | 'water_damage' | 'software' | 'other'>('screen');
  const [issueDesc, setIssueDesc] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('12:00 PM - 02:00 PM');
  const [scheduledDate, setScheduledDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return tomorrow.toISOString().split('T')[0];
  });
  const [createdBooking, setCreatedBooking] = useState<RepairBooking | null>(null);

  // Selected booking in track stream
  const [selectedTrackBookingId, setSelectedTrackBookingId] = useState<string>('');

  // Unread notifications counter
  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

  // Handle mobile retail purchase
  const handleCheckoutProduct = async () => {
    if (!cartItem) return;

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'cust-demo',
          customerName: userName,
          customerPhone: userPhone,
          shippingAddress,
          paymentMethod: 'UPI',
          items: [
            { productId: cartItem.id, name: cartItem.name, price: cartItem.price, quantity: 1, image: cartItem.image }
          ],
          totalAmount: cartItem.price
        })
      });

      if (response.ok) {
        const orderData = await response.json();
        setOrderPlaced(orderData);
        setPaymentStep('success');
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle repair booking submit
  const handleBookRepair = async () => {
    if (!deviceModel || !issueDesc) return;

    setRepairStep('upi_payment');
  };

  const handleConfirmRepairUPIPayment = async () => {
    // Submit booking write
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'cust-demo',
          customerName: userName,
          customerPhone: userPhone,
          customerEmail: userEmail,
          deviceBrand,
          deviceModel,
          issueType,
          issueDescription: issueDesc,
          estimatedCost: issueType === 'screen' ? 6500 : issueType === 'battery' ? 2200 : 1200,
          scheduledDate,
          scheduledSlot: selectedSlot,
          aiDiagnosis: `Self-logged ${issueType} repair.`
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCreatedBooking(data);
        setSelectedTrackBookingId(data.id);
        setRepairStep('successful');
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Quick reset helper
  const handleResetRepairModule = () => {
    setDeviceModel('');
    setIssueDesc('');
    setCreatedBooking(null);
    setRepairStep('input');
  };

  // Retrieve current active tracking status index
  const trackingProgress = (status: string) => {
    const sequence = ['booked', 'assigned', 'diagnosing', 'parts_ordered', 'ready', 'collected'];
    const idx = sequence.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  // Selected track booking object
  const activeTrackObject = useMemo(() => {
    if (selectedTrackBookingId) {
      return bookings.find((b) => b.id === selectedTrackBookingId);
    }
    return bookings.length > 0 ? bookings[0] : null;
  }, [selectedTrackBookingId, bookings]);

  // Mark all notifs read mockup
  const handleMarkNotifsRead = async () => {
    try {
      await fetch('/api/notifications/read-all', { method: 'POST' });
      onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-sm rounded-[3rem] border-[12px] border-slate-900 bg-slate-950 shadow-2xl p-3 overflow-hidden text-left relative flex flex-col justify-between h-[640px] text-white">
      
      {/* PHONE STATUS HEADER BAR */}
      <div className="absolute top-0 inset-x-0 h-8 bg-slate-950 flex items-center justify-between px-6 z-20">
        <span className="text-[11px] font-bold font-mono tracking-tighter text-slate-300">09:41</span>
        
        {/* Camnotch */}
        <div className="w-24 h-4.5 bg-slate-900 rounded-b-xl flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
        </div>

        <div className="flex gap-1 items-center text-slate-300">
          <span className="text-[10px] font-bold font-mono">5G</span>
          <div className="w-5 h-2.5 bg-slate-705 border border-slate-700/80 rounded-sm flex items-center p-0.5">
            <span className="h-full bg-slate-100 rounded-xs w-4" />
          </div>
        </div>
      </div>

      {/* COMPANION AUTH CHECK */}
      {!isRegistered ? (
        <div className="flex-1 mt-10 p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold Tracking-tight mt-4">Sanjay Mobile App</h3>
            <p className="text-xs text-slate-400">Mumbai’s premier customized mobile repair & accessory companion store.</p>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Email ID</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Mobile Hotline</label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsRegistered(true)}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs uppercase"
          >
            Create Free Account
          </button>
        </div>
      ) : (
        /* REGISTERED TAB INTERFACES */
        <div className="flex-1 mt-8 overflow-y-auto mb-14 px-1 py-2 text-xs">
          
          {/* USER APP HEADER BAR */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Customer Account</span>
              <span className="text-xs font-bold text-slate-200">{userName}</span>
            </div>
            {unreadCount > 0 && (
              <span className="bg-orange-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                <Bell className="w-3 h-3 text-white" /> {unreadCount} new
              </span>
            )}
          </div>

          {/* TAB 2: STEP-BY-STEP REPAIR BOOKING */}
          {activeTab === 'repair' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-2 px-1 flex justify-between items-center text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-300 font-bold">Fast Bench Reservation</span>
                <button onClick={handleResetRepairModule} className="text-[9px] text-slate-500 hover:underline">Reset</button>
              </div>

              {repairStep === 'input' && (
                <div className="space-y-3 text-left">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] text-slate-400 mb-1">Device Brand</label>
                      <select 
                        value={deviceBrand} 
                        onChange={(e) => setDeviceBrand(e.target.value)} 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs"
                      >
                        <option value="Apple">Apple iPhone</option>
                        <option value="OnePlus">OnePlus</option>
                        <option value="Samsung">Samsung</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] text-slate-400 mb-1">Device Model</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nord CE 3"
                        value={deviceModel}
                        onChange={(e) => setDeviceModel(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] text-slate-400 mb-1">Issue Category</label>
                      <select 
                        value={issueType} 
                        onChange={(e) => setIssueType(e.target.value as any)} 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs"
                      >
                        <option value="screen">Screen replace</option>
                        <option value="battery">Battery issue</option>
                        <option value="charging">Charging port</option>
                        <option value="water_damage">Water damage</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] text-slate-400 mb-1">Date Picker</label>
                      <input 
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-[11px] text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] text-slate-400 mb-1">Describe Symptoms</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="e.g. Glass got broken after drop, displays normal screen inside..."
                      value={issueDesc}
                      onChange={(e) => setIssueDesc(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                    />
                  </div>

                  <button
                    onClick={handleBookRepair}
                    className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold text-xs uppercase"
                  >
                    Diagnose & Proceed &rarr;
                  </button>
                </div>
              )}

              {repairStep === 'upi_payment' && (
                <div className="text-center space-y-4">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Simulated GPay Checkout</span>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1.5 text-left text-xs">
                    <div>Device: <strong className="text-white">{deviceBrand} {deviceModel}</strong></div>
                    <div>Estimate Value: <strong className="text-emerald-400 font-mono">₹{issueType === 'screen' ? '6,500' : '2,200'}</strong></div>
                    <div>Target Slot: <span className="text-slate-350">{scheduledDate} ({selectedSlot})</span></div>
                  </div>

                  <button
                    onClick={handleConfirmRepairUPIPayment}
                    className="w-full py-2.5 bg-emerald-600 font-bold rounded-xl text-xs uppercase"
                  >
                    Confirm & Sandbox Pay UPI
                  </button>
                </div>
              )}

              {repairStep === 'successful' && (
                <div className="text-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-3 text-xs">
                  <div className="mx-auto w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-bold">✓</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Booking Succeeded!</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Ref ID: {createdBooking?.id}</p>
                  </div>
                  <button
                    onClick={() => { setActiveTab('track'); handleResetRepairModule(); }}
                    className="w-full py-2 bg-slate-904 border border-slate-800 rounded text-[11px] font-bold"
                  >
                    Track Repair Progress live
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIVE TRACK STATUS */}
          {activeTab === 'track' && (
            <div className="space-y-4 text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-300 font-bold block mb-1">Live repair stream</span>
              
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[9px] text-slate-500 mb-1 font-mono uppercase">Select Job Log</label>
                    <select
                      value={selectedTrackBookingId}
                      onChange={(e) => setSelectedTrackBookingId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white uppercase font-mono"
                    >
                      {bookings.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.id} - {b.deviceBrand} {b.deviceModel}
                        </option>
                      ))}
                    </select>
                  </div>

                  {activeTrackObject && (
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                      {/* Job details */}
                      <div className="flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase">{activeTrackObject.id}</span>
                          <span className="font-bold text-slate-205">{activeTrackObject.deviceBrand} {activeTrackObject.deviceModel}</span>
                        </div>
                        <span className="bg-orange-500/20 text-orange-400 font-bold px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider">
                          {activeTrackObject.status}
                        </span>
                      </div>

                      {/* Line-based tracking bar */}
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-[8px] text-slate-500 uppercase tracking-widest font-mono font-semibold">
                          <span>Request</span>
                          <span>Bench</span>
                          <span>Pickup Ready</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                          <div 
                            className="bg-emerald-500 h-full transition-all duration-500" 
                            style={{ 
                              width: `${(trackingProgress(activeTrackObject.status) / 5) * 100}%` 
                            }} 
                          />
                        </div>
                      </div>

                      {/* Timeline logs stack */}
                      <div className="space-y-3 pt-3 border-t border-slate-800 text-[11px]">
                        <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-slate-500 block mb-2">History logs</span>
                        <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                          {activeTrackObject.timeline.map((log: any, idx: number) => (
                            <div key={idx} className="flex gap-2 items-start">
                              <span className="text-emerald-400 font-semibold">•</span>
                              <div>
                                <span className="font-bold text-slate-200 block text-[10px] uppercase font-mono tracking-wide">{log.status}</span>
                                <p className="text-slate-400 text-[10px] leading-relaxed mt-0.5">{log.notes}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 bg-slate-900 border border-slate-800 rounded-xl">
                  No registered active repairs found. Create a booking above.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: APP NOTIFICATIONS INDEX */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-300 font-bold">Mock Push Notifications</span>
                <button onClick={handleMarkNotifsRead} className="text-[10px] text-blue-400 hover:underline">Mark read</button>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-3 rounded-xl border text-left flex gap-3 text-[11px] leading-relaxed ${
                      notif.isRead 
                        ? 'bg-slate-900/40 border-slate-850 text-slate-400' 
                        : 'bg-blue-500/10 border-blue-500/20 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mt-0.5">🔔</span>
                    <div>
                      <span className="font-bold text-slate-100 text-xs block mb-0.5">{notif.title}</span>
                      <p>{notif.body}</p>
                      <span className="block text-[8px] text-slate-500 font-mono mt-1">
                        {new Date(notif.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <p className="text-center py-10 text-slate-500">Inbox empty.</p>
                )}
              </div>
            </div>
          )}

        </div>
      )}

      {/* PHONE APP TAB BAR FOOTER */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-black border-t border-gold-500/10 flex items-center justify-around z-20 px-2 text-[#e5dec9]">
        <button
          onClick={() => setActiveTab('repair')}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors cursor-pointer ${
            activeTab === 'repair' ? 'text-gold-400 font-bold' : 'text-slate-450'
          }`}
        >
          <Hammer className="w-4 h-4 text-gold-500" />
          <span className="text-[9px] mt-1 font-medium select-none">Book Repair</span>
        </button>

        <button
          onClick={() => setActiveTab('track')}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors cursor-pointer ${
            activeTab === 'track' ? 'text-gold-400 font-bold' : 'text-slate-450'
          }`}
        >
          <Smartphone className="w-4 h-4 text-gold-500" />
          <span className="text-[9px] mt-1 font-medium select-none">Live Track</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors cursor-pointer ${
            activeTab === 'notifications' ? 'text-gold-400 font-bold' : 'text-slate-450'
          }`}
        >
          <Bell className="w-4 h-4 text-gold-500" />
          <span className="text-[9px] mt-1 font-medium select-none">Live Inbox</span>
        </button>
      </div>

    </div>
  );
}
