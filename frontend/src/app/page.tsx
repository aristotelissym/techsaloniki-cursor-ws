'use client';

import { useState } from 'react';
import { Member, MemberFormData } from '@/types/member';
import MemberTable from '@/components/MemberTable';
import MemberForm from '@/components/MemberForm';
import Modal from '@/components/Modal';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>();
  const [memberToDelete, setMemberToDelete] = useState<string | undefined>();

  const handleCreateMember = (data: MemberFormData) => {
    const newMember: Member = {
      ...data,
      id: uuidv4(),
    };
    setMembers((prev) => [...prev, newMember]);
    setIsFormModalOpen(false);
  };

  const handleUpdateMember = (data: MemberFormData) => {
    if (!selectedMember) return;
    
    setMembers((prev) =>
      prev.map((member) =>
        member.id === selectedMember.id ? { ...data, id: member.id } : member
      )
    );
    setIsFormModalOpen(false);
    setSelectedMember(undefined);
  };

  const handleDeleteMember = (id: string) => {
    setMemberToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!memberToDelete) return;
    
    setMembers((prev) => prev.filter((member) => member.id !== memberToDelete));
    setIsDeleteModalOpen(false);
    setMemberToDelete(undefined);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setIsFormModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold text-blue-900">Members</h1>
            <p className="mt-2 text-sm text-blue-700">
              A list of all members in the system including their name, hometown, job title, and preferences.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                setSelectedMember(undefined);
                setIsFormModalOpen(true);
              }}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Member
            </button>
          </div>
        </div>

        <div className="mt-8">
          <MemberTable
            members={members}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        </div>

        <Modal
          isOpen={isFormModalOpen}
          onClose={() => {
            setIsFormModalOpen(false);
            setSelectedMember(undefined);
          }}
          title={selectedMember ? 'Edit Member' : 'Add New Member'}
        >
          <MemberForm
            member={selectedMember}
            onSubmit={selectedMember ? handleUpdateMember : handleCreateMember}
            onCancel={() => {
              setIsFormModalOpen(false);
              setSelectedMember(undefined);
            }}
          />
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setMemberToDelete(undefined);
          }}
          title="Delete Member"
        >
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this member? This action cannot be undone.
            </p>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setMemberToDelete(undefined);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </main>
  );
}
