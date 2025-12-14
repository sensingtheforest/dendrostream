import React, { useState } from 'react';
import { BASE_URL } from '../../../settings/EnvironmentVariables';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
        const response = await fetch(`${BASE_URL}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            setSubmitted(true);
            setError(false);
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } else {
        setError('Server error');
        }
    } catch (error) {
        setError(error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2em', border: '1px solid black', borderRadius: '2px' }}>
        <h2 className='pb-3'>Send a Message</h2>
      {submitted && <p style={{ color: 'green', fontWeight: 'bold' }}>Thank you for your message.<br/>We aim to reply within 3-5 working days.</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>A problem occurred when sending your message - please try again.<br/>Error: {error.toLowerCase()}</p>}
      {
        !submitted && (
            <>
                <p style={{ fontWeight: 'bold' }}><span style={{ color: 'red' }}>*</span> Required Field</p>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                    <label htmlFor='firstName' style={{ fontWeight: 'bold' }}>First Name<span style={{ color: 'red' }}>*</span></label>
                    <input
                        className='form-control'
                        id='firstName'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className='mb-4'>
                    <label htmlFor='lastName' style={{ fontWeight: 'bold' }}>Last Name<span style={{ color: 'red' }}>*</span></label>
                    <input
                        className='form-control'
                        id='lastName'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className='mb-4'>
                    <label htmlFor='email' style={{ fontWeight: 'bold' }}>Email<span style={{ color: 'red' }}>*</span></label>
                    <input
                        className='form-control'
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className='mb-4'>
                    <label htmlFor='message' style={{ fontWeight: 'bold' }}>Message<span style={{ color: 'red' }}>*</span></label>
                    <textarea
                        className='form-control'
                        id='message'
                        name='message'
                        rows='5'
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <button type='submit' className='btn btn-primary'>Send</button>
                </form>
            </>
        )
    }
    </div>
  );
};
