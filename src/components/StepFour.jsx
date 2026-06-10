import { useState } from 'react'
import { usePaystackPayment } from 'react-paystack'
import { Smartphone, Building2, Lock, CreditCard } from 'lucide-react'

const PAYSTACK_PUBLIC_KEY = 'pk_live_54af97296f234e853a3acc85a113b67e38337520'

const paymentMethods = [
  { id: 'momo', icon: <Smartphone size={22} />, label: 'Mobile Money' },
  { id: 'bank', icon: <Building2 size={22} />, label: 'Bank Transfer' },
]

const priceMap = {
  fellows: 'GHS 1000',
  residents: 'GHS 500',
  pharmacists: 'GHS 300',
  allied: 'GHS 200',
  international: 'GHS 1,171',
}
const labelMap = {
  fellows: 'Fellows / Members',
  residents: 'Residents / Non-Member Physicians',
  pharmacists: 'Pharmacists',
  allied: 'Allied Health / Nurses',
  international: 'International Participants',
}
const conferenceAmountMap = { fellows: 1000, residents: 500, pharmacists: 300, allied: 200, international: 1171 }

const workshopDetails = [
  { key: 'ws1', label: 'Workshop 1: Vascular Anastomosis', amount: 500 },
  { key: 'ws2', label: 'Workshop 2: VSD Repair', amount: 1000 },
]

function StepFour({ onBack, onSubmit, regType, workshops, email }) {
  const [payMethod, setPayMethod] = useState('card')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  const price = priceMap[regType] ?? 'GHS 1000'
  const regLabel = labelMap[regType] ?? regType
  const workshopTotal = workshopDetails.reduce((sum, w) => sum + (workshops[w.key] ? w.amount : 0), 0)
  const conferenceAmount = conferenceAmountMap[regType] ?? 1000
  const grandTotal = conferenceAmount + workshopTotal

  const paystackConfig = {
    reference: `GSCVTS-${Date.now()}`,
    email: email || 'participant@gscvts.org',
    amount: grandTotal * 100, // Paystack expects pesewas (GHS × 100)
    currency: 'GHS',
    publicKey: PAYSTACK_PUBLIC_KEY,
    channels: payMethod === 'momo' ? ['mobile_money'] : ['bank_transfer'],
    metadata: {
      custom_fields: [
        { display_name: 'Registration Type', variable_name: 'reg_type', value: regLabel },
        { display_name: 'Payment Method', variable_name: 'payment_method', value: payMethod },
      ],
    },
  }

  const initializePayment = usePaystackPayment(paystackConfig)

  const handlePaystackSuccess = (response) => {
    onSubmit(payMethod, response.reference)
  }

  const handlePaystackClose = () => {
    // user closed popup — stay on this step
  }

  const handleSubmit = () => {
    if (!agreed) { setError('Please agree to the terms before proceeding.'); return }
    setError('')
    initializePayment({ onSuccess: handlePaystackSuccess, onClose: handlePaystackClose })
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

        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-300 mb-1">Main Conference · July 3–4</p>
        <div className="flex justify-between items-center py-2 border-b border-[#00bca5]/10">
          <span className="text-sm text-gray-600">{regLabel}</span>
          <span className="text-sm font-semibold text-gray-800">{price}</span>
        </div>

        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-300 mt-4 mb-1">Pre-Conference Workshops · July 2</p>
        {workshopDetails.map((w) => (
          <div key={w.key} className="flex justify-between items-center py-1.5">
            <span className="text-sm text-gray-600">{w.label}</span>
            <span className={`text-sm font-medium ${workshops[w.key] ? 'text-gray-800' : 'text-gray-300'}`}>
              {workshops[w.key] ? `GHS ${w.amount.toLocaleString()}` : '—'}
            </span>
          </div>
        ))}

        <div className="border-t border-[#00bca5]/20 mt-4 pt-4 flex justify-between items-center">
          <span className="text-sm text-gray-800 font-medium">Total Due</span>
          <span className="font-display text-3xl font-semibold text-[#00bca5]">
            GHS {grandTotal.toLocaleString()}
          </span>
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
              <span className={`flex justify-center mb-2 ${payMethod === method.id ? 'text-[#00bca5]' : 'text-gray-400'}`}>
                {method.icon}
              </span>
              <span className={`text-xs font-medium ${payMethod === method.id ? 'text-[#0a1628]' : 'text-gray-400'}`}>
                {method.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 bg-[#00bca5]/5 border border-[#00bca5]/20 rounded-xl px-4 py-3">
          <p className="text-xs text-[#00bca5]">
            {payMethod === 'momo'
              ? "You'll be prompted to enter your Mobile Money number in the Paystack secure popup."
              : 'Paystack will provide bank account details in the secure popup for you to complete the transfer.'}
          </p>
        </div>
      </div>

      {/* Terms */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 mb-5 text-xs text-gray-400 leading-relaxed">
        By completing this registration, you agree to the conference's cancellation policy.
        Cancellations made before <span className="text-gray-700 font-medium">June 20, 2026</span> are
        subject to a 20% administrative fee. No refunds will be granted after this date.
        Card and Mobile Money payments are processed securely through Paystack.
      </div>

      {/* Agree checkbox */}
      <div className="flex items-start gap-3 mb-6">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => { setAgreed(e.target.checked); setError('') }}
          className="mt-0.5 w-4 h-4 accent-[#00bca5] cursor-pointer shrink-0"
        />
        <label htmlFor="agree" className="text-xs text-gray-400 cursor-pointer leading-relaxed">
          I have read and agree to the registration and cancellation policy
        </label>
      </div>

      {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-sm text-gray-400 border border-gray-200 px-6 py-3 rounded-xl hover:text-gray-700 hover:border-gray-300 transition-all">
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#0a1628] hover:bg-[#0d2240] text-white text-sm font-medium px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2">
          <Lock size={15} />
          Pay & Register
        </button>
      </div>

    </div>
  )
}

export default StepFour
