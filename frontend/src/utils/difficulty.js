export const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'basic': return 'border-green-500/50 text-green-400 bg-green-500/10';
    case 'intermediate': return 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10';
    case 'advanced': return 'border-red-500/50 text-red-400 bg-red-500/10';
    default: return 'border-slate-500/50 text-slate-400 bg-slate-500/10';
  }
};
