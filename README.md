
# 🌤️ Weather App

A modern, responsive weather application built with **Next.js**, **TypeScript**, and **shadcn/ui**, providing real-time weather data, 5-day forecasts, smart city search with suggestions, and a polished user experience.

---

## 🚀 Live Demo 

👉 **Live App:** [https://frontend-task-nine-psi.vercel.app/](https://frontend-task-nine-psi.vercel.app/)

---

## 📦 Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Axios**
* **Tailwind CSS**
* **shadcn/ui**
* **OpenWeatherMap API**

---

## ✨ Features Implemented

### 🌍 Weather

* Search weather by **city name**
* **Real-time current weather**

  * Temperature
  * Weather condition
  * Humidity
  * Wind speed
* **5-day weather forecast**

### 🔍 Smart City Search

* Live city suggestions while typing
* Powered by **OpenWeather Geocoding API**
* Suggestions appear **only on user input**
* Clicking a suggestion:

  * Auto-fills the city
  * Triggers search immediately
  * Closes suggestion dropdown

### 🌡️ Temperature Unit Toggle

* Toggle between **°C and °F**
* Instant conversion (no refetching)
* Clean and accessible UI

### 📍 Location Detection

* Automatically detects user location using **Browser Geolocation API**
* Fetches weather for the detected city on first load
* Gracefully falls back if permission is denied

### 🎨 UI & UX

* Modern UI built with **shadcn/ui**
* **Skeleton loaders** for smooth loading states
* Friendly, non-intrusive error messages
* Dynamic, responsive layout
* Radial gradient background on initial load

### ⚡ Performance & Best Practices

* API keys secured using environment variables
* Debounced API calls for city suggestions
* Clean component-based architecture
* Type-safe data handling with TypeScript

---

## 🧩 APIs Used

### 🌦️ OpenWeatherMap APIs

1. **Current Weather API**

   ```
   https://api.openweathermap.org/data/2.5/weather
   ```

2. **5-Day / 3-Hour Forecast API**

   ```
   https://api.openweathermap.org/data/2.5/forecast
   ```

3. **Geocoding API (City Search)**

   ```
   https://api.openweathermap.org/geo/1.0/direct
   ```

4. **Reverse Geocoding API (Location Detection)**

   ```
   https://api.openweathermap.org/geo/1.0/reverse
   ```

> All APIs are accessed securely using an API key stored in environment variables.

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/gopal-nd/frontend-task.git
cd weather-app
```

---

### 2️⃣ Install Dependencies

```bash
bun install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
```

> ⚠️ Do not commit `.env` to GitHub.

---

### 4️⃣ Run the Development Server

```bash
bun run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 🚀 Deployment (Vercel)

1. Push the project to GitHub
2. Go to **[https://vercel.com](https://vercel.com)**
3. Import your repository
4. Add the environment variable:

   ```
   NEXT_PUBLIC_WEATHER_API_KEY
   ```
5. Click **Deploy**

Deployment is fully automatic with zero configuration.

---

## 📁 Project Structure

```
weather-app/
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ErrorMessage.tsx
│   ├── Forecast.tsx
│   ├── InfoTooltip.tsx
│   ├── Loader.tsx
│   ├── SearchBar.tsx
│   ├── ui/
│   ├── UnitToggle.tsx
│   └── WeatherCard.tsx
├── lib
│   ├── convertTemp.ts
│   ├── fetchForecast.ts
│   ├── fetchWeather.ts
│   ├── reverseGeo.ts
│   └── utils.ts
└── types
    └── weather.ts
├── next.config.ts
├── next-env.d.ts
├── components.json
├── eslint.config.mjs
├── bun.lock
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── .env
└── README.md
```

---

## 🧠 Key Engineering Decisions

* **Single source of truth:** Weather data fetched once in metric units and converted locally
* **No unnecessary API calls:** Unit toggling is instant
* **Debounced city search:** Prevents API overuse
* **Separation of concerns:** UI, data fetching, and utilities are clearly separated
* **Accessibility & UX first:** Keyboard focus, clean errors, smooth transitions


---

## 👨‍💻 Author

**Gopla N D**

* GitHub: [https://github.com/Gopal-nd](https://github.com/Gopal-nd)

---
