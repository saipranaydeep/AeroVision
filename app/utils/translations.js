export const translations = {
  en: {
    // App Name
    appName: "AeroVision",
    appDescription: "Air Quality Monitor",

    // Navigation
    menu: "Menu",
    currentLocation: "Current Location",
    favorites: "Favorites",

    // Search
    searchPlaceholder: "Search city or location...",
    useCurrentLocation: "Use current location",
    gettingLocation: "Getting location...",

    // Tabs
    aqi: "AQI",
    weather: "Weather",
    forecast: "6-Day AQI",

    // Pollutants
    pm2_5: "PM2.5",
    pm10: "PM10",
    o3: "O₃",
    no2: "NO₂",
    so2: "SO₂",
    co: "CO",

    // SideMenu
    language: "Language",
    needHelp: "Need Help? Contact Support",
    faq: "FAQ",
    whatIsAeroVision: "What is Aero Vision?",
    whatIsAqi: "What is AQI?",
    whatIsPm25: "What is PM2.5?",
    version: "Version 1.0.0",

    // SideMenu additional translations
    appDescription: "Your air quality and weather companion",
    selectLanguage: "Select Language",
    frequentlyAskedQuestions: "Frequently Asked Questions",
    needHelpContact: "Need Help? Contact Us",

    // FAQ Questions and Answers
    whatIsAeroVisionContent:
      "AeroVision is a comprehensive air quality and weather monitoring application that provides real-time data about environmental conditions in your area. It helps you make informed decisions about outdoor activities based on current air quality index (AQI) and weather forecasts.",
    whatIsAqiContent:
      "The Air Quality Index (AQI) is a measurement used by government agencies to communicate to the public how polluted the air currently is or how polluted it is forecast to become. AQI values range from 0 to 500, with higher values indicating greater levels of air pollution and greater health concerns.",
    whatIsPm25Content:
      "PM2.5 refers to atmospheric particulate matter (PM) that have a diameter of less than 2.5 micrometers. These tiny particles can penetrate deep into the lungs and even enter the bloodstream, causing serious health issues including asthma, heart disease, and respiratory problems.",
    howIsAqiCalculated: "How is AQI calculated?",
    howIsAqiCalculatedContent:
      "AQI is calculated based on the concentrations of major air pollutants including particulate matter (PM2.5 and PM10), ozone (O3), nitrogen dioxide (NO2), sulfur dioxide (SO2), and carbon monoxide (CO). Each pollutant has a separate sub-index, and the overall AQI is the highest value among these sub-indices.",
    howDoesAirQualityAffectHealth: "How does air quality affect health?",
    howDoesAirQualityAffectHealthContent:
      "Poor air quality can aggravate respiratory conditions like asthma, increase risk of heart attacks, cause lung inflammation, reduce lung function, and lead to other serious health problems. Children, the elderly, and those with pre-existing conditions are most vulnerable.",
    whatAreAqiCategories: "What are the AQI categories?",
    whatAreAqiCategoriesContent:
      "AQI is divided into six categories: Good (0-50), Satisfactory (51-100), Moderate (101-150), Poor (151-200), Severe (201-300), and Hazardous (301-500). Each category has specific health recommendations.",

    // Language Options
    english: "English",
    hindi: "हिंदी",

    // AQI Component
    liveData: "Live Data",
    pollutantLevels: "Pollutant Levels",
    aqiReferenceScale: "AQI Reference Scale",
    healthRecommendations: "Health Recommendations",

    // AQI Levels (standardized)
    good: "Good",
    satisfactory: "Satisfactory",
    moderate: "Moderate",
    poor: "Poor",
    severe: "Severe",
    hazardous: "Hazardous",

    // Legacy AQI level translations (for backward compatibility)
    moderatelyPolluted: "Moderate", // Map moderately polluted to moderate
    veryPoor: "Severe", // Map very poor to severe

    // Weather
    today: "Today",
    humidity: "Humidity",
    wind: "Wind",
    precipitation: "Precipitation",
    condition: "Condition",
    forecastTitle: "Forecast",

    // Cities
    currentCity: "Current City",
    unknownLocation: "Unknown Location",

    // Map
    aqiStationsMap: "AQI Monitoring Stations",
    loadingMap: "Loading map...",
    loadingStationData: "Loading station data...",
    stationsVisible: "stations visible",
    withData: "with data",

    // Loading & Errors
    loadingData: "Loading data for",
    loadingWeather: "Loading weather data...",
    loadingAqi: "Loading AQI data...",
    noData: "No data",

    // Error Messages
    errorTitle: "Error",
    unknownError: "An unexpected error occurred. Please try again.",
    networkErrorTitle: "Connection Error",
    networkErrorMessage: "Please check your internet connection and try again.",
    serverErrorTitle: "Server Error",
    serverErrorMessage:
      "Our servers are experiencing issues. Please try again later.",
    clientErrorTitle: "Request Error",
    clientErrorMessage:
      "There was an issue with your request. Please try again.",
    locationErrorTitle: "Location Error",
    locationErrorMessage:
      "Unable to access your location. Please check permissions.",
    dataErrorTitle: "Data Error",
    dataErrorMessage: "Unable to process the received data. Please try again.",
    retryButton: "Retry",
    dismissButton: "Dismiss",

    // Health Messages
    healthMessage:
      "Breathing in this area at this AQI is same as PM2.5 / 22 cigarettes",
    airQualitySatisfactory: "Air quality is satisfactory.",
    enjoyOutdoor: "Enjoy your outdoor activities.",
    stayHydrated: "Stay hydrated.",
    avoidStrenuous:
      "Avoid strenuous activities if you have respiratory issues.",

    // AQI Component specific translations
    liveDataBadge: "LIVE DATA",
    hazardous: "Hazardous",

    // Health recommendations (updated)
    excellentAir: "Air quality is excellent.",
    perfectOutdoor: "Perfect for outdoor activities.",
    acceptableAir: "Air quality is acceptable.",
    limitExertion: "Limit prolonged outdoor exertion.",
    unhealthySensitive: "Unhealthy for sensitive groups.",
    limitOutdoor: "Limit outdoor activities if sensitive.",
    unhealthy: "Unhealthy for everyone.",
    avoidProlonged: "Avoid prolonged outdoor activities.",
    veryUnhealthy: "Very unhealthy for everyone.",
    avoidAllOutdoor: "Avoid all outdoor activities.",
    hazardousAir: "Hazardous air quality.",
    stayIndoors: "Stay indoors and keep windows closed.",

    // Cigarette Equivalency
    cigaretteEquivalency: "Cigarette Equivalency",
    exposureEquivalent: "Exposure Equivalent",
    cigarettePerDay: "Cigarette/Day",
    cigarettesPerDay: "Cigarettes/Day",
    cigarettePerWeek: "Cigarette/Week",
    cigarettesPerWeek: "Cigarettes/Week",
    cigarettePerMonth: "Cigarette/Month",
    cigarettesPerMonth: "Cigarettes/Month",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    disclaimer: "Disclaimer",
    cigaretteDisclaimerText:
      "This cigarette-equivalent estimate is based on the average PM2.5 concentration over the last 24 hours, assuming continuous exposure during that time.",

    // Legacy health recommendations (for backward compatibility)
    reduceSensitive: "Sensitive groups should reduce outdoor activities.",
    respiratoryDiscomfort:
      "People with respiratory issues may feel discomfort.",
    everyoneEffects: "Everyone may begin to experience health effects.",
    healthAlert:
      "Health alert: everyone may experience serious health effects.",
    healthWarning: "Health warning of emergency conditions.",

    // Weather component
    todaysWeather: "Today's Weather",
    currentLocation: "Current Location",
    noWeatherData: "No weather data available",
    weatherForecast: "Weather Forecast",
    high: "HIGH",
    low: "LOW",

    // Weather conditions
    heavyRain: "Heavy Rain",
    lightRain: "Light Rain",
    drizzle: "Drizzle",
    veryWindy: "Very Windy",
    windy: "Windy",
    veryHot: "Very Hot",
    hot: "Hot",
    freezing: "Freezing",
    cold: "Cold",
    sunny: "Sunny",
    partlyCloudy: "Partly Cloudy",
    cloudy: "Cloudy",

    // Pollutant component
    currentConcentration: "Current Concentration",
    airQualityStatus: "Air Quality Status",
    about: "About",
    healthEffects: "Health Effects",
    concentrationRanges: "Concentration Ranges",

    // Specific pollutant descriptions
    pm25Description:
      "Fine particulate matter (PM2.5) consists of tiny particles or droplets with diameters of 2.5 micrometers or less. These particles are so small they can penetrate deep into lung tissue and enter the bloodstream. PM2.5 comes from vehicle emissions, power plants, wildfires, and industrial processes.",
    pm10Description:
      "Coarse particulate matter (PM10) includes particles with diameters of 10 micrometers or less. These particles primarily come from dust storms, construction activities, agricultural operations, and road dust. While larger than PM2.5, they can still reach the lungs and cause health issues.",
    o3Description:
      "Ground-level ozone (O₃) is a harmful gas formed when pollutants from cars, power plants, and other sources react chemically in the presence of sunlight. Unlike the protective ozone layer in the upper atmosphere, ground-level ozone is a dangerous air pollutant.",
    no2Description:
      "Nitrogen dioxide (NO₂) is a reddish-brown gas with a sharp, harsh odor. It forms when fuel is burned at high temperatures, primarily from vehicle emissions and power plants. NO₂ can react with other chemicals in the air to form particulate matter and ozone.",
    so2Description:
      "Sulfur dioxide (SO₂) is a colorless gas with a pungent smell. It's primarily produced by burning fossil fuels containing sulfur, such as coal and oil, in power plants and industrial facilities. Volcanoes and ships also emit SO₂.",
    coDescription:
      "Carbon monoxide (CO) is a colorless, odorless, and tasteless gas produced by incomplete combustion of carbon-containing materials. Major sources include vehicle exhaust, faulty heating systems, and industrial processes. CO can be deadly in enclosed spaces.",

    // Health effects for each pollutant
    pm25HealthEffects:
      "Can cause respiratory and cardiovascular disease, lung cancer, and stroke. Most dangerous for children, elderly, pregnant women, and people with heart or lung conditions. Can reduce lung function and increase asthma attacks.",
    pm10HealthEffects:
      "Causes coughing, throat irritation, and reduced lung function. Can worsen asthma and lead to respiratory infections. Children and people with existing respiratory conditions are most at risk.",
    o3HealthEffects:
      "Triggers asthma attacks, reduces lung function, and causes chest pain and coughing. Can lead to premature death from respiratory disease. Especially harmful to children, athletes, and outdoor workers.",
    no2HealthEffects:
      "Irritates airways and can trigger asthma attacks. Long-term exposure linked to reduced lung function and increased respiratory infections. Children living near busy roads are particularly vulnerable.",
    so2HealthEffects:
      "Causes eye irritation, coughing, and throat soreness. Can trigger asthma attacks and worsen existing heart and lung diseases. People with asthma are especially sensitive to SO₂.",
    coHealthEffects:
      "Reduces oxygen delivery to organs and tissues. At high levels, can cause dizziness, headaches, nausea, and even death. Particularly dangerous for people with heart disease and in poorly ventilated areas.",

    // AQI Forecast component
    aqiForecast: "AQI Forecast",
    sixDayPredictions: "6-day air quality predictions",
    noForecastData: "No forecast data available",
    sixDayAverage: "6-Day Average",
    highestAQI: "Highest AQI",
    dailyForecast: "Daily Forecast",
    moderate: "Moderate",
    mainPollutant: "Main Pollutant",
    value: "Value",
    warning: "Warning",

    // AQI Graph component
    aqiTrendOf: "AQI Trend of",
    airQualityIndexForecast: "Air Quality Index Forecast",

    // Units
    ugm3: "µg/m³",
    ppb: "ppb",
    kmh: "km/h",
    mm: "mm",
    celsius: "°C",

    // Timestamp
    updatedOn: "Updated on",
    at: "at",
  },

  hi: {
    // App Name
    appName: "एरोविज़न",
    appDescription: "वायु गुणवत्ता मॉनिटर",

    // Navigation
    menu: "मेनू",
    currentLocation: "वर्तमान स्थान",
    favorites: "पसंदीदा",

    // Search
    searchPlaceholder: "शहर या स्थान खोजें...",
    useCurrentLocation: "वर्तमान स्थान का उपयोग करें",
    gettingLocation: "स्थान प्राप्त कर रहे हैं...",

    // Tabs
    aqi: "वायु गुणवत्ता सूचकांक",
    weather: "मौसम",
    forecast: "6-दिन का AQI",

    // Pollutants
    pm2_5: "पीएम2.5",
    pm10: "पीएम10",
    o3: "ओ₃",
    no2: "एन्नो₂",
    so2: "येस्सो₂",
    co: "सीओ",

    // SideMenu
    language: "भाषा",
    needHelp: "सहायता चाहिए? सपोर्ट से संपर्क करें",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    whatIsAeroVision: "एरो विज़न क्या है?",
    whatIsAqi: "AQI क्या है?",
    whatIsPm25: "PM2.5 क्या है?",
    version: "संस्करण 1.0.0",

    // SideMenu additional translations
    appDescription: "आपका वायु गुणवत्ता और मौसम साथी",
    selectLanguage: "भाषा चुनें",
    frequentlyAskedQuestions: "अक्सर पूछे जाने वाले प्रश्न",
    needHelpContact: "सहायता चाहिए? हमसे संपर्क करें",

    // FAQ Questions and Answers
    whatIsAeroVisionContent:
      "एरोविज़न एक व्यापक वायु गुणवत्ता और मौसम निगरानी एप्लिकेशन है जो आपके क्षेत्र में पर्यावरणीय स्थितियों के बारे में रियल-टाइम डेटा प्रदान करता है। यह वर्तमान वायु गुणवत्ता सूचकांक (AQI) और मौसम पूर्वानुमान के आधार पर बाहरी गतिविधियों के बारे में सूचित निर्णय लेने में मदद करता है।",
    whatIsAqiContent:
      "वायु गुणवत्ता सूचकांक (AQI) एक माप है जिसका उपयोग सरकारी एजेंसियों द्वारा जनता को यह बताने के लिए किया जाता है कि हवा वर्तमान में कितनी प्रदूषित है या कितनी प्रदूषित होने का पूर्वानुमान है। AQI मान 0 से 500 तक होते हैं, जहां उच्च मान वायु प्रदूषण के अधिक स्तर और अधिक स्वास्थ्य चिंताओं को दर्शाते हैं।",
    whatIsPm25Content:
      "PM2.5 का तात्पर्य वायुमंडलीय कणीय पदार्थ (PM) से है जिसका व्यास 2.5 माइक्रोमीटर से कम है। ये छोटे कण फेफड़ों में गहराई तक प्रवेश कर सकते हैं और यहां तक कि रक्त प्रवाह में भी प्रवेश कर सकते हैं, जिससे अस्थमा, हृदय रोग और सांस की समस्याओं सहित गंभीर स्वास्थ्य समस्याएं हो सकती हैं।",
    howIsAqiCalculated: "AQI की गणना कैसे की जाती है?",
    howIsAqiCalculatedContent:
      "AQI की गणना मुख्य वायु प्रदूषकों की सांद्रता के आधार पर की जाती है जिसमें कणीय पदार्थ (PM2.5 और PM10), ओजोन (O3), नाइट्रोजन डाइऑक्साइड (NO2), सल्फर डाइऑक्साइड (SO2), और कार्बन मोनोऑक्साइड (CO) शामिल हैं। प्रत्येक प्रदूषक का अलग उप-सूचकांक होता है, और समग्र AQI इन उप-सूचकांकों में से सबसे अधिक मान है।",
    howDoesAirQualityAffectHealth:
      "वायु गुणवत्ता स्वास्थ्य को कैसे प्रभावित करती है?",
    howDoesAirQualityAffectHealthContent:
      "खराब वायु गुणवत्ता अस्थमा जैसी सांस की स्थितियों को बढ़ा सकती है, दिल के दौरे का जोखिम बढ़ा सकती है, फेफड़ों की सूजन का कारण बन सकती है, फेफड़ों के कार्य को कम कर सकती है, और अन्य गंभीर स्वास्थ्य समस्याओं का कारण बन सकती है। बच्चे, बुजुर्ग, और पहले से मौजूद स्थितियों वाले लोग सबसे अधिक संवेदनशील हैं।",
    whatAreAqiCategories: "AQI श्रेणियां क्या हैं?",
    whatAreAqiCategoriesContent:
      "AQI को छह श्रेणियों में विभाजित किया गया है: अच्छा (0-50), संतोषजनक (51-100), मध्यम (101-150), खराब (151-200), गंभीर (201-300), और खतरनाक (301-500)। प्रत्येक श्रेणी की विशिष्ट स्वास्थ्य सिफारिशें हैं।",

    // Language Options
    english: "English",
    hindi: "हिंदी",

    // AQI Component
    liveData: "लाइव डेटा",
    pollutantLevels: "प्रदूषक स्तर",
    aqiReferenceScale: "AQI संदर्भ स्केल",
    healthRecommendations: "स्वास्थ्य सुझाव",

    // AQI Levels (standardized)
    good: "अच्छा",
    satisfactory: "संतोषजनक",
    moderate: "मध्यम",
    poor: "खराब",
    severe: "गंभीर",
    hazardous: "खतरनाक",

    // Legacy AQI level translations (for backward compatibility)
    moderatelyPolluted: "मध्यम", // Map moderately polluted to moderate
    veryPoor: "गंभीर", // Map very poor to severe

    // Weather
    today: "आज",
    humidity: "आर्द्रता",
    wind: "हवा",
    precipitation: "वर्षा",
    condition: "स्थिति",
    forecastTitle: "पूर्वानुमान",

    // Cities
    currentCity: "वर्तमान शहर",
    unknownLocation: "अज्ञात स्थान",

    // Map
    aqiStationsMap: "वायु गुणवत्ता निगरानी केंद्र",
    loadingMap: "मैप लोड हो रहा है...",
    loadingStationData: "स्टेशन डेटा लोड हो रहा है...",
    stationsVisible: "स्टेशन दिखाई दे रहे हैं",
    withData: "डेटा के साथ",

    // Loading & Errors
    loadingData: "डेटा लोड हो रहा है",
    loadingWeather: "मौसम डेटा लोड हो रहा है...",
    loadingAqi: "AQI डेटा लोड हो रहा है...",
    noData: "कोई डेटा नहीं",

    // Error Messages
    errorTitle: "त्रुटि",
    unknownError: "एक अप्रत्याशित त्रुटि हुई है। कृपया पुनः प्रयास करें।",
    networkErrorTitle: "कनेक्शन त्रुटि",
    networkErrorMessage:
      "कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।",
    serverErrorTitle: "सर्वर त्रुटि",
    serverErrorMessage:
      "हमारे सर्वर में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।",
    clientErrorTitle: "अनुरोध त्रुटि",
    clientErrorMessage: "आपके अनुरोध में समस्या थी। कृपया पुनः प्रयास करें।",
    locationErrorTitle: "स्थान त्रुटि",
    locationErrorMessage:
      "आपके स्थान तक पहुंच नहीं हो सकी। कृपया अनुमतियां जांचें।",
    dataErrorTitle: "डेटा त्रुटि",
    dataErrorMessage:
      "प्राप्त डेटा को संसाधित नहीं किया जा सका। कृपया पुनः प्रयास करें।",
    retryButton: "पुनः प्रयास करें",
    dismissButton: "बंद करें",

    // Health Messages
    healthMessage:
      "इस AQI पर इस क्षेत्र में सांस लेना PM2.5 / 22 सिगरेट के बराबर है",
    airQualitySatisfactory: "हवा की गुणवत्ता संतोषजनक है।",
    enjoyOutdoor: "अपनी बाहरी गतिविधियों का आनंद लें।",
    stayHydrated: "हाइड्रेटेड रहें।",
    avoidStrenuous: "यदि आपको सांस की समस्या है तो कठिन गतिविधियों से बचें।",

    // AQI Component specific translations
    liveDataBadge: "लाइव डेटा",
    hazardous: "खतरनाक",

    // Health recommendations (updated)
    excellentAir: "हवा की गुणवत्ता उत्कृष्ट है।",
    perfectOutdoor: "बाहरी गतिविधियों के लिए बेहतरीन।",
    acceptableAir: "हवा की गुणवत्ता स्वीकार्य है।",
    limitExertion: "लंबे समय तक बाहरी मेहनत सीमित करें।",
    unhealthySensitive: "संवेदनशील समूहों के लिए अस्वस्थ।",
    limitOutdoor: "यदि संवेदनशील हैं तो बाहरी गतिविधियां सीमित करें।",
    unhealthy: "सभी के लिए अस्वस्थ।",
    avoidProlonged: "लंबी बाहरी गतिविधियों से बचें।",
    veryUnhealthy: "सभी के लिए बहुत अस्वस्थ।",
    avoidAllOutdoor: "सभी बाहरी गतिविधियों से बचें।",
    hazardousAir: "खतरनाक हवा की गुणवत्ता।",
    stayIndoors: "घर के अंदर रहें और खिड़कियां बंद रखें।",

    // Cigarette Equivalency
    cigaretteEquivalency: "सिगरेट समकक्षता",
    exposureEquivalent: "एक्सपोज़र समकक्षता",
    cigarettePerDay: "सिगरेट/दिन",
    cigarettesPerDay: "सिगरेट/दिन",
    cigarettePerWeek: "सिगरेट/सप्ताह",
    cigarettesPerWeek: "सिगरेट/सप्ताह",
    cigarettePerMonth: "सिगरेट/महीना",
    cigarettesPerMonth: "सिगरेट/महीना",
    daily: "दैनिक",
    weekly: "साप्ताहिक",
    monthly: "मासिक",
    disclaimer: "अस्वीकरण",
    cigaretteDisclaimerText:
      "यह सिगरेट-समकक्ष अनुमान पिछले 24 घंटों में औसत PM2.5 सांद्रता पर आधारित है, उस समय के दौरान निरंतर संपर्क मानते हुए।",

    // Legacy health recommendations (for backward compatibility)
    reduceSensitive: "संवेदनशील समूहों को बाहरी गतिविधियां कम करनी चाहिए।",
    respiratoryDiscomfort: "सांस की समस्या वाले लोगों को परेशानी हो सकती है।",
    everyoneEffects: "सभी को स्वास्थ्य प्रभाव का अनुभव होने लग सकता है।",
    healthAlert:
      "स्वास्थ्य चेतावनी: सभी को गंभीर स्वास्थ्य प्रभाव हो सकते हैं।",
    healthWarning: "आपातकालीन स्थितियों की स्वास्थ्य चेतावनी।",
    avoidProlonged: "लंबे समय तक बाहरी मेहनत से बचें।",
    healthAlert:
      "स्वास्थ्य चेतावनी: सभी को गंभीर स्वास्थ्य प्रभाव हो सकते हैं।",
    avoidAllOutdoor: "सभी बाहरी गतिविधियों से बचें।",
    healthWarning: "आपातकालीन स्थितियों की स्वास्थ्य चेतावनी।",
    stayIndoors: "घर के अंदर रहें और खिड़कियां बंद रखें।",

    // Weather component
    todaysWeather: "आज का मौसम",
    currentLocation: "वर्तमान स्थान",
    noWeatherData: "कोई मौसम डेटा उपलब्ध नहीं",
    weatherForecast: "मौसम पूर्वानुमान",
    high: "अधिकतम",
    low: "न्यूनतम",

    // Weather conditions
    heavyRain: "भारी बारिश",
    lightRain: "हल्की बारिश",
    drizzle: "बूंदाबांदी",
    veryWindy: "बहुत हवादार",
    windy: "हवादार",
    veryHot: "बहुत गर्म",
    hot: "गर्म",
    freezing: "बर्फीला",
    cold: "ठंडा",
    sunny: "धूप वाला",
    partlyCloudy: "आंशिक बादल",
    cloudy: "बादल",

    // Pollutant component
    currentConcentration: "वर्तमान सांद्रता",
    airQualityStatus: "वायु गुणवत्ता स्थिति",
    about: "के बारे में",
    healthEffects: "स्वास्थ्य प्रभाव",
    concentrationRanges: "सांद्रता श्रेणियां",

    // Specific pollutant descriptions
    pm25Description:
      "सूक्ष्म कण पदार्थ (PM2.5) में 2.5 माइक्रोमीटर या उससे कम व्यास वाले छोटे कण या बूंदें होती हैं। ये कण इतने छोटे होते हैं कि ये फेफड़ों के ऊतकों में गहराई तक जा सकते हैं और रक्तप्रवाह में प्रवेश कर सकते हैं। PM2.5 वाहन उत्सर्जन, पावर प्लांट्स, जंगल की आग और औद्योगिक प्रक्रियाओं से आता है।",
    pm10Description:
      "मोटे कण पदार्थ (PM10) में 10 माइक्रोमीटर या उससे कम व्यास वाले कण शामिल हैं। ये कण मुख्यतः धूल भरी आंधी, निर्माण गतिविधियों, कृषि कार्यों और सड़क की धूल से आते हैं। PM2.5 से बड़े होने पर भी, ये फेफड़ों तक पहुंच सकते हैं और स्वास्थ्य समस्याएं पैदा कर सकते हैं।",
    o3Description:
      "भूमिगत ओजोन (O₃) एक हानिकारक गैस है जो तब बनती है जब कारों, पावर प्लांट्स और अन्य स्रोतों से निकले प्रदूषक सूर्य की रोशनी की उपस्थिति में रासायनिक अभिक्रिया करते हैं। ऊपरी वायुमंडल की सुरक्षात्मक ओजोन परत के विपरीत, भूमिगत ओजोन एक खतरनाक वायु प्रदूषक है।",
    no2Description:
      "नाइट्रोजन डाइऑक्साइड (NO₂) एक लाल-भूरे रंग की गैस है जिसमें तीखी, कड़वी गंध होती है। यह तब बनती है जब ईंधन को उच्च तापमान पर जलाया जाता है, मुख्यतः वाहन उत्सर्जन और पावर प्लांट्स से। NO₂ हवा में अन्य रसायनों के साथ अभिक्रिया करके कण पदार्थ और ओजोन बना सकती है।",
    so2Description:
      "सल्फर डाइऑक्साइड (SO₂) एक रंगहीन गैस है जिसमें तीखी गंध होती है। यह मुख्यतः सल्फर युक्त जीवाश्म ईंधन जैसे कोयला और तेल को पावर प्लांट्स और औद्योगिक सुविधाओं में जलाने से पैदा होती है। ज्वालामुखी और जहाज़ भी SO₂ का उत्सर्जन करते हैं।",
    coDescription:
      "कार्बन मोनोऑक्साइड (CO) एक रंगहीन, गंधहीन और स्वादहीन गैस है जो कार्बन युक्त पदार्थों के अधूरे दहन से उत्पन्न होती है। मुख्य स्रोतों में वाहन निकास, दोषपूर्ण हीटिंग सिस्टम और औद्योगिक प्रक्रियाएं शामिल हैं। CO बंद स्थानों में घातक हो सकती है।",

    // Health effects for each pollutant
    pm25HealthEffects:
      "सांस और हृदय संबंधी बीमारियां, फेफड़ों का कैंसर और स्ट्रोक का कारण बन सकता है। बच्चों, बुजुर्गों, गर्भवती महिलाओं और हृदय या फेफड़ों की स्थिति वाले लोगों के लिए सबसे खतरनाक। फेफड़ों की कार्यक्षमता कम कर सकता है और अस्थमा के दौरे बढ़ा सकता है।",
    pm10HealthEffects:
      "खांसी, गले की जलन और फेफड़ों की कार्यक्षमता में कमी का कारण बनता है। अस्थमा को बदतर बना सकता है और सांस की संक्रमण को बढ़ा सकता है। बच्चे और मौजूदा सांस की स्थिति वाले लोग सबसे अधिक जोखिम में हैं।",
    o3HealthEffects:
      "अस्थमा के दौरे को ट्रिगर करता है, फेफड़ों की कार्यक्षमता कम करता है, और सीने में दर्द और खांसी का कारण बनता है। सांस की बीमारी से जल्दी मृत्यु का कारण बन सकता है। बच्चों, एथलीटों और बाहरी कामगारों के लिए विशेष रूप से हानिकारक।",
    no2HealthEffects:
      "वायुमार्ग को परेशान करता है और अस्थमा के दौरे को ट्रिगर कर सकता है। लंबे समय तक संपर्क फेफड़ों की कार्यक्षमता में कमी और सांस की संक्रमण में वृद्धि से जुड़ा है। व्यस्त सड़कों के पास रहने वाले बच्चे विशेष रूप से संवेदनशील हैं।",
    so2HealthEffects:
      "आंखों में जलन, खांसी और गले की खराश का कारण बनता है। अस्थमा के दौरे को ट्रिगर कर सकता है और मौजूदा हृदय और फेफड़ों की बीमारियों को बदतर बना सकता है। अस्थमा वाले लोग SO₂ के लिए विशेष रूप से संवेदनशील हैं।",
    coHealthEffects:
      "अंगों और ऊतकों को ऑक्सीजन की आपूर्ति कम कर देता है। उच्च स्तर पर चक्कर आना, सिरदर्द, मतली और यहां तक कि मृत्यु का कारण बन सकता है। हृदय रोग वाले लोगों के लिए और खराब हवादार क्षेत्रों में विशेष रूप से खतरनाक।",

    // AQI Forecast component
    aqiForecast: "AQI पूर्वानुमान",
    sixDayPredictions: "6-दिन की वायु गुणवत्ता भविष्यवाणी",
    noForecastData: "कोई पूर्वानुमान डेटा उपलब्ध नहीं",
    sixDayAverage: "6-दिन का औसत",
    highestAQI: "उच्चतम AQI",
    dailyForecast: "दैनिक पूर्वानुमान",
    moderate: "मध्यम",
    mainPollutant: "मुख्य प्रदूषक",
    value: "मान",
    warning: "चेतावनी",

    // AQI Graph component
    aqiTrendOf: "AQI ट्रेंड",
    airQualityIndexForecast: "वायु गुणवत्ता सूचकांक पूर्वानुमान",

    // Units
    ugm3: "µg/m³",
    ppb: "ppb",
    kmh: "km/h",
    mm: "mm",
    celsius: "°C",

    // Timestamp
    updatedOn: "अपडेट किया गया",
    at: "को",
  },
};

// City name translations
export const cityTranslations = {
  en: {
    // Major Indian cities
    Mumbai: "Mumbai",
    Delhi: "Delhi",
    "New Delhi": "New Delhi",
    Bangalore: "Bangalore",
    Bengaluru: "Bengaluru",
    Hyderabad: "Hyderabad",
    Chennai: "Chennai",
    Kolkata: "Kolkata",
    Pune: "Pune",
    Ahmedabad: "Ahmedabad",
    Jaipur: "Jaipur",
    Lucknow: "Lucknow",
    Kanpur: "Kanpur",
    Nagpur: "Nagpur",
    Indore: "Indore",
    Thane: "Thane",
    Bhopal: "Bhopal",
    Visakhapatnam: "Visakhapatnam",
    "Pimpri-Chinchwad": "Pimpri-Chinchwad",
    Patna: "Patna",
    Vadodara: "Vadodara",
    Ghaziabad: "Ghaziabad",
    Ludhiana: "Ludhiana",
    Agra: "Agra",
    Nashik: "Nashik",
    Faridabad: "Faridabad",
    Meerut: "Meerut",
    Rajkot: "Rajkot",
    "Kalyan-Dombivli": "Kalyan-Dombivli",
    "Vasai-Virar": "Vasai-Virar",
    Varanasi: "Varanasi",
    Srinagar: "Srinagar",
    Aurangabad: "Aurangabad",
    Dhanbad: "Dhanbad",
    Amritsar: "Amritsar",
    "Navi Mumbai": "Navi Mumbai",
    Allahabad: "Allahabad",
    Prayagraj: "Prayagraj",
    Howrah: "Howrah",
    Ranchi: "Ranchi",
    Gwalior: "Gwalior",
    Jabalpur: "Jabalpur",
    Coimbatore: "Coimbatore",
    Vijayawada: "Vijayawada",
    Jodhpur: "Jodhpur",
    Madurai: "Madurai",
    Raipur: "Raipur",
    Kota: "Kota",
    Guwahati: "Guwahati",
    Chandigarh: "Chandigarh",
    Solapur: "Solapur",
    "Hubli-Dharwad": "Hubli-Dharwad",
    Bareilly: "Bareilly",
    Moradabad: "Moradabad",
    Mysore: "Mysore",
    Mysuru: "Mysuru",
    Gurgaon: "Gurgaon",
    Gurugram: "Gurugram",
    Aligarh: "Aligarh",
    Jalandhar: "Jalandhar",
    Tiruchirappalli: "Tiruchirappalli",
    Bhubaneswar: "Bhubaneswar",
    Salem: "Salem",
    Warangal: "Warangal",
    Guntur: "Guntur",
    Bhiwandi: "Bhiwandi",
    Saharanpur: "Saharanpur",
    Gorakhpur: "Gorakhpur",
    Bikaner: "Bikaner",
    Amravati: "Amravati",
    Noida: "Noida",
    Jamshedpur: "Jamshedpur",
    Bhilai: "Bhilai",
    Cuttack: "Cuttack",
    Firozabad: "Firozabad",
    Kochi: "Kochi",
    Nellore: "Nellore",
    Bhavnagar: "Bhavnagar",
    Dehradun: "Dehradun",
    Durgapur: "Durgapur",
    Asansol: "Asansol",
    Rourkela: "Rourkela",
    Nanded: "Nanded",
    Kolhapur: "Kolhapur",
    Ajmer: "Ajmer",
    Akola: "Akola",
    Gulbarga: "Gulbarga",
    Jamnagar: "Jamnagar",
    Ujjain: "Ujjain",
    Sagar: "Sagar",
    Dewas: "Dewas",
    Satna: "Satna",
    Ratlam: "Ratlam",
    Rewa: "Rewa",
    Loni: "Loni",
    Siliguri: "Siliguri",
    Jhansi: "Jhansi",
    Ulhasnagar: "Ulhasnagar",
    Jammu: "Jammu",
    "Sangli-Miraj & Kupwad": "Sangli-Miraj & Kupwad",
    Mangalore: "Mangalore",
    Erode: "Erode",
    Belgaum: "Belgaum",
    Ambattur: "Ambattur",
    Tirunelveli: "Tirunelveli",
    Malegaon: "Malegaon",
    Gaya: "Gaya",
    Jalgaon: "Jalgaon",
    Udaipur: "Udaipur",
    Maheshtala: "Maheshtala",
    "Unknown Location": "Unknown Location",
  },
  hi: {
    // Major Indian cities in Hindi
    Mumbai: "मुंबई",
    Delhi: "दिल्ली",
    "New Delhi": "नई दिल्ली",
    Bangalore: "बैंगलोर",
    Bengaluru: "बेंगलुरु",
    Hyderabad: "हैदराबाद",
    Chennai: "चेन्नई",
    Kolkata: "कोलकाता",
    Pune: "पुणे",
    Ahmedabad: "अहमदाबाद",
    Jaipur: "जयपुर",
    Lucknow: "लखनऊ",
    Kanpur: "कानपुर",
    Nagpur: "नागपुर",
    Indore: "इंदौर",
    Thane: "ठाणे",
    Bhopal: "भोपाल",
    Visakhapatnam: "विशाखापत्तनम",
    "Pimpri-Chinchwad": "पिंपरी-चिंचवड",
    Patna: "पटना",
    Vadodara: "वडोदरा",
    Ghaziabad: "गाजियाबाद",
    Ludhiana: "लुधियाना",
    Agra: "आगरा",
    Nashik: "नासिक",
    Faridabad: "फरीदाबाद",
    Meerut: "मेरठ",
    Rajkot: "राजकोट",
    "Kalyan-Dombivli": "कल्याण-डोंबिवली",
    "Vasai-Virar": "वसई-विरार",
    Varanasi: "वाराणसी",
    Srinagar: "श्रीनगर",
    Aurangabad: "औरंगाबाद",
    Dhanbad: "धनबाद",
    Amritsar: "अमृतसर",
    "Navi Mumbai": "नवी मुंबई",
    Allahabad: "इलाहाबाद",
    Prayagraj: "प्रयागराज",
    Howrah: "हावड़ा",
    Ranchi: "रांची",
    Gwalior: "ग्वालियर",
    Jabalpur: "जबलपुर",
    Coimbatore: "कोयंबटूर",
    Vijayawada: "विजयवाड़ा",
    Jodhpur: "जोधपुर",
    Madurai: "मदुरै",
    Raipur: "रायपुर",
    Kota: "कोटा",
    Guwahati: "गुवाहाटी",
    Chandigarh: "चंडीगढ़",
    Solapur: "सोलापुर",
    "Hubli-Dharwad": "हुबली-धारवाड़",
    Bareilly: "बरेली",
    Moradabad: "मुरादाबाद",
    Mysore: "मैसूर",
    Mysuru: "मैसूरु",
    Gurgaon: "गुड़गांव",
    Gurugram: "गुरुग्राम",
    Aligarh: "अलीगढ़",
    Jalandhar: "जालंधर",
    Tiruchirappalli: "तिरुचिरापल्ली",
    Bhubaneswar: "भुवनेश्वर",
    Salem: "सेलम",
    Warangal: "वारंगल",
    Guntur: "गुंटूर",
    Bhiwandi: "भिवंडी",
    Saharanpur: "सहारनपुर",
    Gorakhpur: "गोरखपुर",
    Bikaner: "बीकानेर",
    Amravati: "अमरावती",
    Noida: "नोएडा",
    Jamshedpur: "जमशेदपुर",
    Bhilai: "भिलाई",
    Cuttack: "कटक",
    Firozabad: "फिरोजाबाद",
    Kochi: "कोच्चि",
    Nellore: "नेल्लोर",
    Bhavnagar: "भावनगर",
    Dehradun: "देहरादून",
    Durgapur: "दुर्गापुर",
    Asansol: "आसनसोल",
    Rourkela: "राउरकेला",
    Nanded: "नांदेड़",
    Kolhapur: "कोल्हापुर",
    Ajmer: "अजमेर",
    Akola: "अकोला",
    Gulbarga: "गुलबर्गा",
    Jamnagar: "जामनगर",
    Ujjain: "उज्जैन",
    Sagar: "सागर",
    Dewas: "देवास",
    Satna: "सतना",
    Ratlam: "रतलाम",
    Rewa: "रीवा",
    Loni: "लोनी",
    Siliguri: "सिलीगुड़ी",
    Jhansi: "झांसी",
    Ulhasnagar: "उल्हासनगर",
    Jammu: "जम्मू",
    "Sangli-Miraj & Kupwad": "सांगली-मिराज और कुपवाड़",
    Mangalore: "मंगलौर",
    Erode: "इरोड",
    Belgaum: "बेलगाम",
    Ambattur: "अंबत्तूर",
    Tirunelveli: "तिरुनेलवेली",
    Malegaon: "मालेगांव",
    Gaya: "गया",
    Jalgaon: "जलगांव",
    Udaipur: "उदयपुर",
    Maheshtala: "महेश्तला",
    "Unknown Location": "अज्ञात स्थान",
  },
};

export const getTranslation = (key, language = "en") => {
  return translations[language]?.[key] || translations["en"][key] || key;
};

export const getCityTranslation = (cityName, language = "en") => {
  return cityTranslations[language]?.[cityName] || cityName;
};

export default { getTranslation, getCityTranslation };
