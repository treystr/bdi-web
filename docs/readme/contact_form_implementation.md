# Contact Form Google Forms Integration

This implementation provides a clean and maintainable solution for submitting contact form data to Google Forms while following Astro best practices.

## Overview

The implementation consists of three main components:

1. **Google Form Utility** (`src/utils/googleForm.ts`) - Handles the actual submission to Google Forms
2. **API Endpoint** (`src/pages/api/contact.ts`) - Provides server-side validation and form processing
3. **Enhanced Contact Form** (`src/components/forms/Contact.astro`) - Client-side form with progressive enhancement

## How It Works

### 1. Google Form Configuration

The Google Form field mappings are configured in `src/utils/googleForm.ts`:

```typescript
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
```

### 2. Form Submission Flow

1. User fills out the contact form
2. JavaScript intercepts form submission
3. Client-side validation occurs
4. Data is sent to `/api/contact` endpoint
5. Server validates data and submits to Google Forms
6. User receives success/error feedback

### 3. Progressive Enhancement

The form works even if JavaScript is disabled (falls back to standard form submission), but provides enhanced UX when JavaScript is available:

- Real-time validation
- Loading states
- Success/error messaging
- Form reset on success

## Features

### Security & Validation

- Server-side validation for all required fields
- Email format validation
- Content-Type checking
- Proper error handling

### User Experience

- Loading states during submission
- Clear success/error messaging
- Automatic form reset on success
- Smooth scrolling to status messages
- Progressive enhancement

### Maintainability

- TypeScript interfaces for type safety
- Modular architecture
- Centralized configuration
- Clean separation of concerns

## Configuration

To use this with a different Google Form:

1. Create your Google Form
2. Get the form ID from the URL
3. Get field entry IDs by inspecting the form or using prefill URLs
4. Update `googleFormConfig` in `src/utils/googleForm.ts`

### Getting Entry IDs

1. Create a prefill URL for your form
2. The URL will contain `entry.XXXXXXXX=value` parameters
3. These XXXXXXXX numbers are your entry IDs

Example:
```
https://docs.google.com/forms/d/e/FORM_ID/viewform?entry.123456789=name&entry.987654321=email
```

## Error Handling

### Client-Side Errors
- Network connectivity issues
- Invalid form data
- API request failures

### Server-Side Errors
- Missing required fields
- Invalid email format
- Google Forms submission failures
- Invalid content types

## Browser Compatibility

- Modern browsers with fetch API support
- Graceful degradation for older browsers
- No external dependencies required

## Testing

To test the implementation:

1. Start the development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check the Google Form responses to verify submission

## Troubleshooting

### Common Issues

1. **CORS Errors**: Normal behavior when submitting to Google Forms. The `mode: 'no-cors'` setting is intentional.

2. **Entry IDs Not Working**: Double-check the entry IDs by creating a new prefill URL.

3. **Form Not Submitting**: Check browser console for JavaScript errors and ensure all required dependencies are loaded.

### Debug Mode

Enable debug logging by checking the browser console for error messages and network requests to `/api/contact`.

## Security Considerations

- No sensitive data is exposed in client-side code
- Server-side validation prevents malicious submissions
- Google Forms handles data storage securely
- No authentication required (public contact form)

## Performance

- Minimal JavaScript footprint
- Progressive enhancement ensures fast loading
- No external libraries required
- Efficient form data processing