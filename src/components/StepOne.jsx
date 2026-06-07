import { useState } from 'react'
import { UserCircle } from 'lucide-react'

function StepOne({ onNext }) {
  const [form, setForm] = useState({
    title: '',
    fullName: '',
    specialty: '',
    institution: '',
    jobTitle: '',
    email: '',
    phone: '',
    country: 'Ghana',
  })

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const inputClass = "bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-[#00bca5] focus:bg-white transition-all w-full"
  const labelClass = "text-[11px] font-medium tracking-widest uppercase text-gray-400"

  return (
    <div className="mt-4">

      <h2 className="font-display text-2xl text-[#0a1628] font-medium mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
        <UserCircle size={22} className="text-[#00bca5]" /> Participant Information
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Title</label>
          <select
            value={form.title}
            onChange={e => update('title', e.target.value)}
            className={inputClass}>
            <option value="">Select title</option>
            <option>Prof.</option>
            <option>Dr.</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
        </div>

        <div />

        <div className="col-span-2 flex flex-col gap-1">
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={e => update('fullName', e.target.value)}
            placeholder="As it appears on your ID"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Specialty / Department</label>
          <input
            type="text"
            value={form.specialty}
            onChange={e => update('specialty', e.target.value)}
            placeholder="e.g. Cardiothoracic Surgery"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Institution / Hospital</label>
          <input
            type="text"
            value={form.institution}
            onChange={e => update('institution', e.target.value)}
            placeholder="e.g. KBTH, Komfo Anokye"
            className={inputClass}
          />
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <label className={labelClass}>Job Title</label>
          <input
            type="text"
            value={form.jobTitle}
            onChange={e => update('jobTitle', e.target.value)}
            placeholder="e.g. Senior Registrar"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
            placeholder="+233 XX XXX XXXX"
            className={inputClass}
          />
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <label className={labelClass}>Country of Residence</label>
          <select
            value={form.country}
            onChange={e => update('country', e.target.value)}
            className={inputClass}>
            <option value="">Select country</option>
            <option>Ghana</option>
            <option>Nigeria</option>
            <option>Côte d'Ivoire</option>
            <option>Senegal</option>
            <option>Other</option>
          </select>
        </div>

      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => onNext(form)}
          className="bg-[#0a1628] hover:bg-[#0d2240] text-white text-sm font-medium px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5">
          Continue →
        </button>
      </div>

    </div>
  )
}

export default StepOne