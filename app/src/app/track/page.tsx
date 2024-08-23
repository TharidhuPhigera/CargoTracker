"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { FaSearch } from 'react-icons/fa';

interface CargoInfo {
  status: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  unitCount: number;
  payment: string;
}

const CargoInfoComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const [cargoInfo, setCargoInfo] = useState<CargoInfo | null>(null);

  useEffect(() => {
    const status = searchParams.get('status');
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const estimatedDelivery = searchParams.get('estimatedDelivery');
    const unitCount = searchParams.get('unitCount');
    const payment = searchParams.get('payment');

    if (status && origin && destination && estimatedDelivery && unitCount && payment) {
      setCargoInfo({
        status,
        origin,
        destination,
        estimatedDelivery,
        unitCount: parseInt(unitCount, 10),
        payment,
      });
    }
  }, [searchParams]);

  if (!cargoInfo) {
    return null;
  }

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cargo Information</h2>
      <p><strong>Status:</strong> {cargoInfo.status}</p>
      <p><strong>Origin:</strong> {cargoInfo.origin}</p>
      <p><strong>Destination:</strong> {cargoInfo.destination}</p>
      <p><strong>Estimated Delivery:</strong> {cargoInfo.estimatedDelivery}</p>
      <p><strong>Unit Count:</strong> {cargoInfo.unitCount}</p>
      <p><strong>Payment:</strong> {cargoInfo.payment}</p>
    </div>
  );
};

const TrackCargo: React.FC = () => {
  const router = useRouter();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
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
      router.push(`/track?status=${info.status}&origin=${info.origin}&destination=${info.destination}&estimatedDelivery=${info.estimatedDelivery}&unitCount=${info.unitCount}&payment=${info.payment}`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white py-16 px-4 md:py-24 md:px-8 lg:py-32 lg:px-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Track Your Cargo</h1>
          <p className="text-base md:text-lg lg:text-xl mb-4">Track your cargo easily using the reference number.</p>

          {/* Form inside the gradient header */}
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

      <Suspense fallback={<div>Loading Cargo Information...</div>}>
        <CargoInfoComponent />
      </Suspense>

      <section className="bg-gray-100 text-[#112D4E] py-20">
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">How to Track Your Cargo</h2>
            <p className="mb-4 text-center">
              Enter your reference number in the search bar above to get the latest updates on your cargo's status.
            </p>
            <p className="mb-4 text-center">
              You can track the shipment's status, origin, destination, estimated delivery date, unit count, and payment status.
            </p>
            <h3 className="text-xl font-bold mb-2 text-center">Why Track Your Cargo?</h3>
            <ul className="list-disc list-inside text-center">
              <li>Real-time updates on your shipment</li>
              <li>Peace of mind knowing where your cargo is</li>
              <li>Better planning and coordination</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackCargo;