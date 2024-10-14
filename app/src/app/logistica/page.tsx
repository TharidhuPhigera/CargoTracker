"use client";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const LogisticaPage = () => {
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
    };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image 
          src="/warehouse.jpg" 
          alt="Logistica Hero" 
          layout="fill" 
          className="object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mt-8 container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
                SERVIZIO DI LOGISTICA
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
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Il Nostro Servizio di Logistica</h2>
        <p className="text-black text-lg md:text-xl mb-4">
          Offriamo soluzioni complete di logistica e gestione archivi, progettate per soddisfare le esigenze specifiche della tua attività. Il nostro team esperto si impegna a ottimizzare i processi di stoccaggio e distribuzione, assicurando una gestione efficiente delle risorse.
        </p>
        <p className="text-black text-lg md:text-xl mb-4">
            Ci occupiamo di ogni aspetto della logistica, dal ricevimento delle merci alla loro spedizione, assicurando tempi di consegna rapidi e affidabili. Scegliere il nostro servizio di logistica significa avere un partner fidato al tuo fianco. Contattaci per scoprire come possiamo semplificare e migliorare la tua catena di approvvigionamento.
        </p>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto py-16 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Cosa Dicono i Nostri Clienti</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <p className="text-black text-lg italic mb-2">“Servizio di logistica impeccabile! Ogni merce è stata gestita con grande cura e puntualità.”</p>
          <p className="text-black text-right font-bold">- Giulia S.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-black text-lg italic mb-2">“Hanno semplificato la nostra gestione degli archivi. Consigliatissimi!”</p>
          <p className="text-black text-right font-bold">- Luca P.</p>
        </div>
      </div>
    </div>
  );
};

export default LogisticaPage;