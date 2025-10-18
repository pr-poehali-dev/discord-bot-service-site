import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Changelog = () => {
  const updates = [
    {
      version: '2.1.0',
      date: '15 февраля 2024',
      changes: [
        { type: 'feature', text: 'Добавлена поддержка новых турнирных форматов' },
        { type: 'feature', text: 'Улучшена система уведомлений в личном кабинете' },
        { type: 'improvement', text: 'Оптимизирована работа бота при высоких нагрузках' },
        { type: 'fix', text: 'Исправлена ошибка с отображением баланса' },
      ]
    },
    {
      version: '2.0.0',
      date: '01 февраля 2024',
      changes: [
        { type: 'feature', text: 'Запуск нового личного кабинета с расширенными возможностями' },
        { type: 'feature', text: 'Добавлена система управления подписками' },
        { type: 'feature', text: 'Интеграция платежной системы для пополнения баланса' },
        { type: 'improvement', text: 'Полностью переработан дизайн в киберпанк стиле' },
      ]
    },
    {
      version: '1.5.2',
      date: '20 января 2024',
      changes: [
        { type: 'fix', text: 'Исправлены критические ошибки в турнирном боте' },
        { type: 'fix', text: 'Решена проблема с регистрацией в Pack турнирах' },
        { type: 'improvement', text: 'Улучшена стабильность работы семейного бота' },
      ]
    },
    {
      version: '1.5.0',
      date: '10 января 2024',
      changes: [
        { type: 'feature', text: 'Добавлен турнирный бот с поддержкой MCL, VZM и Pack' },
        { type: 'feature', text: 'Система управления цветами команд' },
        { type: 'improvement', text: 'Улучшена производительность семейного бота' },
      ]
    },
    {
      version: '1.0.0',
      date: '01 января 2024',
      changes: [
        { type: 'feature', text: 'Запуск платформы Discord Bots' },
        { type: 'feature', text: 'Релиз семейного бота с базовым функционалом' },
        { type: 'feature', text: 'Система аренды ботов' },
      ]
    },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'feature':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Новое</Badge>;
      case 'improvement':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Улучшение</Badge>;
      case 'fix':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Исправление</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-orbitron font-black text-center mb-4">
            <span className="text-cyber-cyan">СПИСОК</span>{' '}
            <span className="text-cyber-magenta">ИЗМЕНЕНИЙ</span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-12">
            История обновлений и новых функций
          </p>

          <div className="space-y-6">
            {updates.map((update, index) => (
              <Card 
                key={update.version} 
                className={`bg-cyber-dark/50 backdrop-blur-sm ${
                  index === 0 
                    ? 'border-cyber-cyan/50' 
                    : 'border-cyber-cyan/20'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-cyber-cyan text-2xl">
                      Версия {update.version}
                    </CardTitle>
                    {index === 0 && (
                      <Badge className="bg-cyber-magenta/20 text-cyber-magenta border-cyber-magenta/30">
                        Последняя версия
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-gray-400">
                    {update.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {update.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-3">
                        {getTypeBadge(change.type)}
                        <span className="text-gray-300 flex-1">{change.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Changelog;
