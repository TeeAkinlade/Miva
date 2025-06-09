import { getStudentById } from "@/lib/database";
import { notFound } from "next/navigation";
import { StudentForm } from "@/components/StudentForm";

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = getStudentById(id);

  if (!student) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <StudentForm student={student} />
    </div>
  );
}

