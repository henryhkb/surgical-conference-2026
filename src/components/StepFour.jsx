import { useState } from 'react'
import { CreditCard, Smartphone, Building2, Lock, Loader2 } from 'lucide-react'

const paymentMethods = [
  { id: 'card', icon: <CreditCard size={22} />, label: 'Card' },
  { id: 'momo', icon: <Smartphone size={22} />, label: 'Mobile Money' },
  { id: 'bank', icon: <Building2 size={22} />, label: 'Bank Transfer' },
]

const networks = ['MTN MoMo', 'Telecel Cash', 'AirtelTigo Money']

function StepFour({ onBack, onSubmit, regType, workshops }) {
  const [payMethod, setPayMethod] = useState('card')
  const [momoNetwork, setMomoNetwork] = useState('MTN MoMo')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const priceMap = {
    fellows: 'GHS 1000',
    residents: 'GHS 500',
    pharmacists: 'GHS 300',
    allied: 'GHS 200',
    international: '$100',
  }
  const labelMap = {
    fellows: 'Fellows / Members',
    residents: 'Residents / Non-Member Physicians',
    pharmacists: 'Pharmacists',
    allied: 'Allied Health / Nurses',
    international: 'International Participants',
  }
  const conferenceAmountMap = { fellows: 1000, residents: 500, pharmacists: 300, allied: 200, international: null }
  const price = priceMap[regType] ?? 'GHS 1000'
  const regLabel = labelMap[regType] ?? regType
  const isInternational = regType === 'international'

  const workshopDetails = [
    { key: 'ws1', label: 'Workshop 1: Vascular Anastomosis', amount: 500 },
    { key: 'ws2', label: 'Workshop 2: VSD Repair', amount: 1000 },
  ]
  const workshopTotal = workshopDetails.reduce((sum, w) => sum + (workshops[w.key] ? w.amount : 0), 0)
  const conferenceAmount = conferenceAmountMap[regType]
  const grandTotal = isInternational ? null : (conferenceAmount ?? 0) + workshopTotal

  const handleSubmit = () => {
    if (!agreed) { setError(true); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); onSubmit(payMethod) }, 2500)
  }

  const inputClass = "bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#00bca5] focus:bg-white transition-all w-full"

  return (
    <div className="mt-4">

      <h2 className="font-display text-2xl text-[#0a1628] font-medium mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
        <CreditCard size={22} className="text-[#00bca5]" /> Payment
      </h2>

      {/* Order Summary */}
      <div className="bg-[#00bca5]/[0.05] border border-[#00bca5]/15 rounded-2xl px-6 py-5 mb-6">
        <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-4">
          Order Summary
        </p>

        {/* Main Conference */}
        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-300 mb-1">Main Conference · July 3–4</p>
        <div className="flex justify-between items-center py-2 border-b border-[#00bca5]/10">
          <span className="text-sm text-gray-600">{regLabel}</span>
          <span className="text-sm font-semibold text-gray-800">{price}</span>
        </div>

        {/* Pre-Conference Workshops */}
        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-300 mt-4 mb-1">Pre-Conference Workshops · July 2</p>
        {workshopDetails.map((w) => (
          <div key={w.key} className="flex justify-between items-center py-1.5">
            <span className="text-sm text-gray-600">{w.label}</span>
            <span className={`text-sm font-medium ${workshops[w.key] ? 'text-gray-800' : 'text-gray-300'}`}>
              {workshops[w.key] ? `GHS ${w.amount.toLocaleString()}` : '—'}
            </span>
          </div>
        ))}

        {/* Grand Total */}
        <div className="border-t border-[#00bca5]/20 mt-4 pt-4 flex justify-between items-center">
          <span className="text-sm text-gray-800 font-medium">Total Due</span>
          {grandTotal !== null ? (
            <span className="font-display text-3xl font-semibold text-[#00bca5]">
              GHS {grandTotal.toLocaleString()}
            </span>
          ) : (
            <div className="text-right">
              <span className="font-display text-2xl font-semibold text-[#00bca5]">$100</span>
              {workshopTotal > 0 && (
                <p className="text-xs text-gray-400">+ GHS {workshopTotal.toLocaleString()} (workshops)</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="text-[11px] font-medium tracking-widest uppercase text-gray-400 block mb-3">
          Payment Method
        </label>
        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setPayMethod(method.id)}
              className={`border rounded-xl py-4 px-3 text-center cursor-pointer transition-all
                ${payMethod === method.id
                  ? 'border-[#00bca5] bg-[#00bca5]/5'
                  : 'border-gray-200 hover:border-[#00bca5]/30 hover:bg-gray-50'
                }`}>
              <span className={`flex justify-center mb-2
                ${payMethod === method.id ? 'text-[#00bca5]' : 'text-gray-400'}`}>
                {method.icon}
              </span>
              <span className={`text-xs font-medium
                ${payMethod === method.id ? 'text-[#0a1628]' : 'text-gray-400'}`}>
                {method.label}
              </span>
            </div>
          ))}
        </div>

        {payMethod === 'momo' && (
          <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">Mobile Money Details</p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium tracking-widest uppercase text-gray-400">Network</label>
                <select
                  value={momoNetwork}
                  onChange={(e) => setMomoNetwork(e.target.value)}
                  className={inputClass}>
                  {networks.map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Number</span>
                <span className="text-xs text-gray-800 font-medium">0249123349</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Merchant No</span>
                <span className="text-xs text-gray-800 font-medium">200566</span>
              </div>
              <p className="text-xs text-gray-400">
                Please use your full name as payment reference and attach proof of payment.
              </p>
            </div>
          </div>
        )}

        {payMethod === 'bank' && (
          <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">Bank Details</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Bank</span>
                <span className="text-xs text-gray-800 font-medium">GCB – High Street</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Account Number</span>
                <span className="text-xs text-gray-800 font-medium">1011101019883</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Please use your full name as payment reference and attach proof of payment.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Terms */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 mb-5 text-xs text-gray-400 leading-relaxed">
        By completing this registration, you agree to the conference's cancellation policy.
        Cancellations made before <span className="text-gray-700 font-medium">June 20, 2026</span> are
        subject to a 20% administrative fee. No refunds will be granted after this date.
        Payment via card or MoMo will be processed securely through Paystack.
      </div>

      {/* Agree checkbox */}
      <div className="flex items-start gap-3 mb-6">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => { setAgreed(e.target.checked); setError(false) }}
          className="mt-0.5 w-4 h-4 accent-[#00bca5] cursor-pointer shrink-0"
        />
        <label htmlFor="agree" className="text-xs text-gray-400 cursor-pointer leading-relaxed">
          I have read and agree to the registration and cancellation policy
        </label>
      </div>

      {error && (
        <p className="text-xs text-red-500 mb-4">Please agree to the terms before proceeding.</p>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          disabled={loading}
          className="text-sm text-gray-400 border border-gray-200 px-6 py-3 rounded-xl hover:text-gray-700 hover:border-gray-300 transition-all disabled:opacity-40">
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#0a1628] hover:bg-[#0d2240] text-white text-sm font-medium px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> Processing...</>
          ) : (
            <><Lock size={15} /> Pay & Register</>
          )}
        </button>
      </div>

    </div>
  )
}

export default StepFour