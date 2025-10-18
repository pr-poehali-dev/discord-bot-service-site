import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Icon from '@/components/ui/icon';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-orbitron font-black mb-6 animate-slide-up">
            <span className="text-cyber-cyan">МОЩНЫЕ</span>{' '}
            <span className="text-cyber-magenta">DISCORD</span>{' '}
            <span className="text-cyber-purple">БОТЫ</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up">
            Профессиональная разработка и аренда кастомных Discord ботов для вашего сообщества
          </p>
          <div className="flex gap-4 justify-center animate-slide-up">
            <Link to="/bots">
              <Button size="lg" className="bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/80 font-semibold text-lg px-8">
                Посмотреть ботов
              </Button>
            </Link>
            <Link to="/contacts">
              <Button size="lg" variant="outline" className="border-cyber-magenta text-cyber-magenta hover:bg-cyber-magenta/10 font-semibold text-lg px-8">
                Связаться с нами
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ready Bots Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12">
            <span className="text-cyber-cyan">ГОТОВЫЕ</span>{' '}
            <span className="text-white">РЕШЕНИЯ</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Family Bot */}
            <Card className="bg-cyber-dark/50 border-cyber-cyan/30 backdrop-blur-sm hover:border-cyber-cyan transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-cyber-cyan/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-cyber-cyan" size={24} />
                </div>
                <CardTitle className="text-cyber-cyan text-2xl">Семейный бот</CardTitle>
                <CardDescription className="text-gray-400">
                  Полное управление семейным сообществом
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={16} />
                    <span>Списки участников</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={16} />
                    <span>Система баллов и магазин</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={16} />
                    <span>Обработка заявок</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={16} />
                    <span>Управление тредами</span>
                  </li>
                </ul>
                <Link to="/bots">
                  <Button className="w-full bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/80">
                    Подробнее
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tournament Bot */}
            <Card className="bg-cyber-dark/50 border-cyber-magenta/30 backdrop-blur-sm hover:border-cyber-magenta transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-cyber-magenta/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Trophy" className="text-cyber-magenta" size={24} />
                </div>
                <CardTitle className="text-cyber-magenta text-2xl">Турнирный бот</CardTitle>
                <CardDescription className="text-gray-400">
                  Автоматизация регистрации турниров
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={16} />
                    <span>Поддержка MCL, VZM, Pack</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={16} />
                    <span>Автоматическая регистрация</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={16} />
                    <span>Управление расписанием</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={16} />
                    <span>Настройка цветов команд</span>
                  </li>
                </ul>
                <Link to="/bots">
                  <Button className="w-full bg-cyber-magenta text-white hover:bg-cyber-magenta/80">
                    Подробнее
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Custom Bot */}
            <Card className="bg-cyber-dark/50 border-cyber-purple/30 backdrop-blur-sm hover:border-cyber-purple transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-cyber-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Sparkles" className="text-cyber-purple" size={24} />
                </div>
                <CardTitle className="text-cyber-purple text-2xl">Кастомный бот</CardTitle>
                <CardDescription className="text-gray-400">
                  Разработка под ваши задачи
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={16} />
                    <span>Индивидуальная разработка</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={16} />
                    <span>Любые функции на заказ</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={16} />
                    <span>Техническая поддержка</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={16} />
                    <span>Регулярные обновления</span>
                  </li>
                </ul>
                <Link to="/bots">
                  <Button className="w-full bg-cyber-purple text-white hover:bg-cyber-purple/80">
                    Заказать разработку
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyber-cyan/10 via-cyber-magenta/10 to-cyber-purple/10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-orbitron font-bold mb-6">
            <span className="text-cyber-magenta">НУЖНО ЧТО-ТО</span>{' '}
            <span className="text-cyber-cyan">УНИКАЛЬНОЕ?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Мы разрабатываем кастомные боты под ваши конкретные задачи и требования
          </p>
          <Link to="/contacts">
            <Button size="lg" className="bg-cyber-magenta text-white hover:bg-cyber-magenta/80 font-semibold text-lg px-8">
              Обсудить проект
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
