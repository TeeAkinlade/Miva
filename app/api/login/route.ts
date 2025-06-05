import { NextResponse } from 'next/server';

// In a real application, store credentials securely and use a proper authentication library (e.g., NextAuth.js)
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // In a real application, create and return a JWT or set a secure cookie
    return NextResponse.json({ message: 'Login successful' });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
} 