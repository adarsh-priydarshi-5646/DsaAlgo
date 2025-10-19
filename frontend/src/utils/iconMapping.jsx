import {
  BarChart3,
  Link,
  GitBranch,
  Network,
  Zap,
  Search,
  Code,
  Database,
  Layers,
  TreePine,
  Hash,
  ArrowUpDown,
  Target,
  Cpu,
  Binary,
  Shuffle,
  Calculator,
  Grid3x3,
  Route,
  Workflow
} from 'lucide-react';

// Icon mapping for categories and other UI elements
export const iconMap = {
  // Category icons
  'BarChart3': BarChart3,
  'Link': Link,
  'GitBranch': GitBranch,
  'Network': Network,
  'Zap': Zap,
  'Search': Search,
  'Code': Code,
  'Database': Database,
  'Layers': Layers,
  'TreePine': TreePine,
  'Hash': Hash,
  'ArrowUpDown': ArrowUpDown,
  'Target': Target,
  'Cpu': Cpu,
  'Binary': Binary,
  'Shuffle': Shuffle,
  'Calculator': Calculator,
  'Grid3x3': Grid3x3,
  'Route': Route,
  'Workflow': Workflow,
  
  // Fallback
  'default': Code
};

// Component to render dynamic icons
export const DynamicIcon = ({ iconName, className = "w-5 h-5", ...props }) => {
  const IconComponent = iconMap[iconName] || iconMap.default;
  return <IconComponent className={className} {...props} />;
};

export default DynamicIcon;
