# Stablecoins Earth

An interactive 3D globe visualization of local currency stablecoins on the Solana blockchain.

![Stablecoins Earth](preview.png)

## Overview

This project visualizes stablecoins representing various countries' currencies, showing the growing ecosystem of local currency stablecoins being brought onchain. The data is sourced from Artemis Analytics.

## Features

- **Interactive 3D Globe**: Rotate and zoom to explore stablecoins around the world
- **Country Markers**: Visual indicators showing stablecoin presence by country
- **Real-time Stats**: Total supply, number of currencies, and countries covered
- **Detailed Cards**: Information about each stablecoin including symbol and supply
- **Hover Tooltips**: Quick information on globe markers
- **Dark Theme**: Modern, crypto-native visual design

## Stablecoins Tracked

| Symbol | Country | Currency |
|--------|---------|----------|
| USDC | United States | US Dollar (USD) |
| USDT | United States | US Dollar (USD) |
| PYUSD | United States | US Dollar (USD) |
| USDS | United States | US Dollar (USD) |
| USDС | United States | US Dollar (USD) |
| USD1 | United States | US Dollar (USD) |
| JUPUSD | United States | US Dollar (USD) |
| USDY | United States | US Dollar (USD) |
| USDG | United States | US Dollar (USD) |
| CASH | United States | US Dollar (USD) |
| EURC | European Union | Euro (EUR) |
| BRZ | Brazil | Brazilian Real (BRL) |
| GYEN | Japan | Japanese Yen (JPY) |
| EUROe | European Union | Euro (EUR) |
| IDRX | Indonesia | Indonesian Rupiah (IDR) |
| NGN | Nigeria | Nigerian Naira (NGN) |
| ZARP | South Africa | South African Rand (ZAR) |
| TRYB | Turkey | Turkish Lira (TRY) |
| MXNe | Mexico | Mexican Peso (MXN) |
| VGBP | United Kingdom | British Pound (GBP) |
| VCHF | Switzerland | Swiss Franc (CHF) |
| VEUR | European Union | Euro (EUR) |
| GBPA | United Kingdom | British Pound (GBP) |
| EURCV | European Union | Euro (EUR) |
| KZTE | Kazakhstan | Kazakhstani Tenge (KZT) |
| AUDD | Australia | Australian Dollar (AUD) |

## Data Source

Data is sourced from the Artemis Analytics database:

```sql
SELECT symbol, supply
FROM pc_dbt_db.prod.agg_daily_stablecoin_breakdown_symbol_chain
WHERE date_granularity = '2026-01-15'
  AND chain = 'solana'
  AND symbol IN ('USDC', 'USDT', 'PYUSD', 'USDS', 'USDС', 'USD1',
                 'JUPUSD', 'USDY', 'USDG', 'CASH',
                 'EURC', 'BRZ', 'GYEN', 'EUROe', 'IDRX', 'NGN',
                 'ZARP', 'TRYB', 'MXNe', 'VGBP', 'VCHF', 'VEUR',
                 'GBPA', 'EURCV', 'KZTE', 'AUDD')
```

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/stablecoins-earth.git
   cd stablecoins-earth
   ```

2. Serve the files locally (any static file server will work):
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve

   # Using PHP
   php -S localhost:8000
   ```

3. Open http://localhost:8000 in your browser

### Updating Data

To update the stablecoin supply data, edit the `stablecoinData` array in `app.js`:

```javascript
const stablecoinData = [
    {
        symbol: 'EURC',
        supply: 89500000,  // Update this value
        country: 'European Union',
        currency: 'Euro',
        currencyCode: 'EUR',
        flag: '🇪🇺',
        lat: 50.8503,
        lng: 4.3517
    },
    // ... more entries
];
```

## Technology Stack

- **HTML5/CSS3**: Structure and styling
- **JavaScript (ES6+)**: Application logic
- **Three.js**: 3D globe rendering
- **Google Fonts**: Inter typeface

## Project Structure

```
stablecoins-earth/
├── index.html      # Main HTML file
├── styles.css      # CSS styles (dark theme)
├── app.js          # JavaScript (Three.js globe + data)
└── README.md       # This file
```

## Contributing

Contributions are welcome! If you notice a local currency stablecoin that's missing or have suggestions for improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Credits

- Data: [Artemis Analytics](https://app.artemisanalytics.com)
- Inspiration: [stablecoins.earth](https://stablecoins.earth)
- Globe visualization powered by [Three.js](https://threejs.org)
