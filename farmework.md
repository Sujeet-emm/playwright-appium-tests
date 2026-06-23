framework/
│
├── tests/
│   ├── web/
│   │   └── login.spec.ts
│   │
│   ├── mobile/
│   │   └── login.mobile.spec.ts
│   │
│   └── e2e/
│       └── command-flow.spec.ts   👈 YOUR SPECIAL CASE
│
├── flows/                         👈 ⭐ KEY LAYER
│   ├── CommandFlow.ts
│   └── LoginFlow.ts
│
├── pages/
│   ├── web/
│   └── mobile/
│
├── drivers/
│   ├── playwrightManager.ts
│   └── appiumManager.ts
│
├── services/                      👈 ⭐ BACKEND COMMUNICATION
│   ├── apiClient.ts
│   ├── websocketClient.ts
│   └── eventListener.ts
│
├── fixtures/
│   ├── webFixture.ts
│   ├── mobileFixture.ts
│   └── unifiedFixture.ts          👈 ⭐ BOTH DRIVERS
│
├── utils/
└── config/
