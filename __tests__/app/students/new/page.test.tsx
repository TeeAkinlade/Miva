import { render, screen } from '@testing-library/react';
import NewStudentPage from '@/app/students/new/page';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('NewStudentPage', () => {
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();

    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the new student form correctly', () => {
    render(<NewStudentPage />);

    expect(screen.getByRole('heading', { name: /Add New Student/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Registration Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Major/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GPA/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Add Student/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });
}); 