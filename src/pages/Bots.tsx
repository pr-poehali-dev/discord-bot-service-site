import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Icon from '@/components/ui/icon';

const Bots = () => {
  const [activeTab, setActiveTab] = useState('family');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedTournamentPlan, setSelectedTournamentPlan] = useState<string>('');

  const additionalFeatures = [
    { id: 'threads', name: 'Управление тредами', price: 300 },
    { id: 'notifications', name: 'Система уведомлений', price: 200 },
    { id: 'stats', name: 'Статистика активности', price: 250 },
    { id: 'integration', name: 'Интеграция с API', price: 500 },
  ];

  const tournamentPlans = [
    {
      id: 'starter',
      name: 'Начальный',
      price: 1500,
      features: [
        '1 аккаунт для регистрации',
        '4 сервера',
        '0.5мм к/д проверки прав',
      ]
    },
    {
      id: 'standard',
      name: 'Стандарт',
      price: 2500,
      features: [
        '1 аккаунт для регистрации',
        '8 серверов',
        '0.3мм к/д проверки прав',
      ],
      popular: true
    },
    {
      id: 'maximum',
      name: 'Максимум',
      price: 4000,
      features: [
        '2 аккаунта для регистрации',
        '15 серверов',
        '0.1мм к/д проверки прав',
      ]
    },
  ];

  const calculateFamilyTotal = () => {
    const basePrice = 1000;
    const featuresPrice = selectedFeatures.reduce((sum, featureId) => {
      const feature = additionalFeatures.find(f => f.id === featureId);
      return sum + (feature?.price || 0);
    }, 0);
    return basePrice + featuresPrice;
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <h1 className="text-5xl font-orbitron font-black text-center mb-4">
            <span className="text-cyber-cyan">НАШИ</span>{' '}
            <span className="text-cyber-magenta">РЕШЕНИЯ</span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Выберите готовое решение или закажите разработку под ваши задачи
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-cyber-dark/50 border border-cyber-cyan/20">
              <TabsTrigger value="family" className="data-[state=active]:bg-cyber-cyan data-[state=active]:text-cyber-dark">
                Семейный бот
              </TabsTrigger>
              <TabsTrigger value="tournament" className="data-[state=active]:bg-cyber-magenta data-[state=active]:text-white">
                Турнирный бот
              </TabsTrigger>
              <TabsTrigger value="custom" className="data-[state=active]:bg-cyber-purple data-[state=active]:text-white">
                Кастомный бот
              </TabsTrigger>
            </TabsList>

            {/* Family Bot */}
            <TabsContent value="family">
              <Card className="bg-cyber-dark/50 border-cyber-cyan/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-cyber-cyan/20 rounded-lg flex items-center justify-center">
                      <Icon name="Users" className="text-cyber-cyan" size={32} />
                    </div>
                    <div>
                      <CardTitle className="text-cyber-cyan text-3xl mb-2">Семейный бот</CardTitle>
                      <CardDescription className="text-gray-400 text-lg">
                        Базовый тариф с возможностью добавления дополнительных функций
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-orbitron text-cyber-cyan mb-4">Базовые функции (включены):</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Управление списками участников</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Система баллов и наград</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Внутрисемейный магазин</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Обработка заявок</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-orbitron text-cyber-cyan mb-4">Дополнительные функции:</h3>
                      <div className="space-y-3">
                        {additionalFeatures.map((feature) => (
                          <div key={feature.id} className="flex items-center justify-between p-3 bg-cyber-darker rounded-lg border border-cyber-cyan/20">
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                id={feature.id}
                                checked={selectedFeatures.includes(feature.id)}
                                onCheckedChange={() => toggleFeature(feature.id)}
                              />
                              <label htmlFor={feature.id} className="text-gray-300 cursor-pointer">
                                {feature.name}
                              </label>
                            </div>
                            <span className="text-cyber-cyan font-semibold">+{feature.price}₽</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-orbitron text-cyber-cyan mb-2">Стоимость аренды:</h3>
                        <p className="text-gray-400">Базовый тариф: 1000₽/месяц</p>
                        {selectedFeatures.length > 0 && (
                          <p className="text-gray-400">
                            Доп. функции: +{calculateFamilyTotal() - 1000}₽/месяц
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Итого в месяц:</p>
                        <p className="text-4xl font-bold text-cyber-cyan">{calculateFamilyTotal()}₽</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/dashboard">
                    <Button size="lg" className="w-full bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/80 font-semibold text-lg">
                      Арендовать сейчас
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tournament Bot */}
            <TabsContent value="tournament">
              <Card className="bg-cyber-dark/50 border-cyber-magenta/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-cyber-magenta/20 rounded-lg flex items-center justify-center">
                      <Icon name="Trophy" className="text-cyber-magenta" size={32} />
                    </div>
                    <div>
                      <CardTitle className="text-cyber-magenta text-3xl mb-2">Турнирный бот</CardTitle>
                      <CardDescription className="text-gray-400 text-lg">
                        Выберите тариф под ваши потребности
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {tournamentPlans.map((plan) => (
                      <Card 
                        key={plan.id}
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedTournamentPlan === plan.id
                            ? 'bg-cyber-magenta/20 border-cyber-magenta scale-105'
                            : 'bg-cyber-darker border-cyber-magenta/20 hover:border-cyber-magenta/50'
                        } ${plan.popular ? 'relative' : ''}`}
                        onClick={() => setSelectedTournamentPlan(plan.id)}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-cyber-magenta text-white px-3 py-1 rounded-full text-xs font-semibold">
                              Популярный
                            </span>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-cyber-magenta text-2xl text-center">
                            {plan.name}
                          </CardTitle>
                          <div className="text-center pt-4">
                            <p className="text-4xl font-orbitron font-bold text-white">
                              {plan.price}₽
                            </p>
                            <p className="text-gray-400 text-sm">в месяц</p>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={18} />
                                <span className="text-gray-300 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-cyber-magenta/10 border border-cyber-magenta/30 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-orbitron text-cyber-magenta mb-4">Все тарифы включают:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-300 text-sm">Поддержка MCL, VZM, Pack</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-300 text-sm">Автоматическая регистрация</span>
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-300 text-sm">Управление цветами команд</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-300 text-sm">Планировщик расписания</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <Link to="/dashboard">
                    <Button 
                      size="lg" 
                      className="w-full bg-cyber-magenta text-white hover:bg-cyber-magenta/80 font-semibold text-lg"
                      disabled={!selectedTournamentPlan}
                    >
                      {selectedTournamentPlan ? 'Арендовать выбранный тариф' : 'Выберите тариф'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Custom Bot */}
            <TabsContent value="custom">
              <Card className="bg-cyber-dark/50 border-cyber-purple/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-cyber-purple/20 rounded-lg flex items-center justify-center">
                      <Icon name="Sparkles" className="text-cyber-purple" size={32} />
                    </div>
                    <div>
                      <CardTitle className="text-cyber-purple text-3xl mb-2">Кастомный бот</CardTitle>
                      <CardDescription className="text-gray-400 text-lg">
                        Разработка уникального бота под ваши требования
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-orbitron text-cyber-purple mb-4">Что мы разработаем:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Любые команды и функции по вашему запросу</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Интеграция с внешними API и сервисами</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Базы данных и системы хранения</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Сложная бизнес-логика</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-orbitron text-cyber-purple mb-4">Что входит в услугу:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Консультация и анализ требований</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Разработка и тестирование</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Документация и обучение</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-purple mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Техподдержка и обновления</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg p-6 mb-6">
                    <h3 className="text-2xl font-orbitron text-cyber-purple mb-4">Стоимость разработки:</h3>
                    <p className="text-gray-300 mb-4">
                      Цена индивидуальна и зависит от сложности проекта, количества функций и сроков разработки.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-gray-400 mb-2">Простой бот</p>
                        <p className="text-3xl font-bold text-cyber-purple">от 5000₽</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 mb-2">Средней сложности</p>
                        <p className="text-3xl font-bold text-cyber-purple">от 15000₽</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 mb-2">Сложный проект</p>
                        <p className="text-3xl font-bold text-cyber-purple">от 30000₽</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/contacts">
                    <Button size="lg" className="w-full bg-cyber-purple text-white hover:bg-cyber-purple/80 font-semibold text-lg">
                      Обсудить проект
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bots;
