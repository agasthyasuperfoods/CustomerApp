"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TbFaceId } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

/* ================= BASE64 HELPERS ================= */

function base64urlToUint8Array(base64urlString) {
  if (!base64urlString || typeof base64urlString !== "string") {
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

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  /* ✅ FACE ID REGISTER */
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
        router.push("/Home");
      } else {
        alert("❌ Face ID Registration Failed");
      }
    } catch (err) {
      console.error("❌ REGISTER ERROR:", err);
      alert("❌ Face ID Error");
    }
  };

  /* ✅ FACE ID LOGIN */
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
        alert("No Face ID registered");
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
        router.push("/Home");
      } else {
        alert("❌ Face ID Failed");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("❌ Face ID Error");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white">

      {/* ✅ TOP BAR */}
      <div className="w-full max-w-[410px] flex justify-end items-center px-4 py-5 fixed top-0 bg-white z-10">
        <button onClick={() => router.push("/Guesthome")}>
          <RxCross2 size={20} />
        </button>
      </div>

      {/* ✅ MAIN CARD */}
      <div className="w-full max-w-[410px] mt-[100px] px-6">

        {/* ✅ LOGO */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-[110px] h-[110px] mb-4">
            <Image src="/logo.jpeg" fill alt="logo" className="object-contain" />
          </div>

          <h1 className="text-[22px] font-bold text-gray-900">
            Login / Register
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Enter your mobile number to continue
          </p>
        </div>

        {error && (
          <p className="text-red-500 mb-3 text-xs text-center">{error}</p>
        )}

        {/* ✅ ROUNDED INPUT */}
        <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white mb-4">
          <span className="px-4 py-3 font-semibold bg-[#FFF3CD]">
            🇮🇳 +91
          </span>

          <input
            type="tel"
            placeholder="Mobile number"
            maxLength="10"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, ""))
            }
            className="flex-1 px-4 py-3 outline-none text-black"
          />
        </div>

        {/* ✅ GET OTP BUTTON */}
        <button
          onClick={() =>
            phone.length !== 10
              ? setError("Please enter a valid 10-digit number")
              : setError("")
          }
          className="w-full bg-[#FFD60A] text-black py-3 font-bold rounded-xl"
        >
          Get OTP
        </button>

        {/* ✅ FACE ID LOGIN BUTTON */}
        <button
          onClick={handleFaceLockTest}
          className="w-full mt-4 bg-black text-white py-3 font-bold rounded-xl flex items-center justify-center gap-3"
        >
          <TbFaceId size={26} />
          <span>Unlock with Face ID</span>
        </button>

        {/* ✅ FACE ID REGISTER BUTTON */}
        <button
          onClick={registerFaceId}
          className="w-full mt-3 bg-white text-black py-3 font-bold rounded-xl border border-gray-300 flex items-center justify-center gap-3"
        >
          <TbFaceId size={24} />
          <span>Enable Face ID (One Time)</span>
        </button>
      </div>
    </div>
  );
}
