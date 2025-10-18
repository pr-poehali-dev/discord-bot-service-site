import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Icon from '@/components/ui/icon';

const TournamentBotManagement = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Аккаунты',
      description: 'Управление аккаунтами для турниров',
      icon: 'UserCircle',
      color: 'cyber-magenta',
      path: '/tournament-bot/accounts',
    },
    {
      title: 'Сервера',
      description: 'Выбор и настройка серверов',
      icon: 'Server',
      color: 'cyber-purple',
      path: '/tournament-bot/servers',
    },
    {
      title: 'Создание задачи',
      description: 'Настройка автоматической регистрации',
      icon: 'Trophy',
      color: 'cyber-cyan',
      path: '/tournament-bot/tasks',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="border-cyber-cyan/30"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад в кабинет
            </Button>
            <h1 className="text-4xl font-orbitron font-black">
              <span className="text-cyber-magenta">ТУРНИРНЫЙ</span>{' '}
              <span className="text-white">БОТ</span>
            </h1>
          </div>

          <Card className="bg-cyber-dark/50 border-cyber-magenta/30 mb-6">
            <CardHeader>
              <CardTitle className="text-cyber-magenta">Настройка турнирного бота</CardTitle>
              <CardDescription>Выберите раздел для управления</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {menuItems.map((item, index) => (
                  <Card 
                    key={index}
                    className={`bg-cyber-darker border-${item.color}/30 hover:border-${item.color}/60 transition-all cursor-pointer group`}
                    onClick={() => navigate(item.path)}
                  >
                    <CardHeader>
                      <div className={`w-12 h-12 bg-${item.color}/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${item.color}/30 transition-all`}>
                        <Icon name={item.icon as any} className={`text-${item.color}`} size={24} />
                      </div>
                      <CardTitle className={`text-${item.color} text-lg`}>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        className={`w-full border-${item.color}/30 text-${item.color}`}
                      >
                        Перейти
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TournamentBotManagement;
