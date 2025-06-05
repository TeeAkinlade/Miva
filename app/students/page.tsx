'use client';

import NextLink from 'next/link';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { FiEye, FiEdit, FiMoreVertical, FiPlus } from 'react-icons/fi';

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

export default function StudentsPage() {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/students`);
      if (!res.ok) {
        throw new Error('Failed to fetch students');
      }
      const data: Student[] = await res.json();
      setAllStudents(data);
      setFilteredStudents(data);

      if (data.length === 0) {
        toast('No students found', {
          icon: '🔍',
        });
      }
    } catch (error) {
      toast.error('Failed to load students');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const searchGpa = parseFloat(searchTerm);
    const isNumericSearch = !isNaN(searchGpa);

    const filtered = allStudents.filter(student => {
      const nameIncludes = student.name.toLowerCase().includes(lowerCaseSearchTerm);
      const majorIncludes = student.major.toLowerCase().includes(lowerCaseSearchTerm);
      const gpaStringIncludes = student.gpa.toFixed(2).includes(lowerCaseSearchTerm);
      const gpaNumericMatch = isNumericSearch && student.gpa >= searchGpa;
      return nameIncludes || majorIncludes || gpaStringIncludes || gpaNumericMatch;
    });
    setFilteredStudents(filtered);

    if (filtered.length === 0 && searchTerm !== '') {
      toast('No students found matching your search', {
        icon: '🔍',
      });
    }
  }, [searchTerm, allStudents]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const dropdownElement = dropdownRefs.current[activeDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Student List
        </h1>
        <NextLink href="/students/new">
          <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
            <FiPlus className="text-lg" />
            Create Student
          </button>
        </NextLink>
      </div>

      <div className="mb-6">
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name, major, or minimum GPA"
          className="w-full lg:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-gray-900"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">
            {searchTerm === '' ? 'No students found.' : 'No students found matching your search.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Registration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Major</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">GPA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.registrationNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.major}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.gpa.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                    <div className="flex justify-start">
                      <button 
                        onClick={(e) => toggleDropdown(student.id, e)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                      >
                        <FiMoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {activeDropdown === student.id && (
                      <div
                        ref={el => { dropdownRefs.current[student.id] = el; }}
                         className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                      >
                        <div className="py-1">
                          <NextLink 
                            href={`/students/${student.id}`} 
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <FiEye className="mr-2" /> View Details
                          </NextLink>
                          <NextLink 
                            href={`/students/${student.id}/edit`} 
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <FiEdit className="mr-2" /> Edit
                          </NextLink>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}