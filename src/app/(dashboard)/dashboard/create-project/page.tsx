import CreateProjectForm from '@/components/models/MyProjects/CreateProjectForm';

export const metadata = {
  title: 'Create Project',
  description: 'Create a new portfolio project.',
};

export default function CreateProjectPage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4'>
      <CreateProjectForm />
    </div>
  );
}
