import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path, tag, type } = body;

    // Verify the secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate based on type
    if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }

    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    }

    // Handle specific content types
    if (type) {
      switch (type) {
        case 'verse_by_verse':
          revalidatePath('/verse-by-verse');
          revalidateTag('sermons');
          break;
        case 'topics':
          revalidatePath('/topics');
          revalidateTag('topics');
          break;
        case 'resources':
          revalidatePath('/resources');
          revalidateTag('resources');
          break;
        case 'ask':
          revalidatePath('/ask');
          revalidateTag('qa');
          break;
        default:
          // Revalidate all if type is unknown
          revalidatePath('/');
          break;
      }
    }

    return NextResponse.json({ 
      message: 'Revalidation successful',
      revalidated: true,
      now: Date.now()
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Revalidation endpoint is active' });
}