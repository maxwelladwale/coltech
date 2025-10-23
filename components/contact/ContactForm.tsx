// components/contact/ContactForm.tsx
"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
  {/* Name Field */}
  <div>
    <label 
      htmlFor="name" 
      className="block text-sm font-medium text-primary dark:text-white"
    >
      Your Name
    </label>
    <div className="mt-1">
      <input
        type="text"
        name="name"
        id="name"
        autoComplete="name"
        required
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-sm focus:ring-2 focus:ring-primary focus:border-primary dark:text-white placeholder-gray-400 py-3 px-4 transition-colors hover:border-primary dark:hover:border-primary hover:bg-gray-100 dark:hover:bg-gray-700"
      />
    </div>
  </div>

  {/* Email Field */}
  <div>
    <label 
      htmlFor="email" 
      className="block text-sm font-medium text-primary dark:text-white"
    >
      Your Email
    </label>
    <div className="mt-1">
      <input
        type="email"
        name="email"
        id="email"
        autoComplete="email"
        required
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-sm focus:ring-2 focus:ring-primary focus:border-primary dark:text-white placeholder-gray-400 py-3 px-4 transition-colors hover:border-primary dark:hover:border-primary hover:bg-gray-100 dark:hover:bg-gray-700"
      />
    </div>
  </div>

  {/* Subject Field */}
  <div>
    <label 
      htmlFor="subject" 
      className="block text-sm font-medium text-primary dark:text-white"
    >
      Subject
    </label>
    <div className="mt-1">
      <input
        type="text"
        name="subject"
        id="subject"
        required
        value={formData.subject}
        onChange={handleChange}
        placeholder="Enter the subject"
        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-sm focus:ring-2 focus:ring-primary focus:border-primary dark:text-white placeholder-gray-400 py-3 px-4 transition-colors hover:border-primary dark:hover:border-primary hover:bg-gray-100 dark:hover:bg-gray-700"
      />
    </div>
  </div>

  {/* Message Field */}
  <div>
    <label 
      htmlFor="message" 
      className="block text-sm font-medium text-primary dark:text-white"
    >
      Message
    </label>
    <div className="mt-1">
      <textarea
        name="message"
        id="message"
        rows={4}
        required
        value={formData.message}
        onChange={handleChange}
        placeholder="Enter your message"
        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-sm focus:ring-2 focus:ring-primary focus:border-primary dark:text-white placeholder-gray-400 py-3 px-4 transition-colors hover:border-primary dark:hover:border-primary hover:bg-gray-100 dark:hover:bg-gray-700"
      />
    </div>
  </div>

  {/* Status Messages */}
  {submitStatus === 'success' && (
    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200">
      Message sent successfully! We&apos;ll get back to you soon.
    </div>
  )}
  
  {submitStatus === 'error' && (
    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
      Something went wrong. Please try again or contact us directly.
    </div>
  )}

  {/* Submit Button */}
  <div>
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full flex justify-center py-3 px-4 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </button>
  </div>
</form>

  );
}