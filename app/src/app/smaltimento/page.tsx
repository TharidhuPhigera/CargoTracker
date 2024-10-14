"use client";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const SmaltimentoPage = () => {
    const [referenceNumber, setReferenceNumber] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
  
    const router = useRouter();
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
  
      try {
        const response = await fetch(`/api/cargo?reference=${referenceNumber}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error fetching cargo information');
        }
        const info = await response.json();
        info.estimatedDelivery = new Date(info.estimatedDelivery).toLocaleDateString();
  
        const queryParams = new URLSearchParams({
          status: info.status,
          origin: info.origin,
          destination: info.destination,
          estimatedDelivery: info.estimatedDelivery,
          unitCount: info.unitCount.toString(),
          payment: info.payment,
        }).toString();
  
        router.push(`/track?${queryParams}`);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const [buttonText, setButtonText] = useState<string>('Richiedi Un Preventivo');
    const [clicked, setClicked] = useState<boolean>(false);
  
    const handleClick = () => {
      const phoneNumber = '+39 123 456 789'; 
  
      navigator.clipboard.writeText(phoneNumber).then(() => {
        setButtonText(`${phoneNumber}`);
        setClicked(true);
  
        setTimeout(() => {
          setButtonText('Richiedi Un Preventivo');
          setClicked(false);
        }, 5000);
      });

    }
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image 
          src="/garbage.jpg" 
          alt="Smaltimento Hero" 
          layout="fill" 
          className="object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mt-8 container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
                    SERVIZIO DI SMALTIMENTO
                </h1>
                <motion.button
                        className='mt-6 relative px-6 py-3 bg-gradient-to-r bg-[#3F72AF] text-white rounded-lg shadow-lg border border-transparent'
                        whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10 }}
                        whileTap={{ scale: 0.9, rotateX: -10, rotateY: -10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        onClick={handleClick}
                    >
                        <span className='relative z-10 font-semibold'>{buttonText}</span>
                        <motion.div
                        className={`absolute inset-0 bg-white opacity-10 rounded-lg ${clicked ? 'scale-1.2' : ''}`}
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
            </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto py-16 px-4 md:px-8">
        <h2 className="text-black text-3xl md:text-5xl font-bold mb-6">Il Nostro Servizio di Smaltimento</h2>
        <p className="text-black text-lg md:text-xl mb-4">
          Offriamo un servizio di smaltimento rifiuti sicuro e responsabile, progettato per garantire che i materiali vengano trattati in modo ecologico e conforme alle normative vigenti. La nostra missione è di rendere la gestione dei rifiuti semplice e senza preoccupazioni.
        </p>
        <p className="text-black text-lg md:text-xl mb-4">
          Ci occupiamo di tutti i tipi di rifiuti, dai materiali ingombranti a quelli pericolosi, e garantiamo che ogni elemento venga smaltito in modo appropriato. Con il nostro servizio, non dovrai preoccuparti di nulla; ci occupiamo di tutto noi.
        </p>
        <p className="text-black text-lg md:text-xl mb-4">
          Contattaci per scoprire come possiamo aiutarti a gestire i tuoi rifiuti in modo efficiente e responsabile. Siamo qui per aiutarti a mantenere l'ambiente pulito e sano.
        </p>
      </div>

      {/* Image Gallery Section */}
      {/* <div className="container mx-auto py-16 px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[300px]">
          <Image 
            src="/image1.jpg" 
            alt="Smaltimento 1" 
            layout="fill" 
            className="object-cover" 
          />
        </div>
        <div className="relative h-[300px]">
          <Image 
            src="/image2.jpg" 
            alt="Smaltimento 2" 
            layout="fill" 
            className="object-cover" 
          />
        </div>
        <div className="relative h-[300px]">
          <Image 
            src="/image3.jpg" 
            alt="Smaltimento 3" 
            layout="fill" 
            className="object-cover" 
          />
        </div>
        <div className="relative h-[300px]">
          <Image 
            src="/image4.jpg" 
            alt="Smaltimento 4" 
            layout="fill" 
            className="object-cover" 
          />
        </div>
      </div> */}

      {/* Testimonials Section */}
      <div className="container mx-auto py-16 px-4 md:px-8">
        <h2 className="text-black text-3xl md:text-5xl font-bold mb-6">Cosa Dicono i Nostri Clienti</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <p className="text-black text-lg italic mb-2">“Servizio eccellente! Hanno gestito il mio smaltimento rifiuti in modo rapido e professionale.”</p>
          <p className="text-black text-right font-bold">- Giulia P.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-black text-lg italic mb-2">“Sono rimasto molto soddisfatto. Hanno fatto tutto il lavoro per me, non potevo chiedere di meglio!”</p>
          <p className="text-black text-right font-bold">- Luca M.</p>
        </div>
      </div>

    </div>
  );
};

export default SmaltimentoPage;