import { NextResponse } from 'next/server';

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    return NextResponse.json({ message: 'Login successful' });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
} 