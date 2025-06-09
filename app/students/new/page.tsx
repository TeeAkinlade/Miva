'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FaArrowLeft, FaUserPlus, FaSave } from 'react-icons/fa';
import { StudentData } from '@/app/api/students/route';

const studentSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  registrationNumber: Yup.string().required('Registration Number is required'),
  major: Yup.string().required('Major is required'),
  dob: Yup.date()
    .required('Date of Birth is required')
    .max(new Date(), 'Date of birth cannot be in the future'),
  gpa: Yup.number()
    .required('GPA is required')
    .min(0, 'GPA must be at least 0')
    .max(4, 'GPA cannot exceed 4.0')
    .test(
      'decimal',
      'GPA must have 1 or 2 decimal places (e.g. 3.5 or 3.75)',
      (value) => value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
    ),
});

export default function AddStudentPage() {
  const router = useRouter();

  const handleSubmit = async (values: StudentData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          gpa: parseFloat(values.gpa?.toString() ?? ''),
        }),
      });

      if (res.ok) {
        toast.success('Student added successfully!');
        router.push('/students');
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to add student');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'An error occurred');
      } else {
        toast.error('An error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-900 hover:text-gray-800 mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Students
        </button>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6 flex items-center">
            <FaUserPlus className="text-white text-2xl mr-3" />
            <h1 className="text-2xl font-bold text-white">Add New Student</h1>
          </div>

          <div className="p-6">
            <Formik
              initialValues={{
                name: '',
                registrationNumber: '',
                major: '',
                dob: '',
                gpa: undefined,
              }}
              validationSchema={studentSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="name"
                        type="text"
                        className={`w-full p-3 border rounded-md focus:ring-0 focus:outline-none focus:border-gray-900 ${
                          errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && touched.name && (
                        <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registration Number <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="registrationNumber"
                        type="text"
                        className={`w-full p-3 border rounded-md focus:ring-0 focus:outline-none focus:border-gray-900 ${
                          errors.registrationNumber && touched.registrationNumber
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="2023001"
                      />
                      {errors.registrationNumber && touched.registrationNumber && (
                        <div className="text-red-500 text-sm mt-1">{errors.registrationNumber}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Major <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="major"
                        type="text"
                        className={`w-full p-3 border rounded-md focus:ring-0 focus:outline-none focus:border-gray-900 ${
                          errors.major && touched.major ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Computer Science"
                      />
                      {errors.major && touched.major && (
                        <div className="text-red-500 text-sm mt-1">{errors.major}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="dob"
                        type="date"
                        className={`w-full p-3 border rounded-md focus:ring-0 focus:outline-none focus:border-gray-900 ${
                          errors.dob && touched.dob ? 'border-red-500' : 'border-gray-300'
                        }`}
                        max={new Date().toISOString().split('T')[0]}
                      />
                      {errors.dob && touched.dob && (
                        <div className="text-red-500 text-sm mt-1">{errors.dob}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GPA <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="gpa"
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        className={`w-full p-3 border rounded-md focus:ring-0 focus:outline-none focus:border-gray-900 ${
                          errors.gpa && touched.gpa ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="3.5"
                      />
                      {errors.gpa && touched.gpa && (
                        <div className="text-red-500 text-sm mt-1">{errors.gpa}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end pt-6 border-t">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-md cursor-pointer  hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaSave className="mr-2" />
                      {isSubmitting ? 'Adding Student...' : 'Add Student'}
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