'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = `${process.env.NEXTAUTH_URL}/api/auth/register`; // No trailing slash
    console.log('Registering with endpoint:', endpoint); // Debugging log
  
    try {
      const res = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Registration successful:', res.data);
      // Handle success, e.g., redirect to the dashboard or login page
      // window.location.href = '/dashboard'; // Example redirect after successful registration
  
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('Registration error:', err.response?.data || err.message);
        // Handle error, e.g., show an error message to the user
      } else if (err instanceof Error) {
        console.error('Registration error:', err.message);
      } else {
        console.error('An unexpected error occurred during registration');
      }
    }
  };

  

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <select name="role" value={formData.role} onChange={onChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
