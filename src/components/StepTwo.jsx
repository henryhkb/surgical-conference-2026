import { useState } from 'react'

const regOptions = [
  {
    id: 'standard',
    title: 'Standard Registration',
    price: '₵850',
    usd: '$60 USD',
    note: 'Open until October 1, 2026',
  },
  {
    id: 'resident',
    title: 'Resident / Student Rate',
    price: '₵450',
    usd: '$30 USD',
    note: 'Proof of status required',
  },
]

function StepTwo({ onNext, onBack }) {
  const [selected, setSelected] = useState('standard')

  return (
    <div className="bg-white/[0.04] border border-white/[0.09] rounded-2xl p-8 mt-6">

      {/* Registration Category */}
      <h2 className="font-display text-2xl text-white font-medium mb-6 pb-4 border-b border-white/[0.08]">
        🪪 Registration Category
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {regOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`relative border rounded-2xl p-5 cursor-pointer transition-all
              ${selected === option.id
                ? 'border-[#00bca5] bg-[#00bca5]/10'
                : 'border-white/10 hover:border-[#00bca5]/30 hover:bg-[#00bca5]/5'
              }`}>

            {/* Checkmark */}
            {selected === option.id && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#00bca5] flex items-center justify-center text-white text-xs">
                ✓
              </div>
            )}

            <p className="text-sm font-medium text-blue-100 mb-2">{option.title}</p>
            <p className="font-display text-3xl font-semibold text-[#00bca5] mb-1">{option.price}</p>
            <p className="text-xs text-blue-200/50">{option.usd} · {option.note}</p>
          </div>
        ))}
      </div>

      {/* Special Requirements */}
      <h2 className="font-display text-2xl text-white font-medium mb-6 pb-4 border-b border-white/[0.08]">
        🍽️ Special Requirements
      </h2>

      <div className="grid grid-cols-2 gap-5">

        {/* Dietary */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">
            Dietary Restrictions
          </label>
          <select className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 outline-none focus:border-[#00bca5]/50 focus:bg-[#00bca5]/[0.06] transition-all">
            <option value="">None</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Halal</option>
            <option>Allergies (specify below)</option>
          </select>
        </div>

        {/* Accessibility */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">
            Accessibility Needs
          </label>
          <select className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 outline-none focus:border-[#00bca5]/50 focus:bg-[#00bca5]/[0.06] transition-all">
            <option value="">None</option>
            <option>Wheelchair access</option>
            <option>Sign language</option>
            <option>Other</option>
          </select>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="text-sm text-blue-200/60 border border-white/15 px-6 py-3 rounded-xl hover:text-white hover:border-white/30 transition-all flex items-center gap-2">
          ← Back
        </button>
        <button
          onClick={() => onNext(selected)}
          className="bg-[#00bca5] hover:bg-[#00d4bb] text-white text-sm font-medium px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2">
          Continue →
        </button>
      </div>

    </div>
  )
}

export default StepTwo