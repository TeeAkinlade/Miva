import StudentDetailsClient from '../../../components/StudentDetailsClient';
import { notFound } from 'next/navigation';

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

async function getStudent(id: string): Promise<Student | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/students/${id}`, { cache: 'no-store' });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch student');
    }

    const data: Student = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching student on server:', error);
    return null;
  }
}

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const student = await getStudent(id);

  if (!student) {
    notFound();
  }

  return <StudentDetailsClient student={student} />;
}