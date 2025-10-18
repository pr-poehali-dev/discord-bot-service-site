import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Account {
  id: string;
  familyName: string;
}

interface Server {
  accountId: string;
  serverNumber: number;
}

const TournamentServers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const userPlan = 'standard';
  const planLimits = {
    basic: { servers: 4 },
    standard: { servers: 8 },
    maximum: { servers: 15 },
  };

  const currentLimits = planLimits[userPlan as keyof typeof planLimits];

  const [accounts] = useState<Account[]>([
    { id: '1', familyName: 'Пример семьи 1' },
  ]);
  
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedAccountForServer, setSelectedAccountForServer] = useState('');
  const [selectedServers, setSelectedServers] = useState<number[]>([]);

  const serverNames = [
    'NAME 1', 'NAME 2', 'NAME 3', 'NAME 4', 'NAME 5',
    'NAME 6', 'NAME 7', 'NAME 8', 'NAME 9', 'NAME 10',
    'NAME 11', 'NAME 12', 'NAME 13', 'NAME 14', 'NAME 15'
  ];

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

  const deleteServer = (accountId: string, serverNumber: number) => {
    setServers(servers.filter(s => !(s.accountId === accountId && s.serverNumber === serverNumber)));
    toast({
      title: "Сервер удалён",
      description: "Сервер удалён из списка",
    });
  };

  const toggleServer = (serverNum: number) => {
    if (selectedServers.includes(serverNum)) {
      setSelectedServers(selectedServers.filter(n => n !== serverNum));
    } else {
      setSelectedServers([...selectedServers, serverNum]);
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
              onClick={() => navigate('/tournament-bot')}
              className="border-cyber-cyan/30"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            <h1 className="text-4xl font-orbitron font-black">
              <span className="text-cyber-purple">СЕРВЕРА</span>
            </h1>
          </div>

          <Card className="bg-cyber-dark/50 border-cyber-purple/30">
            <CardHeader>
              <CardTitle className="text-cyber-purple flex items-center gap-2">
                <Icon name="Server" size={24} />
                Управление серверами
              </CardTitle>
              <CardDescription>Выберите сервера для каждого аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {accounts.length === 0 ? (
                <div className="text-center py-8 bg-cyber-purple/5 border border-cyber-purple/20 rounded-lg">
                  <p className="text-gray-400 mb-4">Сначала добавьте аккаунт</p>
                  <Button 
                    className="bg-cyber-magenta text-white hover:bg-cyber-magenta/80"
                    onClick={() => navigate('/tournament-bot/accounts')}
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Перейти к аккаунтам
                  </Button>
                </div>
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
                          <p className="text-sm text-gray-500">Нет добавленных серверов</p>
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
                              onClick={() => toggleServer(serverNum)}
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

                  {/* Навигация */}
                  <div className="flex justify-between pt-4 border-t border-cyber-purple/20">
                    <Button 
                      variant="outline"
                      className="border-cyber-magenta text-cyber-magenta"
                      onClick={() => navigate('/tournament-bot/accounts')}
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Назад: Аккаунты
                    </Button>
                    <Button 
                      className="bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/80"
                      onClick={() => navigate('/tournament-bot/tasks')}
                      disabled={servers.length === 0}
                    >
                      Далее: Создание задач
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TournamentServers;
