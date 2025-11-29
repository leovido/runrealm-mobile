# RunRealm

A cross-chain fitness GameFi platform that transforms your runs into NFT territories. Connect your Strava account, track runs with AI-powered coaching, and claim geospatial territories on ZetaChain.

## 🌟 Key Features

- **Strava Integration**: Import runs and claim them as NFT territories
- **AI-Powered Coaching**: Smart route suggestions and personalized training with Google Gemini
- **Ghost Runners**: AI-generated virtual competitors that defend your territories when you can't run
- **Territory Defense**: Activity point system keeps territories secure through regular engagement
- **Cross-Chain GameFi**: Territory claiming and REALM token rewards on ZetaChain
- **Dual Platform**: Web app for analysis & management, mobile app for performance & play
- **Geospatial NFTs**: Own and trade location-based territories

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
git clone https://github.com/thisyearnofear/runrealm.git
cd runrealm
npm install
cp .env.example .env
# Edit .env with your API keys (Mapbox, Google Gemini)
```

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production (shared packages + web app)
npm run test     # Run tests
```

## 📚 Documentation

- [Introduction](docs/introduction.md) - Complete guide to setup, installation, and deployment.
- [Architecture](docs/architecture.md) - System architecture, platform design, and smart contracts.
- [Features](docs/features.md) - Detailed look at key features like Ghost Runners and the User Dashboard.
- [Guides](docs/guides.md) - Implementation guides, mobile development, and testing strategies.

## 🏗️ Architecture

RunRealm uses a monorepo structure with shared core packages:

```
packages/
├── shared-core/         # Domain logic and business rules
├── shared-types/        # TypeScript interfaces
├── shared-utils/        # Common utilities
├── shared-blockchain/   # Web3 and contract services
├── web-app/            # Web platform (analysis & manage)
├── mobile-app/         # Mobile platform (performance & play)
└── api-gateway/        # Backend services
```

## 🤝 Contributing

See [architecture.md](docs/architecture.md) for detailed contribution guidelines.

### For AI Agents

If you're an AI agent working on this codebase, **please read [AI_GUIDELINES.md](AI_GUIDELINES.md) first**. This document contains critical guidelines to ensure quality and prevent regressions.

**Key points:**
- ✅ Always run tests (`npm run test`) before committing
- ✅ Always run linting (`npm run lint`) before committing
- ❌ Never remove features without explicit request
- ❌ Never make unnecessary changes or refactoring
- ❌ Never break existing functionality
