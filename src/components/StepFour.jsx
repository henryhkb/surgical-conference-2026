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

  const price = regType === 'standard' ? '₵850' : '₵450'
  const regLabel = regType === 'standard' ? 'Standard Registration' : 'Resident / Student Rate'
  const attendingWorkshops = Object.entries(workshops)
    .filter(([, val]) => val)
    .map(([key]) => key === 'ws1' ? 'Workshop 1' : 'Workshop 2')

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
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-500">Registration type</span>
          <span className="text-sm text-gray-800 font-medium">{regLabel}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-500">Workshops</span>
          <span className="text-sm text-gray-800 font-medium">
            {attendingWorkshops.length > 0 ? attendingWorkshops.join(', ') : 'None'}
          </span>
        </div>
        <div className="border-t border-[#00bca5]/15 mt-3 pt-4 flex justify-between items-center">
          <span className="text-sm text-gray-800 font-medium">Total Due</span>
          <span className="font-display text-3xl font-semibold text-[#00bca5]">{price}</span>
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
          <div className="mt-4 flex flex-col gap-1">
            <label className="text-[11px] font-medium tracking-widest uppercase text-gray-400">
              MoMo Network
            </label>
            <select
              value={momoNetwork}
              onChange={(e) => setMomoNetwork(e.target.value)}
              className={inputClass}>
              {networks.map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
        )}

        {payMethod === 'bank' && (
          <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">Bank Details</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Bank</span>
                <span className="text-xs text-gray-800 font-medium">Ghana Commercial Bank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Account Name</span>
                <span className="text-xs text-gray-800 font-medium">NCC Surgical Conference</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Account Number</span>
                <span className="text-xs text-gray-800 font-medium">1234567890</span>
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
        Cancellations made before <span className="text-gray-700 font-medium">September 15, 2026</span> are
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