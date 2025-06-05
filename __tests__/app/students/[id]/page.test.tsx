import { render, screen, waitFor } from '@testing-library/react';
import StudentDetailPage from '../../../../app/students/[id]/page';
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

describe('StudentDetailPage', () => {
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

    global.fetch = jest.fn((input: URL | RequestInfo) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url === '/api/students/abc-123') {
        return Promise.resolve({
          ok: true,
          json: async () => mockStudent,
        } as Response);
      } else if (url === '/api/students/abc-123') {
         return Promise.resolve({
           ok: true,
           json: async () => ({}),
         } as Response);
      }
      return Promise.reject(new Error('unhandled fetch URL'));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the student details correctly after fetching', async () => {
    const paramsPromise = Promise.resolve({ id: 'abc-123' });

    render(<StudentDetailPage params={{ id: 'abc-123' }} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: mockStudent.name })).toBeInTheDocument();
      expect(screen.getByText(`Registration Number: ${mockStudent.registrationNumber}`)).toBeInTheDocument();
      expect(screen.getByText(`Major: ${mockStudent.major}`)).toBeInTheDocument();
      expect(screen.getByText(`Date of Birth: ${new Date(mockStudent.dob).toLocaleDateString()}`)).toBeInTheDocument();
      expect(screen.getByText(`GPA: ${mockStudent.gpa.toFixed(2)}`)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });
}); 