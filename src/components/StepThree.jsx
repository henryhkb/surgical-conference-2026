import { useState } from 'react'
import { GraduationCap } from 'lucide-react'

const workshops = [
  {
    id: 'ws1',
    title: 'Workshop 1: Minimally Invasive Cardiac Techniques',
    time: 'Oct 14 · 8:00 AM – 12:00 PM',
    note: 'Additional fee may apply',
  },
  {
    id: 'ws2',
    title: 'Workshop 2: Thoracic Oncology & Surgical Planning',
    time: 'Oct 14 · 2:00 PM – 6:00 PM',
    note: 'Additional fee may apply',
  },
]

function StepThree({ onNext, onBack }) {
  const [selections, setSelections] = useState({ ws1: true, ws2: false })

  const toggle = (id, value) => setSelections(prev => ({ ...prev, [id]: value }))

  return (
    <div className="mt-4">

      <h2 className="font-display text-2xl text-[#0a1628] font-medium mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
        <GraduationCap size={22} className="text-[#00bca5]" /> Pre-Conference Workshops
      </h2>

      <p className="text-sm text-gray-400 mb-6">
        Will you be attending the pre-conference workshops? Please indicate below.
      </p>

      <div className="flex flex-col gap-4">
        {workshops.map((ws) => (
          <div
            key={ws.id}
            className="flex items-center justify-between border border-gray-200 rounded-2xl px-5 py-4 hover:border-[#00bca5]/30 transition-all">
            <div>
              <p className="text-sm text-gray-800 font-medium mb-1">{ws.title}</p>
              <p className="text-xs text-gray-400">{ws.time} · {ws.note}</p>
            </div>
            <div className="flex ml-6 shrink-0">
              <button
                onClick={() => toggle(ws.id, true)}
                className={`px-5 py-2 text-xs font-medium rounded-l-lg border transition-all
                  ${selections[ws.id]
                    ? 'bg-[#0a1628] border-[#0a1628] text-white'
                    : 'bg-white border-gray-200 text-gray-400 hover:text-gray-600'
                  }`}>
                Yes
              </button>
              <button
                onClick={() => toggle(ws.id, false)}
                className={`px-5 py-2 text-xs font-medium rounded-r-lg border border-l-0 transition-all
                  ${!selections[ws.id]
                    ? 'bg-[#0a1628] border-[#0a1628] text-white'
                    : 'bg-white border-gray-200 text-gray-400 hover:text-gray-600'
                  }`}>
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">Your selection</p>
        {workshops.map((ws) => (
          <div key={ws.id} className="flex justify-between items-center py-1.5">
            <span className="text-xs text-gray-500">{ws.title.split(':')[0]}</span>
            <span className={`text-xs font-medium px-3 py-0.5 rounded-full
              ${selections[ws.id]
                ? 'bg-[#00bca5]/10 text-[#00bca5]'
                : 'bg-gray-100 text-gray-400'
              }`}>
              {selections[ws.id] ? 'Attending' : 'Not attending'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="text-sm text-gray-400 border border-gray-200 px-6 py-3 rounded-xl hover:text-gray-700 hover:border-gray-300 transition-all">
          ← Back
        </button>
        <button
          onClick={() => onNext(selections)}
          className="bg-[#0a1628] hover:bg-[#0d2240] text-white text-sm font-medium px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5">
          Continue →
        </button>
      </div>

    </div>
  )
}

export default StepThree