import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';

const Settings = ({ open, onClose }) => {
  const { user, updateSettings } = useAuthStore();

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      darkMode: false,
      emailNotifications: true,
      weeklySummary: false,
    }
  });

  useEffect(() => {
    const prefs = user?.preferences || {};
    reset({
      darkMode: !!prefs.darkMode,
      emailNotifications: prefs.emailNotifications !== false,
      weeklySummary: !!prefs.weeklySummary,
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    const res = await updateSettings({ ...user?.preferences, ...data });
    if (res?.success) {
      toast.success('Settings updated');
      onClose?.();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-white">Dark Mode</span>
            <input type="checkbox" className="h-5 w-5" {...register('darkMode')} />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-white">Email Notifications</span>
            <input type="checkbox" className="h-5 w-5" {...register('emailNotifications')} />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-white">Weekly Summary</span>
            <input type="checkbox" className="h-5 w-5" {...register('weeklySummary')} />
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">Cancel</button>
            <button disabled={isSubmitting} type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white disabled:opacity-60">
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
