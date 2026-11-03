import React, { createContext, useContext } from 'react';
import { Crown } from 'lucide-react';

type PremiumGateValue = { isPremium: boolean; openPremium: () => void };
const PremiumGateContext = createContext<PremiumGateValue>({ isPremium: false, openPremium: () => {} });

export const PremiumGateProvider: React.FC<React.PropsWithChildren<PremiumGateValue>> = ({ children, ...value }) => (
  <PremiumGateContext.Provider value={value}>{children}</PremiumGateContext.Provider>
);

export const PremiumFeature: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isPremium, openPremium } = useContext(PremiumGateContext);
  if (isPremium) return <>{children}</>;

  return <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
    <p className="font-bold">Detalyadong paliwanag ay kasama sa Premium.</p>
    <button type="button" onClick={openPremium} className="mt-2 inline-flex items-center gap-1 rounded-md bg-amber-500 px-3 py-2 font-bold text-slate-950">
      <Crown size={14} /> Tingnan ang Premium
    </button>
  </div>;
};
