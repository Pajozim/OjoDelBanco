// context/fake_balance.tsx
import React, { createContext, useState, useContext } from 'react';

type BalanceContextType = {
  balance: number[];
  setBalance: ([value1, value2]: number[]) => void;
};

const BalanceContext = createContext<BalanceContextType | null>(null);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState([980.45, 0]); // fake starting balance
  
  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context) throw new Error('useBalance must be used within BalanceProvider');
  return context;
}