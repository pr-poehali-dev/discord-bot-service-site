import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Icon from '@/components/ui/icon';

const FamilyBotManagement = () => {
  const navigate = useNavigate();

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
              <span className="text-cyber-cyan">СЕМЕЙНЫЙ</span>{' '}
              <span className="text-white">БОТ</span>
            </h1>
          </div>

          <Card className="bg-cyber-dark/50 border-cyber-cyan/30">
            <CardHeader>
              <CardTitle className="text-cyber-cyan flex items-center gap-2">
                <Icon name="Users" size={24} />
                Управление семейным ботом
              </CardTitle>
              <CardDescription>Панель управления находится в разработке</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-cyber-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Construction" className="text-cyber-cyan" size={40} />
                </div>
                <h3 className="text-2xl font-orbitron text-cyber-cyan mb-4">
                  В разработке
                </h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  Мы работаем над созданием удобной панели управления семейным ботом. 
                  Скоро здесь появятся инструменты для настройки всех функций.
                </p>
                <Button 
                  variant="outline" 
                  className="border-cyber-cyan text-cyber-cyan"
                  onClick={() => navigate('/contacts')}
                >
                  Связаться с поддержкой
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FamilyBotManagement;
