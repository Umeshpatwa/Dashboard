import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';

const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const getChangeIcon = () => {
    if (changeType === 'increase') return <ArrowUp size={16} />;
    if (changeType === 'decrease') return <ArrowDown size={16} />;
    return <ArrowRight size={16} />;
  };

  const getChangeColor = () => {
    if (changeType === 'increase') return 'text-green-500';
    if (changeType === 'decrease') return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className={`stat-card ${color} rounded-lg p-6 text-white`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className="p-2 rounded-lg bg-white/10">
          <Icon size={24} className="text-white" />
        </div>
      </div>
      {change && (
        <div className={`mt-4 flex items-center text-sm ${getChangeColor()}`}>
          <span className="flex items-center mr-1">
            {getChangeIcon()} {change}
          </span>
          <span className="ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
