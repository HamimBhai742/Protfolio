import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Message } from '@/models/Message';
import { z } from 'zod';
import httpStatusCode from 'http-status-codes';
import { sendContactEmail, sendAutoReplyEmail } from '@/lib/mailer';

const createMessageSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const validatedData = await createMessageSchema.parseAsync(body);

    // Auto-increment numeric ID
    const maxMessage = await Message.findOne().sort({ id: -1 });
    const newId = maxMessage && maxMessage.id ? maxMessage.id + 1 : 1;

    const newMessage = await Message.create({
      ...validatedData,
      id: newId,
      isRead: false,
    });

    // Send notification and auto-reply emails asynchronously (non-blocking for response)
    try {
      await Promise.all([
        sendContactEmail({
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
        }),
        sendAutoReplyEmail({
          name: validatedData.name,
          email: validatedData.email,
        }),
      ]);
    } catch (mailError) {
      console.error('[API] Failed to dispatch email notifications:', mailError);
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Message submitted successfully',
      data: newMessage,
    });
  } catch (error: unknown) {
    console.error('Create message error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }
    const err = error as Error;
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: httpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
