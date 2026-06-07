function SuccessScreen() {
  return (
    <div className="bg-white/[0.04] border border-white/[0.09] rounded-2xl p-12 mt-6 text-center">

      {/* Animated checkmark */}
      <div className="w-20 h-20 rounded-full bg-[#00bca5]/15 border-2 border-[#00bca5] flex items-center justify-center mx-auto mb-6 animate-pulse">
        <span className="text-4xl">✓</span>
      </div>

      <h2 className="font-display text-3xl text-white font-semibold mb-3">
        Registration Confirmed!
      </h2>
      <p className="text-sm text-blue-200/60 max-w-sm mx-auto leading-relaxed mb-8">
        Thank you for registering. A confirmation and payment receipt has been sent to your email address. We look forward to seeing you in Accra.
      </p>

      {/* Reference box */}
      <div className="bg-[#00bca5]/[0.07] border border-[#00bca5]/20 rounded-xl px-6 py-4 inline-block text-left">
        <div className="flex gap-8">
          <div>
            <p className="text-[11px] text-blue-200/40 uppercase tracking-widest mb-1">Reference</p>
            <p className="text-sm text-white font-medium">SC2026-00847</p>
          </div>
          <div>
            <p className="text-[11px] text-blue-200/40 uppercase tracking-widest mb-1">Amount Paid</p>
            <p className="text-sm text-white font-medium">₵850</p>
          </div>
          <div>
            <p className="text-[11px] text-blue-200/40 uppercase tracking-widest mb-1">Date</p>
            <p className="text-sm text-white font-medium">June 07, 2026</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-blue-200/30 mt-8">
        National Cardiothoracic Centre · Korle Bu Teaching Hospital
      </p>

    </div>
  )
}

export default SuccessScreen