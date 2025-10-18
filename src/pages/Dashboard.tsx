import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    name: 'Пользователь',
    email: 'user@example.com',
    notifyExpiry: true,
    notifyUpdates: true,
    notifyNews: false,
  });

  const myBots = [
    {
      id: 1,
      type: 'family',
      name: 'Семейный бот',
      plan: 'Базовый + 2 доп. функции',
      price: 1500,
      expiryDate: '15.03.2024',
      status: 'active',
    },
    {
      id: 2,
      type: 'tournament',
      name: 'Турнирный бот',
      plan: 'Стандарт',
      price: 2500,
      expiryDate: '20.03.2024',
      status: 'active',
    },
  ];

  const handleSaveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Ваши настройки успешно обновлены",
    });
  };

  const handleTopUp = () => {
    toast({
      title: "Пополнение баланса",
      description: "Перенаправление на страницу оплаты...",
    });
  };

  const handleManageBot = (botType: string) => {
    if (botType === 'family') {
      navigate('/family-bot');
    } else if (botType === 'tournament') {
      navigate('/tournament-bot');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-orbitron font-black mb-8">
            <span className="text-cyber-cyan">ЛИЧНЫЙ</span>{' '}
            <span className="text-white">КАБИНЕТ</span>
          </h1>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-cyber-dark/50 border border-cyber-cyan/20">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="subscriptions">Подписки</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
              <TabsTrigger value="billing">Оплата</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-cyber-dark/50 border-cyber-cyan/30">
                  <CardHeader>
                    <CardTitle className="text-cyber-cyan flex items-center gap-2">
                      <Icon name="Zap" size={24} />
                      Активные боты
                    </CardTitle>
                    <CardDescription>Управление вашими Discord ботами</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myBots.map((bot) => (
                        <div key={bot.id} className="p-4 bg-cyber-darker rounded-lg border border-cyber-cyan/20">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-white">{bot.name}</h4>
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                  Активен
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400">{bot.plan}</p>
                              <p className="text-xs text-gray-500">До: {bot.expiryDate}</p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => handleManageBot(bot.type)}
                          >
                            <Icon name="Settings" size={16} className="mr-2" />
                            Управление
                          </Button>
                        </div>
                      ))}
                      
                      <Button 
                        className="w-full bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/80"
                        onClick={() => navigate('/bots')}
                      >
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить бота
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-cyber-dark/50 border-cyber-magenta/30">
                  <CardHeader>
                    <CardTitle className="text-cyber-magenta flex items-center gap-2">
                      <Icon name="Wallet" size={24} />
                      Баланс
                    </CardTitle>
                    <CardDescription>Ваш текущий баланс</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <p className="text-5xl font-orbitron font-bold text-cyber-magenta mb-2">
                        2500₽
                      </p>
                      <p className="text-gray-400">Доступно для оплаты</p>
                    </div>
                    <Button 
                      className="w-full bg-cyber-magenta text-white hover:bg-cyber-magenta/80"
                      onClick={handleTopUp}
                    >
                      Пополнить баланс
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cyber-dark/50 border-cyber-purple/30 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-cyber-purple flex items-center gap-2">
                      <Icon name="LifeBuoy" size={24} />
                      Нужна помощь?
                    </CardTitle>
                    <CardDescription>Мы всегда рады помочь вам</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-cyber-darker rounded-lg border border-cyber-purple/20">
                        <h4 className="font-semibold text-white mb-2">Документация</h4>
                        <p className="text-sm text-gray-400 mb-3">
                          Подробные инструкции по настройке и использованию ботов
                        </p>
                        <Button variant="outline" size="sm" className="border-cyber-purple text-cyber-purple">
                          Открыть документацию
                        </Button>
                      </div>
                      <div className="p-4 bg-cyber-darker rounded-lg border border-cyber-purple/20">
                        <h4 className="font-semibold text-white mb-2">Поддержка</h4>
                        <p className="text-sm text-gray-400 mb-3">
                          Свяжитесь с нами для получения помощи
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-cyber-purple text-cyber-purple"
                          onClick={() => navigate('/contacts')}
                        >
                          Написать в поддержку
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Subscriptions Tab */}
            <TabsContent value="subscriptions">
              <Card className="bg-cyber-dark/50 border-cyber-cyan/30">
                <CardHeader>
                  <CardTitle className="text-cyber-cyan">Управление подписками</CardTitle>
                  <CardDescription>Ваши активные и завершенные подписки</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myBots.map((bot) => (
                      <div key={bot.id} className="p-6 bg-cyber-darker rounded-lg border border-cyber-cyan/20">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-orbitron text-cyber-cyan">{bot.name}</h3>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                Активна
                              </Badge>
                            </div>
                            <p className="text-gray-400">Тариф: {bot.plan}</p>
                            <p className="text-gray-400">Стоимость: {bot.price}₽/месяц</p>
                            <p className="text-gray-400">Активна до: {bot.expiryDate}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button size="sm" className="bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/80">
                            Продлить
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-cyber-cyan text-cyber-cyan"
                            onClick={() => navigate('/bots')}
                          >
                            Изменить тариф
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                            Отменить
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-4">Хотите добавить ещё ботов?</p>
                      <Button 
                        className="bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/80"
                        onClick={() => navigate('/bots')}
                      >
                        Выбрать бота
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card className="bg-cyber-dark/50 border-cyber-purple/30">
                <CardHeader>
                  <CardTitle className="text-cyber-purple">Настройки профиля</CardTitle>
                  <CardDescription>Управление вашими данными и уведомлениями</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input 
                        id="name"
                        value={settings.name}
                        onChange={(e) => setSettings({...settings, name: e.target.value})}
                        className="bg-cyber-darker border-cyber-purple/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({...settings, email: e.target.value})}
                        className="bg-cyber-darker border-cyber-purple/30"
                      />
                    </div>
                  </div>

                  <div className="border-t border-cyber-purple/20 pt-6">
                    <h3 className="text-lg font-orbitron text-cyber-purple mb-4">Уведомления</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notify-expiry">Истечение подписки</Label>
                          <p className="text-sm text-gray-400">Получать уведомления о скором окончании подписки</p>
                        </div>
                        <Switch 
                          id="notify-expiry"
                          checked={settings.notifyExpiry}
                          onCheckedChange={(checked) => setSettings({...settings, notifyExpiry: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notify-updates">Обновления функций</Label>
                          <p className="text-sm text-gray-400">Уведомления о новых возможностях ботов</p>
                        </div>
                        <Switch 
                          id="notify-updates"
                          checked={settings.notifyUpdates}
                          onCheckedChange={(checked) => setSettings({...settings, notifyUpdates: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notify-news">Новости и акции</Label>
                          <p className="text-sm text-gray-400">Получать информацию о специальных предложениях</p>
                        </div>
                        <Switch 
                          id="notify-news"
                          checked={settings.notifyNews}
                          onCheckedChange={(checked) => setSettings({...settings, notifyNews: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-cyber-purple text-white hover:bg-cyber-purple/80"
                    onClick={handleSaveSettings}
                  >
                    Сохранить настройки
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-cyber-dark/50 border-cyber-magenta/30">
                  <CardHeader>
                    <CardTitle className="text-cyber-magenta">Текущий баланс</CardTitle>
                    <CardDescription>Управление средствами</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <p className="text-5xl font-orbitron font-bold text-cyber-magenta mb-2">
                        2500₽
                      </p>
                      <p className="text-gray-400">Доступно для оплаты</p>
                    </div>
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-cyber-magenta text-white hover:bg-cyber-magenta/80"
                        onClick={handleTopUp}
                      >
                        Пополнить баланс
                      </Button>
                      <div className="grid grid-cols-3 gap-2">
                        {[500, 1000, 2000].map((amount) => (
                          <Button 
                            key={amount}
                            variant="outline" 
                            size="sm"
                            className="border-cyber-magenta/30"
                            onClick={handleTopUp}
                          >
                            +{amount}₽
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-cyber-dark/50 border-cyber-cyan/30">
                  <CardHeader>
                    <CardTitle className="text-cyber-cyan">История платежей</CardTitle>
                    <CardDescription>Последние транзакции</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-cyber-darker rounded-lg">
                        <div>
                          <p className="text-white font-semibold">Пополнение баланса</p>
                          <p className="text-sm text-gray-400">01.02.2024</p>
                        </div>
                        <p className="text-green-400 font-semibold">+3000₽</p>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-cyber-darker rounded-lg">
                        <div>
                          <p className="text-white font-semibold">Оплата: Семейный бот</p>
                          <p className="text-sm text-gray-400">15.01.2024</p>
                        </div>
                        <p className="text-red-400 font-semibold">-1500₽</p>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-cyber-darker rounded-lg">
                        <div>
                          <p className="text-white font-semibold">Оплата: Турнирный бот</p>
                          <p className="text-sm text-gray-400">10.01.2024</p>
                        </div>
                        <p className="text-red-400 font-semibold">-2500₽</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;