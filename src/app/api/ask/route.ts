import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '../../../lib/sendMail';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
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
      message,
      to: 'inquiries@followingchristthrupaul.com',
      subject: 'New Question Submission - FCTP Website',
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
    console.error('Ask form error:', error);
    return NextResponse.json({ status: 'success' }, { status: 200 });
  }
}