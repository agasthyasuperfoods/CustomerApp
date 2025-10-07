// pages/orders.js
'use client';

import React, { useMemo, useState } from 'react';
import {
  ArrowLeftIcon,
  ShoppingBagIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const COLORS = {
  accent: '#FBBF24',
  success: '#16A34A',
  danger: '#DC2626',
};

const MOCK_ORDERS = [
  { id: 'ORD-1006', date: '2025-09-22T06:00:00Z', total: 150, items: [{ name: 'A2 Cow Milk - 1L', qty: 2, price: 75 }], status: 'Delivered', address: '32-14 Agasthya Enclave, Kadapa' },
  { id: 'ORD-1005', date: '2025-09-23T08:00:00Z', total: 75, items: [{ name: 'A2 Cow Milk - 1L', qty: 1, price: 75 }], status: 'In Progress', address: '32-14 Agasthya Enclave, Kadapa' },
  { id: 'ORD-0999', date: '2025-09-16T06:45:00Z', total: 120, items: [{ name: 'Buffalo Milk - 1L', qty: 1, price: 120 }], status: 'Cancelled', address: '12, MG Road, Kadapa' },
];

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function StatusPill({ status }) {
  const map = {
    Delivered: { bg: '#ECFDF5', color: COLORS.success, icon: <CheckCircleIcon className="h-5 w-5" /> },
    Cancelled: { bg: '#FFF1F2', color: COLORS.danger, icon: <XCircleIcon className="h-5 w-5" /> },
    'In Progress': { bg: '#FFFBEB', color: '#B45309', icon: <ClockIcon className="h-5 w-5" /> },
  };
  const config = map[status] || map['In Progress'];
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold" style={{ backgroundColor: config.bg, color: config.color }}>
      {config.icon}
      {status}
    </span>
  );
}

const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">{order.id}</h2>
                        <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </header>
                
                <div className="p-5 overflow-y-auto space-y-5">
                    <StatusPill status={order.status} />
                    
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Items</h3>
                        <ul className="space-y-2 text-sm">
                            {order.items.map((item, i) => (
                                <li key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                    <span className="text-gray-700">{item.name} (×{item.qty})</span>
                                    <span className="font-medium text-gray-800">₹{(item.price * item.qty).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Total Amount</h3>
                        <p className="text-2xl font-extrabold text-gray-900">₹{order.total.toFixed(2)}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Delivery Address</h3>
                        <div className="flex items-start gap-3 text-sm text-gray-600">
                            <MapPinIcon className="h-5 w-5 mt-0.5 flex-shrink-0 text-gray-400"/>
                            <span>{order.address}</span>
                        </div>
                    </div>
                </div>

                <footer className="p-4 mt-auto border-t border-gray-100">
                     <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3.5 text-base font-bold text-gray-900 shadow-sm hover:bg-amber-500">
                        <ArrowPathIcon className="h-5 w-5"/>
                        Reorder All Items
                    </button>
                </footer>
            </div>
        </div>
    );
};


const OrderCard = ({ order, onViewDetails }) => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-lg font-bold text-gray-900">{order.id}</p>
                    <p className="text-sm font-semibold text-gray-500">{formatDate(order.date)}</p>
                </div>
                <StatusPill status={order.status} />
            </div>
        </div>
        
        <div className="text-sm text-gray-700 bg-slate-50 px-4 py-3 border-y border-gray-100">
            {order.items.map(it => it.name).join(' • ')}
        </div>

        <div className="p-4 flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="font-extrabold text-gray-900 text-lg">₹{order.total.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
                {order.status === 'Delivered' && (
                    <button className="flex items-center gap-2 rounded-lg bg-amber-100/60 px-3 py-2 text-sm font-bold text-amber-900 shadow-sm hover:bg-amber-200/70">
                        <ArrowPathIcon className="h-4 w-4"/>
                        Reorder
                    </button>
                )}
                <button onClick={() => onViewDetails(order)} className="rounded-lg bg-gray-800 px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-gray-900">
                    Details
                </button>
            </div>
        </div>
    </div>
);

export default function OrdersPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = useMemo(() => MOCK_ORDERS, []);
  
  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = orders;
    if (statusFilter !== 'All') out = out.filter(o => o.status === statusFilter);
    if (q) out = out.filter(o => o.id.toLowerCase().includes(q) || o.items.some(i => i.name.toLowerCase().includes(q)));
    return out;
  }, [orders, query, statusFilter]);
  
  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <div className="bg-amber-400 h-28">
           <div className="mx-auto max-w-lg px-4 pt-6 flex items-start">
            <button onClick={() => window.history.back()} className="p-2 -ml-2 text-gray-800 hover:bg-black/10 rounded-full">
              <ArrowLeftIcon className="h-6 w-6" />
              <span className="sr-only">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900 ml-3 mt-1">
              Order History
            </h1>
          </div>
        </div>
        
        <main className="mx-auto max-w-lg p-4 -mt-12">
          <div className="bg-white rounded-2xl shadow-md p-3 mb-6">
              <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by Order ID or item"
                      className="block w-full rounded-lg border-0 bg-slate-50 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm"
                  />
              </div>
              <div className="grid grid-cols-4 items-center gap-2 mt-3">
                  {['All', 'Delivered', 'Cancelled', 'In Progress'].map(s => (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`rounded-lg py-2 text-sm font-semibold transition-colors ${statusFilter === s ? 'bg-amber-400 text-gray-900 shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                          {s}
                      </button>
                  ))}
              </div>
          </div>

          <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                  filteredOrders.map(order => <OrderCard key={order.id} order={order} onViewDetails={setSelectedOrder} />)
              ) : (
                  <div className="text-center bg-white rounded-2xl p-8">
                      <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-4 text-lg font-semibold text-gray-900">No Orders Found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                          Your search or filter returned no results.
                      </p>
                  </div>
              )}
          </div>
        </main>
      </div>

      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
}

