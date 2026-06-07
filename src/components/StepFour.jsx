import { useState } from 'react'

const paymentMethods = [
  { id: 'card', icon: '💳', label: 'Card' },
  { id: 'momo', icon: '📱', label: 'Mobile Money' },
  { id: 'bank', icon: '🏦', label: 'Bank Transfer' },
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
  if (!agreed) {
    setError(true)
    return
  }
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
    onSubmit(payMethod)
  }, 2500)
}
  return (
    <div className="bg-white/[0.04] border border-white/[0.09] rounded-2xl p-8 mt-6">

      <h2 className="font-display text-2xl text-white font-medium mb-6 pb-4 border-b border-white/[0.08]">
        💳 Payment
      </h2>

      {/* Order Summary */}
      <div className="bg-[#00bca5]/[0.07] border border-[#00bca5]/20 rounded-2xl px-6 py-5 mb-6">
        <p className="text-[11px] font-medium tracking-widest uppercase text-blue-200/50 mb-4">
          Order Summary
        </p>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-blue-200/60">Registration type</span>
          <span className="text-sm text-blue-100 font-medium">{regLabel}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-blue-200/60">Workshops</span>
          <span className="text-sm text-blue-100 font-medium">
            {attendingWorkshops.length > 0 ? attendingWorkshops.join(', ') : 'None'}
          </span>
        </div>
        <div className="border-t border-[#00bca5]/20 mt-3 pt-4 flex justify-between items-center">
          <span className="text-sm text-white font-medium">Total Due</span>
          <span className="font-display text-3xl font-semibold text-[#00bca5]">{price}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60 block mb-3">
          Payment Method
        </label>
        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setPayMethod(method.id)}
              className={`border rounded-xl py-4 px-3 text-center cursor-pointer transition-all
                ${payMethod === method.id
                  ? 'border-[#00bca5] bg-[#00bca5]/[0.08]'
                  : 'border-white/10 hover:border-[#00bca5]/30'
                }`}>
              <span className="text-2xl block mb-2">{method.icon}</span>
              <span className={`text-xs font-medium
                ${payMethod === method.id ? 'text-white' : 'text-blue-200/60'}`}>
                {method.label}
              </span>
            </div>
          ))}
        </div>

        {/* MoMo Network */}
        {payMethod === 'momo' && (
          <div className="mt-4 flex flex-col gap-1">
            <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">
              MoMo Network
            </label>
            <select
              value={momoNetwork}
              onChange={(e) => setMomoNetwork(e.target.value)}
              className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 outline-none focus:border-[#00bca5]/50 transition-all">
              {networks.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
        )}

        {/* Bank Transfer */}
        {payMethod === 'bank' && (
          <div className="mt-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-xs text-blue-200/50 uppercase tracking-widest mb-3 font-medium">Bank Details</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-xs text-blue-200/50">Bank</span>
                <span className="text-xs text-blue-100">Ghana Commercial Bank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-200/50">Account Name</span>
                <span className="text-xs text-blue-100">NCC Surgical Conference</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-200/50">Account Number</span>
                <span className="text-xs text-blue-100">1234567890</span>
              </div>
              <p className="text-xs text-blue-200/40 mt-2">
                Please use your full name as payment reference and attach proof of payment.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Terms */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-4 mb-5 text-xs text-blue-200/45 leading-relaxed">
        By completing this registration, you agree to the conference's cancellation policy.
        Cancellations made before <span className="text-blue-200/70 font-medium">September 15, 2026</span> are
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
        <label htmlFor="agree" className="text-xs text-blue-200/60 cursor-pointer leading-relaxed">
          I have read and agree to the registration and cancellation policy
        </label>
      </div>

      {error && (
        <p className="text-xs text-red-400 mb-4">
          Please agree to the terms before proceeding.
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          disabled={loading}
          className="text-sm text-blue-200/60 border border-white/15 px-6 py-3 rounded-xl hover:text-white hover:border-white/30 transition-all disabled:opacity-40">
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#00bca5] hover:bg-[#00d4bb] text-white text-sm font-medium px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>🔒 Pay & Register</>
          )}
        </button>
      </div>

    </div>
  )
}

export default StepFour