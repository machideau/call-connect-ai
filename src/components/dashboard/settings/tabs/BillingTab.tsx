import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, CreditCard, Calendar, Wallet } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Types de méthodes de paiement disponibles
const paymentMethods = [
  { id: 'visa', name: 'Visa', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'mastercard', name: 'MasterCard', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'paypal', name: 'PayPal', icon: <Wallet className="h-5 w-5" /> },
  { id: 'stripe', name: 'Stripe', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'mtn', name: 'MTN Mobile Money', icon: <Wallet className="h-5 w-5" /> },
  { id: 'moov', name: 'Moov Money', icon: <Wallet className="h-5 w-5" /> },
  { id: 'yas', name: 'YAS', icon: <Wallet className="h-5 w-5" /> },
];

// Données fictives pour les factures
const invoiceData = [
  { id: 1, date: 'Mai 2024', amount: 'Gratuit', plan: 'Plan Essai', status: 'Payé' },
  { id: 2, date: 'Avril 2024', amount: '29,99 €', plan: 'Plan Pro', status: 'Payé' },
  { id: 3, date: 'Mars 2024', amount: '29,99 €', plan: 'Plan Pro', status: 'Payé' },
  { id: 4, date: 'Février 2024', amount: '29,99 €', plan: 'Plan Pro', status: 'Payé' },
  { id: 5, date: 'Janvier 2024', amount: '19,99 €', plan: 'Plan Standard', status: 'Payé' },
  { id: 6, date: 'Décembre 2023', amount: '19,99 €', plan: 'Plan Standard', status: 'Payé' },
];

// Schéma de validation pour l'ajout d'une méthode de paiement
const paymentMethodSchema = z.object({
  type: z.string().min(1, "Veuillez sélectionner un type de méthode de paiement"),
  cardNumber: z.string().regex(/^\d{16}$/, "Le numéro de carte doit contenir 16 chiffres").optional(),
  cardholderName: z.string().min(3, "Le nom du titulaire est requis").optional(),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY requis").optional(),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV invalide").optional(),
  mobileNumber: z.string().regex(/^\d{10,12}$/, "Numéro de téléphone invalide").optional(),
});

const BillingTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: '',
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      mobileNumber: '',
    },
  });

  // Filtrer les factures selon la recherche et le filtre de date
  const filteredInvoices = invoiceData.filter(invoice => {
    const matchesSearch = invoice.date.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           invoice.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           invoice.amount.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (dateFilter === 'all') return matchesSearch;
    if (dateFilter === '2024') return matchesSearch && invoice.date.includes('2024');
    if (dateFilter === '2023') return matchesSearch && invoice.date.includes('2023');
    return matchesSearch;
  });

  // Pagination
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onSubmit = (data: z.infer<typeof paymentMethodSchema>) => {
    console.log("Méthode de paiement ajoutée:", data);
    toast({
      title: "Méthode de paiement ajoutée",
      description: `Votre méthode de paiement a été ajoutée avec succès.`,
    });
  };

  // Rendu conditionnel des champs en fonction du type de méthode sélectionné
  const renderPaymentFields = () => {
    const type = form.watch('type');
    
    if (!type) return null;
    
    if (['visa', 'mastercard', 'stripe'].includes(type)) {
      return (
        <>
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de carte</FormLabel>
                <FormControl>
                  <Input placeholder="1234 5678 9012 3456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cardholderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du titulaire</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Date d'expiration</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="123" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      );
    } else if (['mtn', 'moov', 'yas'].includes(type)) {
      return (
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <Input placeholder="+22500000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else if (type === 'paypal') {
      return (
        <FormItem>
          <FormLabel>Email PayPal</FormLabel>
          <FormControl>
            <Input placeholder="email@example.com" />
          </FormControl>
          <FormDescription>
            Vous serez redirigé vers PayPal pour finaliser l'ajout de cette méthode de paiement.
          </FormDescription>
        </FormItem>
      );
    }
    
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Abonnement et facturation</CardTitle>
        <CardDescription>
          Gérez votre abonnement et consultez vos factures
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">Plan Essai</h3>
              <p className="text-sm text-gray-600 mt-1">
                Votre essai gratuit se termine dans 2 jours
              </p>
            </div>
            <Badge>Actif</Badge>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-brand-600 h-1.5 rounded-full" 
                style={{ width: '33%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Jour 8 sur 10
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button>
              Passer au plan Pro
            </Button>
            <Button variant="outline">
              Voir les plans
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Méthodes de paiement</h3>
          <div className="border rounded-lg divide-y">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-md">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Visa se terminant par 4242</p>
                  <p className="text-sm text-gray-500">Expire en 04/2025</p>
                </div>
              </div>
              <div>
                <Badge variant="outline">Par défaut</Badge>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-md">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">MasterCard se terminant par 5678</p>
                  <p className="text-sm text-gray-500">Expire en 08/2024</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Définir par défaut
              </Button>
            </div>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-3">
                <CreditCard className="h-4 w-4 mr-2" />
                Ajouter une méthode de paiement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter une méthode de paiement</DialogTitle>
                <DialogDescription>
                  Choisissez votre méthode de paiement préférée et entrez les détails.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de paiement</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une méthode de paiement" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentMethods.map(method => (
                              <SelectItem key={method.id} value={method.id}>
                                <div className="flex items-center">
                                  {method.icon}
                                  <span className="ml-2">{method.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {renderPaymentFields()}
                  
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Annuler</Button>
                    </DialogClose>
                    <Button type="submit">Ajouter</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Historique des factures</h3>
            <div className="flex items-center space-x-2">
              <Select
                value={dateFilter}
                onValueChange={setDateFilter}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filtrer par date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les dates</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-8 w-[180px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.plan}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Télécharger
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                    Aucune facture trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {filteredInvoices.length > itemsPerPage && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingTab;
