import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Contacts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-orbitron font-black text-center mb-4">
            <span className="text-cyber-cyan">НАШИ</span>{' '}
            <span className="text-cyber-magenta">КОНТАКТЫ</span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-12">
            Свяжитесь с нами любым удобным способом
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-cyber-dark/50 border-cyber-cyan/30">
              <CardHeader>
                <CardTitle className="text-cyber-cyan flex items-center gap-2">
                  <Icon name="Mail" size={24} />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">support@discordbots.ru</p>
              </CardContent>
            </Card>

            <Card className="bg-cyber-dark/50 border-cyber-magenta/30">
              <CardHeader>
                <CardTitle className="text-cyber-magenta flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} />
                  Discord
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://discord.gg/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyber-magenta transition-colors"
                >
                  discord.gg/example
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-cyber-dark/50 border-cyber-purple/30">
            <CardHeader>
              <CardTitle className="text-cyber-purple">Форма обратной связи</CardTitle>
              <CardDescription>Напишите нам, и мы ответим в течение 24 часов</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="bg-cyber-darker border-cyber-purple/30"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="bg-cyber-darker border-cyber-purple/30"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows={6}
                    className="bg-cyber-darker border-cyber-purple/30 resize-none"
                    placeholder="Расскажите, чем мы можем вам помочь..."
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-cyber-purple text-white hover:bg-cyber-purple/80 font-semibold text-lg"
                >
                  Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacts;
