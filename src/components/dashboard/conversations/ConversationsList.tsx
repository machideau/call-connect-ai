
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar as CalendarIcon, Filter, MessageSquare, Bot, UserRound, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

// Mock data for conversations
const conversationsData = [
  {
    id: 1,
    contactName: 'Jean Dupont',
    phoneNumber: '+33 6 12 34 56 78',
    date: new Date(2024, 4, 10, 14, 30),
    messages: [
      { sender: 'ai', content: 'Bonjour, comment puis-je vous aider aujourd\'hui ?' },
      { sender: 'user', content: 'Je voudrais des informations sur votre service premium.' },
      { sender: 'ai', content: 'Bien sûr, notre service premium inclut un support 24/7, des fonctionnalités avancées...' },
    ],
    sentiment: 'positive',
    resolved: true,
  },
  {
    id: 2,
    contactName: 'Marie Martin',
    phoneNumber: '+33 6 23 45 67 89',
    date: new Date(2024, 4, 10, 12, 15),
    messages: [
      { sender: 'ai', content: 'Bonjour, bienvenue chez CallIA. Comment puis-je vous assister ?' },
      { sender: 'user', content: 'J\'ai un problème avec ma facturation.' },
      { sender: 'ai', content: 'Je suis désolé d\'entendre cela. Pouvez-vous me donner plus de détails ?' },
    ],
    sentiment: 'neutral',
    resolved: false,
  },
  {
    id: 3,
    contactName: 'Paul Bernard',
    phoneNumber: '+33 7 34 56 78 90',
    date: new Date(2024, 4, 9, 17, 45),
    messages: [
      { sender: 'ai', content: 'Bonjour, comment puis-je vous aider aujourd\'hui ?' },
      { sender: 'user', content: 'Le service ne fonctionne pas correctement et je suis très mécontent!' },
      { sender: 'ai', content: 'Je suis vraiment désolé pour ce désagrément. Je vais faire tout mon possible pour résoudre ce problème rapidement.' },
    ],
    sentiment: 'negative',
    resolved: false,
  },
  {
    id: 4,
    contactName: 'Sophie Laurent',
    phoneNumber: '+33 6 45 67 89 01',
    date: new Date(2024, 4, 8, 10, 30),
    messages: [
      { sender: 'ai', content: 'Bonjour, comment puis-je vous aider ?' },
      { sender: 'user', content: 'Je voudrais annuler mon abonnement.' },
      { sender: 'ai', content: 'Je comprends. Pour annuler votre abonnement, je peux vous guider à travers le processus.' },
    ],
    sentiment: 'neutral',
    resolved: true,
  },
];

const ConversationsList = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [sentimentFilter, setSentimentFilter] = useState<string | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSentimentFilter = (sentiment: string | null) => {
    setSentimentFilter(sentiment === sentimentFilter ? null : sentiment);
  };

  // Filter conversations based on active tab, search query, date, and sentiment
  const filteredConversations = conversationsData.filter(conversation => {
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'resolved' && conversation.resolved) ||
      (activeTab === 'unresolved' && !conversation.resolved);
    
    const matchesSearch = 
      conversation.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.phoneNumber.includes(searchQuery);
    
    const matchesDate = selectedDate
      ? conversation.date.toDateString() === selectedDate.toDateString()
      : true;
    
    const matchesSentiment = sentimentFilter
      ? conversation.sentiment === sentimentFilter
      : true;
      
    return matchesTab && matchesSearch && matchesDate && matchesSentiment;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Rechercher une conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'P', { locale: fr }) : 'Date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button 
              variant="outline" 
              className={sentimentFilter === 'positive' ? 'bg-blue-100' : ''}
              onClick={() => handleSentimentFilter('positive')}
            >
              <span className="mr-2">😊</span>
              Positif
            </Button>
            
            <Button 
              variant="outline" 
              className={sentimentFilter === 'negative' ? 'bg-blue-100' : ''}
              onClick={() => handleSentimentFilter('negative')}
            >
              <span className="mr-2">😟</span>
              Négatif
            </Button>
          </div>
        </div>
        
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      {(selectedDate || sentimentFilter) && (
        <div className="flex items-center gap-2">
          {selectedDate && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              {format(selectedDate, 'P', { locale: fr })}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 hover:bg-secondary"
                onClick={() => setSelectedDate(undefined)}
              >
                ×
              </Button>
            </Badge>
          )}
          
          {sentimentFilter && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {sentimentFilter === 'positive' ? '😊' : sentimentFilter === 'negative' ? '😟' : '😐'}
              {sentimentFilter === 'positive' ? 'Positif' : sentimentFilter === 'negative' ? 'Négatif' : 'Neutre'}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 hover:bg-secondary"
                onClick={() => setSentimentFilter(null)}
              >
                ×
              </Button>
            </Badge>
          )}
        </div>
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4 w-full sm:w-auto">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="resolved">Résolues</TabsTrigger>
          <TabsTrigger value="unresolved">Non résolues</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedConversation === conversation.id ? 'border-brand-500 bg-brand-50' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{conversation.contactName}</h3>
                        <p className="text-sm text-gray-500">{conversation.phoneNumber}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {format(conversation.date, 'Pp', { locale: fr })}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {conversation.sentiment === 'positive' && (
                          <span className="text-green-500 text-lg">😊</span>
                        )}
                        {conversation.sentiment === 'negative' && (
                          <span className="text-red-500 text-lg">😟</span>
                        )}
                        {conversation.sentiment === 'neutral' && (
                          <span className="text-gray-500 text-lg">😐</span>
                        )}
                        <Badge variant={conversation.resolved ? "outline" : "secondary"}>
                          {conversation.resolved ? 'Résolu' : 'En cours'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                      {conversation.messages[conversation.messages.length - 1].content}
                    </p>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Aucune conversation trouvée</h3>
                  <p className="text-gray-500">
                    Aucune conversation ne correspond à vos critères de recherche.
                  </p>
                </Card>
              )}
            </div>

            <div>
              {selectedConversation ? (
                <Card className="p-6 h-full">
                  {(() => {
                    const conversation = conversationsData.find(c => c.id === selectedConversation);
                    if (!conversation) return null;
                    
                    return (
                      <>
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h3 className="text-xl font-medium">{conversation.contactName}</h3>
                            <p className="text-sm text-gray-500">{conversation.phoneNumber}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {format(conversation.date, 'PPpp', { locale: fr })}
                            </p>
                          </div>
                          <div>
                            <Badge variant={conversation.resolved ? "outline" : "secondary"} className="mb-2">
                              {conversation.resolved ? 'Résolu' : 'En cours'}
                            </Badge>
                            <div className="flex justify-end">
                              {conversation.sentiment === 'positive' && (
                                <span className="text-green-500 text-lg">😊</span>
                              )}
                              {conversation.sentiment === 'negative' && (
                                <span className="text-red-500 text-lg">😟</span>
                              )}
                              {conversation.sentiment === 'neutral' && (
                                <span className="text-gray-500 text-lg">😐</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                          {conversation.messages.map((message, i) => (
                            <div
                              key={i}
                              className={`flex ${
                                message.sender === 'user' ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div
                                className={`p-3 rounded-lg max-w-[80%] ${
                                  message.sender === 'user'
                                    ? 'bg-brand-100 text-brand-900'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                <div className="flex items-center mb-1">
                                  {message.sender === 'user' ? (
                                    <>
                                      <span className="text-xs font-medium">Client</span>
                                      <UserRound className="h-3 w-3 ml-1" />
                                    </>
                                  ) : (
                                    <>
                                      <Bot className="h-3 w-3 mr-1" />
                                      <span className="text-xs font-medium">Assistant IA</span>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm">{message.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 space-y-4">
                          <div className="border-t pt-4">
                            <h4 className="font-medium mb-2">Actions:</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <Button variant="outline">
                                Marquer comme {conversation.resolved ? 'non résolu' : 'résolu'}
                              </Button>
                              <Button variant="outline">Archiver</Button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </Card>
              ) : (
                <Card className="flex items-center justify-center h-full p-8 text-center border-dashed">
                  <div>
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Sélectionnez une conversation</h3>
                    <p className="text-gray-500">
                      Cliquez sur une conversation pour afficher les détails.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConversationsList;
