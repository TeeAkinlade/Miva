import { Student } from "@/lib/database";

interface StudentFormProps {
  student: Student;
}

export function StudentForm({ student }: StudentFormProps) {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={student.name}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Registration Number</label>
        <input
          type="text"
          name="registrationNumber"
          defaultValue={student.registrationNumber}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Major</label>
        <input
          type="text"
          name="major"
          defaultValue={student.major}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input
          type="date"
          name="dob"
          defaultValue={student.dob}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">GPA</label>
        <input
          type="number"
          name="gpa"
          step="0.01"
          defaultValue={student.gpa}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
} 