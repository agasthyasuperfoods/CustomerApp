import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const handlePhoneContinue = e => {
    e.preventDefault();
    if (phone.length !== 10) setError('Please enter a valid 10-digit number');
    else { setError(''); setStep('otp'); }
  };

  const handleChangeOtp = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const nextOtp = [...otp];
    nextOtp[i] = val;
    setOtp(nextOtp);
    if (val && i < 3) otpRefs[i + 1].current.focus();
  };

  const handleKeyDownOtp = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs[i - 1].current.focus();
  };

  const handleOtpContinue = e => {
    e.preventDefault();
    if (otp.some(char => char === '')) setError('Enter all 4 digits');
    else { setError(''); setStep('name'); }
  };

  const handleNameContinue = e => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) setError('Please enter your name');
    else { setError(''); alert('Welcome, ' + name + '! Demo only'); }
  };

  const handleGuestContinue = () => {
    router.push('/Guesthome');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-white">
      <div
        style={{
          maxWidth: 410,
          width: "100%",
          background: "#fff",
          borderRadius: "1.25rem",
          padding: "2.5rem 1.5rem 1.5rem 1.5rem"
        }}
      >
        {/* Centered logo + heading block */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div style={{ width: 120, height: 120, position: "relative", margin: "0 auto 16px auto" }}>
            <Image
              src="/Logo.png"
              alt="Agasthya Nutro Milk"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <h1 className="text-[25px] font-bold text-center text-gray-800 mb-2 tracking-tight">
            Login / Register
          </h1>
          <p className="text-center text-gray-600 mb-2">
            Enter your mobile number to continue
          </p>
        </div>

        {/* Interactive content */}
        <div>
          {/* PHONE SCREEN */}
          {step === 'phone' && (
            <div className="flex flex-col items-center">
              {error && (
                <div className="mb-3 px-3 py-2 bg-red-50 text-red-600 rounded w-full text-center text-xs">{error}</div>
              )}
              <form onSubmit={handlePhoneContinue} className="w-full flex flex-col gap-4">
                <div className="flex w-full">
                  <span
                    className="bg-[#FFF3CD] text-base font-bold px-4 py-3 rounded-l-xl border border-gray-300 flex items-center select-none text-gray-900 whitespace-nowrap"
                  >
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    maxLength="10"
                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-r-xl text-base outline-none placeholder-gray-700 text-black"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition-colors mt-2" // styled as requested
                >
                  Continue
                </button>
              </form>
              <div className="w-full text-center my-7 text-xs text-gray-400 flex items-center">
                <span className="flex-1 border-t border-slate-200"></span>
                <span className="mx-2">OR</span>
                <span className="flex-1 border-t border-slate-200"></span>
              </div>
              <button
                onClick={handleGuestContinue}
                className="w-full bg-white border border-gray-300 rounded-xl font-bold text-gray-800 text-base py-3"
              >
                Continue as Guest
              </button>
            </div>
          )}

          {/* OTP SCREEN */}
          {step === 'otp' && (
            <div className="flex flex-col items-center">
              <div className="mb-3 mt-3">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none">
                  <rect x="9" y="15" width="42" height="30" rx="5" stroke="#FFD600" strokeWidth="2" fill="#FFF8E1" />
                  <rect x="22" y="30" width="16" height="4" rx="2" fill="#FFD600" />
                  <rect x="28" y="22" width="10" height="4" rx="2" fill="#FFD600" />
                  <circle cx="16" cy="34" r="2" fill="#FFD600" />
                </svg>
              </div>
              <h1 className="text-[20px] font-semibold text-center text-gray-800 mb-1">OTP Verification</h1>
              <p className="text-center text-gray-600 text-sm mb-2 px-3">
                Enter the 4-digit OTP sent to <b>XXXXXX{phone.slice(-4)}</b>
              </p>
              <form onSubmit={handleOtpContinue} className="flex flex-col items-center w-full">
                <div className="flex justify-center gap-3 mb-4">
                  {otp.map((val, i) => (
                    <input
                      key={i}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      ref={otpRefs[i]}
                      className="border border-gray-300 bg-white text-center rounded-lg w-12 h-12 text-2xl font-bold text-black focus:border-gray-500"
                      value={val}
                      onChange={e => handleChangeOtp(i, e.target.value)}
                      onKeyDown={e => handleKeyDownOtp(i, e)}
                      style={{ outline: 'none', boxShadow: 'none' }}
                    />
                  ))}
                </div>
                {error && (
                  <div className="mb-3 px-3 py-1 bg-red-50 text-red-600 rounded text-xs w-full text-center">{error}</div>
                )}
                <div className="flex w-full justify-end mb-3 px-1">
                  <button
                    type="button"
                    onClick={() => alert('Resending OTP...')}
                    className="text-yellow-400 text-xs font-semibold px-0"
                    style={{ textDecoration: "none" }}
                  >
                    RESEND
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Continue
                </button>
              </form>
              <button
                onClick={() => setStep('phone')}
                className="block w-full my-5 text-center text-yellow-400 font-bold text-xs"
                style={{ textDecoration: "none" }}
              >
                Change Number
              </button>
            </div>
          )}

          {/* NAME SCREEN */}
          {step === 'name' && (
            <div className="flex flex-col items-center">
              <h1 className="text-[20px] font-bold text-center text-gray-800 mb-2">What&apos;s your name?</h1>
              <p className="text-center text-gray-600 mb-4 text-base">So we know what to call you</p>
              {error && (
                <div className="mb-3 px-3 py-2 bg-red-50 text-red-600 rounded w-full text-center text-xs">{error}</div>
              )}
              <form onSubmit={handleNameContinue} className="flex flex-col items-center w-full">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-base outline-none text-black focus:border-gray-500"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition-colors mt-5"
                >
                  Continue
                </button>
              </form>
              <button
                onClick={() => setStep('phone')}
                className="block w-full my-5 text-center text-yellow-400 font-bold text-xs"
                style={{ textDecoration: "none" }}
              >
                Use Different Number
              </button>
            </div>
          )}

          {/* Terms */}
          <div className="my-4 text-center text-xs text-gray-400">
            By continuing, you agree to our{' '}
            <a
              href="/terms"
              className="text-yellow-400 font-medium"
              style={{ textDecoration: "none" }}
            >
              Terms
            </a>
            {' | '}
            <a
              href="/privacy"
              className="text-yellow-400 font-medium"
              style={{ textDecoration: "none" }}
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
