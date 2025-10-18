import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Icon from '@/components/ui/icon';

const Bots = () => {
  const [activeTab, setActiveTab] = useState('family');

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
                        Полнофункциональное управление семейным Discord сообществом
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-orbitron text-cyber-cyan mb-4">Основные функции:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Автоматическое управление списками участников семьи</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Система баллов и наград для активных участников</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Внутрисемейный магазин с уникальными товарами</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Автоматическая обработка заявок на вступление</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-orbitron text-cyber-cyan mb-4">Дополнительно:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Управление тредами и каналами семьи</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Система уведомлений о важных событиях</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Статистика активности участников</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-cyan mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Интеграция с внешними системами</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg p-6 mb-6">
                    <h3 className="text-2xl font-orbitron text-cyber-cyan mb-4">Цены на аренду:</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-gray-400 mb-2">1 месяц</p>
                        <p className="text-3xl font-bold text-cyber-cyan">1500₽</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 mb-2">3 месяца</p>
                        <p className="text-3xl font-bold text-cyber-cyan">4000₽</p>
                        <p className="text-sm text-green-400">Выгода 500₽</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 mb-2">6 месяцев</p>
                        <p className="text-3xl font-bold text-cyber-cyan">7500₽</p>
                        <p className="text-sm text-green-400">Выгода 1500₽</p>
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
                        Автоматизация регистрации и управления турнирами
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-orbitron text-cyber-magenta mb-4">Поддерживаемые турниры:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">MCL (Mobile Champions League)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">VZM (Victory Zone Masters)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Pack Tournament</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Другие форматы на заказ</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-orbitron text-cyber-magenta mb-4">Возможности:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Автоматическая регистрация участников</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Управление цветами команд и приоритетами</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Планировщик расписания турниров</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon name="Check" className="text-cyber-magenta mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-300">Блокировка нежелательных цветов</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-cyber-magenta/10 border border-cyber-magenta/30 rounded-lg p-6 mb-6">
                    <h3 className="text-2xl font-orbitron text-cyber-magenta mb-4">Цены на аренду:</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-gray-400 mb-2">1 месяц</p>
                        <p className="text-3xl font-bold text-cyber-magenta">2000₽</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 mb-2">3 месяца</p>
                        <p className="text-3xl font-bold text-cyber-magenta">5500₽</p>
                        <p className="text-sm text-green-400">Выгода 500₽</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 mb-2">6 месяцев</p>
                        <p className="text-3xl font-bold text-cyber-magenta">10000₽</p>
                        <p className="text-sm text-green-400">Выгода 2000₽</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/dashboard">
                    <Button size="lg" className="w-full bg-cyber-magenta text-white hover:bg-cyber-magenta/80 font-semibold text-lg">
                      Арендовать сейчас
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
