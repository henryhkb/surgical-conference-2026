import { useState, useRef } from 'react'
import { Calendar, MapPin, Users, ArrowDown, Stethoscope, Award, Globe } from 'lucide-react'
import Stepper from './components/Stepper'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import StepFour from './components/StepFour'
import SuccessScreen from './components/SuccessScreen'

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxlrFtQgg1W9cl08uk06bkOK89G9j-5vpZqXfJshOzi157WXT0WNKEzBt8cVrxJSSXV/exec'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [regType, setRegType] = useState('fellows')
  const [workshops, setWorkshops] = useState({ ws1: true, ws2: false })
  const [amountPaid, setAmountPaid] = useState('')
  const formRef = useRef(null)

  const conferenceAmountMap = { fellows: 1000, residents: 500, pharmacists: 300, allied: 200, international: 1171 }

  const computeTotal = () => {
    const workshopTotal = (workshops.ws1 ? 500 : 0) + (workshops.ws2 ? 1000 : 0)
    const conf = conferenceAmountMap[regType] ?? 1000
    return `GHS ${(conf + workshopTotal).toLocaleString()}`
  }

  const handleSubmit = async (paymentMethod, paystackReference) => {
    const total = computeTotal()
    setAmountPaid(total)

    const attendingWorkshops = Object.entries(workshops)
      .filter(([, val]) => val)
      .map(([key]) => key === 'ws1' ? 'Workshop 1' : 'Workshop 2')
      .join(', ') || 'None'

    const payload = {
      ...formData,
      registrationType: regType,
      workshops: attendingWorkshops,
      amountDue: total,
      paymentMethod,
      paystackReference: paystackReference ?? 'Bank Transfer',
    }

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.error('Sheet error:', err)
    }

    setCurrentStep(5)
  }

  const scrollToForm = () => {
    setCurrentStep(1)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0a1628] flex items-center justify-center">
            <Stethoscope size={16} className="text-[#00bca5]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#0a1628] leading-tight">GSCVTS</p>
            <p className="text-[10px] text-gray-400">Ghanaian Society of Cardiovascular and Thoracic Surgeons</p>
          </div>
        </div>
        <button
          onClick={scrollToForm}
          className="bg-[#0a1628] hover:bg-[#0d2240] text-white text-xs font-medium px-5 py-2 rounded-lg transition-all">
          Register Now
        </button>
      </nav>

      {/* ── HERO ── */}
      <div className="relative h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&q=80"
          alt="Surgical theatre"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#0a1628]/70 to-[#0a1628]/90" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block bg-[#00bca5]/20 border border-[#00bca5]/40 text-[#00bca5] text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Annual Surgical Conference 2026
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white font-semibold leading-tight mb-4">
            Capacity Building for Sustainable<br />
            <span className="text-[#00bca5]">Cardiovascular</span> and Thoracic<br />Surgery Programmes in Ghana
          </h1>
          <p className="text-blue-100/70 text-base mb-8 max-w-xl mx-auto">
            Join leading cardiovascular and thoracic surgeons from across Ghana for two days of learning, hands-on workshops, and professional collaboration.
          </p>

          {/* Meta pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs px-4 py-2 rounded-full">
              <Calendar size={12} className="text-[#00bca5]" /> July 3–4, 2026
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs px-4 py-2 rounded-full">
              <MapPin size={12} className="text-[#00bca5]" /> Accra City Hotel
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs px-4 py-2 rounded-full">
              <Users size={12} className="text-[#00bca5]" /> Registration closes June 26
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="bg-[#00bca5] hover:bg-[#00d4bb] text-white font-medium px-10 py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#00bca5]/30">
            Register Now
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown size={20} className="text-white/40" />
        </div>
      </div>

      {/* ── HIGHLIGHTS ── */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-medium tracking-widest uppercase text-[#00bca5] mb-2">
            Why Attend
          </p>
          <h2 className="font-display text-3xl text-center text-[#0a1628] font-semibold mb-10">
            Conference Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#0a1628]/5 flex items-center justify-center mb-4">
                <Stethoscope size={20} className="text-[#0a1628]" />
              </div>
              <h3 className="font-semibold text-[#0a1628] mb-2">Pre-Conference Workshops</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Hands-on training on July 2nd at the Simulation Centre, UGMC — Vascular Anastomosis and VSD Repair techniques.
              </p>
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#00bca5]/10 flex items-center justify-center mb-4">
                <Award size={20} className="text-[#00bca5]" />
              </div>
              <h3 className="font-semibold text-[#0a1628] mb-2">Expert Presentations</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Leading cardiovascular and thoracic surgeons presenting cutting-edge research, case studies, and surgical innovations.
              </p>
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <Globe size={20} className="text-blue-500" />
              </div>
              <h3 className="font-semibold text-[#0a1628] mb-2">National Networking</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Connect with fellows, residents, pharmacists, and allied health professionals across Ghana's surgical community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── REGISTRATION FORM ── */}
      <div ref={formRef} className="bg-gray-50 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs font-medium tracking-widest uppercase text-[#00bca5] mb-2">
            Secure Your Spot
          </p>
          <h2 className="font-display text-3xl text-center text-[#0a1628] font-semibold mb-2">
            Conference Registration
          </h2>
          <p className="text-center text-sm text-gray-400 mb-2">
            Complete the form below to register for the conference
          </p>
          <p className="text-center text-xs text-red-400 font-medium mb-8">
            Registration closes: 26th June 2026
          </p>

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

            {currentStep === 0 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-2xl bg-[#0a1628] flex items-center justify-center mx-auto mb-4">
                  <Stethoscope size={28} className="text-[#00bca5]" />
                </div>
                <h3 className="font-display text-2xl text-[#0a1628] font-semibold mb-2">
                  Ready to Register?
                </h3>
                <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
                  The process takes about 3 minutes. You'll need your professional details and a payment method.
                </p>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-[#0a1628] hover:bg-[#0d2240] text-white text-sm font-medium px-10 py-3 rounded-xl transition-all">
                  Start Registration →
                </button>
              </div>
            )}

            {currentStep > 0 && currentStep < 5 && (
              <Stepper currentStep={currentStep} light />
            )}

            {currentStep === 1 && (
              <StepOne onNext={(data) => { setFormData(data); setCurrentStep(2) }} light />
            )}
            {currentStep === 2 && (
              <StepTwo
                onBack={() => setCurrentStep(1)}
                onNext={(selected) => { setRegType(selected); setCurrentStep(3) }}
                light
              />
            )}
            {currentStep === 3 && (
              <StepThree
                onBack={() => setCurrentStep(2)}
                onNext={(selected) => { setWorkshops(selected); setCurrentStep(4) }}
                light
              />
            )}
            {currentStep === 4 && (
              <StepFour
                onBack={() => setCurrentStep(3)}
                onSubmit={handleSubmit}
                regType={regType}
                workshops={workshops}
                email={formData.email}
                light
              />
            )}
            {currentStep === 5 && <SuccessScreen amountPaid={amountPaid} />}

          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0a1628] text-center py-8 px-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded bg-[#00bca5]/20 flex items-center justify-center">
            <Stethoscope size={12} className="text-[#00bca5]" />
          </div>
          <span className="text-white text-sm font-medium">Ghanaian Society of Cardiovascular and Thoracic Surgeons</span>
        </div>
        <p className="text-blue-200/50 text-xs mb-1">www.gscvts.org</p>
        <p className="text-blue-200/30 text-xs mb-3">Accra, Ghana · © 2026</p>
        <p className="text-white text-sm font-medium">Developed by Henry Kofi Brandoh</p>
      </footer>

    </div>
  )
}

export default App