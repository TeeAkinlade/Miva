# Student Information Management System

This project is a simple Student Information Management System built with Next.js, TypeScript, Tailwind CSS, and Chakra UI. It allows users to view, add, edit, and delete student records.

## Requirements

- Node.js (version 18 or later)
- npm or pnpm (pnpm is recommended)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd my-student-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or using pnpm:
    # pnpm install
    ```

3.  **Run the development server:**

```bash
npm run dev
    # or using pnpm:
    # pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Login Detail
    - Username: admin
    - Password: password

## Project Structure

- `app/`: Contains the Next.js application pages and API routes.
    - `api/`: API routes.
        - `students/`: API for managing student data (`route.ts`).
        - `students/[id]/`: Dynamic API for individual student data (`route.ts`).
        - `login/`: Basic authentication API (`route.ts`).
    - `login/`: Login page.
    - `students/`: Student list page.
    - `students/[id]/`: Dynamic student detail page.
    - `students/[id]/edit/`: Edit student page.
    - `students/new/`: Add new student page.
- `lib/`: Contains utility functions, including the in-memory database (`database.ts`).
- `__tests__/`: Contains unit tests.
    - `api/`: Tests for API routes.
    - `lib/`: Tests for database functions.
    - `app/`: Tests for frontend components.
- `components/`: (Placeholder) Can be used for reusable React components.
- `styles/`: (Placeholder) Can be used for additional global styles if needed.
- `jest.config.js`, `jest.setup.ts`: Jest test configuration.
- `tailwind.config.js`, `postcss.config.mjs`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.

## Development Approach

This project follows a standard Next.js application structure using the App Router. 

- **Frontend:** Built with React and styled using Tailwind CSS and Chakra UI for a responsive design.
- **Backend:** Simulated using Next.js API routes and an in-memory database for simplicity as per the requirements.
- **Data Fetching:** Data is fetched on the server-side where appropriate (e.g., initial student list fetch) and client-side for form submissions and filtering.
- **Authentication:** A basic login page and API route are implemented with hardcoded credentials for demonstration. This should be replaced with a proper authentication solution in a production environment.
- **Validation:** Both client-side (using form state and Chakra UI's FormErrorMessage) and server-side (in API routes) validation is implemented.
- **Testing:** Unit tests are included for database functions, API routes, and key frontend components using Jest and React Testing Library.

## Implemented Features

- Student List Page (`/students`)
- Dynamic Student Detail Page (`/students/[id]`)
- Add New Student Page (`/students/new`)
- Edit Student Page (`/students/[id]/edit`)
- Delete Student functionality
- API Routes for CRUD operations on student data
- In-memory database simulation
- TypeScript for type safety
- Tailwind CSS and Chakra UI for styling
- Search/Filter on the student list
- Client-side and Server-side Form Validation
- Basic Authentication
- Unit Tests (Database, API, Frontend Components)

## Future Enhancements (Beyond Requirements)

- Replace the in-memory database with a persistent database (e.g., PostgreSQL, MongoDB).
- Implement a more robust authentication system (e.g., using NextAuth.js, JWTs).
- Add more comprehensive unit and integration tests.
- Improve UI/UX based on detailed design specifications.
- Implement pagination for the student list.
- Add error handling and loading states for better user experience.

This project serves as a foundation for a more complex Student Information Management System. The structure and implemented features demonstrate key skills in frontend and basic backend development with Next.js.
>>>>>>> 19fa5e9 (initial commit)
