"use client";
import { useState } from "react";
import { addServiceCharge, getInvoice } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function BillingPage() {
  const [sForm, setSForm]   = useState({ booking: "", serviceType: "Food & Beverages", amount: "", description: "" });
  const [bookingId, setBookingId] = useState("");
  const [invoice, setInvoice]     = useState<any>(null);

  const handleCharge  = async () => { await addServiceCharge(sForm); alert("Charge added!"); };
  const handleInvoice = async () => { const data = await getInvoice(bookingId); setInvoice(data); };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Billing</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <Card className="p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Add Service Charge</h3>
          <div className="flex flex-col gap-4">
            <Input label="Booking ID"    placeholder="ObjectId"  onChange={e => setSForm({...sForm, booking: e.target.value})} />
            <Select label="Service Type" options={["Food & Beverages","Laundry","Drinks & Minibar"]} onChange={e => setSForm({...sForm, serviceType: e.target.value})} />
            <Input label="Amount (NPR)"  type="number"           onChange={e => setSForm({...sForm, amount: e.target.value})} />
            <Input label="Description"  placeholder="Optional"  onChange={e => setSForm({...sForm, description: e.target.value})} />
            <Button onClick={handleCharge}>Add Charge</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Generate Invoice</h3>
          <div className="flex flex-col gap-4">
            <Input label="Booking ID" placeholder="ObjectId" onChange={e => setBookingId(e.target.value)} />
            <Button variant="success" onClick={handleInvoice}>Generate Invoice</Button>
          </div>
          {invoice && (
            <div className="mt-6 border border-dashed border-gray-200 rounded-xl p-5 bg-gray-50">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Room Total</span><span>NPR {invoice.roomTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Services Total</span><span>NPR {invoice.servicesTotal}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 border-t pt-2 mt-2">
                  <span>Grand Total</span>
                  <span className="text-blue-600">NPR {invoice.grandTotal}</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}