export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

let students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    registrationNumber: "202401234",
    major: "Computer Science",
    dob: "2001-05-05",
    gpa: 3.8,
  },
  {
    id: "2",
    name: "Jane Smith",
    registrationNumber: "202401245",
    major: "Mechanical Engineering",
    dob: "2002-05-21",
    gpa: 3.6,
  },
  {
    id: "3",
    name: "Peter Jones",
    registrationNumber: "202401267",
    major: "Physics",
    dob: "2003-01-15",
    gpa: 3.9,
  },
  {
    id: "4",
    name: "Mary Johnson",
    registrationNumber: "202401288",
    major: "Biology",
    dob: "2001-11-20",
    gpa: 3.5,
  },
  {
    id: "5",
    name: "David Lee",
    registrationNumber: "202401301",
    major: "Chemical Engineering",
    dob: "2002-07-10",
    gpa: 3.7,
  },
  {
    id: "6",
    name: "Sarah Brown",
    registrationNumber: "202401323",
    major: "Mathematics",
    dob: "2003-03-03",
    gpa: 4.0,
  },
  {
    id: "7",
    name: "Michael Davis",
    registrationNumber: "202401345",
    major: "Electrical Engineering",
    dob: "2001-09-18",
    gpa: 3.4,
  },
  {
    id: "8",
    name: "Jessica Wilson",
    registrationNumber: "202401366",
    major: "Psychology",
    dob: "2002-12-01",
    gpa: 3.9,
  },
  {
    id: "9",
    name: "Chris Green",
    registrationNumber: "202401389",
    major: "Sociology",
    dob: "2003-06-25",
    gpa: 3.2,
  },
  {
    id: "10",
    name: "Emily White",
    registrationNumber: "202401400",
    major: "Architecture",
    dob: "2001-04-11",
    gpa: 3.75,
  },
];

export const getStudents = () => students;

export const getStudentById = (id: string) => {
  console.log(`Searching for student with ID: ${id}`);
  const foundStudent = students.find((student) => student.id === id);
  if (foundStudent) {
    console.log(`Found student: ${foundStudent.name}`);
  } else {
    console.log(`Student with ID: ${id} not found.`);
  }
  return foundStudent;
};

export const addStudent = (student: Student) => {
  students.push(student);
};

export const updateStudent = (id: string, updatedStudent: Student) => {
  students = students.map((student) =>
    student.id === id ? { ...student, ...updatedStudent } : student
  );
};

export const deleteStudent = (id: string) => {
  students = students.filter((student) => student.id !== id);
}; 