import type { APIRoute } from 'astro';
import { submitToGoogleForm, type ContactFormData } from '@utils/googleForm';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validate request content type
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid content type. Expected application/json.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse request body
    const formData: ContactFormData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields: name, email, and message are required.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid email format.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Submit to Google Form
    const success = await submitToGoogleForm(formData);

    if (success) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Thanks for your message. We will response shortly!' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to submit form. Please try again.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error. Please try again.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};