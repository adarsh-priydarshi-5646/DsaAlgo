export interface TopicProgress {
  easy: boolean[];
  medium: boolean[];
  hard: boolean[];
}

export interface Progress {
  [topic: string]: TopicProgress;
}

const PROGRESS_KEY = 'dsa-tracker-progress';
const THEME_KEY = 'dsa-tracker-theme';

export const getProgress = (): Progress => {
  const stored = localStorage.getItem(PROGRESS_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const setProgress = (progress: Progress): void => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

export const toggleQuestion = (topic: string, difficulty: keyof TopicProgress, index: number): void => {
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

export const getTheme = (): 'dark' | 'light' => {
  return (localStorage.getItem(THEME_KEY) as 'dark' | 'light') || 'light';
};

export const setTheme = (theme: 'dark' | 'light'): void => {
  localStorage.setItem(THEME_KEY, theme);
};