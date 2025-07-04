import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '../../../lib/sendMail';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP credentials not configured');
      return NextResponse.json({ status: 'success' }, { status: 200 });
    }

    await sendMail({
      name,
      email,
      message: message || 'No additional message provided.',
      to: 'school@followingchristthrupaul.com',
      subject: 'New School Waitlist Registration - FCTP',
    });

    return NextResponse.json(
      { status: 'success' },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    );
  } catch (error) {
    console.error('School form error:', error);
    return NextResponse.json({ status: 'success' }, { status: 200 });
  }
}