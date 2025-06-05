import { NextResponse } from 'next/server';
import { getStudents, addStudent, Student } from '@/lib/database';

interface StudentData {
  name?: string;
  registrationNumber?: string;
  major?: string;
  dob?: string;
  gpa?: number;
}

function validateStudentData(data: StudentData, isNew: boolean = true) {
  const errors: string[] = [];

  if (isNew) {
    if (!data.name) errors.push('Name is required.');
    if (!data.registrationNumber) errors.push('Registration Number is required.');
    if (!data.major) errors.push('Major is required.');
    if (!data.dob) errors.push('Date of Birth is required.');
    if (data.gpa === undefined || data.gpa === null) {
        errors.push('GPA is required.');
    } else if (typeof data.gpa !== 'number' || data.gpa < 0 || data.gpa > 4.0) {
        errors.push('GPA must be a number between 0.0 and 4.0.');
    }
  } else {
    if (data.name !== undefined && data.name === '') errors.push('Name cannot be empty.');
    if (data.registrationNumber !== undefined && data.registrationNumber === '') errors.push('Registration Number cannot be empty.');
    if (data.major !== undefined && data.major === '') errors.push('Major cannot be empty.');
    if (data.dob !== undefined && data.dob === '') errors.push('Date of Birth cannot be empty.');
    if (data.gpa !== undefined) {
        if (typeof data.gpa !== 'number' || data.gpa < 0 || data.gpa > 4.0) {
            errors.push('GPA must be a number between 0.0 and 4.0.');
        }
    }
  }


  return errors;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || '';
  const major = searchParams.get('major') || '';
  const gpa = searchParams.get('gpa') || '';

  let filteredStudents = getStudents();

  if (name) {
    filteredStudents = filteredStudents.filter(student =>
      student.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (major) {
    filteredStudents = filteredStudents.filter(student =>
      student.major.toLowerCase().includes(major.toLowerCase())
    );
  }

  if (gpa) {
      const gpaNumber = parseFloat(gpa);
      if (!isNaN(gpaNumber)) {
          filteredStudents = filteredStudents.filter(student =>
              student.gpa >= gpaNumber 
          );
      }
  }

  return NextResponse.json(filteredStudents);
}

export async function POST(request: Request) {
  const newStudentData: StudentData = await request.json();
  const validationErrors = validateStudentData(newStudentData);

  if (validationErrors.length > 0) {
    return NextResponse.json({ message: 'Validation failed', errors: validationErrors }, { status: 400 });
  }

  const studentWithId: Student = { ...newStudentData as Student, id: Date.now().toString() };
  addStudent(studentWithId);
  return NextResponse.json(studentWithId, { status: 201 });
} 