'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FaUserCircle, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

interface StudentDetailsClientProps {
  student: Student;
}

export default function StudentDetailsClient({ student }: StudentDetailsClientProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/students/${student.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Student deleted successfully');
        router.push('/students');
      } else {
        throw new Error('Failed to delete student');
      }
    } catch (error) {
      toast.error('Failed to delete student');
      console.error('Error deleting student:', error);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
         <button
           onClick={() => router.back()}
           className="flex items-center text-gray-900 hover:text-gray-800 mb-8 transition-colors cursor-pointer"
         >
           <FaArrowLeft className="mr-2" />
           Back to Students
         </button>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6 flex items-center">
            <div className="mr-4">
              <FaUserCircle className="text-white text-5xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{student.name}</h1>
              <p className="text-blue-100">{student.registrationNumber}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Major</h3>
                <p className="text-lg font-medium">{student.major}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date of Birth</h3>
                <p className="text-lg font-medium">
                  {new Date(student.dob).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">GPA</h3>
                <div className="flex items-center">
                  <span className={`text-lg font-bold ${
                    student.gpa >= 3.5 ? 'text-green-600' :
                    student.gpa >= 2.5 ? 'text-gray-900' : 'text-red-600'
                  }`}>
                    {student.gpa.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">/ 4.0</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 border-t pt-6">
              <Link
                href={`/students/${student.id}/edit`}
                className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm md:text-base"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </Link>

              <button
                onClick={() => setIsDeleteDialogOpen(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm md:text-base"
              >
                <FaTrash className="mr-2" />
                Delete Student
              </button>
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">{student.name}</span>?
              This action cannot be undone and all associated data will be permanently removed.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-900 hover:bg-gray-50 transition-colors text-sm md:text-base cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm md:text-base cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 