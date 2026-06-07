const steps = [
  { id: 1, label: 'Participant' },
  { id: 2, label: 'Registration' },
  { id: 3, label: 'Workshops' },
  { id: 4, label: 'Payment' },
]

function Stepper({ currentStep }) {
  return (
    <div className="flex justify-center items-center px-8 pt-6 max-w-2xl mx-auto">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">

          {/* Circle + Label */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
              ${currentStep > step.id
                ? 'bg-[#00bca5] text-white'
                : currentStep === step.id
                ? 'bg-white text-[#0a1628] ring-4 ring-white/20'
                : 'bg-white/10 text-blue-200/40 border border-white/10'
              }`}>
              {currentStep > step.id ? '✓' : step.id}
            </div>
            <span className={`text-[10px] font-medium tracking-wider uppercase text-center
              ${currentStep > step.id
                ? 'text-[#00bca5]'
                : currentStep === step.id
                ? 'text-white'
                : 'text-blue-200/30'
              }`}>
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className={`h-px flex-1 max-w-[60px] mb-5 transition-all
              ${currentStep > step.id ? 'bg-[#00bca5]' : 'bg-white/10'}`} />
          )}

        </div>
      ))}
    </div>
  )
}

export default Stepper