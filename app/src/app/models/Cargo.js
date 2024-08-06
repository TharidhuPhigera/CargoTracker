// models/Cargo.js
import mongoose from 'mongoose';

// Define the schema
const CargoSchema = new mongoose.Schema({
  referenceNumber: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  estimatedDelivery: { type: String, required: true },
  unitCount: { type: Number, required: true },  
  payment: { type: String, required: true },    
});

// Create the model if it doesn't already exist
const Cargo = mongoose.models.Cargo || mongoose.model('Cargo', CargoSchema);

export default Cargo;