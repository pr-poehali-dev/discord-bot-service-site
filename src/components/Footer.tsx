import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export const Footer = () => {
  return (
    <footer className="bg-cyber-dark border-t border-cyber-cyan/20 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Zap" className="text-cyber-cyan" size={28} />
              <span className="text-xl font-orbitron font-bold text-cyber-cyan">DISCORD BOTS</span>
            </div>
            <p className="text-gray-400">
              Профессиональная разработка и аренда Discord ботов для вашего сообщества
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="font-orbitron text-cyber-cyan text-lg mb-2">Навигация</h3>
            <Link to="/" className="text-gray-400 hover:text-cyber-cyan transition-colors">
              Главная
            </Link>
            <Link to="/bots" className="text-gray-400 hover:text-cyber-cyan transition-colors">
              Боты
            </Link>
            <Link to="/changelog" className="text-gray-400 hover:text-cyber-cyan transition-colors">
              Обновления
            </Link>
            <Link to="/contacts" className="text-gray-400 hover:text-cyber-cyan transition-colors">
              Контакты
            </Link>
          </div>
        </div>
        
        <div className="border-t border-cyber-cyan/20 mt-8 pt-8 text-center text-gray-500">
          <p>© 2024 Discord Bots. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
