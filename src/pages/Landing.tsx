import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import Navbar from '../components/Navbar';

const PricingCard = ({ 
  title, 
  price, 
  features, 
  recommended 
}: { 
  title: string; 
  price: number; 
  features: string[];
  recommended?: boolean;
}) => (
  <div className={`bg-card p-8 rounded-xl border ${recommended ? 'border-primary' : 'border-muted'} relative`}>
    {recommended && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
        Recommended
      </span>
    )}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold">R${price.toFixed(2)}</span>
      <span className="text-muted-foreground">/mês</span>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <Check className="w-5 h-5 text-primary" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button variant={recommended ? 'primary' : 'outline'} className="w-full">
      Começar agora
    </Button>
  </div>
);

const Landing = () => {
  const plans = [
    {
      title: 'Básico',
      price: 69.90,
      features: [
        'Até 5 campanhas ativas',
        'Análise básica de dados',
        'Suporte por email',
        'Relatórios mensais',
      ],
    },
    {
      title: 'Avançado',
      price: 169.90,
      features: [
        'Até 20 campanhas ativas',
        'Análise avançada de dados',
        'Suporte prioritário',
        'Relatórios semanais',
        'Integração com Google Analytics',
      ],
      recommended: true,
    },
    {
      title: 'Expert',
      price: 399.90,
      features: [
        'Campanhas ilimitadas',
        'Análise em tempo real',
        'Suporte 24/7',
        'Relatórios personalizados',
        'Integrações avançadas',
        'API dedicada',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Transforme seus links em máquinas de conversão
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            LotusFy é a plataforma definitiva para rastreamento de campanhas UTM. 
            Simplifique seu marketing digital e tome decisões baseadas em dados.
          </p>
          <Button size="lg" className="mr-4">Começar Gratuitamente</Button>
          <Button size="lg" variant="outline">Ver Demo</Button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Planos que crescem com você</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard key={plan.title} {...plan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;