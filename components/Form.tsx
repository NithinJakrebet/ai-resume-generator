'use client'

import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import "@uploadthing/react/styles.css";
import { useUploadThing } from '@/app/utils/uploadthing';

// Define interface for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  education: string;
  linkedin: string;
  github: string;
  portfolio: string;
  country: readonly string[];
  state: string;
  city: string;
  zip: number;
  skills: readonly string[];
  companyName_1: string;
  startDate_1: string;
  endDate_1: string;
  companyName_2: string;
  startDate_2: string;
  endDate_2: string;
  companyName_3: string;
  startDate_3: string;
  endDate_3: string;
  // Add more fields as needed
}

const MyForm: React.FC = () => {

  const { startUpload } = useUploadThing("VideoImageText", {
    /**
     * @see https://docs.uploadthing.com/api-reference/react#useuploadthing
     */
    onClientUploadComplete: () => {
      alert("Upload Completed");
    },
  });

  // Initialize state variables for form data
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    education: '',
    linkedin: '',
    github: '',
    portfolio: '',
    country: [""],
    state: '',
    city: '',
    zip: 0,
    skills: [""],
    companyName_1: "",
    startDate_1: "",
    endDate_1: "",
    companyName_2: "",
    startDate_2: "",
    endDate_2: "",
    companyName_3: "",
    startDate_3: "",
    endDate_3: "",
  })

  // Update form data when input values change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  function export2txt(data: any) {
  
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "data.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Convert form data to JSON object
  const handleSave = async () => {
    const jsonData = JSON.stringify(formData);

    // save file manually to json file
    async () => {
      if (!jsonData) return;

      export2txt(jsonData);
    }
    
    // You can perform further actions with the JSON data, such as sending it to a server
  }

  return (
    <form onSubmit={handleSave} className="p-10">
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="userName" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">rezgen.ai/</span>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    autoComplete="userName"
                    required
                    value={formData.userName}
                    onChange={handleChange}
                    className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-white">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-500" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h1 className="text-3xl font-semibold leading-7 text-white">Resume Information:</h1>
          <h2 className="text-base font-semibold leading-7 text-white pt-4">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              <label htmlFor="education" className="block text-sm font-medium leading-6 text-white">
                Education
              </label>
              <div className="mt-2">
                <textarea
                  id="education"
                  name="education"
                  rows={3}
                  value={formData.education}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  autoComplete="given-name"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="linkedin" className="block text-sm font-medium leading-6 text-white">
                LinkedIn
              </label>
              <div className="mt-2">
                <input
                  id="linkedin"
                  name="linkedin"
                  type="linkedin"
                  autoComplete="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="github" className="block text-sm font-medium leading-6 text-white">
                GitHub
              </label>
              <div className="mt-2">
                <input
                  id="github"
                  name="github"
                  type="github"
                  autoComplete="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="portfolio" className="block text-sm font-medium leading-6 text-white">
                Portfolio/Website
              </label>
              <div className="mt-2">
                <input
                  id="portfolio"
                  name="portfolio"
                  type="portfolio"
                  autoComplete="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-white">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  value={formData.country}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-white">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  value={formData.state}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-white">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  value={formData.zip}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <h2 className="text-base font-semibold leading-7 text-white pt-8">Work Experience</h2>
          <div className="p-6 rounded-md">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="companyName_1" className="block text-sm font-medium text-gray-300 pt-4">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName_1"
                  id="companyName_1"
                  value={formData.companyName_1}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate_1" className="block text-sm font-medium text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="month"
                    name="startDate_1"
                    id="startDate_1"
                    value={formData.startDate_1}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="endDate_1" className="block text-sm font-medium text-gray-300">
                    End Date
                  </label>
                  <input
                    type="month"
                    name="endDate_1"
                    id="endDate_1"
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-md">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="companyName_2" className="block text-sm font-medium text-gray-300 pt-4">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName_2"
                  id="companyName_2"
                  value={formData.companyName_2}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate_2" className="block text-sm font-medium text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="month"
                    name="startDate_2"
                    id="startDate_2"
                    value={formData.startDate_2}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="endDate_2" className="block text-sm font-medium text-gray-300">
                    End Date
                  </label>
                  <input
                    type="month"
                    name="endDate_2"
                    id="endDate_2"
                    value={formData.endDate_2}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-md">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="companyName_3" className="block text-sm font-medium text-gray-300 pt-4">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName_3"
                  id="companyName_3"
                  value={formData.companyName_3}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate_3" className="block text-sm font-medium text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="month"
                    name="startDate_3"
                    id="startDate_3"
                    value={formData.startDate_3}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="endDate_3" className="block text-sm font-medium text-gray-300">
                    End Date
                  </label>
                  <input
                    type="month"
                    name="endDate_3"
                    id="endDate_3"
                    value={formData.endDate_3}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-base font-semibold leading-7 text-white pt-8">Skills</h2>
          <div className="mt-2">
                <textarea
                  id="skills"
                  name="skills"
                  rows={3}
                  value={formData.skills}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
          </div>
          
          <h2 className="text-base font-semibold leading-7 text-white pt-8">Projects</h2>
          <div className="p-6 rounded-md">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="projectName_1" className="block text-sm font-medium text-gray-300 pt-4">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName_1"
                  id="projectName_1"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter project name"
                />
                <div className="mt-2">
                <label htmlFor="projectDescription_1" className="block text-sm font-medium text-gray-300 pt-4">
                  Project Description
                </label>
                <textarea
                  id="projectDescription_1"
                  name="projectDescription_1"
                  rows={3}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
                </div>
              </div>
              <div>
                <label htmlFor="projectName_2" className="block text-sm font-medium text-gray-300 pt-4">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName_2"
                  id="projectName_2"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter project name"
                />
                <div className="mt-2">
                <label htmlFor="projectDescription_2" className="block text-sm font-medium text-gray-300 pt-4">
                  Project Description
                </label>
                <textarea
                  id="projectDescription_2"
                  name="projectDescription_2"
                  rows={3}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
                </div>
              </div>
              <div>
                <label htmlFor="projectName_3" className="block text-sm font-medium text-gray-300 pt-4">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName_3"
                  id="projectName_3"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter project name"
                />
                <div className="mt-2">
                <label htmlFor="projectDescription_3" className="block text-sm font-medium text-gray-300 pt-4">
                  Project Description
                </label>
                <textarea
                  id="projectDescription_3"
                  name="projectDescription_3"
                  rows={3}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">Notifications</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            We will always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-white">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-white">
                      Comments
                    </label>
                    <p className="text-gray-400">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-white">
                      Candidates
                    </label>
                    <p className="text-gray-400">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-white">
                      Offers
                    </label>
                    <p className="text-gray-400">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-white">Push Notifications</legend>
              <p className="mt-1 text-sm leading-6 text-gray-400">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white">
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-white">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-white">
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-white">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default MyForm