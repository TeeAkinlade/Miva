'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import Link from 'next/link';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import LoginImage from '../../images/ulessoneducation_A_black_female_wearing_a_dark_blue_matricula_994cec18-1039-4964-9ca2-6560be8115bc_0 (1).png'
import Image from 'next/image';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (
    values: { username: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success('Login successful!');
        router.push('/students');
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      <div className="w-1/2 bg-primary hidden lg:flex">
        <Image
          src={LoginImage}
          alt="loginImage"
          width={1000}
          height={1000}
          className='object-cover w-full h-full'
        />
      </div>

      <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-gray-800">
        <div className="max-w-md w-full">
          <h1 className="text-3xl lg:text-5xl font-bold mb-10 text-center">
            Log in
          </h1>

          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-8">
                <div>
                  <Field
                    name="username"
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                    className="w-full p-3 border-1 rounded bg-gray-700 border-gray-600 focus:border-gray-100 text-white placeholder-gray-400 focus:outline-none focus:ring-0"
                  />
                  {errors.username && touched.username && (
                    <div className="text-secondary text-sm mt-1">
                      {errors.username}
                    </div>
                  )}
                </div>

                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full p-3 border-1 rounded bg-gray-700 border-gray-600 focus:border-gray-100 text-white placeholder-gray-400 focus:outline-none focus:ring-0"
                  />
                  {errors.password && touched.password && (
                    <div className="text-secondary text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="h-4 w-4 text-buttonPurple focus:ring-buttonPurple border-gray-600 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                    I agree to the <Link href="#" className="text-white hover:underline">Terms & Conditions</Link>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-gray-900 p-3 rounded hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-400">Or register with</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="w-1/2 flex items-center justify-center p-3 border rounded border-gray-600 text-white hover:bg-gray-700 transition-colors"
                  >
                    <span className="mr-2"><FcGoogle /></span> Google
                  </button>
                  <button
                    type="button"
                    className="w-1/2 flex items-center justify-center p-3 border rounded border-gray-600 text-white hover:bg-gray-700 transition-colors"
                  >
                    <span className="mr-2"><FaApple className='text-white' /></span> Apple
                  </button>
                </div>
                <p className="text-sm text-center">Use <span className="text-[#FF2803]">admin</span> as username & <span className='text-[#FF2803]'>password </span>for the password to gain acess to log in</p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}