import type { ReactNode } from 'react';
import { Rocket } from 'lucide-react'; // Default icon

interface ComingSoonBannerProps {
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  className?: string;
  gradientColors?: string; 
}

export default function ComingSoonBanner({ 
  title, 
  description, 
  icon, 
  className,
  gradientColors = "from-purple-600 to-pink-600" // Default gradient
}: ComingSoonBannerProps) {
  const displayIcon = icon || <Rocket className="h-7 w-7 animate-pulse" />;
  
  return (
    <div className={`bg-gradient-to-r ${gradientColors} text-white p-6 rounded-2xl shadow-xl flex items-center space-x-4 ${className}`}>
      <div className="flex-shrink-0">
        {displayIcon}
      </div>
      <div className="text-left flex-grow">
        <p className="font-marker text-xl md:text-2xl text-white mb-1">
          {title}
        </p>
        {description && (
          <div className="text-sm md:text-base font-comic text-gray-200">{description}</div>
        )}
      </div>
    </div>
  );
}
