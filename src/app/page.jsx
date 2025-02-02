"use client"
import Link from 'next/link'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import logo from '@/images/logos/punjabartlogo.png'
import { SlimLayout } from '@/components/SlimLayout'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import backgroundImage from '@/images/mappunjab.png'
import gif from '@/images/avatars/male.gif'
// import gif2 from '@/images/avatars/female.gif'
import { toast,ToastContainer } from 'react-toastify'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    age: '',
    gender: '',
    profession: '',
    region: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData, "data dikhayo")
      const response = await axios.post('https://cms.keewesolutions.com/incubation/data', formData)
      console.log(response)
      if (response.status === 200) {
        if (formData.gender === "Male") {
          toast.success(
            <div>
              <p>Registration successful! 🎉</p>
              <Image src={gif} alt="Success" className="w-full h-full" />
            </div>,
            { position: "top-center", autoClose: 5000 }
          );
        }
        else if(formData.gender=='Female'){
          toast.success(
            <div>
              <p>Registration successful! 🎉</p>
              <Image src={gif} alt="Success" className="w-full h-full" />
            </div>,
            { position: "top-center", autoClose: 5000 }
          );
        }
      }
      else if (response.data=='Email already exists!') {
        toast.warning('User already Registered')
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warning('User already Registered', { position: "top-center", autoClose: 5000 });
      }
      else {
        console.error('Error registering:', error);
        toast.error('Something went wrong!', { position: "top-center", autoClose: 5000 });
      }
    }
  }
  return (
    <>
      <ToastContainer/>
      <SlimLayout>
        <div className="flex">
          <Link href="/" aria-label="Home">
            <Image src={logo} />
          </Link>
        </div>

        <Image
          className="sm:hidden rounded-xl mt-4"
          src={backgroundImage}
          alt=""
          unoptimized
        />

        <form
          onSubmit={handleSubmit}
          className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2"
        >
          <TextField
            label="Name"
            name="name"
            type="text"
            autoComplete="given-name"
            className="col-span-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Mobile Number"
            name="mobile"
            type="number"
            inputMode="numeric"
            autoComplete="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            inputMode="numeric"
            autoComplete="family-name"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <SelectField
            className="h-auto w-auto"
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </SelectField>
          <TextField
            className="col-span-full"
            label="Profession"
            name="profession"
            type="text"
            autoComplete="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          />
          <TextField
            className="col-span-full"
            label="Region"
            name="region"
            type="text"
            autoComplete="region"
            value={formData.region}
            onChange={handleChange}
            required
          />

          <div className="col-span-full mt-4">
            <Button type="submit" className="w-full bg-[#da8b57] cursor-pointer">
              <span className='text-white'>
                Submit <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </SlimLayout>
    </>
  )
}
