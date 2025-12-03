# iomotorsport Data Management

This folder contains all the JSON data files that power the iomotorsport website.

## 📁 File Structure

```
data/
├── races.json       # Race calendar, series info, completed results
├── teams.json       # Teams, drivers, manufacturers, car classes
├── bop.json         # Balance of Performance adjustments
├── predictions.json # Race predictions and accuracy tracking
├── esports.json     # Esports team, drivers, results, events
├── community.json   # Social stats, Discord info, activity feed
└── store.json       # Products, categories, promo codes
```

## 🔧 How to Update Data

### Race Calendar (`races.json`)

Add new races to the `calendar` array:

```json
{
  "id": "wec-2025-05", // Unique ID: series-year-round
  "series": "wec", // Must match key in "series" object
  "round": 5,
  "name": "6 Hours of São Paulo",
  "shortName": "São Paulo",
  "circuit": "Autódromo José Carlos Pace",
  "location": "São Paulo, Brazil",
  "country": "BR", // ISO 2-letter country code
  "date": "2025-07-12", // YYYY-MM-DD format
  "endDate": "2025-07-13", // Optional for multi-day events
  "duration": "6 Hours",
  "status": "upcoming", // upcoming | completed
  "isNextRace": false, // Set ONE race as true
  "featured": false // Show on homepage
}
```

After a race completes, add winner info:

```json
{
  "status": "completed",
  "winner": {
    "class": "Hypercar",
    "number": 7,
    "team": "Toyota Gazoo Racing",
    "car": "Toyota GR010 Hybrid"
  }
}
```

### Teams & Entry Lists (`teams.json`)

Add teams to the `teams` array:

```json
{
  "id": "toyota-7",
  "number": 7,
  "name": "Toyota Gazoo Racing",
  "manufacturer": "toyota", // Must match key in "manufacturers"
  "car": "Toyota GR010 Hybrid",
  "class": "hypercar", // Must match key in "classes"
  "series": ["wec", "imsa"], // Array of series IDs
  "drivers": [
    { "name": "Kamui Kobayashi", "country": "JP", "role": "platinum" },
    { "name": "Brendon Hartley", "country": "NZ", "role": "platinum" },
    { "name": "José María López", "country": "AR", "role": "platinum" }
  ]
}
```

### Predictions (`predictions.json`)

Add new predictions:

```json
{
  "id": "pred-wec-2025-04",
  "race": "wec-2025-04", // Must match race ID in races.json
  "series": "wec",
  "raceName": "24 Hours of Le Mans",
  "date": "2025-06-14",
  "status": "active", // active | completed
  "publishedDate": "2025-12-01",
  "confidence": 78, // Overall confidence 0-100
  "analysis": {
    "summary": "Brief analysis text...",
    "keyFactors": ["Factor 1", "Factor 2"]
  },
  "podiumPrediction": [
    {
      "position": 1,
      "number": 7,
      "team": "Toyota Gazoo Racing",
      "car": "Toyota GR010 Hybrid",
      "confidence": 32 // Per-position confidence
    }
  ]
}
```

After race completes, update:

```json
{
  "status": "completed",
  "result": "correct",           // correct | partial | incorrect
  "podiumPrediction": [
    {
      ...
      "actualPosition": 1        // Add actual finish position
    }
  ]
}
```

### Esports (`esports.json`)

Add driver results to `recentResults`:

```json
{
  "date": "2025-11-25",
  "event": "IMSA Virtual Championship - Road Atlanta",
  "platform": "iRacing",
  "driver": "alex-velocity", // Must match driver ID
  "position": 2,
  "class": "GTP"
}
```

### Store Products (`store.json`)

Add products:

```json
{
  "id": "le-mans-tee-2025",
  "name": "Le Mans 2025 Edition Tee",
  "category": "apparel", // Must match category ID
  "price": 35.0,
  "originalPrice": null, // Set for sale items
  "description": "Limited edition t-shirt...",
  "colors": ["White", "Black"],
  "sizes": ["S", "M", "L", "XL"],
  "inStock": true,
  "featured": true, // Show on homepage
  "badge": "Limited", // Bestseller | Sale | Limited | New
  "images": ["filename.jpg"]
}
```

## 🔄 Using the Data in Pages

### Method 1: ES Modules (Recommended)

```html
<script type="module">
  import { DataService } from "./js/data-service.js";

  // Get upcoming races
  const races = await DataService.getUpcomingRaces(5);
  console.log(races);

  // Get entry list for WEC Hypercar
  const entries = await DataService.getEntryList("wec", "hypercar");
  console.log(entries);
</script>
```

### Method 2: Global Script

```html
<script src="js/data-service-global.js"></script>
<script>
  // Wait for DataService to be available
  DataService.getNextRace().then((race) => {
    console.log("Next race:", race.name);
  });
</script>
```

## 📊 Country Codes Reference

Use ISO 3166-1 alpha-2 codes:

- 🇬🇧 GB - United Kingdom
- 🇺🇸 US - United States
- 🇯🇵 JP - Japan
- 🇩🇪 DE - Germany
- 🇫🇷 FR - France
- 🇮🇹 IT - Italy
- 🇧🇷 BR - Brazil
- 🇦🇺 AU - Australia
- 🇳🇿 NZ - New Zealand
- 🇨🇭 CH - Switzerland
- 🇧🇪 BE - Belgium
- 🇳🇱 NL - Netherlands
- 🇩🇰 DK - Denmark
- 🇪🇸 ES - Spain
- 🇦🇹 AT - Austria

## ⚡ Tips

1. **Always validate JSON** before saving - use [JSONLint](https://jsonlint.com/)
2. **Keep dates consistent** - always use YYYY-MM-DD format
3. **Update `lastUpdated`** field when making changes
4. **Test locally** before deploying - run a local server
5. **Backup data** - commit regularly to git

## 🔮 Future Improvements

- [ ] Add CSV import/export for bulk updates
- [ ] Google Sheets integration for easier editing
- [ ] Admin panel for non-technical editors
- [ ] Automated data fetching from official APIs
- [ ] Real-time updates via WebSocket
