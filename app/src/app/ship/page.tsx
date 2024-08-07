import React from 'react'

const Ship = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white py-16 px-4 md:py-24 md:px-8 lg:py-32 lg:px-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Information</h1>
          <p className="text-base md:text-lg lg:text-xl mb-4">Get additional information on how to ship your cargo</p>
        </div>
      </header>
      <section className="container mx-auto py-12 px-4 md:py-16 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center text-[#112D4E]">How It Works</h2>
        <p className="text-lg md:text-xl mb-8 text-center text-[#112D4E]">Understand our simple and efficient shipping process.</p>

        <div className="flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
          <div className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-md flex-1 text-center">
            <h3 className="text-xl font-bold mb-2">Step 1: Get a Quote</h3>
            <p>Use our online form to request a quote for your shipment. Provide details about the cargo and get an instant estimate.</p>
          </div>
          <div className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-md flex-1 text-center">
            <h3 className="text-xl font-bold mb-2">Step 2: Book Your Shipment</h3>
            <p>To arrange your shipment, please call the provided contact number to book your shipment. We will arrange the pickup and necessary documentation.</p>
          </div>
          <div className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-md flex-1 text-center">
            <h3 className="text-xl font-bold mb-2">Step 3: Track Your Cargo</h3>
            <p>Use our tracking system to monitor your shipment’s progress in real-time until it reaches its destination.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12 px-4 md:py-16 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center text-[#112D4E]">Why Choose Us?</h2>
        <p className="text-lg md:text-xl mb-8 text-center text-[#112D4E]">Discover the benefits of using Vipula Cargo Service for your shipping needs.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white text-[#3F72AF] text-center p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 ">Reliable Service</h3>
            <p>We offer dependable shipping services with a strong track record of on-time deliveries.</p>
          </div>
          <div className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">Competitive Rates</h3>
            <p>Get the best value for your money with our competitive pricing for all shipping routes.</p>
          </div>
          <div className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">Customer Support</h3>
            <p>Our dedicated customer support team is here to assist you every step of the way.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12 px-4 md:py-16 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center text-[#112D4E]">Frequently Asked Questions</h2>
        <p className="text-lg md:text-xl mb-8 text-center text-[#112D4E]">Find answers to common questions about our shipping services.</p>

        <div className="space-y-6">
          <div className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">How do I track my shipment?</h3>
            <p>Use the tracking number provided at the time of booking to monitor your shipment's status on our website.</p>
          </div>
          <div className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">What items can I ship?</h3>
            <p>We can ship a wide range of items including personal goods, commercial cargo, and more. Contact us for specific restrictions.</p>
          </div>
          <div className="bg-white text-[#3F72AF] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">How long does shipping take?</h3>
            <p>Shipping times vary based on the destination and shipping method chosen. We provide estimated delivery dates with each booking.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ship