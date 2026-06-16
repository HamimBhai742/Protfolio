'use client';
import { useState, useEffect } from 'react';
import UpdateProjectForm from './UpdateProjectForm';
import ProjectCard from './ProjectCard';
import { Eye } from 'lucide-react';
import { Project, ProjectsListProps } from '@/types/projects.type';
import Swal from 'sweetalert2';
import AddProjectForm from './AddProjectForm';
import CardSkeleton from '@/components/shared/CardSkelton/CardSkleton';
export default function ProjectsList({
  viewMode,
  filter,
  setShowAddForm,
  showAddForm,
}: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/my-projects?search=${
            filter.search
          }&${filter.status !== 'all' ? `status=${filter.status}` : ''}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await res.json();
        console.log(data);
        setProjects(data?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, [setLoading, filter]);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleUpdate = (updatedProject: Project) => {
    setLoading(false);
    setProjects((prev) =>
      prev.map((p) => (p?.id === updatedProject?.id ? updatedProject : p))
    );
  };

  const handleDelete = (id: number) => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/delete/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        const data = await res.json();
        if (data?.success) {
          setLoading(false);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }
        if (!data?.success) {
          Swal.fire({
            title: 'Failed!',
            text: 'Your file has been deleted failed.',
            icon: 'error',
          });
        }
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    });
    // if (confirm('Are you sure you want to delete this project?')) {
    //   setProjects((prev) => prev.filter((p) => p.id !== id));
    // }
  };

  if (loading) {
    return <CardSkeleton/>
  }

  if (projects?.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4'>
          <Eye className='h-12 w-12 text-gray-400' />
        </div>
        <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
          {filter.search ? 'No projects found' : 'No projects yet'}
        </h3>
        <p className='text-gray-500 dark:text-gray-400'>
          {filter.search
            ? 'Try adjusting your search terms'
            : 'Create your first project to get started'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`
        ${
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      `}
      >
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            viewMode={viewMode}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddForm && (
        <AddProjectForm
          onClose={() => setShowAddForm(false)}
          onAdd={(project) => {
            setProjects((prev) => [...prev, project]);
          }}
        />
      )}

      {editingProject && (
        <UpdateProjectForm
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
