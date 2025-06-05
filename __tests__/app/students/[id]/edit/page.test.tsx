import { render, screen, waitFor } from '@testing-library/react';
import EditStudentPage from '@/app/students/[id]/edit/page';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import React from 'react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    use: (promise: Promise<any>) => {
      let result: any;
      promise.then((r) => { result = r; }).catch((e) => { throw e; });
      return result;
    },
  }));

describe('EditStudentPage', () => {
  let mockRouter: any;
  const mockStudent = {
    id: 'abc-123',
    name: 'Test Student',
    registrationNumber: 'STU-001',
    major: 'Computer Science',
    dob: '2003-10-26T00:00:00.000Z',
    gpa: 3.9,
  };

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();

    global.fetch = jest.fn((input: URL | RequestInfo, options?: RequestInit) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url === '/api/students/abc-123' && (!options || options.method === 'GET')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockStudent,
        } as Response);
      } else if (url === '/api/students/abc-123' && options?.method === 'PUT') {
        return Promise.resolve({
          ok: true,
          json: async () => ({ message: 'Student updated successfully' }),
        } as Response);
      }
      return Promise.reject(new Error('unhandled fetch URL'));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the edit student form correctly and pre-fills with data', async () => {
    const paramsPromise = Promise.resolve({ id: 'abc-123' });

    render(<EditStudentPage params={paramsPromise} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
    expect(screen.getByRole('heading', { name: /Edit Student/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/Name/i)).toHaveValue(mockStudent.name);
    expect(screen.getByLabelText(/Registration Number/i)).toHaveValue(mockStudent.registrationNumber);
    expect(screen.getByLabelText(/Major/i)).toHaveValue(mockStudent.major);
    expect(screen.getByLabelText(/Date of Birth/i)).toHaveValue('2003-10-26');
    expect(screen.getByLabelText(/GPA/i)).toHaveValue(mockStudent.gpa);

    expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });
}); 