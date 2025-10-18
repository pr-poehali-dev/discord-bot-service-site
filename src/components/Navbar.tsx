import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-cyber-dark/80 backdrop-blur-lg border-b border-cyber-cyan/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Zap" className="text-cyber-cyan" size={32} />
            <span className="text-2xl font-orbitron font-bold text-cyber-cyan">DISCORD BOTS</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white hover:text-cyber-cyan transition-colors">
              Главная
            </Link>
            <Link to="/bots" className="text-white hover:text-cyber-cyan transition-colors">
              Боты
            </Link>
            <Link to="/changelog" className="text-white hover:text-cyber-cyan transition-colors">
              Обновления
            </Link>
            <Link to="/contacts" className="text-white hover:text-cyber-cyan transition-colors">
              Контакты
            </Link>
          </div>

          <Link to="/dashboard">
            <Button className="bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/80 font-semibold">
              Кабинет
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
