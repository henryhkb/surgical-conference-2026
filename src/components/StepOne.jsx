import { useState } from 'react'

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

  return (
    <div className="bg-white/[0.04] border border-white/[0.09] rounded-2xl p-8 mt-6">

      <h2 className="font-display text-2xl text-white font-medium mb-6 pb-4 border-b border-white/[0.08]">
        👤 Participant Information
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">Title</label>
          <select
            value={form.title}
            onChange={e => update('title', e.target.value)}
            className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 outline-none focus:border-[#00bca5]/50 focus:bg-[#00bca5]/[0.06] transition-all">
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
          <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">Full Name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={e => update('fullName', e.target.value)}
            placeholder="As it appears on your ID"
            className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 placeholder-blue-200/30 outline-none focus:border-[#00bca5]/50 focus:bg-[#00bca5]/[0.06] transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">Specialty / Department</label>
          <input
            type="text"
            value={form.specialty}
            onChange={e => update('specialty', e.target.value)}
            placeholder="e.g. Cardiothoracic Surgery"
            className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 placeholder-blue-200/30 outline-none focus:border-[#00bca5]/50 focus:bg-[#00bca5]/[0.06] transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">Institution / Hospital</label>
          <input
            type="text"
            value={form.institution}
            onChange={e => update('institution', e.target.value)}
            placeholder="e.g. KBTH, Komfo Anokye"
            className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 placeholder-blue-200/30 outline-none focus:border-[#00bca5]/50 focus:bg-[#00bca5]/[0.06] transition-all"
          />
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">Job Title</label>
          <input
            type="text"
            value={form.jobTitle}
            onChange={e => update('jobTitle', e.target.value)}
            placeholder="e.g. Senior Registrar"
            className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 placeholder-blue-200/30 outline-none focus:border-[#00bca5]/50 focus:bg-[#00bca5]/[0.06] transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            placeholder="you@example.com"
            className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 placeholder-blue-200/30 outline-none focus:border-[#00bca5]/50 focus:bg-[#00bca5]/[0.06] transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
            placeholder="+233 XX XXX XXXX"
            className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 placeholder-blue-200/30 outline-none focus:border-[#00bca5]/50 focus:bg-[#00bca5]/[0.06] transition-all"
          />
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-blue-200/60">Country of Residence</label>
          <select
            value={form.country}
            onChange={e => update('country', e.target.value)}
            className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-blue-100 outline-none focus:border-[#00bca5]/50 focus:bg-[#00bca5]/[0.06] transition-all">
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
          className="bg-[#00bca5] hover:bg-[#00d4bb] text-white text-sm font-medium px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5">
          Continue →
        </button>
      </div>

    </div>
  )
}

export default StepOne