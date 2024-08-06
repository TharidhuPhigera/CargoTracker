"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaMoneyBillWave, FaShip } from 'react-icons/fa';

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white py-16 px-4 md:py-24 md:px-8 lg:py-32 lg:px-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Vipula Cargo Service</h1>
          <p className="text-base md:text-lg lg:text-xl mb-4">Shipping cargo from Milan to Sri Lanka and beyond.</p>

          <section className="relative z-10">
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto flex items-center p-6 ">
              <div className="flex-grow mr-2">
                <label htmlFor="referenceNumber" className="sr-only">Reference Number</label>
                <input
                  type="text"
                  id="referenceNumber"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Enter Reference Number"
                  className="w-full px-3 py-2 border-none rounded-lg text-gray-600"
                  required
                />
              </div>
              <button type="submit" className="bg-white text-[#3F72AF] p-2 rounded-full flex items-center justify-center hover:bg-gray-200">
                <FaSearch className="text-xl" />
              </button>
            </form>
            {error && <p className="mt-6 text-red-500 text-center">{error}</p>}
          </section>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-center py-16 px-4 gap-6 md:gap-8">
        <Link href="/quote" className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl border border-[#3F72AF] flex flex-col items-center text-center w-full max-w-sm h-auto md:w-72 md:h-72">
          <div className="flex items-center justify-center flex-grow">
            <FaMoneyBillWave size={50} className="mb-3 md:mb-4" />
          </div>
          <div className="text-lg md:text-xl font-bold mb-2">Get a Quote</div>
          <div className="text-sm md:text-base">Receive a custom quote for your shipping needs quickly and easily.</div>
        </Link>
        <Link href="/track" className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl border border-[#3F72AF] flex flex-col items-center text-center w-full max-w-sm h-auto md:w-72 md:h-72">
          <div className="flex items-center justify-center flex-grow">
            <FaSearch size={50} className="mb-3 md:mb-4" />
          </div>
          <div className="text-lg md:text-xl font-bold mb-2">Track Cargo</div>
          <div className="text-sm md:text-base">Track your cargo easily using the reference number.</div>
        </Link>
        <Link href="/ship" className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl border border-[#3F72AF] flex flex-col items-center text-center w-full max-w-sm h-auto md:w-72 md:h-72">
          <div className="flex items-center justify-center flex-grow">
            <FaShip size={50} className="mb-3 md:mb-4" />
          </div>
          <div className="text-lg md:text-xl font-bold mb-2">Ship</div>
          <div className="text-sm md:text-base">Get additional information on how to ship your cargo.</div>
        </Link>
      </div>
    </div>
  );
}