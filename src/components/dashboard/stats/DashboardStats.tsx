
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Calendar, PhoneCall, FileText, Timer, Percent, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// Données de simulation pour les graphiques
const callData = [
  { day: 'Lun', calls: 12 },
  { day: 'Mar', calls: 18 },
  { day: 'Mer', calls: 15 },
  { day: 'Jeu', calls: 25 },
  { day: 'Ven', calls: 20 },
  { day: 'Sam', calls: 10 },
  { day: 'Dim', calls: 5 },
];

const documentData = [
  { month: 'Jan', documents: 10 },
  { month: 'Fév', documents: 15 },
  { month: 'Mar', documents: 22 },
  { month: 'Avr', documents: 18 },
  { month: 'Mai', documents: 32 },
  { month: 'Juin', documents: 28 },
];

const responseTimeData = [
  { time: '9h', duration: 25 },
  { time: '10h', duration: 18 },
  { time: '11h', duration: 22 },
  { time: '12h', duration: 15 },
  { time: '13h', duration: 32 },
  { time: '14h', duration: 28 },
  { time: '15h', duration: 20 },
  { time: '16h', duration: 24 },
  { time: '17h', duration: 19 },
];

const StatCard = ({ title, value, description, trend, icon: Icon }: { 
  title: string;
  value: string | number;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          {trend === 'up' && <ArrowUpRight className="h-3 w-3 text-green-500" />}
          {trend === 'down' && <ArrowDownRight className="h-3 w-3 text-red-500" />}
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const DashboardStats = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('week');

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value as 'day' | 'week' | 'month' | 'year');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Vue générale</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Tabs defaultValue="week" className="w-[300px]">
            <TabsList>
              <TabsTrigger value="day" onClick={() => handleTimeframeChange('day')}>Jour</TabsTrigger>
              <TabsTrigger value="week" onClick={() => handleTimeframeChange('week')}>Semaine</TabsTrigger>
              <TabsTrigger value="month" onClick={() => handleTimeframeChange('month')}>Mois</TabsTrigger>
              <TabsTrigger value="year" onClick={() => handleTimeframeChange('year')}>Année</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Appels totaux" 
          value="105" 
          description="+ 15% par rapport au mois précédent" 
          trend="up" 
          icon={PhoneCall} 
        />
        <StatCard 
          title="Documents importés" 
          value="28" 
          description="+ 8% par rapport au mois précédent" 
          trend="up" 
          icon={FileText} 
        />
        <StatCard 
          title="Temps de réponse moyen" 
          value="32s" 
          description="- 5% par rapport au mois précédent" 
          trend="down" 
          icon={Timer} 
        />
        <StatCard 
          title="Taux de satisfaction" 
          value="92%" 
          description="+ 2% par rapport au mois précédent" 
          trend="up" 
          icon={Percent} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Appels par jour</CardTitle>
            <CardDescription>Volume d'appels sur la dernière semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{ 
                calls: { 
                  label: "Appels", 
                  theme: { light: "#3b82f6", dark: "#60a5fa" } 
                } 
              }} 
              className="aspect-[4/3]"
            >
              <RechartsBarChart data={callData}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip
                  content={props => <ChartTooltipContent {...props} />}
                />
                <Bar 
                  dataKey="calls" 
                  fill="var(--color-calls)" 
                  radius={[4, 4, 0, 0]} 
                  className="fill-primary" 
                />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Temps de réponse</CardTitle>
            <CardDescription>Durée moyenne des réponses en secondes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{ 
                duration: { 
                  label: "Durée (sec)", 
                  theme: { light: "#10b981", dark: "#34d399" } 
                } 
              }} 
              className="aspect-[4/3]"
            >
              <LineChart data={responseTimeData}>
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip
                  content={props => <ChartTooltipContent {...props} />}
                />
                <Line 
                  type="monotone" 
                  dataKey="duration" 
                  stroke="var(--color-duration)" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
