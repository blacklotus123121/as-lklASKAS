import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react';

const data = [
  { name: 'Jan', clicks: 400 },
  { name: 'Feb', clicks: 300 },
  { name: 'Mar', clicks: 600 },
  { name: 'Apr', clicks: 800 },
  { name: 'May', clicks: 700 },
];

const stats = [
  {
    name: 'Total Clicks',
    value: '2,800',
    change: '+12.5%',
    icon: Activity,
  },
  {
    name: 'Active Campaigns',
    value: '24',
    change: '+4.3%',
    icon: TrendingUp,
  },
  {
    name: 'Unique Visitors',
    value: '1,423',
    change: '+8.2%',
    icon: Users,
  },
  {
    name: 'Revenue',
    value: '$12,500',
    change: '+15.3%',
    icon: DollarSign,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-card p-6 rounded-lg border border-muted hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-primary opacity-75" />
            </div>
            <div className="mt-4">
              <span className="text-sm text-emerald-500">{stat.change}</span>
              <span className="text-sm text-muted-foreground ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card p-6 rounded-lg border border-muted">
        <h2 className="text-lg font-semibold mb-6">Click Performance</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--muted))',
                }}
              />
              <Bar dataKey="clicks" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;