import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import React from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
