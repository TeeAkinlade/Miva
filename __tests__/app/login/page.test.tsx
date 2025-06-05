import { render, screen } from '@testing-library/react';
import LoginPage from '../../../app/login/page';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('LoginPage', () => {
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

  it('renders the login form correctly', () => {
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: /Create an account/i })).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Create account/i })).toBeInTheDocument();

    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Log in/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/I agree to the Terms & Conditions/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Terms & Conditions/i })).toBeInTheDocument();

    expect(screen.getByText(/Or register with/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Apple/i })).toBeInTheDocument();
  });
}); 