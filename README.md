# SmartDesk Mobile - React Native

This is the React Native version of the SmartDesk web application, converted for iOS and Android mobile platforms.

## Features

- ✅ User Authentication (Login/Signup)
- ✅ Real-time Ergonomic Measurements Dashboard
- ✅ User Profile Management
- ✅ Premium Plans and Subscription
- ✅ Personal Data Management
- ✅ Settings and Preferences
- ✅ Bottom Tab Navigation
- ✅ Native Mobile UI/UX

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **TypeScript** - Type safety
- **Ionicons** - Icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Install dependencies:

```bash
cd SmartDesk
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run on specific platform:

```bash
# iOS
npm run ios

# Android
npm run android

# Web (for testing)
npm run web
```

## Project Structure

```
SmartDesk/
├── App.tsx                 # Main app component with navigation
├── src/
│   └── screens/           # All screen components
│       ├── LoginScreen.tsx
│       ├── SignupScreen.tsx
│       ├── MeasurementsScreen.tsx
│       ├── ProfileScreen.tsx
│       ├── PremiumScreen.tsx
│       ├── PersonalDataScreen.tsx
│       └── SettingsScreen.tsx
├── assets/                # Images and static assets
└── package.json
```

## Key Differences from Web Version

### Navigation

- **Web**: Manual state management with conditional rendering
- **Mobile**: React Navigation with stack and tab navigators

### UI Components

- **Web**: Radix UI components and Tailwind CSS
- **Mobile**: Native React Native components with StyleSheet

### Styling

- **Web**: Tailwind CSS classes
- **Mobile**: StyleSheet API with inline styles

### Icons

- **Web**: Lucide React icons
- **Mobile**: Ionicons from @expo/vector-icons

### Form Inputs

- **Web**: Custom Input/Button components from UI library
- **Mobile**: Native TextInput and TouchableOpacity components

## Screens Overview

### LoginScreen

- Email and password authentication
- Password visibility toggle
- Remember me checkbox
- Navigation to signup

### SignupScreen

- Complete registration form
- Work model selection (Remote/Hybrid/Office)
- Terms and conditions acceptance

### MeasurementsScreen

- Real-time ergonomic metrics
- Score cards for different measurements
- Trend indicators
- Alert notifications
- Premium upsell CTA

### ProfileScreen

- User information display
- Statistics cards
- Menu navigation
- Achievement badges
- Logout functionality

### PremiumScreen

- Three tier plans (Free/Premium/Enterprise)
- Feature comparison
- Benefits showcase
- Testimonials
- FAQ section

### PersonalDataScreen

- Personal information editing
- Professional details
- Health metrics (BMI calculation)
- Avatar management
- Account danger zone

### SettingsScreen

- Notification preferences
- Display settings
- Sound and vibration
- Monitoring configuration
- Privacy settings
- Data management

## Color Palette

- Primary: `#4F46E5` (Indigo)
- Secondary: `#9333EA` (Purple)
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Amber)
- Error: `#EF4444` (Red)
- Background: `#F9FAFB` (Gray)
- Text: `#111827` (Dark Gray)

## Navigation Flow

```
Auth Stack:
├── LoginScreen
└── SignupScreen

Main Stack:
├── MainTabs (Bottom Tabs)
│   ├── MeasurementsScreen
│   ├── PremiumScreen
│   └── ProfileScreen
├── PersonalDataScreen (Modal)
└── SettingsScreen (Modal)
```

## Future Enhancements

- [ ] Add real API integration
- [ ] Implement push notifications
- [ ] Add biometric authentication
- [ ] Integrate with IoT devices
- [ ] Add offline mode
- [ ] Implement data synchronization
- [ ] Add unit and integration tests
- [ ] Internationalization (i18n)

## License

This project is part of the SmartDesk application suite.

---

Converted from web to React Native • December 2024
