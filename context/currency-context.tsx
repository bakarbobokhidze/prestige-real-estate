"use client";

import React, { createContext, useContext, useState } from "react";

type Currency = "GEL" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: any) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  const convertPrice = (price: any) => {
    if (typeof price === "object" && price !== null) {
      if (currency === "GEL") return price.gel ?? 0;
      if (currency === "USD") return price.usd ?? 0;
    }

    if (typeof price === "number") return price;

    return 0;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    return {
      currency: "USD" as Currency,
      setCurrency: () => {},
      convertPrice: (p: any) => (typeof p === "number" ? p : (p?.usd ?? 0)),
    };
  }
  return context;
}
