export const SOCIAL_LINKS = {
  TELEGRAM: "https://t.me/+mbsmRbnQvIo3ZmE1",
  TIKTOK: "https://tiktok.com/@sizan_3t1",
  OWNER_TELEGRAM: "https://t.me/stOwnR",
};

export const MARKETS = {
  CURRENCIES: [
    "AUD/USD (OTC)", "GBP/AUD (OTC)", "CAD/CHF (OTC)", "EUR/USD (OTC)", "GBP/USD (OTC)",
    "USD/NGN (OTC)", "CAD/JPY (OTC)", "USD/BRL (OTC)", "EUR/JPY (OTC)", "USD/ZAR (OTC)",
    "EUR/AUD (OTC)", "USD/PKR (OTC)", "GBP/CHF (OTC)", "NZD/CHF (OTC)", "USD/JPY (OTC)",
    "EUR/CAD (OTC)", "NZD/CAD (OTC)", "USD/COP (OTC)", "USD/IDR (OTC)", "EUR/CHF (OTC)",
    "USD/ARS (OTC)", "USD/EGP (OTC)", "USD/BDT (OTC)", "USD/CAD (OTC)", "USD/CHF (OTC)",
    "CHF/JPY (OTC)", "EUR/GBP (OTC)", "GBP/CAD (OTC)", "AUD/CAD (OTC)", "AUD/CHF (OTC)",
    "AUD/JPY (OTC)", "NZD/JPY (OTC)", "USD/DZD (OTC)", "USD/INR (OTC)", "USD/PHP (OTC)",
    "EUR/NZD (OTC)", "EUR/SGD (OTC)", "GBP/NZD (OTC)", "AUD/NZD (OTC)"
  ],
  CRYPTO: [
    "Trump (OTC)", "Ripple (OTC)", "Zcash (OTC)", "Ethereum (OTC)", "Bitcoin (OTC)",
    "Bitcoin Cash (OTC)", "Avalanche (OTC)", "Solana (OTC)", "Chainlink (OTC)",
    "Cosmos (OTC)", "Litecoin (OTC)"
  ],
  COMMODITIES: [
    "USCrude (OTC)", "Silver (OTC)", "UKBrent (OTC)", "Gold (OTC)"
  ],
  STOCKS: [
    "American Express (OTC)", "McDonald's (OTC)", "Boeing Company (OTC)",
    "FACEBOOK INC (OTC)", "Pfizer Inc (OTC)", "Johnson & Johnson (OTC)",
    "Intel (OTC)", "Microsoft (OTC)", "S&P/ASX 200", "FTSE China A50 Index",
    "Dow Jones", "CAC 40", "FTSE 100", "Hong Kong 50", "IBEX 35",
    "Nikkei 225", "NASDAQ 100", "EURO STOXX 50"
  ]
};

export const ALL_MARKETS = [
  ...MARKETS.CURRENCIES,
  ...MARKETS.CRYPTO,
  ...MARKETS.COMMODITIES,
  ...MARKETS.STOCKS
];
