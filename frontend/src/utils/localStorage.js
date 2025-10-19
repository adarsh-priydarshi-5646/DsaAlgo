const PROGRESS_KEY = 'dsa-tracker-progress';
const THEME_KEY = 'dsa-tracker-theme';

export const getProgress = () => {
  const stored = localStorage.getItem(PROGRESS_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const setProgress = (progress) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

export const toggleQuestion = (topic, difficulty, index) => {
  const progress = getProgress();
  if (!progress[topic]) {
    progress[topic] = {
      easy: [],
      medium: [],
      hard: []
    };
  }
  if (!progress[topic][difficulty][index]) {
    progress[topic][difficulty][index] = true;
  } else {
    progress[topic][difficulty][index] = !progress[topic][difficulty][index];
  }
  setProgress(progress);
};

export const getTheme = () => {
  return localStorage.getItem(THEME_KEY) || 'light';
};

export const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};