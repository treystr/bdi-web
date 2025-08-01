export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
}

export interface GoogleFormConfig {
  formId: string;
  entries: {
    name: string;
    email: string;
    phone: string;
    organization: string;
    message: string;
  };
}

export const googleFormConfig: GoogleFormConfig = {
  formId: '1FAIpQLSf9wUIYF3-9bMJK3EoHvPHNJsGbgd_6ipR8_I7PNsEyWFUyVA',
  entries: {
    name: 'entry.2053111584',
    email: 'entry.1784549577',
    phone: 'entry.849479955',
    organization: 'entry.366023573',
    message: 'entry.496949466'
  }
};

/**
 * Submits form data to Google Forms
 * @param formData - The contact form data
 * @returns Promise<boolean> - Success status
 */
export async function submitToGoogleForm(formData: ContactFormData): Promise<boolean> {
  try {
    const { formId, entries } = googleFormConfig;
    const baseUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
    
    // Create FormData object
    const submitData = new FormData();
    submitData.append(entries.name, formData.name);
    submitData.append(entries.email, formData.email);
    if (formData.phone) {
      submitData.append(entries.phone, formData.phone);
    }
    if (formData.organization) {
      submitData.append(entries.organization, formData.organization);
    }
    submitData.append(entries.message, formData.message);

    // Submit to Google Forms
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: submitData,
      mode: 'no-cors' // Required for Google Forms submission
    });

    // Google Forms returns a CORS error but the submission still works
    // Since we can't read the response due to no-cors mode, we assume success
    return true;
  } catch (error) {
    console.error('Error submitting to Google Form:', error);
    return false;
  }
}