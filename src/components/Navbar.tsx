import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { Flower } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b border-muted">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Flower className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">LotusFy</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Registrar</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;