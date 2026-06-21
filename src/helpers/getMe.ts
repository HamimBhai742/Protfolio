export const getMe = async () => {
  if (typeof window === 'undefined') {
    // Server-side: Query database directly using dynamic imports to avoid bundling mongoose in client files
    try {
      const { dbConnect } = await import('@/lib/db');
      const { User } = await import('@/models/User');

      await dbConnect();
      const user = await User.findOne().select(
        'id name email address picture profession experience skills bio role githubUrl facebookUrl linkedInUrl website createdAt updatedAt'
      );
      return user ? JSON.parse(JSON.stringify(user)) : null;
    } catch (error) {
      console.error('Error in getMe helper (server):', error);
      return null;
    }
  } else {
    // Client-side: Fetch from the browser using a relative URL
    try {
      const res = await fetch('/api/v2/user', {
        cache: 'no-store',
      });
      if (!res.ok) return null;
      const { data: user } = await res.json();
      return user;
    } catch (error) {
      console.error('Error in getMe helper (client):', error);
      return null;
    }
  }
};
