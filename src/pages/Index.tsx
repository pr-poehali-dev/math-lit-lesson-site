import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Lesson {
  id: number;
  title: string;
  subject: 'math' | 'literature';
  level: string;
  duration: string;
  description: string;
  videoUrl: string;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Квадратные уравнения',
    subject: 'math',
    level: '8 класс',
    duration: '45 мин',
    description: 'Изучение методов решения квадратных уравнений через дискриминант',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    title: 'Тригонометрия: основы',
    subject: 'math',
    level: '9 класс',
    duration: '60 мин',
    description: 'Синус, косинус, тангенс и их применение в решении задач',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 3,
    title: 'А.С. Пушкин: Евгений Онегин',
    subject: 'literature',
    level: '9 класс',
    duration: '90 мин',
    description: 'Анализ романа в стихах, образы главных героев, проблематика произведения',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'Производные функций',
    subject: 'math',
    level: '10 класс',
    duration: '55 мин',
    description: 'Понятие производной, правила дифференцирования',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 5,
    title: 'Ф.М. Достоевский: Преступление и наказание',
    subject: 'literature',
    level: '10 класс',
    duration: '120 мин',
    description: 'Психологический анализ романа, философские идеи Раскольникова',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 6,
    title: 'Серебряный век поэзии',
    subject: 'literature',
    level: '11 класс',
    duration: '75 мин',
    description: 'Символизм, акмеизм, футуризм. Основные представители и произведения',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

interface UserProgress {
  lessonId: number;
  completed: boolean;
  progress: number;
  lastWatched: string;
}

export default function Index() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'math' | 'literature'>('all');
  const [videoQuality, setVideoQuality] = useState('720p');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([
    { lessonId: 1, completed: true, progress: 100, lastWatched: '2024-01-15' },
    { lessonId: 2, completed: false, progress: 60, lastWatched: '2024-01-16' },
    { lessonId: 3, completed: true, progress: 100, lastWatched: '2024-01-14' },
    { lessonId: 4, completed: false, progress: 30, lastWatched: '2024-01-17' },
  ]);
  
  const userData = {
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    level: '10 класс',
    joinDate: '2024-01-01',
    avatar: 'ИП'
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || lesson.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
                <Icon name="GraduationCap" className="text-primary-foreground" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">Академия Знаний</h1>
                <p className="text-sm text-muted-foreground">Математика и литература</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6 items-center">
              <a href="#home" className="text-foreground hover:text-primary transition-colors font-semibold">Главная</a>
              <a href="#lessons" className="text-foreground hover:text-primary transition-colors font-semibold">Уроки</a>
              <button onClick={() => setShowProfile(true)} className="text-foreground hover:text-primary transition-colors font-semibold">Личный кабинет</button>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-semibold">Контакты</a>
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold cursor-pointer" onClick={() => setShowProfile(true)}>
                {userData.avatar}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <section id="home" className="py-16 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-primary mb-6">Образование высшего качества</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Приобщитесь к знаниям через тщательно подготовленные видео-лекции 
            по математике и литературе от опытных преподавателей
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="font-semibold">
              <Icon name="PlayCircle" className="mr-2" size={20} />
              Начать обучение
            </Button>
            <Button size="lg" variant="outline" className="font-semibold">
              <Icon name="BookOpen" className="mr-2" size={20} />
              Каталог курсов
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-3">
                  <Icon name="Video" className="text-primary" size={24} />
                </div>
                <CardTitle className="text-xl">Качественное видео</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Лекции в высоком разрешении с возможностью выбора качества воспроизведения</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-sm flex items-center justify-center mb-3">
                  <Icon name="Users" className="text-secondary" size={24} />
                </div>
                <CardTitle className="text-xl">Опытные педагоги</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Преподаватели с многолетним стажем и академическими достижениями</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mb-3">
                  <Icon name="Award" className="text-accent" size={24} />
                </div>
                <CardTitle className="text-xl">Проверенная методика</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Образовательные программы, соответствующие академическим стандартам</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="lessons" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-8">Каталог уроков</h2>
          
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Поиск по урокам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-2"
                />
              </div>
              <Tabs value={selectedSubject} onValueChange={(v) => setSelectedSubject(v as any)} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
                  <TabsTrigger value="all">Все предметы</TabsTrigger>
                  <TabsTrigger value="math">Математика</TabsTrigger>
                  <TabsTrigger value="literature">Литература</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid gap-4">
              {filteredLessons.map(lesson => (
                <Card key={lesson.id} className="border-2 hover:shadow-lg transition-all cursor-pointer" onClick={() => setSelectedLesson(lesson)}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{lesson.title}</CardTitle>
                        <CardDescription className="text-base">{lesson.description}</CardDescription>
                      </div>
                      <Badge variant={lesson.subject === 'math' ? 'default' : 'secondary'} className="ml-4">
                        {lesson.subject === 'math' ? 'Математика' : 'Литература'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="GraduationCap" size={16} />
                        <span>{lesson.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={16} />
                        <span>{lesson.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <Icon name="Play" size={16} />
                        <span className="font-semibold">Смотреть урок</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">Свяжитесь с нами</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Остались вопросы? Мы с радостью на них ответим
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-2">
                <CardHeader>
                  <Icon name="Mail" className="mx-auto text-primary mb-2" size={32} />
                  <CardTitle className="text-lg">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">info@academy.edu</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardHeader>
                  <Icon name="Phone" className="mx-auto text-primary mb-2" size={32} />
                  <CardTitle className="text-lg">Телефон</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardHeader>
                  <Icon name="MapPin" className="mx-auto text-primary mb-2" size={32} />
                  <CardTitle className="text-lg">Адрес</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">г. Москва, ул. Знаний, д. 1</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-2 text-left">
              <CardHeader>
                <CardTitle>Напишите нам</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Ваше имя" className="border-2" />
                <Input type="email" placeholder="Email" className="border-2" />
                <Input placeholder="Тема сообщения" className="border-2" />
                <textarea 
                  className="w-full min-h-[120px] rounded-md border-2 border-input bg-background px-3 py-2 text-sm"
                  placeholder="Ваше сообщение"
                />
                <Button className="w-full font-semibold">
                  <Icon name="Send" className="mr-2" size={18} />
                  Отправить сообщение
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">© 2024 Академия Знаний. Все права защищены.</p>
          <p className="text-sm">Образование — ключ к успеху</p>
        </div>
      </footer>

      <Dialog open={showProfile} onOpenChange={() => setShowProfile(false)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Личный кабинет</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-start gap-6 pb-6 border-b">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-3xl font-bold">
                {userData.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{userData.name}</h3>
                <p className="text-muted-foreground mb-1">{userData.email}</p>
                <div className="flex gap-4 text-sm">
                  <Badge variant="outline">{userData.level}</Badge>
                  <span className="text-muted-foreground">Дата регистрации: {new Date(userData.joinDate).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
              <Button variant="outline">
                <Icon name="Settings" className="mr-2" size={18} />
                Настройки
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Пройдено уроков</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{userProgress.filter(p => p.completed).length}</p>
                  <p className="text-sm text-muted-foreground">из {lessons.length} доступных</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Общий прогресс</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-secondary">
                    {Math.round((userProgress.reduce((acc, p) => acc + p.progress, 0) / (lessons.length * 100)) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">выполнено</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Активность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent">12</p>
                  <p className="text-sm text-muted-foreground">дней подряд</p>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Мой прогресс по урокам</h3>
              <div className="space-y-3">
                {lessons.map(lesson => {
                  const progress = userProgress.find(p => p.lessonId === lesson.id);
                  const progressPercent = progress?.progress || 0;
                  const isCompleted = progress?.completed || false;
                  
                  return (
                    <Card key={lesson.id} className="border-2">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{lesson.title}</CardTitle>
                            <CardDescription>{lesson.subject === 'math' ? 'Математика' : 'Литература'} • {lesson.level}</CardDescription>
                          </div>
                          {isCompleted && (
                            <Badge className="bg-green-600">
                              <Icon name="CheckCircle" size={14} className="mr-1" />
                              Пройден
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Прогресс</span>
                            <span className="font-semibold">{progressPercent}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          {progress && (
                            <p className="text-xs text-muted-foreground">Последний просмотр: {new Date(progress.lastWatched).toLocaleDateString('ru-RU')}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Достижения</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="border-2 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon name="Award" size={32} className="text-accent" />
                    </div>
                    <CardTitle className="text-sm">Первый урок</CardTitle>
                  </CardHeader>
                </Card>
                
                <Card className="border-2 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon name="Flame" size={32} className="text-primary" />
                    </div>
                    <CardTitle className="text-sm">Неделя подряд</CardTitle>
                  </CardHeader>
                </Card>
                
                <Card className="border-2 text-center opacity-50">
                  <CardHeader>
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon name="Star" size={32} className="text-muted-foreground" />
                    </div>
                    <CardTitle className="text-sm">Все уроки</CardTitle>
                  </CardHeader>
                </Card>
                
                <Card className="border-2 text-center opacity-50">
                  <CardHeader>
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon name="Trophy" size={32} className="text-muted-foreground" />
                    </div>
                    <CardTitle className="text-sm">Отличник</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedLesson?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedLesson && (
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <Badge variant={selectedLesson.subject === 'math' ? 'default' : 'secondary'}>
                  {selectedLesson.subject === 'math' ? 'Математика' : 'Литература'}
                </Badge>
                <span className="text-sm text-muted-foreground">{selectedLesson.level}</span>
                <span className="text-sm text-muted-foreground">{selectedLesson.duration}</span>
              </div>
              
              <p className="text-muted-foreground">{selectedLesson.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Видео-лекция</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Качество:</span>
                    <Select value={videoQuality} onValueChange={setVideoQuality}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="360p">360p</SelectItem>
                        <SelectItem value="480p">480p</SelectItem>
                        <SelectItem value="720p">720p HD</SelectItem>
                        <SelectItem value="1080p">1080p Full HD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={selectedLesson.videoUrl}
                    title={selectedLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button 
                    variant={isPlaying ? 'secondary' : 'default'}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex-1"
                  >
                    <Icon name={isPlaying ? 'Pause' : 'Play'} className="mr-2" size={18} />
                    {isPlaying ? 'Пауза' : 'Воспроизвести'}
                  </Button>
                  <Button variant="outline">
                    <Icon name="Download" className="mr-2" size={18} />
                    Скачать материалы
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Дополнительная информация</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Конспект урока включен</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Практические задания</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Тестирование после урока</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Сертификат о прохождении</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}