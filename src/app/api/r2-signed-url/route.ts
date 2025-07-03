import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL; // e.g., https://pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || '',
    secretAccessKey: R2_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(request: NextRequest) {
  const { filename, contentType } = await request.json();

  if (!filename || !contentType) {
    return NextResponse.json({ error: 'Filename and contentType are required' }, { status: 400 });
  }

  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !R2_PUBLIC_URL) {
    return NextResponse.json({ error: 'R2 environment variables are not configured' }, { status: 500 });
  }

  const key = `uploads/${Date.now()}-${filename}`;

  try {
    const presignedPost = await createPresignedPost(S3, {
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Expires: 600, // seconds
      Fields: {
        'Content-Type': contentType,
      },
    });

    const publicGetUrl = `${R2_PUBLIC_URL}/${key}`;

    return NextResponse.json({
      uploadUrl: presignedPost.url,
      fields: presignedPost.fields,
      publicGetUrl,
      fileKey: key,
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
  }
}
