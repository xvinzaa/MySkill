import { useNavigate } from 'react-router-dom';
import { Car, Flame, Zap, Wrench, Settings, TreeDeciduous } from 'lucide-react';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const getIcon = (iconName) => {
    const iconClass = "h-8 w-8";
    const props = { className: iconClass };
    switch (iconName) {
      case 'car':
        return <Car {...props} />;
      case 'flame':
        return <Flame {...props} />;
      case 'zap':
        return <Zap {...props} />;
      case 'wrench':
        return <Wrench {...props} />;
      case 'settings':
        return <Settings {...props} />;
      case 'tree':
        return <TreeDeciduous {...props} />;
      default:
        return <Wrench {...props} />;
    }
  };

  const handleClick = () => {
    navigate(`/?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group w-full text-left"
    >
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${category.color}20`, color: category.color }}
      >
        {getIcon(category.icon)}
      </div>
      <h3 className="font-semibold text-text-primary text-sm text-center group-hover:text-primary transition-colors duration-200">
        {category.name}
      </h3>
    </button>
  );
};

export default CategoryCard;
