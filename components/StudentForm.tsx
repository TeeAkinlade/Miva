"use client"

import { Student } from "@/lib/database";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

interface StudentFormProps {
  student: Student;
}

export function StudentForm({ student }: StudentFormProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
            onClick={() => router.back()}
            className="flex items-center text-gray-900 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Students
        </button>
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6 mt-3 rounded-t-2xl">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Student Information</h1>
        </div>
        
        <div className="p-6 space-y-6 shadow-2xl rounded-b-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                Name
              </label>
              <p className="mt-1 text-lg font-medium text-gray-900">{student.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                Registration Number
              </label>
              <p className="mt-1 text-lg font-medium text-gray-900">{student.registrationNumber}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                Major
              </label>
              <p className="mt-1 text-lg font-medium text-gray-900">{student.major}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                Date of Birth
              </label>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {student.dob ? new Date(student.dob).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : ''}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                GPA
              </label>
              <div className="mt-1 flex items-center">
                <span className={`text-lg font-bold ${
                  student.gpa && student.gpa >= 3.5 ? 'text-green-600' :
                  student.gpa && student.gpa >= 2.5 ? 'text-gray-900' : 'text-red-600'
                }`}>
                  {student.gpa?.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500">/ 4.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 