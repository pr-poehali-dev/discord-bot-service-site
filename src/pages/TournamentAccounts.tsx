import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const TournamentAccounts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const userPlan = 'standard';
  const planLimits = {
    basic: { accounts: 1 },
    standard: { accounts: 1 },
    maximum: { accounts: 2 },
  };

  const currentLimits = planLimits[userPlan as keyof typeof planLimits];

  const [accounts, setAccounts] = useState<Account[]>([]);
  
  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    familyName: '',
    ownerNickname: '',
    ownerStatic: '',
    authType: 'token',
    authData: '',
    password: '',
  });

  const handleAddAccount = () => {
    if (!newAccount.familyName || !newAccount.ownerNickname || !newAccount.ownerStatic || !newAccount.authData) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    if (newAccount.authType === 'login' && !newAccount.password) {
      toast({
        title: "Ошибка",
        description: "Введите пароль для авторизации",
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

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id));
    toast({
      title: "Аккаунт удалён",
      description: "Аккаунт успешно удалён",
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
              <span className="text-cyber-magenta">АККАУНТЫ</span>
            </h1>
          </div>

          <Card className="bg-cyber-dark/50 border-cyber-magenta/30">
            <CardHeader>
              <CardTitle className="text-cyber-magenta flex items-center gap-2">
                <Icon name="UserCircle" size={24} />
                Управление аккаунтами
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
                  <h3 className="font-orbitron text-white">Добавленные аккаунты</h3>
                  {accounts.map((account) => (
                    <div key={account.id} className="p-4 bg-cyber-darker rounded-lg border border-cyber-magenta/20">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
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
                  <h4 className="font-orbitron text-cyber-magenta">Добавить новый аккаунт</h4>
                  
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

              {accounts.length >= currentLimits.accounts && (
                <div className="text-center py-6 bg-cyber-magenta/5 border border-cyber-magenta/20 rounded-lg">
                  <p className="text-gray-400">Достигнут лимит аккаунтов для вашего тарифа</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-cyber-magenta text-cyber-magenta"
                    onClick={() => navigate('/bots')}
                  >
                    Повысить тариф
                  </Button>
                </div>
              )}

              {/* Навигация */}
              <div className="flex justify-end pt-4 border-t border-cyber-magenta/20">
                <Button 
                  className="bg-cyber-purple text-white hover:bg-cyber-purple/80"
                  onClick={() => navigate('/tournament-bot/servers')}
                  disabled={accounts.length === 0}
                >
                  Далее: Настройка серверов
                  <Icon name="ArrowRight" size={16} className="ml-2" />
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

export default TournamentAccounts;
