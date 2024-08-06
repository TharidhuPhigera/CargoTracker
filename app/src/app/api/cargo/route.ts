import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../utils/db';
import Cargo from '../../models/Cargo';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const reference = url.searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ message: 'Reference is required' }, { status: 400 });
  }

  await connect();

  try {
    console.log(`Searching for cargo with reference: ${reference}`);
    const cargo = await Cargo.findOne({ referenceNumber: reference });

    if (!cargo) {
      console.log('Cargo not found for reference:', reference);
      return NextResponse.json({ message: 'Cargo not found, Try Again!' }, { status: 404 });
    }

    console.log('Cargo found:', cargo);
    return NextResponse.json(cargo, { status: 200 });
  } catch (error) {
    console.error('Error fetching cargo:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}