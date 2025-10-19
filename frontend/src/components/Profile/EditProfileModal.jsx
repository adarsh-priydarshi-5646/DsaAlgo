import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';

const EditProfileModal = ({ open, onClose, initial, onProfileUpdate }) => {
  const { updateProfile } = useAuthStore();

  const schema = yup.object({
    firstName: yup.string().max(50),
    lastName: yup.string().max(50),
    username: yup.string().min(3).required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    bio: yup.string().max(500),
    avatar: yup.string().url('Must be a valid URL').nullable().optional().transform((v, o) => o === '' ? null : v),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      firstName: initial?.firstName || '',
      lastName: initial?.lastName || '',
      username: initial?.username || '',
      email: initial?.email || '',
      bio: initial?.bio || '',
      avatar: initial?.avatar || ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const res = await updateProfile(data);
      if (res?.success) {
        toast.success('Profile updated successfully!');
        
        // Notify parent component to refresh data
        if (onProfileUpdate) {
          onProfileUpdate(data);
        }
        
        // Close modal after a short delay to show success message
        setTimeout(() => {
          onClose?.();
        }, 1500);
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg bg-gray-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">First Name</label>
              <input {...register('firstName', { maxLength: 50 })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
              {errors.firstName && <p className="text-xs text-red-400 mt-1">Max 50 chars</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Last Name</label>
              <input {...register('lastName', { maxLength: 50 })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
              {errors.lastName && <p className="text-xs text-red-400 mt-1">Max 50 chars</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Username</label>
              <input {...register('username', { required: true, minLength: 3 })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
              {errors.username && <p className="text-xs text-red-400 mt-1">Min 3 chars</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input type="email" {...register('email', { required: true })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
              {errors.email && <p className="text-xs text-red-400 mt-1">Valid email is required</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Avatar URL</label>
            <input {...register('avatar')} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Bio</label>
            <textarea rows={3} {...register('bio', { maxLength: 500 })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
            {errors.bio && <p className="text-xs text-red-400 mt-1">Max 500 chars</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">Cancel</button>
            <button disabled={isSubmitting} type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white disabled:opacity-60">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
