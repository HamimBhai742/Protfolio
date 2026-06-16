'use client';
import { useEffect, useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import {
  Edit,
  Save,
  X,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Facebook,
} from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { cleanObj } from '@/actions/cleanObj';
import ProfileSkeleton from '@/components/models/Profile/ProfileSkeleton';
import { Profession, ProfileData } from '@/types/Profile.data';
import UploadCloudinary from '@/upload/UploadCloudinary';
import { snakeToProfession } from '@/helpers/sanakeToProfe';

// export const metadata = {
//   title: 'Profile',
//   description: 'Manage and update your profile information.',
// }
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    profession: Profession.FULL_STACK_DEVELOPER,
    website: '',
    experience: '',
    githubUrl: '',
    linkedInUrl: '',
    facebookUrl: '',
    skills: [],
    createdAt: '',
    picture: null,
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);
  useEffect(() => {
    const profileData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data?.success) {
        setProfileData(data?.data);
        setIsLoading(false);
      }
    };
    profileData();
  }, [setProfileData]);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log(editData)
    setIsUploading(true);
    try {
      const thumbnailUrl = await UploadCloudinary({
        thumbnail: editData.picture,
      });
      if (thumbnailUrl) {
        editData.picture = thumbnailUrl;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(cleanObj(editData)),
        }
      );
      const data = await res.json();
      if (data?.success) {
        setIsUploading(false);
        setProfileData(data?.data);
        toast.success(data?.message);
      }
      if (!data?.success) {
        setIsUploading(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setIsUploading(false);
      toast.error('Error updating profile');
      console.log(error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleSkillAdd = (skill: string) => {
    if (skill.trim() && !editData.skills.includes(skill.trim())) {
      setEditData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setEditData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  if (isLoading) {
    return ProfileSkeleton();
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
                Profile
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-1'>
                Manage your personal information and settings
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={handleEdit}
                className='flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium'
              >
                <Edit className='h-5 w-5' />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className='flex gap-3'>
                <button
                  onClick={handleCancel}
                  className='flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                >
                  <X className='h-5 w-5' />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className='flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium'
                >
                  {isUploading ? (
                    <>
                      <ImSpinner9 className='animate-spin h-5 w-5' />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className='h-5 w-5' />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
          {/* Profile Card */}
          <div className='lg:col-span-2'>
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
              {/* Avatar Section */}
              <div className='text-center mb-6'>
                <div className='relative inline-block'>
                  {profileData?.picture &&
                  editData.picture !== null &&
                  typeof editData.picture === 'object' ? (
                    <div className='w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg'>
                      <Image
                        src={
                          editData.picture === null
                            ? `${profileData?.picture}`
                            : URL.createObjectURL(editData.picture)
                        }
                        alt='Profile Preview'
                        width={200}
                        height={200}
                        className='w-32 h-32 rounded-full object-cover'
                      />
                    </div>
                  ) : (
                    <div className='w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg'>
                      <Image
                        src={`${profileData?.picture}`}
                        priority
                        alt='Profile Preview'
                        width={200}
                        height={200}
                        className='w-32 h-32 rounded-full object-cover'
                      />
                    </div>
                  )}

                  {isEditing && (
                    <label className='absolute bottom-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'>
                      <Camera className='h-4 w-4 text-gray-400' />
                      <input
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setEditData((prev) => ({
                            ...prev,
                            picture: file,
                          }));
                        }}
                      />
                    </label>
                  )}
                </div>

                {isEditing ? (
                  <div className='mt-4 space-y-3'>
                    <input
                      type='text'
                      value={editData.name}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className='w-full text-center text-xl font-bold bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    />
                    <select
                      name='profession'
                      value={editData.profession}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          profession: e.target.value as unknown as Profession,
                        }))
                      }
                      id=''
                      className='w-full  text-center  bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    >
                      <option value='full_stack_developer'>
                        Full Stack Developer
                      </option>
                      <option value='ui_ux_designer'>UI/UX Designer</option>
                      <option value='frontend_developer'>
                        Frontend Developer
                      </option>
                      <option value='backend_developer'>
                        Backend Developer
                      </option>
                      <option value='mobile_developer'>Mobile Developer</option>
                      <option value='digital_marketer'>Digital Marketer</option>
                      <option value='product_designer'>Product Designer</option>
                      <option value='data_analyst'>Data Analyst</option>
                      <option value='data_engineer'>Data Engineer</option>
                    </select>
                  </div>
                ) : (
                  <div className='mt-4'>
                    <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                      {profileData.name}
                    </h2>
                    <p className='text-gray-600 dark:text-gray-400 mt-1'>
                      {snakeToProfession(profileData.profession)}
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <Mail className='h-5 w-5 text-gray-400' />
                  <span className='text-gray-700 dark:text-gray-300 text-sm'>
                    {profileData.email}
                  </span>
                </div>

                <div className='flex items-center space-x-3'>
                  <Phone className='h-5 w-5 text-gray-400' />
                  {isEditing ? (
                    <input
                      type='tel'
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className='flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2  text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    />
                  ) : (
                    <span className='text-gray-700 dark:text-gray-300 text-sm'>
                      {profileData.phone}
                    </span>
                  )}
                </div>

                <div className='flex items-center space-x-3'>
                  <MapPin className='h-5 w-5 text-gray-400' />
                  {isEditing ? (
                    <input
                      type='text'
                      value={editData?.address}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className='flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    />
                  ) : (
                    <span className='text-gray-700 dark:text-gray-300 text-sm'>
                      {profileData.address}
                    </span>
                  )}
                </div>

                <div className='flex items-center space-x-3'>
                  <Calendar className='h-5 w-5 text-gray-400' />
                  <span className='text-gray-700 dark:text-gray-300 text-sm'>
                    Joined{' '}
                    {new Date(profileData.createdAt).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                      }
                    )}
                  </span>
                </div>

                <div className='flex items-center space-x-3'>
                  <Calendar className='h-5 w-5 text-gray-400' />
                  {isEditing ? (
                    <input
                      type='text'
                      value={editData.experience}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          experience: e.target.value,
                        }))
                      }
                      className='flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                      placeholder=' experience'
                    />
                  ) : (
                    <span className='text-gray-700 dark:text-gray-300 text-sm'>
                      {profileData.experience} 
                    </span>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'>
                <h3 className='text-sm font-medium text-gray-900 dark:text-white mb-4'>
                  Social Links
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <Globe className='h-4 w-4 text-gray-400' />
                    {isEditing ? (
                      <input
                        type='url'
                        value={editData?.website}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            website: e.target.value,
                          }))
                        }
                        className='flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        placeholder='Website URL'
                      />
                    ) : (
                      <a
                        href={profileData?.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-indigo-600 dark:text-indigo-400 hover:underline text-sm'
                      >
                        Website
                      </a>
                    )}
                  </div>

                  <div className='flex items-center space-x-3'>
                    <Github className='h-4 w-4 text-gray-400' />
                    {isEditing ? (
                      <input
                        type='url'
                        value={editData?.githubUrl}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            githubUrl: e.target.value,
                          }))
                        }
                        className='flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        placeholder='GitHub URL'
                      />
                    ) : (
                      <a
                        href={profileData.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-indigo-600 dark:text-indigo-400 hover:underline text-sm'
                      >
                        GitHub
                      </a>
                    )}
                  </div>

                  <div className='flex items-center space-x-3'>
                    <Linkedin className='h-4 w-4 text-gray-400' />
                    {isEditing ? (
                      <input
                        type='url'
                        value={profileData?.linkedInUrl}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            linkedInUrl: e.target.value,
                          }))
                        }
                        className='flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        placeholder='LinkedIn URL'
                      />
                    ) : (
                      <a
                        href={profileData.linkedInUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-indigo-600 dark:text-indigo-400 hover:underline text-sm'
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>

                  <div className='flex items-center space-x-3'>
                    <Facebook className='h-4 w-4 text-gray-400' />
                    {isEditing ? (
                      <input
                        type='url'
                        value={editData?.facebookUrl}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            facebookUrl: e.target.value,
                          }))
                        }
                        className='flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        placeholder='Facebook URL'
                      />
                    ) : (
                      <a
                        href={profileData.facebookUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-indigo-600 dark:text-indigo-400 hover:underline text-sm'
                      >
                        Facebook
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className='lg:col-span-3 space-y-8'>
            {/* Bio Section */}
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                About
              </h3>
              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={4}
                  className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none'
                  placeholder='Tell us about yourself...'
                />
              ) : (
                <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                  {profileData.bio}
                </p>
              )}
            </div>

            {/* Skills Section */}
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Skills & Technologies
              </h3>

              {isEditing && (
                <div className='mb-4'>
                  <input
                    type='text'
                    placeholder='Add a skill and press Enter'
                    className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSkillAdd(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              )}

              <div className='flex flex-wrap gap-2'>
                {(isEditing ? editData.skills : profileData.skills).map(
                  (skill, index) => (
                    <span
                      key={index}
                      className='inline-flex items-center px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium'
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          className='ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      )}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Stats Section */}

          </div>
        </div>
      </div>
    </div>
  );
}
