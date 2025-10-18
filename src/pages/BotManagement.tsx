import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const BotManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tournamentTask, setTournamentTask] = useState({
    eventType: '',
    targetServer: '',
    packOwner: '',
    packStatic: '',
    colorPriority: 'all',
    customColors: [] as string[],
    blockedColors: [] as string[],
    schedule: '',
  });

  const colors = [
    'Красный', 'Синий', 'Зелёный', 'Жёлтый', 'Оранжевый', 
    'Фиолетовый', 'Розовый', 'Белый', 'Чёрный', 'Серый'
  ];

  const handleCreateTask = () => {
    if (!tournamentTask.eventType || !tournamentTask.targetServer || !tournamentTask.schedule) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Задача создана!",
      description: "Турнирная задача успешно добавлена в очередь",
    });
    
    setTournamentTask({
      eventType: '',
      targetServer: '',
      packOwner: '',
      packStatic: '',
      colorPriority: 'all',
      customColors: [],
      blockedColors: [],
      schedule: '',
    });
  };

  const toggleColor = (color: string, list: 'custom' | 'blocked') => {
    if (list === 'custom') {
      setTournamentTask(prev => ({
        ...prev,
        customColors: prev.customColors.includes(color)
          ? prev.customColors.filter(c => c !== color)
          : [...prev.customColors, color]
      }));
    } else {
      setTournamentTask(prev => ({
        ...prev,
        blockedColors: prev.blockedColors.includes(color)
          ? prev.blockedColors.filter(c => c !== color)
          : [...prev.blockedColors, color]
      }));
    }
  };

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
              <span className="text-cyber-cyan">УПРАВЛЕНИЕ</span>{' '}
              <span className="text-white">БОТАМИ</span>
            </h1>
          </div>

          <Tabs defaultValue="family" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-cyber-dark/50 border border-cyber-cyan/20">
              <TabsTrigger value="family">Семейный бот</TabsTrigger>
              <TabsTrigger value="tournament">Турнирный бот</TabsTrigger>
            </TabsList>

            {/* Family Bot Management */}
            <TabsContent value="family">
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
            </TabsContent>

            {/* Tournament Bot Management */}
            <TabsContent value="tournament">
              <Card className="bg-cyber-dark/50 border-cyber-magenta/30">
                <CardHeader>
                  <CardTitle className="text-cyber-magenta flex items-center gap-2">
                    <Icon name="Trophy" size={24} />
                    Создание турнирной задачи
                  </CardTitle>
                  <CardDescription>Настройте параметры автоматической регистрации</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Event Type */}
                  <div>
                    <Label htmlFor="eventType">Тип события *</Label>
                    <Select value={tournamentTask.eventType} onValueChange={(value) => setTournamentTask({...tournamentTask, eventType: value})}>
                      <SelectTrigger id="eventType" className="bg-cyber-darker border-cyber-magenta/30">
                        <SelectValue placeholder="Выберите тип турнира" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcl">MCL (Mobile Champions League)</SelectItem>
                        <SelectItem value="vzm">VZM (Victory Zone Masters)</SelectItem>
                        <SelectItem value="pack">Pack Tournament</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Target Server */}
                  <div>
                    <Label htmlFor="targetServer">Целевой сервер *</Label>
                    <Input
                      id="targetServer"
                      value={tournamentTask.targetServer}
                      onChange={(e) => setTournamentTask({...tournamentTask, targetServer: e.target.value})}
                      placeholder="ID сервера или ссылка-приглашение"
                      className="bg-cyber-darker border-cyber-magenta/30"
                    />
                  </div>

                  {/* Pack-specific fields */}
                  {tournamentTask.eventType === 'pack' && (
                    <div className="grid md:grid-cols-2 gap-4 p-4 bg-cyber-magenta/10 border border-cyber-magenta/30 rounded-lg">
                      <div>
                        <Label htmlFor="packOwner">Никнейм владельца</Label>
                        <Input
                          id="packOwner"
                          value={tournamentTask.packOwner}
                          onChange={(e) => setTournamentTask({...tournamentTask, packOwner: e.target.value})}
                          placeholder="Введите никнейм"
                          className="bg-cyber-darker border-cyber-magenta/30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="packStatic">Статик Name/ID</Label>
                        <Input
                          id="packStatic"
                          value={tournamentTask.packStatic}
                          onChange={(e) => setTournamentTask({...tournamentTask, packStatic: e.target.value})}
                          placeholder="Введите статик"
                          className="bg-cyber-darker border-cyber-magenta/30"
                        />
                      </div>
                    </div>
                  )}

                  {/* Color Priority */}
                  <div>
                    <Label className="mb-3 block">Приоритет цветов</Label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-cyber-darker rounded-lg border border-cyber-magenta/20">
                        <input
                          type="radio"
                          id="one-color"
                          name="colorPriority"
                          checked={tournamentTask.colorPriority === 'one'}
                          onChange={() => setTournamentTask({...tournamentTask, colorPriority: 'one'})}
                          className="text-cyber-magenta"
                        />
                        <label htmlFor="one-color" className="text-gray-300 flex-1 cursor-pointer">
                          Один цвет (отправляется только выбранный цвет)
                        </label>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-cyber-darker rounded-lg border border-cyber-magenta/20">
                        <input
                          type="radio"
                          id="all-colors"
                          name="colorPriority"
                          checked={tournamentTask.colorPriority === 'all'}
                          onChange={() => setTournamentTask({...tournamentTask, colorPriority: 'all'})}
                          className="text-cyber-magenta"
                        />
                        <label htmlFor="all-colors" className="text-gray-300 flex-1 cursor-pointer">
                          Все цвета (случайный порядок)
                        </label>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-cyber-darker rounded-lg border border-cyber-magenta/20">
                        <input
                          type="radio"
                          id="custom-order"
                          name="colorPriority"
                          checked={tournamentTask.colorPriority === 'custom'}
                          onChange={() => setTournamentTask({...tournamentTask, colorPriority: 'custom'})}
                          className="text-cyber-magenta"
                        />
                        <label htmlFor="custom-order" className="text-gray-300 flex-1 cursor-pointer">
                          Кастомный порядок (выберите последовательность ниже)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Custom Color Order */}
                  {tournamentTask.colorPriority === 'custom' && (
                    <div className="p-4 bg-cyber-magenta/10 border border-cyber-magenta/30 rounded-lg">
                      <Label className="mb-3 block">Выберите цвета и порядок:</Label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {colors.map((color) => (
                          <div 
                            key={color}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              tournamentTask.customColors.includes(color)
                                ? 'border-cyber-magenta bg-cyber-magenta/20'
                                : 'border-cyber-magenta/20 bg-cyber-darker hover:border-cyber-magenta/50'
                            }`}
                            onClick={() => toggleColor(color, 'custom')}
                          >
                            <span className="text-sm text-gray-300">{color}</span>
                            {tournamentTask.customColors.includes(color) && (
                              <span className="ml-2 text-xs text-cyber-magenta">
                                #{tournamentTask.customColors.indexOf(color) + 1}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Blocklist */}
                  <div>
                    <Label className="mb-3 block">Блокировка цветов (необязательно)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {colors.map((color) => (
                        <div 
                          key={color}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            tournamentTask.blockedColors.includes(color)
                              ? 'border-red-500 bg-red-500/20'
                              : 'border-gray-600 bg-cyber-darker hover:border-red-500/50'
                          }`}
                          onClick={() => toggleColor(color, 'blocked')}
                        >
                          <span className="text-sm text-gray-300">{color}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Выбранные цвета не будут использоваться при регистрации
                    </p>
                  </div>

                  {/* Schedule */}
                  <div>
                    <Label htmlFor="schedule">Расписание *</Label>
                    <Input
                      id="schedule"
                      type="datetime-local"
                      value={tournamentTask.schedule}
                      onChange={(e) => setTournamentTask({...tournamentTask, schedule: e.target.value})}
                      className="bg-cyber-darker border-cyber-magenta/30"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Укажите дату и время начала турнира
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    className="w-full bg-cyber-magenta text-white hover:bg-cyber-magenta/80 font-semibold text-lg"
                    onClick={handleCreateTask}
                  >
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать задачу
                  </Button>
                </CardContent>
              </Card>

              {/* Active Tasks */}
              <Card className="bg-cyber-dark/50 border-cyber-magenta/30 mt-6">
                <CardHeader>
                  <CardTitle className="text-cyber-magenta flex items-center gap-2">
                    <Icon name="List" size={24} />
                    Активные задачи
                  </CardTitle>
                  <CardDescription>Запланированные турниры</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 bg-cyber-darker rounded-lg border border-cyber-magenta/20">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">MCL Tournament</h4>
                          <p className="text-sm text-gray-400">Сервер: discord.gg/example</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                          Запланировано
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        Дата: 20.02.2024 18:00
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-cyber-magenta text-cyber-magenta">
                          Редактировать
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-500">
                          Отменить
                        </Button>
                      </div>
                    </div>

                    <div className="text-center py-6 text-gray-400">
                      <p>Создайте новую задачу для автоматической регистрации</p>
                    </div>
                  </div>
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

export default BotManagement;
