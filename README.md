# Iru Automation Playwright Framework

## Overview

This repository contains an smoke automation testing framework built with Playwright for testing the Kandji device management platform (https://qahw.kandji.io). The framework implements the Page Object Model (POM) design pattern and includes smoke tests to ensure critical functionality works as expected.

## Features

- **Playwright Test Framework**: Modern, reliable end-to-end testing for web applications
- **Page Object Model**: Clean, maintainable test code with reusable page components
- **Cross-Browser Testing**: Support for Chromium, Firefox, and WebKit browsers
- **Smoke Tests**: Quick validation of core application features
- **CI/CD Ready**: Configured for continuous integration with retries and parallel execution
- **Rich Reporting**: HTML reports with screenshots, videos, and traces on failures
- **Environment Configuration**: Secure handling of test credentials using dotenv

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ZekeriyaOtumlu/Kanji_Playwright_Automation.git
   cd iru_automation_playwright
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Configuration

1. Create a `.env` file in the root directory:
   ```
   KANDJI_EMAIL=your-email@example.com
   KANDJI_PASSWORD=your-password
   RECOVERY_CODE=your-recovery-code
   ```

2. The framework is configured to run against the QA environment at `https://qahw.kandji.io`

## Running Tests

### Run all tests (Chromium only)
```bash
npm test
```

### Run specific test file
```bash
npm run test:file
```

### Run tests with specific tag (e.g., @support)
```bash
npm run test:tag
```

### Run tests in headed mode (visible browser)
```bash
npx playwright test --headed
```

### Run tests across all browsers
```bash
npx playwright test --project=all
```

### Generate test code (codegen)
```bash
npm run codegen
```

## Project Structure

```
├── pages/                    # Page Object Model classes
│   ├── device.page.ts       # Device management page
│   ├── login.page.ts        # Login page
│   ├── sideBarMenu.page.ts  # Sidebar navigation
│   └── supportChat.page.ts  # Support chat functionality
├── tests/                    # Test specifications
│   ├── add-device.spec.ts    # Device addition tests
│   ├── login_recovery.spec.ts # Login recovery tests
│   └── support_chat.spec.ts  # Support chat tests
├── utils/                    # Utility functions
│   └── envUtils.ts          # Environment utilities
├── playwright-report/        # Test reports
├── test-results/            # Test artifacts
├── playwright.config.ts     # Playwright configuration
└── package.json             # Project dependencies and scripts
```

## Test Configuration

- **Timeout**: 300 seconds per test
- **Retries**: 2 in CI, 0 locally
- **Parallel Execution**: Enabled (workers based on CPU cores)
- **Screenshots**: Captured on failure
- **Videos**: Recorded for all tests
- **Traces**: Collected on first retry

## Smoke Tests

The framework includes smoke tests for critical application features:

- **Login**: Authentication with recovery code
- **Device Management**: Adding devices and enrollment
- **Support Chat**: Chat functionality
- **Navigation**: Sidebar menu interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request
