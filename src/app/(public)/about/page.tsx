/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Facebook,
  Calendar,
  User,
} from 'lucide-react';
import { snakeToProfession } from '@/helpers/sanakeToProfe';
import { Key } from 'react';

export default async function AboutPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/about`, {
    cache: 'force-cache',
  });
  const { data: aboutData } = await res.json();
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4 py-20'>
        {/* Hero Section */}
        <div className='max-w-6xl mx-auto'>
          <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-lg  overflow-hidden'>
            <div className='relative h-48 bg-gradient-to-r from-blue-600 to-purple-600'>
              <div className='absolute inset-0 bg-black/20'></div>
            </div>

            <div className='relative px-8 pb-8'>
              <div className='flex flex-col md:flex-row items-center md:items-end -mt-20 mb-8'>
                <div className='relative'>
                  <Image
                    src={aboutData?.picture}
                    alt={aboutData?.name}
                    width={160}
                    height={160}
                    className='w-40 h-40 rounded-full border-8 border-white dark:border-gray-800 shadow-xl object-cover'
                  />
                  <div className='absolute bottom-4 right-1 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-gray-800'></div>
                </div>

                <div className='md:ml-8 mt-4 md:mt-0 text-center md:text-left'>
                  <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
                    {aboutData?.name}
                  </h1>
                  <p className='text-xl text-blue-600 dark:text-blue-400 font-semibold mb-2'>
                    {snakeToProfession(aboutData.profession)}
                  </p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3  mb-4'>
                <div className='flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl'>
                  <Mail className='w-5 h-5 text-blue-600 dark:text-blue-400 mr-3' />
                  <div>
                    <p className='text-sm text-blue-600 font-medium dark:text-blue-400'>
                      Email
                    </p>{' '}
                    <p className='text-gray-900 dark:text-white font-medium'>
                      {aboutData.email}
                    </p>
                  </div>
                </div>

                <div className='flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl'>
                  <Phone className='w-5 h-5 text-green-600 dark:text-green-400 mr-3' />
                  <div>
                    <p className='text-sm text-green-600 font-medium dark:text-green-400'>
                      Phone
                    </p>
                    <p className='text-gray-900 dark:text-white font-medium'>
                      {aboutData?.phone}
                    </p>
                  </div>
                </div>

                <div className='flex  items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl'>
                  <MapPin className='w-5 h-5 text-red-600 dark:text-red-400 mr-3' />
                  <div>
                    <p className='text-sm text-red-600 dark:text-red-400 font-medium'>
                      Location
                    </p>
                    <p className='text-gray-900 dark:text-white font-medium'>
                      {aboutData?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className='max-w-4xl mx-auto mt-12'>
          <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8'>
            <div className='flex items-center mb-6'>
              <User className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-3' />
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                About Me
              </h2>
            </div>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed text-lg'>
              {aboutData?.bio}
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className='max-w-4xl mx-auto mt-12'>
          <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
              Skills & Technologies
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3'>
              {aboutData.skills.map(
                (skill: any, index: Key | null | undefined) => (
                  <div
                    key={index}
                    className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 px-4 py-3 rounded-xl text-center hover:shadow-md transition-all duration-300 hover:scale-105'
                  >
                    <span className='text-gray-800 dark:text-white font-medium text-sm'>
                      {skill}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className='max-w-4xl mx-auto mt-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Contact Info */}
            <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                Get In Touch
              </h2>
              <div className='space-y-4'>
                <div className='flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow'>
                  <Globe className='w-5 h-5 text-blue-600 dark:text-blue-400 mr-4' />
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Website
                    </p>
                    <a
                      target='_blank'
                      href={aboutData.website}
                      className='text-blue-600 dark:text-blue-400 hover:underline font-medium'
                    >
                      {aboutData.website}
                    </a>
                  </div>
                </div>

                <div className='flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow'>
                  <Calendar className='w-5 h-5 text-purple-600 dark:text-purple-400 mr-4' />
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Member Since
                    </p>
                    <p className='text-gray-900 dark:text-white font-medium'>
                      {new Date(aboutData.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                Connect With Me
              </h2>
              <div className='space-y-4'>
                <a
                  target='_blank'
                  href={aboutData.githubUrl}
                  className='flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105 group'
                >
                  <Github className='w-6 h-6 text-gray-800 dark:text-white mr-4 group-hover:text-blue-600 dark:group-hover:text-blue-400' />
                  <div>
                    <p className='text-gray-900 dark:text-white font-medium'>
                      GitHub
                    </p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      View my repositories
                    </p>
                  </div>
                </a>

                <a
                  target='_blank'
                  href={aboutData.linkedInUrl}
                  className='flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105 group'
                >
                  <Linkedin className='w-6 h-6 text-blue-600 mr-4 group-hover:text-blue-700' />
                  <div>
                    <p className='text-gray-900 dark:text-white font-medium'>
                      LinkedIn
                    </p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Professional network
                    </p>
                  </div>
                </a>

                <a
                  target='_blank'
                  href={aboutData.facebookUrl}
                  className='flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105 group'
                >
                  <Facebook className='w-6 h-6 text-blue-500 mr-4 group-hover:text-blue-600' />
                  <div>
                    <p className='text-gray-900 dark:text-white font-medium'>
                      Facebook
                    </p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Social updates
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className='max-w-4xl mx-auto mt-8 text-center'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Last updated:{' '}
            {new Date(aboutData.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/about`, {
    cache: 'force-cache',
  });
  const { data } = await res.json();
  return {
    title: data.title,
    description: data.bio,
    openGraph: {
      title: data.title,
      description: data.bio,
      images: [data.picture],
    }
  };
}
