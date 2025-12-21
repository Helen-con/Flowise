# RESPECT Learning App

An interactive Progressive Web App (PWA) for relationship safety and consent education, focusing on helping young people understand healthy relationships, consent, and digital safety.

## 🌟 Features

### 1. Interactive Learning Modules

- **RESPECT Check**: Swipe through relationship scenarios to assess healthy vs. unhealthy behaviors
- **Red/Green Flag Quiz**: Gamified learning with instant feedback on relationship warning signs
- **Consent Scenarios**: Choose-your-own-adventure style decision making to learn about consent
- **Control Web Mapper**: Visual tool to identify controlling behaviors in relationships

### 2. Safety Planning Tools

- **Exit Plan Checklist**: Step-by-step guidance for creating a safety plan
- **Safe Space Locator**: Information on local support services and helplines
- **Emergency Contacts**: Secure storage of trusted contacts

### 3. Digital Safety Features

- **Deepfake Checker**: Information on spotting AI-generated images
- **Sextortion Response Guide**: Step-by-step guidance on what to do
- **Privacy Settings Audit**: Checklist for social media safety

### 4. Support Integration

- **24/7 Helplines**: Direct access to Childline, The Mix, and other support services
- **Find Local Services**: Location-based resources (placeholder)
- **Quick Exit Button**: Instantly redirects to a safe website

### 5. For Friends/Bystanders

- **How to Help a Friend**: Guidance on supporting someone in an unhealthy relationship
- **Conversation Starters**: Scripts for difficult conversations
- **When to Get Adult Help**: Decision tree for escalation

## 🔐 Privacy & Security Features

- **App Disguise Mode**: Appears as calculator, notes app, or period tracker
- **No Cloud Sync**: All data stays on device by default
- **Privacy-First Analytics**: No personal data collection
- **Quick Exit**: Press Escape 3x or click button to exit quickly
- **Offline Support**: Works without internet connection (PWA)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.15.0
- pnpm >= 9

### Installation

```bash
cd respect-learning-app
pnpm install
```

### Development

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
pnpm preview
```

## 📱 Installing as PWA

Once deployed, users can install the app on their devices:

- **Mobile (iOS)**: Safari > Share > Add to Home Screen
- **Mobile (Android)**: Chrome > Menu > Install App
- **Desktop**: Look for install icon in address bar

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Storage**: LocalForage (IndexedDB)
- **PWA**: vite-plugin-pwa

## 📂 Project Structure

```
respect-learning-app/
├── public/              # Static assets
│   ├── disguises/      # App disguise resources
│   └── icons/          # App icons
├── src/
│   ├── components/     # Reusable components
│   │   ├── QuickExit/
│   │   └── DisguiseMode/
│   ├── modules/        # Main feature modules
│   │   ├── respect-check/
│   │   ├── flag-quiz/
│   │   ├── consent-scenarios/
│   │   ├── control-mapper/
│   │   ├── safety-planning/
│   │   ├── digital-safety/
│   │   ├── support/
│   │   └── bystander/
│   ├── utils/          # Utility functions
│   │   ├── storage.ts
│   │   ├── analytics.ts
│   │   └── security.ts
│   ├── data/           # Static data/content
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
└── package.json
```

## 🔒 Security Considerations

This app is designed with privacy and safety as top priorities:

1. **No server communication** - All data stays on device
2. **No authentication required** - No accounts, no tracking
3. **Quick exit functionality** - Multiple ways to exit quickly
4. **Disguise mode** - Can appear as innocent apps
5. **No screenshots in sensitive areas** (future enhancement)

## 📞 Support Services (UK)

The app includes direct links to:

- **Childline**: 0800 1111 (Under 19)
- **The Mix**: 0808 808 4994 (Under 25)
- **Women's Aid**: 0808 2000 247
- **Men's Advice Line**: 0808 8010 327
- **Galop LGBT+ Helpline**: 0800 999 5428

## ⚠️ Important Notes

- This app is educational and supportive, but **NOT a replacement for professional help**
- If someone is in **immediate danger**, they should call **999** (UK)
- The app includes content about domestic abuse, sexual coercion, and related topics

## 🤝 Contributing

This app is designed to help young people learn about healthy relationships. If you're contributing:

1. Keep content age-appropriate and sensitive
2. Ensure privacy features remain intact
3. Test all interactive modules thoroughly
4. Follow accessibility best practices

## 📄 License

This project is open source and available for use in educational contexts.

## 🙏 Acknowledgments

- Support service information from UK organizations
- RESPECT framework for healthy relationships
- Input from safeguarding experts (fictional for this demo)

## 📧 Contact

For questions about this app or to report issues, please contact the development team.

---

**Remember**: This app is a tool for education and support. If you or someone you know is experiencing abuse, please reach out to professional support services.
