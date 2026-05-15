"use client";
import { useState, useEffect } from "react";
import { addServiceCharge, getInvoice, getBookings } from "@/lib/api";

export default function BillingPage() {
  // ✅ ALL useState at TOP
  const [bookings, setBookings]   = useState<any[]>([]);
  const [invoice, setInvoice]     = useState<any>(null);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [form, setForm] = useState({
    booking: "", serviceType: "Food & Beverages", amount: "", description: ""
  });

  useEffect(() => {
    getBookings().then(data => {
      const active = Array.isArray(data)
        ? data.filter((b: any) => !b.checkOut)
        : [];
      setBookings(active);
    });
  }, []);

  const handleCharge = async () => {
    if (!form.booking || !form.amount) {
      alert("Please select a booking and enter amount");
      return;
    }
    const res = await addServiceCharge({
      booking:     form.booking,
      serviceType: form.serviceType,
      amount:      Number(form.amount),
      description: form.description
    });
    if (res.error) { alert("Error: " + res.error); return; }
    alert("✅ Service charge added successfully!");
    setForm({ booking: "", serviceType: "Food & Beverages", amount: "", description: "" });
  };

  const handleInvoice = async () => {
    if (!invoiceId) { alert("Please select a booking"); return; }
    setInvoiceLoading(true);
    const data = await getInvoice(invoiceId);
    setInvoice(data);
    setInvoiceLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Billing</h1>
      <p className="text-sm text-gray-500 mb-6">Service charges & invoice generation</p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Add Service Charge */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Add Service Charge</h3>
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Select Active Booking</label>
              <select value={form.booking}
                onChange={e => setForm({...form, booking: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="">-- Select Booking --</option>
                {bookings.map((b: any) => (
                  <option key={b._id} value={b._id}>
                    {b.guest?.name ?? "Guest"} · Room {b.room?.roomNumber ?? "?"} · {b.checkIn?.slice(0,10)}
                  </option>
                ))}
              </select>
              {bookings.length === 0 && (
                <p className="text-xs text-rose-500 mt-1">⚠️ No active bookings. Check-in a guest first.</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Service Type</label>
              <select value={form.serviceType}
                onChange={e => setForm({...form, serviceType: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option>Food & Beverages</option>
                <option>Laundry</option>
                <option>Drinks & Minibar</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Amount (NPR)</label>
              <input type="number" placeholder="500"
                value={form.amount}
                onChange={e => setForm({...form, amount: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Description (Optional)</label>
              <input placeholder="e.g. Breakfast for 2"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            <button onClick={handleCharge}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
              Add Charge
            </button>
          </div>
        </div>

        {/* Generate Invoice */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Generate Invoice</h3>
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Select Booking</label>
              <select value={invoiceId}
                onChange={e => { setInvoiceId(e.target.value); setInvoice(null); }}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="">-- Select Booking --</option>
                {bookings.map((b: any) => (
                  <option key={b._id} value={b._id}>
                    {b.guest?.name ?? "Guest"} · Room {b.room?.roomNumber ?? "?"} · {b.checkIn?.slice(0,10)}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={handleInvoice}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold">
              {invoiceLoading ? "Generating..." : "Generate Invoice"}
            </button>

            {invoice && (
              <div className="border border-dashed border-gray-200 rounded-xl p-5 bg-gray-50">
                <div className="flex justify-between mb-3">
                  <span className="font-bold text-gray-700">Invoice Summary</span>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Room Total</span>
                    <span>NPR {invoice.roomTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Services Total</span>
                    <span>NPR {invoice.servicesTotal}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-800 border-t border-gray-200 pt-2 mt-1">
                    <span>Grand Total</span>
                    <span className="text-blue-600">NPR {invoice.grandTotal}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}