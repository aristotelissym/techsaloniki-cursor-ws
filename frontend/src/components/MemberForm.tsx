import { Member, MemberFormData, Sex, CatDogPreference } from '@/types/member';
import { useState, useEffect } from 'react';

interface MemberFormProps {
  member?: Member;
  onSubmit: (data: MemberFormData) => void;
  onCancel: () => void;
}

export default function MemberForm({ member, onSubmit, onCancel }: MemberFormProps) {
  const [formData, setFormData] = useState<MemberFormData>({
    first_name: '',
    last_name: '',
    sex: 'Male',
    hometown: '',
    job_title: '',
    cat_dog_lover: 'Both',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof MemberFormData, string>>>({});

  useEffect(() => {
    if (member) {
      setFormData({
        first_name: member.first_name,
        last_name: member.last_name,
        sex: member.sex,
        hometown: member.hometown,
        job_title: member.job_title,
        cat_dog_lover: member.cat_dog_lover,
      });
    }
  }, [member]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MemberFormData, string>> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is edited
    if (errors[name as keyof MemberFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <div>
        <label htmlFor="first_name" className="block text-sm font-medium text-blue-900">
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-900 ${
            errors.first_name ? 'border-red-500' : ''
          }`}
        />
        {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
      </div>

      <div>
        <label htmlFor="last_name" className="block text-sm font-medium text-blue-900">
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-900 ${
            errors.last_name ? 'border-red-500' : ''
          }`}
        />
        {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
      </div>

      <div>
        <label htmlFor="sex" className="block text-sm font-medium text-blue-900">
          Sex
        </label>
        <select
          id="sex"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-900"
        >
          {(['Male', 'Female', 'Other'] as Sex[]).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="hometown" className="block text-sm font-medium text-blue-900">
          Hometown
        </label>
        <input
          type="text"
          id="hometown"
          name="hometown"
          value={formData.hometown}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-900"
        />
      </div>

      <div>
        <label htmlFor="job_title" className="block text-sm font-medium text-blue-900">
          Job Title
        </label>
        <input
          type="text"
          id="job_title"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-900"
        />
      </div>

      <div>
        <label htmlFor="cat_dog_lover" className="block text-sm font-medium text-blue-900">
          Cat/Dog Lover
        </label>
        <select
          id="cat_dog_lover"
          name="cat_dog_lover"
          value={formData.cat_dog_lover}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-900"
        >
          {(['Cat', 'Dog', 'Both'] as CatDogPreference[]).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-blue-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {member ? 'Update' : 'Create'} Member
        </button>
      </div>
    </form>
  );
} 