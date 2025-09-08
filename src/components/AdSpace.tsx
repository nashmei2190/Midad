import React from 'react';

interface AdSpaceProps {
  size: 'banner' | 'rectangle' | 'leaderboard' | 'square';
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ size, position, className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'banner':
        return 'w-full h-24 md:h-32';
      case 'rectangle':
        return 'w-full h-48 md:h-64';
      case 'leaderboard':
        return 'w-full h-16 md:h-20';
      case 'square':
        return 'w-64 h-64';
      default:
        return 'w-full h-32';
    }
  };

  const getPositionId = () => {
    return `ad-${size}-${position}`;
  };

  return (
    <div className={`${getSizeClasses()} ${className}`}>
      <div 
        id={getPositionId()}
        className="w-full h-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center"
      >
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-sm font-medium">مساحة إعلانية</div>
          <div className="text-xs mt-1">{size} - {position}</div>
          <div className="text-xs text-gray-400 mt-1">
            جاهزة لـ AdSense
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSpace;