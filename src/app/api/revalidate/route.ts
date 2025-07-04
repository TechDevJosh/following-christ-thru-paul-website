import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path, type } = body;

    // Verify the secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate based on content type from Sanity webhook
    switch (type) {
      case 'verseByVerse':
        revalidatePath('/');
        revalidatePath('/verse-by-verse');
        if (path) revalidatePath(path);
        break;
      case 'topics':
        revalidatePath('/topics');
        if (path) revalidatePath(path);
        break;
      case 'resources':
        revalidatePath('/resources');
        if (path) revalidatePath(path);
        break;
      case 'ask':
        revalidatePath('/ask');
        if (path) revalidatePath(path);
        break;
      default:
        // Revalidate all main pages
        revalidatePath('/');
        revalidatePath('/verse-by-verse');
        revalidatePath('/topics');
        revalidatePath('/resources');
        revalidatePath('/ask');
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}