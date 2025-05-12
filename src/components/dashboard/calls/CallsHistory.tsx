
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, Download, Filter, Phone, PhoneOff, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Mock data for calls
const callsData = [
  {
    id: 1,
    contactName: 'Jean Dupont',
    phoneNumber: '+33 6 12 34 56 78',
    date: new Date(2024, 4, 10, 14, 30),
    duration: '3m 45s',
    status: 'completed',
    recording: true,
  },
  {
    id: 2,
    contactName: 'Marie Martin',
    phoneNumber: '+33 6 23 45 67 89',
    date: new Date(2024, 4, 10, 12, 15),
    duration: '1m 20s',
    status: 'completed',
    recording: true,
  },
  {
    id: 3,
    contactName: 'Paul Bernard',
    phoneNumber: '+33 7 34 56 78 90',
    date: new Date(2024, 4, 9, 17, 45),
    duration: '5m 12s',
    status: 'missed',
    recording: false,
  },
  {
    id: 4,
    contactName: 'Sophie Laurent',
    phoneNumber: '+33 6 45 67 89 01',
    date: new Date(2024, 4, 9, 10, 30),
    duration: '2m 38s',
    status: 'completed',
    recording: true,
  },
  {
    id: 5,
    contactName: 'Thomas Petit',
    phoneNumber: '+33 7 56 78 90 12',
    date: new Date(2024, 4, 8, 15, 20),
    duration: '0m 45s',
    status: 'missed',
    recording: false,
  },
];

const CallsHistory = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status === statusFilter ? null : status);
  };

  // Filter calls based on search query, date and status
  const filteredCalls = callsData.filter(call => {
    const matchesSearch = 
      call.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.phoneNumber.includes(searchQuery);
    
    const matchesDate = selectedDate
      ? call.date.toDateString() === selectedDate.toDateString()
      : true;
    
    const matchesStatus = statusFilter
      ? call.status === statusFilter
      : true;
      
    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Rechercher un contact..."
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
                  {selectedDate ? format(selectedDate, 'P', { locale: fr }) : 'Sélectionner une date'}
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
              className={statusFilter === 'completed' ? 'bg-blue-100' : ''}
              onClick={() => handleStatusFilter('completed')}
            >
              <Phone className="mr-2 h-4 w-4" />
              Répondus
            </Button>
            
            <Button 
              variant="outline" 
              className={statusFilter === 'missed' ? 'bg-blue-100' : ''}
              onClick={() => handleStatusFilter('missed')}
            >
              <PhoneOff className="mr-2 h-4 w-4" />
              Manqués
            </Button>
          </div>
        </div>
        
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      {selectedDate && (
        <div className="flex items-center gap-2">
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
          
          {statusFilter && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {statusFilter === 'completed' ? <Phone className="h-3 w-3" /> : <PhoneOff className="h-3 w-3" />}
              {statusFilter === 'completed' ? 'Répondus' : 'Manqués'}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 hover:bg-secondary"
                onClick={() => setStatusFilter(null)}
              >
                ×
              </Button>
            </Badge>
          )}
        </div>
      )}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCalls.length > 0 ? (
              filteredCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{call.contactName}</p>
                      <p className="text-sm text-gray-500">{call.phoneNumber}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(call.date, 'Pp', { locale: fr })}
                  </TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>
                    {call.status === 'completed' ? (
                      <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">
                        <Phone className="mr-1 h-3 w-3" />
                        Répondu
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
                        <PhoneOff className="mr-1 h-3 w-3" />
                        Manqué
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {call.recording ? (
                      <Button variant="ghost" size="sm">
                        Écouter
                      </Button>
                    ) : (
                      <span className="text-gray-400 text-sm">Pas d'enregistrement</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32">
                  <div className="flex flex-col items-center justify-center">
                    <PhoneOff className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500 font-medium">Aucun appel trouvé</p>
                    <p className="text-sm text-gray-400">
                      {searchQuery ? 'Essayez une recherche différente' : 'Aucun appel n\'a été enregistré pour la période sélectionnée'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CallsHistory;
