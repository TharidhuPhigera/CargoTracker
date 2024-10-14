"use client";
import { useState } from 'react';
import Image from 'next/image';

const ContactPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    const [error, setError] = useState<string | null>(null);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
          setError('Tutti i campi sono obbligatori.');
          return;
        }
      
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            setFormData({ name: '', email: '', phone: '', message: '' });
            setError(null);
            alert(data.message); // Success message
          } else {
            setError(data.message || 'Errore durante l’invio del messaggio.');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('Errore di rete, riprova.');
        }
      };
  
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image 
          src="/contact.png" 
          alt="Contatti Hero" 
          layout="fill" 
          className="object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            CONTATTACI
          </h1>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto py-16 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Inviaci un Messaggio</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Nome e cognome*</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">Telefono*</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="message">Messaggio*</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
            />
          </div>
          <button type="submit" className="mt-4 px-6 py-2 bg-[#3F72AF] text-white rounded-lg hover:bg-[#2a5078] transition-colors duration-300">
            Invia
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;