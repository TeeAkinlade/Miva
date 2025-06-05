import { render, screen, waitFor } from '@testing-library/react';
import StudentsPage from '../../../app/students/page';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
  __esModule: true,
  default: jest.fn(),
}));

describe('StudentsPage', () => {
  beforeEach(() => {
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
    (toast as unknown as jest.Mock).mockClear();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the students list page correctly', async () => {
    const mockStudents = [
      { id: '1', name: 'John Doe', registrationNumber: '12345', major: 'Computer Science', dob: '2000-01-15T00:00:00.000Z', gpa: 3.8 },
      { id: '2', name: 'Jane Smith', registrationNumber: '67890', major: 'Physics', dob: '1999-05-20T00:00:00.000Z', gpa: 3.5 },
    ];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockStudents,
    });

    render(<StudentsPage />);

    expect(screen.getByRole('heading', { name: /Student List/i })).toBeInTheDocument();

    expect(screen.getByText(/Loading students.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Loading students.../i)).not.toBeInTheDocument());

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Registration: 12345/i)).toBeInTheDocument();
      expect(screen.getByText(/Major: Computer Science/i)).toBeInTheDocument();
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
      expect(screen.getByText(/Registration: 67890/i)).toBeInTheDocument();
      expect(screen.getByText(/Major: Physics/i)).toBeInTheDocument();
    });
  });

  it('displays a message when no students are found', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    render(<StudentsPage />);

    await waitFor(() => expect(screen.getByText(/No students found\./i)).toBeInTheDocument());
  });

  it('displays an error toast if fetching students fails', async () => {
     (global.fetch as jest.Mock).mockResolvedValue({
       ok: false,
       status: 500,
       json: async () => ({ message: 'Internal Server Error' }),
     });

     render(<StudentsPage />);

     await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Failed to load students'));
   });
}); 