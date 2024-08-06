"use client";
import { useState } from 'react';

const QuoteCargo = () => {
  // State to manage packages and delivery option
  const [packages, setPackages] = useState<{ height: number; width: number; length: number }[]>([]);
  const [currentPackage, setCurrentPackage] = useState({ height: 0, width: 0, length: 0 });
  const [delivery, setDelivery] = useState(false);
  const [totalQuote, setTotalQuote] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Handle adding a new package
  const handleAddPackage = () => {
    if (currentPackage.height && currentPackage.width && currentPackage.length) {
      if (editingIndex !== null) {
        // Update existing package
        const updatedPackages = [...packages];
        updatedPackages[editingIndex] = currentPackage;
        setPackages(updatedPackages);
        setEditingIndex(null);
      } else {
        // Add new package
        setPackages([...packages, currentPackage]);
      }
      setCurrentPackage({ height: 0, width: 0, length: 0 });
    }
  };

  // Handle changing current package dimensions
  const handleDimensionChange = (key: 'height' | 'width' | 'length', value: number) => {
    setCurrentPackage({ ...currentPackage, [key]: value });
  };

  // Calculate the total quote based on package dimensions and delivery option
  const calculateQuote = () => {
    const basePricePerCubicMeter = 1; // You can adjust this value as needed
    const deliveryFee = 10;

    // Calculate the total volume in cubic meters
    const totalVolume = packages.reduce((sum, pkg) => {
      const volume = (pkg.height / 100) * (pkg.width / 100) * (pkg.length / 100); // Convert cm to meters
      return sum + volume;
    }, 0);

    // Calculate the total price
    const price = totalVolume * basePricePerCubicMeter;
    const finalPrice = price + (delivery ? deliveryFee : 0);
    
    setTotalQuote(finalPrice);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    calculateQuote();
  };

  // Handle editing a package
  const handleEdit = (index: number) => {
    setCurrentPackage(packages[index]);
    setEditingIndex(index);
  };

  // Handle deleting a package
  const handleDelete = (index: number) => {
    const updatedPackages = packages.filter((_, i) => i !== index);
    setPackages(updatedPackages);
  };

  return (
<div className="bg-gray-100 min-h-screen">
  <header className="bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white py-16 px-4 md:py-24 md:px-8 lg:py-32 lg:px-12">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Get Your Quote</h1>
      <p className="text-base md:text-lg lg:text-xl mb-4">Receive a custom quote for your shipping needs quickly and easily.</p>
    </div>
  </header>

      <section className="bg-gray-100 text-[#112D4E] py-8">
        <div className="container mx-auto flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 md:pr-8">
            <h3 className="text-2xl font-bold mb-4">Add/Edit Package</h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mb-4">
                  <label htmlFor="height" className="block text-gray-700 font-bold mb-2">Height (cm)</label>
                  <input
                    type="number"
                    id="height"
                    value={currentPackage.height}
                    onChange={(e) => handleDimensionChange('height', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="width" className="block text-gray-700 font-bold mb-2">Width (cm)</label>
                  <input
                    type="number"
                    id="width"
                    value={currentPackage.width}
                    onChange={(e) => handleDimensionChange('width', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="length" className="block text-gray-700 font-bold mb-2">Length (cm)</label>
                  <input
                    type="number"
                    id="length"
                    value={currentPackage.length}
                    onChange={(e) => handleDimensionChange('length', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <button type="button" onClick={handleAddPackage} className="w-full bg-[#3F72AF] text-white px-3 py-2 rounded-lg font-semibold hover:bg-[#112D4E]">
                  {editingIndex !== null ? 'Update Package' : 'Add Package'}
                </button>
              </form>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <h3 className="text-2xl font-bold mb-4">Packages Added</h3>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              {packages.length === 0 ? (
                <p>No packages added yet.</p>
              ) : (
                packages.map((pkg, index) => (
                  <div key={index} className="mb-4 border-b pb-4 flex justify-between items-center">
                    <div>
                      <p><strong>Package {index + 1}</strong></p>
                      <p>Height: {pkg.height} cm</p>
                      <p>Width: {pkg.width} cm</p>
                      <p>Length: {pkg.length} cm</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mb-4">
                  <label htmlFor="delivery" className="flex items-center">
                    <input
                      type="checkbox"
                      id="delivery"
                      checked={delivery}
                      onChange={(e) => setDelivery(e.target.checked)}
                      className="mr-2"
                    />
                    Add delivery to home (+€10)
                  </label>
                </div>
                <button type="submit" className="w-full bg-[#3F72AF] text-white px-3 py-2 rounded-lg font-semibold hover:bg-[#112D4E]">
                  Get Quote
                </button>
                {totalQuote > 0 && (
                  <div className="mt-4 text-lg font-bold">
                    <p>Total Quote: €{totalQuote.toFixed(2)}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteCargo;