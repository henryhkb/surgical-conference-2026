import { useState } from 'react'

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

  const toggle = (id, value) => {
    setSelections(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="bg-white/[0.04] border border-white/[0.09] rounded-2xl p-8 mt-6">

      <h2 className="font-display text-2xl text-white font-medium mb-6 pb-4 border-b border-white/[0.08]">
        🎓 Pre-Conference Workshops
      </h2>

      <p className="text-sm text-blue-200/50 mb-6">
        Will you be attending the pre-conference workshops? Please indicate below.
      </p>

      <div className="flex flex-col gap-4">
        {workshops.map((ws) => (
          <div
            key={ws.id}
            className="flex items-center justify-between border border-white/[0.08] rounded-2xl px-5 py-4 hover:border-[#00bca5]/25 transition-all">

            {/* Info */}
            <div>
              <p className="text-sm text-blue-100 font-medium mb-1">{ws.title}</p>
              <p className="text-xs text-blue-200/45">{ws.time} · {ws.note}</p>
            </div>

            {/* Yes / No Toggle */}
            <div className="flex ml-6 shrink-0">
              <button
                onClick={() => toggle(ws.id, true)}
                className={`px-5 py-2 text-xs font-medium rounded-l-lg border transition-all
                  ${selections[ws.id]
                    ? 'bg-[#00bca5] border-[#00bca5] text-white'
                    : 'bg-transparent border-white/12 text-blue-200/50 hover:text-blue-200'
                  }`}>
                Yes
              </button>
              <button
                onClick={() => toggle(ws.id, false)}
                className={`px-5 py-2 text-xs font-medium rounded-r-lg border border-l-0 transition-all
                  ${!selections[ws.id]
                    ? 'bg-[#00bca5] border-[#00bca5] text-white'
                    : 'bg-transparent border-white/12 text-blue-200/50 hover:text-blue-200'
                  }`}>
                No
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4">
        <p className="text-xs text-blue-200/50 uppercase tracking-widest mb-3 font-medium">Your selection</p>
        {workshops.map((ws) => (
          <div key={ws.id} className="flex justify-between items-center py-1.5">
            <span className="text-xs text-blue-200/60">{ws.title.split(':')[0]}</span>
            <span className={`text-xs font-medium px-3 py-0.5 rounded-full
              ${selections[ws.id]
                ? 'bg-[#00bca5]/15 text-[#00bca5]'
                : 'bg-white/[0.05] text-blue-200/40'
              }`}>
              {selections[ws.id] ? 'Attending' : 'Not attending'}
            </span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="text-sm text-blue-200/60 border border-white/15 px-6 py-3 rounded-xl hover:text-white hover:border-white/30 transition-all">
          ← Back
        </button>
        <button
          onClick={() => onNext(selections)}
          className="bg-[#00bca5] hover:bg-[#00d4bb] text-white text-sm font-medium px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5">
          Continue →
        </button>
      </div>

    </div>
  )
}

export default StepThree