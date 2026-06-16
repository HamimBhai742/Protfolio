import CreateBlogForm from '@/components/models/MyBlog/CreateBlogForm';

export const metadata = {
  title: 'Create Blog',
  description: 'Create a new blog post and share your knowledge with the world.',
};
export default function CreateBlogPage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <CreateBlogForm />
    </div>
  );
}
