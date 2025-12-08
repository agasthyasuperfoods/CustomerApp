"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

/* ================= BASE64 HELPERS ================= */

// Base64URL -> Uint8Array
function base64urlToUint8Array(base64urlString) {
  if (!base64urlString || typeof base64urlString !== "string") {
    console.error("❌ Invalid base64url string:", base64urlString);
    return new Uint8Array();
  }

  const padding = "=".repeat((4 - (base64urlString.length % 4)) % 4);
  const base64 = (base64urlString + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// Uint8Array -> Base64URL
function bufferToBase64URLString(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/* ================= COMPONENT ================= */

export default function Loginonly() {
  const router = useRouter();

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  /* ============ ✅ FACE ID REGISTER (ONE TIME) ============ */

  const registerFaceId = async () => {
    try {
      if (!phone || phone.length !== 10) {
        alert("Enter valid mobile number first");
        return;
      }

      const res = await fetch("/api/auth/passkey/register-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const options = await res.json();
      console.log("✅ REGISTER OPTIONS FROM SERVER:", options);

      options.challenge = base64urlToUint8Array(options.challenge);
      options.user.id = base64urlToUint8Array(options.user.id);

      if (options.excludeCredentials?.length) {
        options.excludeCredentials = options.excludeCredentials.map((cred) => ({
          ...cred,
          id: base64urlToUint8Array(cred.id),
        }));
      }

      const credential = await navigator.credentials.create({
        publicKey: options,
      });

      const credentialForServer = {
        id: credential.id,
        rawId: bufferToBase64URLString(credential.rawId),
        type: credential.type,
        response: {
          attestationObject: bufferToBase64URLString(
            credential.response.attestationObject
          ),
          clientDataJSON: bufferToBase64URLString(
            credential.response.clientDataJSON
          ),
        },
        phone,
      };

      const verify = await fetch("/api/auth/passkey/register-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentialForServer),
      });

      const result = await verify.json();

      if (result.verified) {
        alert("✅ Face ID Enabled Successfully");
      } else {
        alert("❌ Face ID Registration Failed");
      }
    } catch (err) {
      console.error("❌ REGISTER ERROR:", err);
      alert("❌ Face ID Error");
    }
  };

  /* ============ ✅ FACE ID LOGIN ============ */

  const handleFaceLockTest = async () => {
    try {
      if (!phone || phone.length !== 10) {
        alert("Enter valid mobile number first");
        return;
      }

      const res = await fetch("/api/auth/passkey/login-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const options = await res.json();

      if (options.error) {
        alert("No Face ID registered for this number");
        return;
      }

      options.challenge = base64urlToUint8Array(options.challenge);

      if (options.allowCredentials) {
        options.allowCredentials = options.allowCredentials.map((cred) => ({
          ...cred,
          id: base64urlToUint8Array(cred.id),
        }));
      }

      const credential = await navigator.credentials.get({
        publicKey: options,
      });

      const verifyPayload = {
        id: credential.id,
        rawId: bufferToBase64URLString(credential.rawId),
        type: credential.type,
        response: {
          authenticatorData: bufferToBase64URLString(
            credential.response.authenticatorData
          ),
          clientDataJSON: bufferToBase64URLString(
            credential.response.clientDataJSON
          ),
          signature: bufferToBase64URLString(credential.response.signature),
          userHandle: credential.response.userHandle
            ? bufferToBase64URLString(credential.response.userHandle)
            : null,
        },
        phone,
      };

      const verify = await fetch("/api/auth/passkey/login-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verifyPayload),
      });

      const result = await verify.json();

      if (result.verified) {
        alert("✅ Face ID Login Success");
        router.push("/Guesthome");
      } else {
        alert("❌ Face ID Failed");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("❌ Face ID Error");
    }
  };

  /* ================= OTHER FLOW ================= */

  const cancelFlow = () => router.push("/Guesthome");

  const goBack = () => {
    if (step === "otp") setStep("phone");
    else if (step === "name") setStep("otp");
  };

  const handlePhoneContinue = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit number");
    } else {
      setError("");
      setStep("otp");
    }
  };

  const handleChangeOtp = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const nextOtp = [...otp];
    nextOtp[i] = val;
    setOtp(nextOtp);
    if (val && i < 3) otpRefs[i + 1].current.focus();
    if (nextOtp.every((d) => d !== "")) setStep("name");
  };

  const handleNameContinue = (e) => {
    e.preventDefault();
    if (!name.trim() || name.length < 2) {
      setError("Enter valid name");
    } else {
      router.push("/Guesthome");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* TOP BAR */}
      <div className="w-full max-w-[410px] flex justify-between px-4 py-5 fixed top-0 bg-white">
        {step !== "phone" ? (
          <button onClick={goBack}>
            <IoChevronBack size={22} />
          </button>
        ) : (
          <span />
        )}
        <button onClick={cancelFlow}>
          <RxCross2 size={20} />
        </button>
      </div>

      {/* MAIN */}
      <div className="mt-[90px] w-full max-w-[410px] px-6">
        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-[120px] h-[120px] mb-4">
            <Image src="/logo.jpeg" fill alt="logo" />
          </div>

          {step === "phone" && (
            <>
              <h1 className="text-xl font-bold">Login / Register</h1>
              <p className="text-gray-500 text-sm">
                Enter mobile number to continue
              </p>
            </>
          )}
        </div>

        {/* PHONE SCREEN */}
        {step === "phone" && (
          <>
            {error && <p className="text-red-500 mb-2 text-xs">{error}</p>}

            <form onSubmit={handlePhoneContinue} className="space-y-4">
              <div className="flex">
                <span className="bg-yellow-100 px-4 py-3 border">+91</span>
                <input
                  type="tel"
                  maxLength="10"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  className="flex-1 border px-3"
                />
              </div>

              <button className="bg-yellow-400 w-full py-3 font-bold">
                Get OTP
              </button>
            </form>

            <button
              onClick={handleFaceLockTest}
              className="w-full mt-4 bg-black text-white py-3 font-bold"
            >
              Unlock with Face ID
            </button>

            <button
              onClick={registerFaceId}
              className="w-full mt-2 border border-black py-3 font-bold"
            >
              Enable Face ID (One Time)
            </button>
          </>
        )}

        {/* OTP SCREEN */}
        {step === "otp" && (
          <div className="space-y-4">
            <div className="flex justify-center gap-3">
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={otpRefs[i]}
                  value={v}
                  onChange={(e) => handleChangeOtp(i, e.target.value)}
                  maxLength="1"
                  className="w-10 h-10 border text-center"
                />
              ))}
            </div>
          </div>
        )}

        {/* NAME SCREEN */}
        {step === "name" && (
          <form onSubmit={handleNameContinue} className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-full p-3"
              placeholder="Enter Name"
            />
            <button className="bg-yellow-400 w-full py-3 font-bold">
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
