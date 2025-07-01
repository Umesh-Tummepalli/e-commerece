import React, { useState } from "react";
import axios from "axios";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Order Inquiry",
    message: ""
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    
    try {
      // Here you would typically send the data to your backend
      // For demonstration, we'll simulate an API call
      console.log("Form submitted:", formData);
      const form=new FormData();
      for(const key in formData){
        form.append(key,formData[key])
      }
      const res=await axios.post('http://localhost:4000/user/message',form,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      if(res.data.success){
        setSubmissionStatus("success");
      }
      else{
        setSubmissionStatus("error");
      }
      setFormData({
        name: "",
        email: "",
        subject: "Order Inquiry",
        message: ""
      });
      // Reset success message after 3 seconds
      setTimeout(() => setSubmissionStatus(null), 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
      setTimeout(() => setSubmissionStatus(null), 3000);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you! Reach out to our team for any inquiries or support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="border border-black/40 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-black mb-4">Get in Touch</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base text-black"><a href="mailto:umeshtummepalli2@gmail.com">umeshtummepalli2@gmail.com</a></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Customer Service</p>
                  <p className="text-base text-black">+91 7842034732</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Business Hours</p>
                  <p className="text-base text-black">Monday - Friday: 9AM - 6PM IST</p>
                  <p className="text-base text-black">Saturday: 10AM - 4PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-black/40 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-black mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-black/40 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-black/40 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-black/40 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                >
                  <option value="Order Inquiry">Order Inquiry</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="Product Questions">Product Questions</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-black/40 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={submissionStatus === "submitting"}
                  className="w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submissionStatus === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </div>

              {submissionStatus === "success" && (
                <div className="p-3 bg-green-100 text-green-700 rounded-md">
                  Message sent successfully!
                </div>
              )}

              {submissionStatus === "error" && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                  Error sending message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Meet the Developers */}
        <div className="mt-16 border-t border-black/40 pt-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black">Meet the Developers</h2>
            <p className="mt-2 text-gray-600">
              Our talented team behind the scenes making your shopping experience seamless.
            </p>
            
            <div className="mt-8  gap-6">
              {[
                { name: "Umesh Tummepalli", role: "Full Stack Developer", link: "https://umeshportfolio-beryl.vercel.app/",image:"https://umeshportfolio-beryl.vercel.app/assets/mainPhoto-BHFYnbva.jpg" },
              ].map((person, index) => (
                <div key={index} className="border border-black/40 rounded-lg p-4">
                  <div className="h-20 w-20 mx-auto rounded-full bg-gray-200 mb-3 overflow-hidden">
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-medium text-black">{person.name}</h3>
                  <p className="text-sm text-gray-500">{person.role}</p>
                  <a 
                    href={person.link || '/'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Contact Developer
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;