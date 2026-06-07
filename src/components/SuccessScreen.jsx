import { CheckCircle } from 'lucide-react'

function SuccessScreen() {
  return (
    <div className="text-center py-8">

      <div className="w-20 h-20 rounded-full bg-[#00bca5]/10 border-2 border-[#00bca5] flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} className="text-[#00bca5]" />
      </div>

      <h2 className="font-display text-3xl text-[#0a1628] font-semibold mb-3">
        Registration Confirmed!
      </h2>
      <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed mb-8">
        Thank you for registering. A confirmation and payment receipt has been sent to your email address. We look forward to seeing you in Accra.
      </p>

      <div className="bg-[#00bca5]/[0.05] border border-[#00bca5]/15 rounded-xl px-6 py-4 inline-block text-left">
        <div className="flex gap-8">
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1">Reference</p>
            <p className="text-sm text-gray-800 font-medium">SC2026-00847</p>
          </div>
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1">Amount Paid</p>
            <p className="text-sm text-gray-800 font-medium">₵850</p>
          </div>
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1">Date</p>
            <p className="text-sm text-gray-800 font-medium">June 07, 2026</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-300 mt-8">
        National Cardiothoracic Centre · Korle Bu Teaching Hospital
      </p>

    </div>
  )
}

export default SuccessScreen