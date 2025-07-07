import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '../../../lib/sendMail';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email } = await request.json();

    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400 }
      );
    }

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact administrator.' },
        { status: 500 }
      );
    }

    await sendMail({
      name: fullName,
      email,
      message: `New newsletter subscription from ${fullName} (${email}).`,
      to: 'newsletter@followingchristthrupaul.com',
      subject: 'New Newsletter Subscription - FCTP Website',
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
    console.error('Newsletter form error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}