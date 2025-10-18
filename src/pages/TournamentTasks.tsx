import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Task {
  id: string;
  eventType: string;
  openingDate: string;
  server: number;
  colorPriority: 'single' | 'all' | 'custom';
  selectedColor?: string;
  customColors: string[];
  blockedColors: string[];
  waitReplace: boolean;
  colorStatuses: { [key: string]: 'sent' | 'not-sent' };
}

const TournamentTasks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const userPlan = 'standard';
  const planLimits = {
    basic: { waitReplace: false },
    standard: { waitReplace: false },
    maximum: { waitReplace: true },
  };

  const currentLimits = planLimits[userPlan as keyof typeof planLimits];

  const [tasks, setTasks] = useState<Task[]>([]);
  
  const [newTask, setNewTask] = useState<Partial<Task>>({
    eventType: '',
    openingDate: '',
    server: undefined,
    colorPriority: 'all',
    selectedColor: undefined,
    customColors: [],
    blockedColors: [],
    waitReplace: false,
  });

  const colors = [
    'Красный', 'Синий', 'Зелёный', 'Жёлтый', 'Оранжевый', 
    'Фиолетовый', 'Розовый', 'Белый', 'Чёрный', 'Серый'
  ];

  const serverNames = [
    'NAME 1', 'NAME 2', 'NAME 3', 'NAME 4', 'NAME 5',
    'NAME 6', 'NAME 7', 'NAME 8', 'NAME 9', 'NAME 10',
    'NAME 11', 'NAME 12', 'NAME 13', 'NAME 14', 'NAME 15'
  ];

  const availableServers = [1, 2, 3, 4, 5];

  const handleCreateTask = () => {
    if (!newTask.eventType || !newTask.openingDate || !newTask.server) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    if (newTask.colorPriority === 'single' && !newTask.selectedColor) {
      toast({
        title: "Ошибка",
        description: "Выберите цвет для отправки",
        variant: "destructive",
      });
      return;
    }

    const colorStatuses: { [key: string]: 'sent' | 'not-sent' } = {};
    colors.forEach(color => {
      colorStatuses[color] = 'not-sent';
    });

    const task: Task = {
      id: Date.now().toString(),
      eventType: newTask.eventType!,
      openingDate: newTask.openingDate!,
      server: newTask.server!,
      colorPriority: newTask.colorPriority!,
      selectedColor: newTask.selectedColor,
      customColors: newTask.customColors || [],
      blockedColors: newTask.blockedColors || [],
      waitReplace: newTask.waitReplace || false,
      colorStatuses,
    };

    setTasks([...tasks, task]);
    setNewTask({
      eventType: '',
      openingDate: '',
      server: undefined,
      colorPriority: 'all',
      selectedColor: undefined,
      customColors: [],
      blockedColors: [],
      waitReplace: false,
    });

    toast({
      title: "Задача создана!",
      description: "Турнирная задача успешно добавлена",
    });
  };

  const toggleCustomColor = (color: string) => {
    const current = newTask.customColors || [];
    if (current.includes(color)) {
      setNewTask({
        ...newTask,
        customColors: current.filter(c => c !== color),
      });
    } else {
      setNewTask({
        ...newTask,
        customColors: [...current, color],
      });
    }
  };

  const toggleBlockedColor = (color: string) => {
    const current = newTask.blockedColors || [];
    if (current.includes(color)) {
      setNewTask({
        ...newTask,
        blockedColors: current.filter(c => c !== color),
      });
    } else {
      setNewTask({
        ...newTask,
        blockedColors: [...current, color],
      });
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast({
      title: "Задача удалена",
      description: "Турнирная задача удалена",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/tournament-bot')}
              className="border-cyber-cyan/30"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            <h1 className="text-4xl font-orbitron font-black">
              <span className="text-cyber-cyan">ЗАДАЧИ</span>
            </h1>
          </div>

          <div className="space-y-6">
            {/* Создание задачи */}
            <Card className="bg-cyber-dark/50 border-cyber-cyan/30">
              <CardHeader>
                <CardTitle className="text-cyber-cyan flex items-center gap-2">
                  <Icon name="Trophy" size={24} />
                  Создание турнирной задачи
                </CardTitle>
                <CardDescription>Настройте параметры автоматической регистрации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {availableServers.length === 0 ? (
                  <div className="text-center py-8 bg-cyber-cyan/5 border border-cyber-cyan/20 rounded-lg">
                    <p className="text-gray-400 mb-4">Сначала добавьте сервера</p>
                    <Button 
                      className="bg-cyber-purple text-white hover:bg-cyber-purple/80"
                      onClick={() => navigate('/tournament-bot/servers')}
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Перейти к серверам
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Тип события *</Label>
                        <Select 
                          value={newTask.eventType} 
                          onValueChange={(value) => setNewTask({...newTask, eventType: value})}
                        >
                          <SelectTrigger className="bg-cyber-darker border-cyber-cyan/30">
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mcl">MCL</SelectItem>
                            <SelectItem value="vzm">VZM</SelectItem>
                            <SelectItem value="pack">Pack</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Дата и время открытия реги *</Label>
                        <Input
                          type="datetime-local"
                          value={newTask.openingDate}
                          onChange={(e) => setNewTask({...newTask, openingDate: e.target.value})}
                          className="bg-cyber-darker border-cyber-cyan/30"
                        />
                      </div>

                      <div>
                        <Label>Выбор сервера *</Label>
                        <Select 
                          value={newTask.server?.toString()} 
                          onValueChange={(value) => setNewTask({...newTask, server: parseInt(value)})}
                        >
                          <SelectTrigger className="bg-cyber-darker border-cyber-cyan/30">
                            <SelectValue placeholder="Выберите сервер" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableServers.map((serverNum) => (
                              <SelectItem key={serverNum} value={serverNum.toString()}>
                                {serverNames[serverNum - 1]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Приоритет цветов */}
                    <div className="space-y-4">
                      <Label>Приоритет цветов *</Label>
                      <RadioGroup 
                        value={newTask.colorPriority} 
                        onValueChange={(value: 'single' | 'all' | 'custom') => setNewTask({...newTask, colorPriority: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="single" id="single" />
                          <Label htmlFor="single">Один цвет (отправляется только выбранный цвет)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all">Все цвета (случайный порядок)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom" id="custom" />
                          <Label htmlFor="custom">Кастомный порядок (выберите последовательность ниже)</Label>
                        </div>
                      </RadioGroup>

                      {/* Один цвет */}
                      {newTask.colorPriority === 'single' && (
                        <div>
                          <Label>Выберите цвет *</Label>
                          <Select 
                            value={newTask.selectedColor} 
                            onValueChange={(value) => setNewTask({...newTask, selectedColor: value})}
                          >
                            <SelectTrigger className="bg-cyber-darker border-cyber-cyan/30">
                              <SelectValue placeholder="Выберите цвет" />
                            </SelectTrigger>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem key={color} value={color}>{color}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Кастомный порядок */}
                      {newTask.colorPriority === 'custom' && (
                        <div className="p-4 bg-cyber-cyan/5 border border-cyber-cyan/20 rounded-lg">
                          <Label className="mb-2 block">Выберите последовательность цветов</Label>
                          <div className="flex flex-wrap gap-2">
                            {colors.map((color) => {
                              const isSelected = newTask.customColors?.includes(color);
                              return (
                                <Button
                                  key={color}
                                  size="sm"
                                  variant={isSelected ? "default" : "outline"}
                                  className={isSelected ? 'bg-cyber-cyan text-cyber-dark' : 'border-cyber-cyan/30'}
                                  onClick={() => toggleCustomColor(color)}
                                >
                                  {color}
                                  {isSelected && ` (${newTask.customColors!.indexOf(color) + 1})`}
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Блокировка цветов */}
                      {newTask.colorPriority !== 'single' && (
                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                          <Label className="mb-2 block">Блокировка цветов (необязательно)</Label>
                          <div className="flex flex-wrap gap-2">
                            {colors.map((color) => {
                              const isBlocked = newTask.blockedColors?.includes(color);
                              return (
                                <Button
                                  key={color}
                                  size="sm"
                                  variant={isBlocked ? "default" : "outline"}
                                  className={isBlocked ? 'bg-red-500 text-white' : 'border-red-500/30'}
                                  onClick={() => toggleBlockedColor(color)}
                                >
                                  {color}
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Ждать замену */}
                    {currentLimits.waitReplace && (
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="waitReplace" 
                          checked={newTask.waitReplace}
                          onCheckedChange={(checked) => setNewTask({...newTask, waitReplace: checked as boolean})}
                        />
                        <Label htmlFor="waitReplace">Ждать замену?</Label>
                      </div>
                    )}

                    <Button 
                      className="w-full bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/80"
                      onClick={handleCreateTask}
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Создать задачу
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Список задач */}
            {tasks.length > 0 && (
              <Card className="bg-cyber-dark/50 border-cyber-magenta/30">
                <CardHeader>
                  <CardTitle className="text-cyber-magenta flex items-center gap-2">
                    <Icon name="List" size={24} />
                    Активные задачи
                    <Badge className="ml-2 bg-cyber-magenta/20 text-cyber-magenta border-cyber-magenta/30">
                      {tasks.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Список созданных турнирных задач</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className="p-4 bg-cyber-darker rounded-lg border border-cyber-magenta/20">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">
                              {task.eventType.toUpperCase()} - {serverNames[task.server - 1]}
                            </h4>
                            <p className="text-sm text-gray-400">
                              Открытие: {new Date(task.openingDate).toLocaleString('ru-RU')}
                            </p>
                            <p className="text-xs text-gray-500">
                              Приоритет: {
                                task.colorPriority === 'single' ? `Один цвет (${task.selectedColor})` :
                                task.colorPriority === 'all' ? 'Все цвета (случайно)' :
                                'Кастомный порядок'
                              }
                            </p>
                            {task.waitReplace && (
                              <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                Ожидание замены включено
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-cyber-cyan text-cyber-cyan"
                                >
                                  <Icon name="Palette" size={16} className="mr-2" />
                                  Цвета
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-cyber-dark border-cyber-cyan/30">
                                <DialogHeader>
                                  <DialogTitle className="text-cyber-cyan">Статусы цветов</DialogTitle>
                                  <DialogDescription>
                                    Отслеживание отправленных цветов для задачи
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                  {colors.map((color) => (
                                    <div 
                                      key={color} 
                                      className="flex items-center justify-between p-3 bg-cyber-darker rounded-lg border border-cyber-cyan/20"
                                    >
                                      <span className="text-white">{color}</span>
                                      <Badge 
                                        className={
                                          task.colorStatuses[color] === 'sent'
                                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                            : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                        }
                                      >
                                        {task.colorStatuses[color] === 'sent' ? 'Отправлен' : 'Не отправлен'}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-500/10"
                              onClick={() => deleteTask(task.id)}
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Навигация */}
            <div className="flex justify-start">
              <Button 
                variant="outline"
                className="border-cyber-purple text-cyber-purple"
                onClick={() => navigate('/tournament-bot/servers')}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад: Сервера
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TournamentTasks;
