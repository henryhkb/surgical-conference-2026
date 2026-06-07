import { useState } from 'react'
import Stepper from './components/Stepper'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import StepFour from './components/StepFour'
import SuccessScreen from './components/SuccessScreen'

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxlrFtQgg1W9cl08uk06bkOK89G9j-5vpZqXfJshOzi157WXT0WNKEzBt8cVrxJSSXV/exec'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [regType, setRegType] = useState('standard')
  const [workshops, setWorkshops] = useState({ ws1: true, ws2: false })

  const handleSubmit = async (paymentMethod) => {
    const attendingWorkshops = Object.entries(workshops)
      .filter(([, val]) => val)
      .map(([key]) => key === 'ws1' ? 'Workshop 1' : 'Workshop 2')
      .join(', ') || 'None'

    const payload = {
      ...formData,
      registrationType: regType === 'standard' ? 'Standard Registration' : 'Resident / Student Rate',
      workshops: attendingWorkshops,
      paymentMethod,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d2240] to-[#0a1f35] relative overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,188,165,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(20,100,180,0.1) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">

        <p className="text-[#00bca5] text-center text-xs tracking-widest uppercase mb-4">
          Annual Surgical Conference 2026
        </p>
        <h1 className="font-display text-4xl text-center text-white font-semibold leading-tight mb-3">
          Advancing Surgical Excellence<br />in West Africa
        </h1>
        <p className="text-center text-sm text-blue-200/60 mb-6">
          National Cardiothoracic Centre · Korle Bu Teaching Hospital · Accra, Ghana
        </p>
        <div className="flex justify-center gap-8 text-sm text-blue-200/70 mb-8">
          <span>📅 October 14–16, 2026</span>
          <span>📍 KBTH Auditorium, Accra</span>
          <span>👥 Limited seats</span>
        </div>

        {currentStep < 5 && <Stepper currentStep={currentStep} />}

        {currentStep === 1 && (
          <StepOne onNext={(data) => {
            setFormData(data)
            setCurrentStep(2)
          }} />
        )}
        {currentStep === 2 && (
          <StepTwo
            onBack={() => setCurrentStep(1)}
            onNext={(selected) => {
              setRegType(selected)
              setCurrentStep(3)
            }}
          />
        )}
        {currentStep === 3 && (
          <StepThree
            onBack={() => setCurrentStep(2)}
            onNext={(selected) => {
              setWorkshops(selected)
              setCurrentStep(4)
            }}
          />
        )}
        {currentStep === 4 && (
          <StepFour
            onBack={() => setCurrentStep(3)}
            onSubmit={handleSubmit}
            regType={regType}
            workshops={workshops}
          />
        )}
        {currentStep === 5 && <SuccessScreen />}

      </div>
    </div>
  )
}

export default App