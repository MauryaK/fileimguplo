"use client";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    status: false,
  });
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const _files = Array.from(e.target.files);
      setImages(_files)
    }
  };
  useEffect(()=>{
  // setFormData({ ...formData, image: images });
  },[images])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", JSON.stringify(formData));
    images.forEach((image, index) => {
      data.append(`formData${index}`, image);
    });
    try {
      axios
        .post("http://localhost:3000/api/formhandler", data)
        .then((res) => {
          router.push('/thankyou', { scroll: false })
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex flex-wrap items-start justify-center p-5 h-[100vh]">
      <form  onSubmit={handleSubmit} className="w-[350px] m-auto bg-white border rounded-sm p-3">
        <div className="mb-3">
          <input
            type="file"
            onChange={handleImageChange}
            multiple
            className="block border rounded-sm w-full h-[42px] p-2"
            placeholder=""
            accept="image/*"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            
            name="name"
            onChange={handleInputChange}
            className="block border rounded-sm w-full h-[42px] p-2"
            placeholder="enter text"
            
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            
            name="email"
            onChange={handleInputChange}
            className="block border rounded-sm w-full h-[42px] p-2"
            placeholder="enter Email"
            
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            
            name="mobile"
            onChange={handleInputChange}
            className="block border rounded-sm w-full h-[42px] p-2"
            placeholder="enter contact"
            
          />
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="bg-blue-900 text-white font-semibold border-0 outline-none w-full block text-center py-2"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
