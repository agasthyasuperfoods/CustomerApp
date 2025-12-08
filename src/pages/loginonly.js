"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TbFaceId } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

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
  return Uint8Array.from(rawData, (c) => c.charCodeAt(0));
}

function bufferToBase64URLString(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/* ================= COMPONENT ================= */

export default function Loginonly() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  /* ✅ SINGLE FACE ID FLOW (LOGIN + AUTO REGISTER) */
  const handleFaceAuth = async () => {
    try {
      if (!phone || phone.length !== 10) {
        Swal.fire({
          icon: "warning",
          title: "Enter Mobile Number",
          text: "Please enter your 10-digit mobile number first",
          confirmButtonColor: "#000",
        });
        return;
      }

      /* ✅ TRY LOGIN FIRST */
      const res = await fetch("/api/auth/passkey/login-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const options = await res.json();

      /* ✅ IF USER NOT REGISTERED → AUTO REGISTER */
      if (options.error) {
        const regRes = await fetch("/api/auth/passkey/register-challenge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });

        const regOptions = await regRes.json();

        regOptions.challenge = base64urlToUint8Array(regOptions.challenge);
        regOptions.user.id = base64urlToUint8Array(regOptions.user.id);

        const credential = await navigator.credentials.create({
          publicKey: regOptions,
        });

        const regPayload = {
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

        const verifyReg = await fetch("/api/auth/passkey/register-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(regPayload),
        });

        const regResult = await verifyReg.json();

        if (regResult.verified) {
          localStorage.setItem("agasthyaUser", phone);
          router.push("/Home");
        } else {
          Swal.fire("Error", "Face ID Registration Failed", "error");
        }
        return;
      }

      /* ✅ LOGIN FLOW */
      options.challenge = base64urlToUint8Array(options.challenge);
      options.allowCredentials = options.allowCredentials?.map((cred) => ({
        ...cred,
        id: base64urlToUint8Array(cred.id),
      }));

      const credential = await navigator.credentials.get({
        publicKey: options,
      });

      const loginPayload = {
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
        body: JSON.stringify(loginPayload),
      });

      const result = await verify.json();

      if (result.verified) {
        localStorage.setItem("agasthyaUser", phone);
        router.push("/Home");
      } else {
        Swal.fire("Error", "Face ID Failed", "error");
      }
    } catch (err) {
      console.error("FACE ID ERROR:", err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen w-full bg-white relative flex flex-col">

      {/* ✅ TOP CLOSE BUTTON */}
      <div className="w-full flex justify-end px-6 py-5 fixed top-0 z-10 bg-white">
        <button onClick={() => router.push("/Guesthome")}>
          <RxCross2 size={20} />
        </button>
      </div>

      {/* ✅ CENTER LOGO */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <div className="relative w-[110px] h-[110px] mb-4">
          <Image src="/logo.jpeg" fill alt="logo" className="object-contain" />
        </div>

        <h1 className="text-[22px] font-bold text-gray-900">
          Login with Face ID
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Secure and instant login
        </p>
      </div>

      {/* ✅ BOTTOM FIXED FORM */}
      <div className="w-full px-6 pb-8 fixed bottom-0 bg-white">

        {/* ✅ MOBILE INPUT */}
        <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white mb-4">
          <span className="px-4 py-3 font-semibold bg-[#FFF3CD]">
            🇮🇳 +91
          </span>

          <input
            type="tel"
            placeholder="Mobile number"
            maxLength="10"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="flex-1 px-4 py-3 outline-none text-black"
          />
        </div>

        {/* ✅ FACE ID BUTTON */}
        <button
          onClick={handleFaceAuth}
          className="w-full bg-black text-white py-3 font-bold rounded-xl flex items-center justify-center gap-3"
        >
          <TbFaceId size={26} />
          <span>Continue with Face ID</span>
        </button>

        {/* ✅ CONTINUE AS GUEST */}
        <button
          onClick={() => router.push("/Guesthome")}
          className="w-full mt-3 bg-[#FFD60A] text-black py-3 font-bold rounded-xl"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
