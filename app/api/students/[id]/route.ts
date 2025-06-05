import { NextResponse } from 'next/server';
import { getStudentById, updateStudent, deleteStudent } from '@/lib/database';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const student = getStudentById(id);

  if (student) {
    return NextResponse.json(student);
  } else {
    return NextResponse.json({ message: 'Student not found' }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const updatedData = await request.json();
  updateStudent(id, updatedData);
  // Return the updated student or a confirmation message
  const updatedStudent = getStudentById(id);
  return NextResponse.json(updatedStudent || { message: 'Student updated' });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  deleteStudent(id);
  return NextResponse.json({ message: 'Student deleted' });
} 