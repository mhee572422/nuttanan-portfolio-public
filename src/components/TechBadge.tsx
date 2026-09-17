import React from 'react';
import { FaAws, FaHtml5, FaCss3, FaWordpress } from 'react-icons/fa';
import { LayoutTemplate } from 'lucide-react';
import { 
  SiReact, 
  SiFigma, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiTypescript, 
  SiPython, 
  SiDocker, 
  SiFirebase, 
  SiPostgresql,
  SiJavascript,
  
  
  SiVite,
  SiExpress,
  SiMongodb,
  SiGraphql,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiGooglecloud,
  SiD3,
  SiStripe,
  SiFramer
} from 'react-icons/si';

const iconMap: Record<string, { icon: React.ReactNode, color: string }> = {
  'React': { icon: <SiReact />, color: '#61DAFB' },
  'React Native': { icon: <SiReact />, color: '#61DAFB' },
  'Figma': { icon: <SiFigma />, color: '#F24E1E' },
  'Tailwind CSS': { icon: <SiTailwindcss />, color: '#06B6D4' },
  'Node.js': { icon: <SiNodedotjs />, color: '#339933' },
  'AWS': { icon: <FaAws />, color: '#232F3E' },
  'TypeScript': { icon: <SiTypescript />, color: '#3178C6' },
  'Python': { icon: <SiPython />, color: '#3776AB' },
  'Docker': { icon: <SiDocker />, color: '#2496ED' },
  'Firebase': { icon: <SiFirebase />, color: '#FFCA28' },
  'PostgreSQL': { icon: <SiPostgresql />, color: '#4169E1' },
  'JavaScript': { icon: <SiJavascript />, color: '#F7DF1E' },
  'HTML': { icon: <FaHtml5 />, color: '#E34F26' },
  'CSS': { icon: <FaCss3 />, color: '#1572B6' },
  'Vite': { icon: <SiVite />, color: '#646CFF' },
  'Express': { icon: <SiExpress />, color: '#FFFFFF' },
  'MongoDB': { icon: <SiMongodb />, color: '#47A248' },
  'GraphQL': { icon: <SiGraphql />, color: '#E10098' },
  'Next.js': { icon: <SiNextdotjs />, color: '#FFFFFF' },
  'Vue': { icon: <SiVuedotjs />, color: '#4FC08D' },
  'Angular': { icon: <SiAngular />, color: '#DD0031' },
  'GCP': { icon: <SiGooglecloud />, color: '#4285F4' },
  'D3.js': { icon: <SiD3 />, color: '#F9A03C' },
  'Stripe': { icon: <SiStripe />, color: '#008CDD' },
  'Framer': { icon: <SiFramer />, color: '#0055FF' },
  'CMS': { icon: <FaWordpress />, color: '#21759B' },
  'REST API': { icon: <LayoutTemplate />, color: '#E34F26' },
  'Vue.js': { icon: <SiVuedotjs />, color: '#4FC08D' },
};

interface TechBadgeProps {
  tech: string;
  size?: 'sm' | 'md';
}

const TechBadge: React.FC<TechBadgeProps> = ({ tech, size = 'md' }) => {

  // Find a matching key by lowercasing to handle slight mismatches
  const mappedKey = Object.keys(iconMap).find(k => k.toLowerCase() === tech.toLowerCase());
  const match = mappedKey ? iconMap[mappedKey] : null;

  if (!match) {
    // Fallback badge if no icon is found
    return (
      <span className={`inline-flex items-center gap-1.5 bg-foreground/5 border border-foreground/10 text-foreground/60 rounded-full whitespace-nowrap ${
        size === 'sm' ? 'px-2 py-1 text-[8px] uppercase tracking-wider' : 'px-2.5 py-1 text-[10px] uppercase tracking-wider'
      }`}>
        {tech}
      </span>
    );
  }

  return (
    <span 
      className={`inline-flex items-center gap-1.5 bg-surface border rounded-full whitespace-nowrap transition-colors ${
        size === 'sm' ? 'px-2 py-1 text-[8px] uppercase tracking-wider' : 'px-2.5 py-1 text-[10px] uppercase tracking-wider'
      }`}
      style={{ borderColor: `${match.color}40` }}
    >
      <span style={{ color: match.color }}>{match.icon}</span>
      <span className="text-foreground/80">{tech}</span>
    </span>
  );
}

export default TechBadge;