import { getStudentById } from "@/lib/database";
import { notFound } from "next/navigation";
import { StudentForm } from "@/components/StudentForm";

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Student</h1>
      <StudentForm student={student} />
    </div>
  );
}