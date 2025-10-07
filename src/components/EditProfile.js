// pages/profile/edit.js
'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Import the Image component
import { useRouter } from 'next/router';
import {
  ArrowLeftIcon, UserIcon, EnvelopeIcon, PhoneIcon,
  MapPinIcon, BuildingOffice2Icon, CameraIcon
} from '@heroicons/react/24/outline';

// A completely restyled Form Input component for the new design
const FormInput = ({ icon: Icon, label, error, ...props }) => (
  <div className="relative">
    <label
      htmlFor={props.id}
      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-500"
    >
      {label}
    </label>
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    </div>
    <input
      className={`block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm ${props.readOnly ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'ring-gray-300 focus:ring-amber-500'} ${error ? 'ring-red-500 focus:ring-red-600' : ''}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

export default function PremiumEditProfile() {
  const router = useRouter(); // Initialize the router hook

  const initialUser = {
    name: 'Jaswanth',
    email: 'jaswanth@gmail.com',
    phone: '9876543210',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '516001',
    avatar: 'https://i.pravatar.cc/150?u=jaswanth.doe'
  };

  const [form, setForm] = useState({ ...initialUser });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // --- Validation and Form Handling Logic (no changes needed here) ---
  const validateField = (k, v) => {
    if (k === 'name' && (!v || !v.trim())) return 'Full name is required';
    if (k === 'phone' && !/^[0-9]{7,15}$/.test(v.replace(/\s+/g, ''))) return 'Invalid phone number';
    if (k === 'pincode' && !/^[0-9]{4,10}$/.test(v)) return 'Invalid pincode';
    return '';
  };

  const validateAll = () => {
    const keys = ['name', 'phone', 'pincode'];
    const nextErrors = {};
    keys.forEach(k => {
      const err = validateField(k, form[k]);
      if (err) nextErrors[k] = err;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  
  const handleChange = (k) => (e) => {
    setForm(s => ({ ...s, [k]: e.target.value }));
    if (errors[k]) {
      setErrors(s => ({ ...s, [k]: undefined }));
    }
  };

  const onSave = async () => {
    if (!validateAll()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    console.log('Profile saved:', form);
    router.push('/account'); // Navigate on success
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- BOLD HEADER --- */}
      <div className="bg-amber-400 h-32 rounded-b-2xl">
        <div className="mx-auto max-w-lg px-4 pt-6 flex items-start">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-800 hover:bg-black/10 rounded-full">
            <ArrowLeftIcon className="h-6 w-6" />
            <span className="sr-only">Back</span>
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-3 mt-1">
            Edit Profile
          </h1>
        </div>
      </div>

      <main className="mx-auto max-w-lg p-4 -mt-24">
        {/* --- AVATAR OVERLAP --- */}
        <div className="flex flex-col items-center">
            <div className="relative">
                {/* FIXED: Replaced <img> with <Image> */}
                <Image
                    src={form.avatar}
                    alt="Profile Avatar"
                    width={112} // The className h-28/w-28 is 112px
                    height={112}
                    className="rounded-full object-cover ring-4 ring-white shadow-lg"
                />
                <button className="absolute -bottom-1 -right-1 bg-white p-2 rounded-full text-gray-700 hover:bg-gray-200 shadow-md border">
                    <CameraIcon className="h-5 w-5" />
                    <span className="sr-only">Change photo</span>
                </button>
            </div>
        </div>

        {/* --- FORM CARD --- */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <div className="space-y-6">
            <FormInput id="name" name="name" label="Full name" icon={UserIcon} value={form.name} onChange={handleChange('name')} error={errors.name} />
            <FormInput id="email" name="email" label="Email address" icon={EnvelopeIcon} value={form.email} readOnly />
            <FormInput id="phone" name="phone" label="Phone number" icon={PhoneIcon} value={form.phone} onChange={handleChange('phone')} error={errors.phone} />
            
            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <FormInput id="city" name="city" label="City" icon={BuildingOffice2Icon} value={form.city} onChange={handleChange('city')} />
               <FormInput id="state" name="state" label="State" icon={MapPinIcon} value={form.state} onChange={handleChange('state')} />
            </div>
            <FormInput id="pincode" name="pincode" label="Pincode" icon={MapPinIcon} value={form.pincode} onChange={handleChange('pincode')} error={errors.pincode} />
          </div>
        </div>
      </main>
      
      {/* --- STICKY FOOTER ACTIONS --- */}
      <footer className="sticky bottom-0 bg-white/70 backdrop-blur-sm border-t border-gray-100 p-4">
        <div className="mx-auto max-w-lg flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full text-center rounded-xl bg-gray-200 px-4 py-3.5 text-base font-bold text-gray-800 shadow-sm hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="w-full text-center rounded-xl bg-amber-400 px-4 py-3.5 text-base font-bold text-gray-900 shadow-sm hover:bg-amber-500 disabled:opacity-50 disabled:cursor-wait"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </footer>
    </div>
  );
}