
import React from 'react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentTable: string | null;
  setCurrentTable: (table: string | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, setRole, currentTable, setCurrentTable }) => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">Z</div>
        <h1 className="font-bold text-xl text-slate-800 hidden sm:block">ZenDine</h1>
      </div>

      <div className="flex items-center gap-4">
        {role === 'CUSTOMER' && currentTable && (
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
            Table {currentTable}
          </span>
        )}
        
        <select 
          value={role} 
          onChange={(e) => {
            setRole(e.target.value as UserRole);
            if (e.target.value !== 'CUSTOMER') setCurrentTable(null);
          }}
          className="bg-slate-100 border-none text-sm rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="CUSTOMER">Customer View</option>
          <option value="STAFF">Staff Interface</option>
          <option value="ADMIN">Admin Panel</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
