import { useState } from 'react'
import { BadgeCheck, Utensils } from 'lucide-react'

const regOptions = [
  {
    id: 'fellows',
    title: 'Fellows / Members',
    price: 'GHS 1000',
    note: 'GSCVTS fellows and members',
  },
  {
    id: 'residents',
    title: 'Residents / Non-Member Physicians',
    price: 'GHS 500',
    note: 'Residents and non-member doctors',
  },
  {
    id: 'pharmacists',
    title: 'Pharmacists',
    price: 'GHS 300',
    note: 'Registered pharmacists',
  },
  {
    id: 'allied',
    title: 'Allied Health / Nurses',
    price: 'GHS 200',
    note: 'Allied health professionals and nurses',
  },
  {
    id: 'international',
    title: 'International Participants',
    price: 'GHS 1,171',
    note: 'Participants outside Ghana',
  },
]

const selectClass = "bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#00bca5] focus:bg-white transition-all w-full"
const labelClass = "text-[11px] font-medium tracking-widest uppercase text-gray-400"

function StepTwo({ onNext, onBack }) {
  const [selected, setSelected] = useState('fellows')

  return (
    <div className="mt-4">

      <h2 className="font-display text-2xl text-[#0a1628] font-medium mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
        <BadgeCheck size={22} className="text-[#00bca5]" /> Registration Category
      </h2>

      <div className="flex flex-col gap-3 mb-8">
        {regOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`relative border rounded-2xl px-5 py-4 cursor-pointer transition-all flex items-center justify-between
              ${selected === option.id
                ? 'border-[#00bca5] bg-[#00bca5]/5'
                : 'border-gray-200 hover:border-[#00bca5]/40 hover:bg-gray-50'
              }`}>
            <div>
              <p className="text-sm font-medium text-gray-800">{option.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{option.note}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-display text-xl font-semibold text-[#00bca5]">{option.price}</p>
              {selected === option.id && (
                <div className="w-5 h-5 rounded-full bg-[#00bca5] flex items-center justify-center text-white text-xs shrink-0">
                  ✓
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl text-[#0a1628] font-medium mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
        <Utensils size={22} className="text-[#00bca5]" /> Special Requirements
      </h2>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Dietary Restrictions</label>
          <select className={selectClass}>
            <option value="">None</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Halal</option>
            <option>Allergies (specify below)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Accessibility Needs</label>
          <select className={selectClass}>
            <option value="">None</option>
            <option>Wheelchair access</option>
            <option>Sign language</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="text-sm text-gray-400 border border-gray-200 px-6 py-3 rounded-xl hover:text-gray-700 hover:border-gray-300 transition-all">
          ← Back
        </button>
        <button
          onClick={() => onNext(selected)}
          className="bg-[#0a1628] hover:bg-[#0d2240] text-white text-sm font-medium px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5">
          Continue →
        </button>
      </div>

    </div>
  )
}

export default StepTwo