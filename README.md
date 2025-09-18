# AeroVision 🌍

AeroVision is a comprehensive air quality monitoring mobile application built with React Native and Expo. The app provides real-time air quality data, weather information, and health recommendations to help users make informed decisions about their daily activities based on air pollution levels.

## Features ✨

- **Real-time Air Quality Index (AQI)** monitoring with visual meters and graphs
- **Pollutant tracking** for PM2.5, PM10, NO₂, SO₂, CO, and O₃
- **Location-based data** with automatic GPS detection or manual city selection
- **Weather integration** showing current conditions alongside air quality
- **Health recommendations** based on current AQI levels
- **Cigarette equivalency calculator** for PM2.5 exposure
- **Multi-language support** with internationalization
- **AQI forecasting** for future planning
- **Interactive charts** and visual representations
- **Offline caching** for better performance

## Tech Stack 🛠️

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with file-based routing
- **State Management**: React Context API
- **HTTP Client**: Axios for API calls
- **Charts**: Custom AQI graphs and meters
- **Storage**: AsyncStorage for local data persistence
- **Location**: Expo Location for GPS functionality
- **UI Components**: Custom components with LinearGradient

## Getting Started 🚀

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/saipranaydeep/AeroVision.git
   cd AeroVision
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

### Running the App

After starting the development server, you can run the app on:

- **Development build**: Scan the QR code with your device
- **Android emulator**: Press `a` in the terminal
- **iOS simulator**: Press `i` in the terminal (macOS only)
- **Web browser**: Press `w` in the terminal
- **Expo Go**: Download the Expo Go app and scan the QR code

## Project Structure 📁

```
app/
├── _layout.tsx          # Root layout component
├── index.jsx            # Main app entry point
├── api/                 # API integration
├── components/          # Reusable UI components
│   ├── AQIGraph.jsx     # Air quality visualization
│   ├── AQIMeter.jsx     # AQI meter component
│   └── ...
├── contexts/            # React context providers
├── navbar/              # Navigation components
├── tabs/                # Tab-based screens
│   ├── aqi/            # AQI-related screens
│   └── Pollutant.jsx   # Individual pollutant views
└── utils/               # Utility functions and translations
```

## Available Scripts 📝

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality

## API Integration 🔌

The app integrates with air quality APIs to fetch real-time data. Make sure to configure your API endpoints in the `app/api/API.jsx` file.

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact the development team

## Acknowledgments 🙏

- Air quality data providers
- Expo and React Native communities
- Contributors and testers

---

Made with ❤️ for cleaner air awareness
