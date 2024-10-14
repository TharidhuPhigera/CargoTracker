"use client";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const TraslochiPage = () => {
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
          src="/wallpaper.jpeg" 
          alt="Traslochi Hero" 
          layout="fill" 
          className="object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mt-8 container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
                SERVIZIO DI TRASLOCO
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
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Il Nostro Servizio di Trasloco</h2>
        <p className="text-black text-lg md:text-xl mb-4">
          Siamo specializzati in traslochi professionali, offrendo un servizio completo che gestisce ogni aspetto del processo. Il nostro team di esperti è pronto ad assisterti in ogni fase, dal confezionamento al trasporto e al disimballaggio.
        </p>
        <p className="text-black text-lg md:text-xl mb-4">
          Utilizziamo materiali di imballaggio di alta qualità per proteggere i tuoi beni, garantendo che arrivino a destinazione in perfette condizioni. La nostra attenzione ai dettagli e la pianificazione strategica ci consentono di eseguire traslochi in modo rapido ed efficiente.
        </p>
        <p className="text-black text-lg md:text-xl mb-4">
          Siamo qui per rendere il tuo trasloco un'esperienza senza stress. Contattaci per un preventivo personalizzato e scopri come possiamo aiutarti a trasferirti senza preoccupazioni.
        </p>
      </div>

      {/* Image Gallery Section */}
      {/* <div className="container mx-auto py-16 px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[300px]">
          <Image 
            src="/image1.jpg" 
            alt="Trasloco 1" 
            layout="fill" 
            className="object-cover" 
          />
        </div>
        <div className="relative h-[300px]">
          <Image 
            src="/image2.jpg" 
            alt="Trasloco 2" 
            layout="fill" 
            className="object-cover" 
          />
        </div>
        <div className="relative h-[300px]">
          <Image 
            src="/image3.jpg" 
            alt="Trasloco 3" 
            layout="fill" 
            className="object-cover" 
          />
        </div>
        <div className="relative h-[300px]">
          <Image 
            src="/image4.jpg" 
            alt="Trasloco 4" 
            layout="fill" 
            className="object-cover" 
          />
        </div>
      </div> */}

      {/* Testimonials Section */}
      <div className="container mx-auto py-16 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Cosa Dicono i Nostri Clienti</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <p className="text-black text-lg italic mb-2">“Servizio impeccabile! Hanno reso il mio trasloco un'esperienza senza stress. Consigliatissimi!”</p>
          <p className="text-black text-right font-bold">- Marco R.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-black text-lg italic mb-2">“Il team è stato professionale e molto disponibile. Tutto è arrivato sano e salvo!”</p>
          <p className="text-black text-right font-bold">- Laura T.</p>
        </div>
      </div>
    </div>
  );
};

export default TraslochiPage;