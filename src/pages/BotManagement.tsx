import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface Account {
  id: string;
  familyName: string;
  ownerNickname: string;
  ownerStatic: string;
  authType: 'token' | 'login';
  authData: string;
  password?: string;
}

interface Server {
  accountId: string;
  serverNumber: number;
}

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

const BotManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const userPlan = 'standard';
  const planLimits = {
    basic: { accounts: 1, servers: 4, waitReplace: false },
    standard: { accounts: 1, servers: 8, waitReplace: false },
    maximum: { accounts: 2, servers: 15, waitReplace: true },
  };

  const currentLimits = planLimits[userPlan as keyof typeof planLimits];

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [servers, setServers] = useState<Server[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    familyName: '',
    ownerNickname: '',
    ownerStatic: '',
    authType: 'token',
    authData: '',
    password: '',
  });

  const [selectedAccountForServer, setSelectedAccountForServer] = useState('');
  const [selectedServers, setSelectedServers] = useState<number[]>([]);

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

  const handleAddAccount = () => {
    if (!newAccount.familyName || !newAccount.ownerNickname || !newAccount.ownerStatic || !newAccount.authData) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    if (accounts.length >= currentLimits.accounts) {
      toast({
        title: "Лимит достигнут",
        description: `Ваш тариф позволяет добавить только ${currentLimits.accounts} аккаунт(ов)`,
        variant: "destructive",
      });
      return;
    }

    const account: Account = {
      id: Date.now().toString(),
      familyName: newAccount.familyName!,
      ownerNickname: newAccount.ownerNickname!,
      ownerStatic: newAccount.ownerStatic!,
      authType: newAccount.authType!,
      authData: newAccount.authData!,
      password: newAccount.authType === 'login' ? newAccount.password : undefined,
    };

    setAccounts([...accounts, account]);
    setNewAccount({
      familyName: '',
      ownerNickname: '',
      ownerStatic: '',
      authType: 'token',
      authData: '',
      password: '',
    });

    toast({
      title: "Аккаунт добавлен!",
      description: "Теперь вы можете выбрать сервера для этого аккаунта",
    });
  };

  const handleAddServers = () => {
    if (!selectedAccountForServer) {
      toast({
        title: "Ошибка",
        description: "Выберите аккаунт",
        variant: "destructive",
      });
      return;
    }

    if (selectedServers.length === 0) {
      toast({
        title: "Ошибка",
        description: "Выберите хотя бы один сервер",
        variant: "destructive",
      });
      return;
    }

    const accountServers = servers.filter(s => s.accountId === selectedAccountForServer);
    if (accountServers.length + selectedServers.length > currentLimits.servers) {
      toast({
        title: "Лимит достигнут",
        description: `Ваш тариф позволяет добавить только ${currentLimits.servers} сервер(ов) для одного аккаунта`,
        variant: "destructive",
      });
      return;
    }

    const newServers = selectedServers.map(num => ({
      accountId: selectedAccountForServer,
      serverNumber: num,
    }));

    setServers([...servers, ...newServers]);
    setSelectedServers([]);

    toast({
      title: "Сервера добавлены!",
      description: `Добавлено ${selectedServers.length} сервер(ов)`,
    });
  };

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

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id));
    setServers(servers.filter(s => s.accountId !== id));
    toast({
      title: "Аккаунт удалён",
      description: "Аккаунт и связанные сервера удалены",
    });
  };

  const deleteServer = (accountId: string, serverNumber: number) => {
    setServers(servers.filter(s => !(s.accountId === accountId && s.serverNumber === serverNumber)));
    toast({
      title: "Сервер удалён",
      description: "Сервер удалён из списка",
    });
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
        <div className="container mx-auto max-w-6xl">
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
              <div className="space-y-6">
                {/* 1. Аккаунты */}
                <Card className="bg-cyber-dark/50 border-cyber-magenta/30">
                  <CardHeader>
                    <CardTitle className="text-cyber-magenta flex items-center gap-2">
                      <Icon name="UserCircle" size={24} />
                      1. Аккаунты
                      <Badge className="ml-2 bg-cyber-magenta/20 text-cyber-magenta border-cyber-magenta/30">
                        {accounts.length}/{currentLimits.accounts}
                      </Badge>
                    </CardTitle>
                    <CardDescription>Добавьте аккаунты для управления турнирами</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Список аккаунтов */}
                    {accounts.length > 0 && (
                      <div className="space-y-3">
                        {accounts.map((account) => (
                          <div key={account.id} className="p-4 bg-cyber-darker rounded-lg border border-cyber-magenta/20">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-white mb-1">{account.familyName}</h4>
                                <p className="text-sm text-gray-400">
                                  Owner: {account.ownerNickname} ({account.ownerStatic})
                                </p>
                                <p className="text-xs text-gray-500">
                                  Авторизация: {account.authType === 'token' ? 'Токен' : 'Логин/Пароль'}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-500/10"
                                onClick={() => deleteAccount(account.id)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Форма добавления */}
                    {accounts.length < currentLimits.accounts && (
                      <div className="space-y-4 p-4 bg-cyber-magenta/5 border border-cyber-magenta/20 rounded-lg">
                        <h4 className="font-orbitron text-cyber-magenta">Добавить аккаунт</h4>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Название семьи *</Label>
                            <Input
                              value={newAccount.familyName}
                              onChange={(e) => setNewAccount({...newAccount, familyName: e.target.value})}
                              placeholder="Введите название"
                              className="bg-cyber-darker border-cyber-magenta/30"
                            />
                          </div>
                          <div>
                            <Label>Никнейм владельца *</Label>
                            <Input
                              value={newAccount.ownerNickname}
                              onChange={(e) => setNewAccount({...newAccount, ownerNickname: e.target.value})}
                              placeholder="Введите никнейм"
                              className="bg-cyber-darker border-cyber-magenta/30"
                            />
                          </div>
                          <div>
                            <Label>Статик владельца *</Label>
                            <Input
                              value={newAccount.ownerStatic}
                              onChange={(e) => setNewAccount({...newAccount, ownerStatic: e.target.value})}
                              placeholder="Введите статик"
                              className="bg-cyber-darker border-cyber-magenta/30"
                            />
                          </div>
                          <div>
                            <Label>Способ авторизации *</Label>
                            <Select 
                              value={newAccount.authType} 
                              onValueChange={(value: 'token' | 'login') => setNewAccount({...newAccount, authType: value})}
                            >
                              <SelectTrigger className="bg-cyber-darker border-cyber-magenta/30">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="token">Через токен</SelectItem>
                                <SelectItem value="login">Логин/Пароль</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {newAccount.authType === 'token' ? (
                          <div>
                            <Label>Токен авторизации *</Label>
                            <Input
                              type="password"
                              value={newAccount.authData}
                              onChange={(e) => setNewAccount({...newAccount, authData: e.target.value})}
                              placeholder="Введите токен"
                              className="bg-cyber-darker border-cyber-magenta/30"
                            />
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>Логин *</Label>
                              <Input
                                value={newAccount.authData}
                                onChange={(e) => setNewAccount({...newAccount, authData: e.target.value})}
                                placeholder="Введите логин"
                                className="bg-cyber-darker border-cyber-magenta/30"
                              />
                            </div>
                            <div>
                              <Label>Пароль *</Label>
                              <Input
                                type="password"
                                value={newAccount.password}
                                onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
                                placeholder="Введите пароль"
                                className="bg-cyber-darker border-cyber-magenta/30"
                              />
                            </div>
                          </div>
                        )}

                        <Button 
                          className="w-full bg-cyber-magenta text-white hover:bg-cyber-magenta/80"
                          onClick={handleAddAccount}
                        >
                          <Icon name="Plus" size={16} className="mr-2" />
                          Добавить аккаунт
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 2. Сервера */}
                <Card className="bg-cyber-dark/50 border-cyber-purple/30">
                  <CardHeader>
                    <CardTitle className="text-cyber-purple flex items-center gap-2">
                      <Icon name="Server" size={24} />
                      2. Сервера
                    </CardTitle>
                    <CardDescription>Выберите сервера для каждого аккаунта</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {accounts.length === 0 ? (
                      <p className="text-gray-400 text-center py-4">
                        Сначала добавьте аккаунт
                      </p>
                    ) : (
                      <>
                        {/* Список серверов по аккаунтам */}
                        {accounts.map((account) => {
                          const accountServers = servers.filter(s => s.accountId === account.id);
                          return (
                            <div key={account.id} className="p-4 bg-cyber-darker rounded-lg border border-cyber-purple/20">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-white">{account.familyName}</h4>
                                <Badge className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30">
                                  {accountServers.length}/{currentLimits.servers} серверов
                                </Badge>
                              </div>
                              {accountServers.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {accountServers.map((server) => (
                                    <Badge 
                                      key={`${server.accountId}-${server.serverNumber}`}
                                      className="bg-cyber-purple/10 text-cyber-purple border-cyber-purple/30 pr-1"
                                    >
                                      {serverNames[server.serverNumber - 1]}
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-4 w-4 p-0 ml-2 hover:bg-red-500/20"
                                        onClick={() => deleteServer(server.accountId, server.serverNumber)}
                                      >
                                        <Icon name="X" size={12} className="text-red-400" />
                                      </Button>
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">Нет серверов</p>
                              )}
                            </div>
                          );
                        })}

                        {/* Форма добавления серверов */}
                        <div className="space-y-4 p-4 bg-cyber-purple/5 border border-cyber-purple/20 rounded-lg">
                          <h4 className="font-orbitron text-cyber-purple">Добавить сервера</h4>
                          
                          <div>
                            <Label>Выберите аккаунт *</Label>
                            <Select 
                              value={selectedAccountForServer} 
                              onValueChange={setSelectedAccountForServer}
                            >
                              <SelectTrigger className="bg-cyber-darker border-cyber-purple/30">
                                <SelectValue placeholder="Выберите аккаунт" />
                              </SelectTrigger>
                              <SelectContent>
                                {accounts.map((account) => (
                                  <SelectItem key={account.id} value={account.id}>
                                    {account.familyName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Выберите сервера (номера от 1 до 15) *</Label>
                            <div className="grid grid-cols-5 gap-2 mt-2">
                              {[...Array(15)].map((_, i) => {
                                const serverNum = i + 1;
                                const isSelected = selectedServers.includes(serverNum);
                                const isAlreadyAdded = selectedAccountForServer && 
                                  servers.some(s => s.accountId === selectedAccountForServer && s.serverNumber === serverNum);
                                
                                return (
                                  <Button
                                    key={serverNum}
                                    size="sm"
                                    variant={isSelected ? "default" : "outline"}
                                    disabled={isAlreadyAdded}
                                    className={`${
                                      isSelected 
                                        ? 'bg-cyber-purple text-white' 
                                        : 'border-cyber-purple/30'
                                    } ${isAlreadyAdded ? 'opacity-50' : ''}`}
                                    onClick={() => {
                                      if (isSelected) {
                                        setSelectedServers(selectedServers.filter(n => n !== serverNum));
                                      } else {
                                        setSelectedServers([...selectedServers, serverNum]);
                                      }
                                    }}
                                  >
                                    {serverNum}
                                  </Button>
                                );
                              })}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Выбрано: {selectedServers.length}
                            </p>
                          </div>

                          <Button 
                            className="w-full bg-cyber-purple text-white hover:bg-cyber-purple/80"
                            onClick={handleAddServers}
                            disabled={!selectedAccountForServer || selectedServers.length === 0}
                          >
                            <Icon name="Plus" size={16} className="mr-2" />
                            Добавить сервера
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* 3. Создание задачи */}
                <Card className="bg-cyber-dark/50 border-cyber-cyan/30">
                  <CardHeader>
                    <CardTitle className="text-cyber-cyan flex items-center gap-2">
                      <Icon name="Trophy" size={24} />
                      3. Создание задачи
                    </CardTitle>
                    <CardDescription>Настройте параметры автоматической регистрации</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {servers.length === 0 ? (
                      <p className="text-gray-400 text-center py-4">
                        Сначала добавьте сервера
                      </p>
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
                                {servers.map((server, idx) => (
                                  <SelectItem key={idx} value={server.serverNumber.toString()}>
                                    {serverNames[server.serverNumber - 1]}
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
                              <Label htmlFor="single">Один цвет</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all" id="all" />
                              <Label htmlFor="all">Все цвета (случайный порядок)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="custom" id="custom" />
                              <Label htmlFor="custom">Кастомный порядок</Label>
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
                      </CardTitle>
                      <CardDescription>Список созданных турнирных задач</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {tasks.map((task) => (
                          <div key={task.id} className="p-4 bg-cyber-darker rounded-lg border border-cyber-magenta/20">
                            <div className="flex items-start justify-between mb-3">
                              <div>
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BotManagement;
