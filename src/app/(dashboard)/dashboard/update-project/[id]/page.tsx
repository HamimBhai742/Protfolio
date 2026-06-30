'use client';

import UpdateProjectForm from '@/components/models/MyProjects/UpdateProjectForm';
import { useParams } from 'next/navigation';

export default function UpdateProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4'>
      <UpdateProjectForm projectId={projectId} />
    </div>
  );
}
