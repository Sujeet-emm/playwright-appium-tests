# Playwright + TypeScript + Appium Framework

This is a hybrid testing framework that combines Playwright for web testing and Appium for mobile testing using TypeScript.

## Project Structure

```
framework/
├── tests/
│   ├── web/           # Web-specific tests
│   ├── mobile/        # Mobile-specific tests
│   └── e2e/           # End-to-end tests
├── flows/             # Test flows (Page Object Model)
├── pages/             # Page objects (web/mobile)
├── drivers/           # Driver managers for Playwright and Appium
├── services/          # Backend communication services
├── fixtures/          # Test fixtures
├── utils/             # Utility functions
└── config/            # Configuration files
```

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run web tests only
npm run test:web

# Run mobile tests only
npm run test:mobile

# Run e2e tests only
npm run test:e2e
```

## Key Components

### Flows
Reusable test flows that encapsulate complex user interactions.

### Drivers
- `PlaywrightManager`: Manages Playwright browser instances
- `AppiumManager`: Manages Appium driver for mobile testing

### Services
- `ApiClient`: HTTP API communication
- `WebSocketClient`: WebSocket connections
- `EventListener`: Event handling

### Fixtures
Custom test fixtures for setup/teardown of test environments.

## Configuration

Update `config/config.ts` with your application URLs and settings.

## Mobile Testing

For mobile tests, ensure Appium server is running:

```bash
appium
```

Update capabilities in `fixtures/mobileFixture.ts` for your device/emulator.