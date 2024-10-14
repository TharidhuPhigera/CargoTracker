"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Slider from "react-slick";

export default function Home() {
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

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <div className="bg-gray-100 min-h-screen">
    <header className="bg-white text-white px-4 py-10 md:py-14 md:px-8 lg:py-18 lg:px-12"> {/* Adjusted py for smaller screens */}
      <div className="mt-12 container mx-auto text-center">
        <h1 className="text-4xl p-5 md:text-6xl font-bold text-[#3F72AF]">
          Vipula Cargo Service
        </h1>
        <p className="text-base md:text-xl lg:text-2xl bg-gradient-to-r from-[#3F72AF] to-[#112D4E] bg-clip-text text-transparent">
          Traslochi, Smaltimento, Logistica
        </p>
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
    </header>
      {/* Slider Section for Services */}
      <section className="relative mx-auto mt-0"> {/* Keep margin-top for spacing */}
        <Slider {...sliderSettings}>
          {/* Slider Item 1 */}
          <div className="relative h-[40vh] md:h-[700px]"> {/* Adjust height for mobile */}
            <Image 
              src="/wallpaper.jpeg"
              alt="Relocation Service"
              layout="fill" // Change to fill
              className="object-cover" // Keep object-cover to ensure the image covers the div
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-white text-lg md:text-xl text-center px-4">
                <h1 className='text-2xl md:text-4xl font-bold mb-4'>TRASLOCHI</h1>
                <p>Offriamo servizi di trasloco professionale, gestendo ogni aspetto per garantire un'esperienza fluida e senza stress. Il nostro team esperto si occupa del confezionamento, del trasporto e del disimballaggio dei tuoi beni, assicurandosi che tutto arrivi in perfette condizioni. Ci impegniamo a pianificare ogni dettaglio in modo che tu possa concentrarti sulle cose importanti.</p>
              </div>
            </div>
          </div>

          {/* Slider Item 2 */}
          <div className="relative h-[40vh] md:h-[700px]"> {/* Adjust height for mobile */}
            <Image 
              src="/garbage.jpg" 
              alt="Garbage Removal"
              layout="fill" // Change to fill
              className="object-cover" // Keep object-cover to ensure the image covers the div
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-white text-lg md:text-xl text-center px-4">
                <h1 className='text-2xl md:text-4xl font-bold mb-4'>SMALTIMENTO</h1>
                <p>Il nostro servizio di smaltimento rifiuti è progettato per essere sicuro, responsabile e rispettoso dell'ambiente. Gestiamo l'intero processo di smaltimento, assicurandoci che i materiali vengano trattati correttamente e nel rispetto delle normative vigenti. Affidati a noi per liberarti dei rifiuti in modo efficiente, contribuendo a un ambiente più pulito e sostenibile.</p>
              </div>
            </div>
          </div>

          {/* Slider Item 3 */}
          <div className="relative h-[40vh] md:h-[700px]"> {/* Adjust height for mobile */}
            <Image 
              src="/warehouse.jpg" 
              alt="Logistics Management"
              layout="fill" // Change to fill
              className="object-cover" // Keep object-cover to ensure the image covers the div
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-white text-lg md:text-xl text-center px-4">
                <h1 className='text-2xl md:text-4xl font-bold mb-4'>LOGISTICA</h1>
                <p>Offriamo soluzioni logistiche personalizzate per la gestione degli archivi e lo stoccaggio. Il nostro approccio flessibile si adatta alle tue esigenze specifiche, garantendo un utilizzo ottimale dello spazio e un'efficienza migliorata nel trasporto dei tuoi beni. Siamo qui per supportarti in ogni fase della logistica, affinché tu possa concentrarti sul tuo core business.</p>
              </div>
            </div>
          </div>
        </Slider>
      </section>
      <h1 className="text-base md:text-3xl lg:text-4xl font-bold text-[#3F72AF] text-center mt-12">
        I NOSTRI SERVIZI
      </h1>
      <div className="flex flex-col md:flex-row justify-center py-16 px-4 gap-6 md:gap-8">
        <Link href="/traslochi" className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl border border-[#3F72AF] flex flex-col items-center text-center w-full max-w-sm h-auto md:w-72 md:h-72">
          <div className="flex items-center justify-center flex-grow">
            <Image src="/relocation.png" alt="relocation" width={300} height={300} />
          </div>
          <div className="text-lg md:text-xl font-bold mb-2">Traslochi</div>
        </Link>
        <Link href="/smaltimento" className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl border border-[#3F72AF] flex flex-col items-center text-center w-full max-w-sm h-auto md:w-72 md:h-72">
          <div className="flex items-center justify-center flex-grow">
            <Image src="/garbage.png" alt="garbage" width={200} height={200} />
          </div>
          <div className="text-lg md:text-xl font-bold mb-2">Smalitmento e Discarica</div>
        </Link>
        <Link href="/logistica" className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl border border-[#3F72AF] flex flex-col items-center text-center w-full max-w-sm h-auto md:w-72 md:h-72">
          <div className="flex items-center justify-center flex-grow">
            <Image src="/logistics.png" alt="logistics" width={300} height={300} />
          </div>
          <div className="text-lg md:text-xl font-bold mb-2">Gestione Archivi e Logistica</div>
        </Link>
      </div>
    </div>
  );
}