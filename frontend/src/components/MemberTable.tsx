import { Member } from '@/types/member';
import { useState } from 'react';

interface MemberTableProps {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

export default function MemberTable({ members, onEdit, onDelete }: MemberTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Member>('last_name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredMembers = members.filter((member) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      member.first_name.toLowerCase().includes(searchLower) ||
      member.last_name.toLowerCase().includes(searchLower) ||
      member.hometown.toLowerCase().includes(searchLower) ||
      member.job_title.toLowerCase().includes(searchLower) ||
      member.sex.toLowerCase().includes(searchLower) ||
      member.cat_dog_lover.toLowerCase().includes(searchLower)
    );
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });

  const handleSort = (field: keyof Member) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search members..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {['First Name', 'Last Name', 'Sex', 'Hometown', 'Job Title', 'Cat/Dog Lover', 'Actions'].map((header, index) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider cursor-pointer"
                  onClick={() => {
                    const fields: (keyof Member)[] = ['first_name', 'last_name', 'sex', 'hometown', 'job_title', 'cat_dog_lover'];
                    if (index < fields.length) handleSort(fields[index]);
                  }}
                >
                  {header}
                  {index < 6 && (
                    <span className="ml-1">
                      {sortField === ['first_name', 'last_name', 'sex', 'hometown', 'job_title', 'cat_dog_lover'][index] &&
                        (sortDirection === 'asc' ? '↑' : '↓')}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-blue-900">{member.first_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-900">{member.last_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-900">{member.sex}</td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-900">{member.hometown}</td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-900">{member.job_title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-900">{member.cat_dog_lover}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(member)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(member.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 