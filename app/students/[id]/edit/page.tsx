'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import React from 'react';
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { StudentData } from '@/app/api/students/route';

const studentSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  registrationNumber: Yup.string().required('Registration number is required'),
  major: Yup.string().required('Major is required'),
  dob: Yup.date().required('Date of birth is required'),
  gpa: Yup.number()
    .min(0, 'GPA must be at least 0')
    .max(4, 'GPA cannot exceed 4')
    .required('GPA is required'),
});

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

export default function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch student');
        }
        const data = await res.json();
        setStudent(data);
      } catch (error) {
        toast.error('Failed to load student details');
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (values: StudentData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success('Student updated successfully');
        router.push(`/students/${id}`);
      } else {
        throw new Error('Failed to update student');
      }
    } catch (error) {
      toast.error('Failed to update student');
      console.error('Error updating student:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-900 hover:text-gray-700 mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Student
        </button>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6">
            <h1 className="text-2xl font-bold text-white">Edit Student Profile</h1>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <Formik
              initialValues={{
                name: student.name,
                registrationNumber: student.registrationNumber,
                major: student.major,
                dob: new Date(student.dob).toISOString().split('T')[0],
                gpa: student.gpa,
              }}
              validationSchema={studentSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="name"
                        type="text"
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-0 focus:border-gray-900 ${
                          errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && touched.name && (
                        <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                      )}
                    </div>

                    {/* Registration Number Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Registration Number <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="registrationNumber"
                        type="text"
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-0 focus:border-gray-900 ${
                          errors.registrationNumber && touched.registrationNumber
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      {errors.registrationNumber && touched.registrationNumber && (
                        <div className="text-red-500 text-sm mt-1">{errors.registrationNumber}</div>
                      )}
                    </div>

                    {/* Major Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Major <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="major"
                        type="text"
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-0 focus:border-gray-900 ${
                          errors.major && touched.major ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.major && touched.major && (
                        <div className="text-red-500 text-sm mt-1">{errors.major}</div>
                      )}
                    </div>

                    {/* Date of Birth Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="dob"
                        type="date"
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-0 focus:border-gray-900 ${
                          errors.dob && touched.dob ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.dob && touched.dob && (
                        <div className="text-red-500 text-sm mt-1">{errors.dob}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        GPA <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="gpa"
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-0 focus:border-gray-900 ${
                          errors.gpa && touched.gpa ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.gpa && touched.gpa && (
                        <div className="text-red-500 text-sm mt-1">{errors.gpa}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                      type="button"
                      onClick={() => router.push(`/students/${id}`)}
                      className="flex items-center px-6 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer text-sm md:text-base"
                    >
                      <FaTimes className="mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaSave className="mr-2" />
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}