const dashboardData = {
  traces: [
    {
      traceId: "1",
      spans: [
        {
          spanId: "1.1",
          operation: "DB Query",
          duration: 150,
          startTime: 1609459200000,
          status: "error",
          tags: { "db.name": "users_db", query: "SELECT * FROM users WHERE id = ?" },
        },
        {
          spanId: "1.2",
          operation: "API Call",
          duration: 50,
          startTime: 1609459200150,
          status: "ok",
          tags: { "http.method": "GET", "http.status_code": 200, endpoint: "/api/data" },
        },
      ],
    },
      {
      traceId: "2",
      spans: [
        {
          spanId: "2.1",
          operation: "Cache Lookup",
          duration: 30,
          startTime: 1609459200200,
          status: "ok",
          tags: {
            "cache.hit": true,
            "cache.type": "redis",
          },
        },
        {
          spanId: "2.2",
          operation: "Service Call",
          duration: 100,
          startTime: 1609459200300,
          status: "ok",
          tags: {
            "service.name": "auth-service",
            endpoint: "/validate-token",
          },
        },
      ],
    },
    {
      traceId: "3",
      spans: [
        {
          spanId: "3.1",
          operation: "DB Write",
          duration: 200,
          startTime: 1609460000000,
          status: "ok",
          tags: {
            "db.name": "orders_db",
            query: "INSERT INTO orders (id, amount) VALUES (?, ?)",
          },
        },
        {
          spanId: "3.2",
          operation: "Notification Service",
          duration: 100,
          startTime: 1609460000200,
          status: "error",
          tags: {
            "service.name": "email-service",
            endpoint: "/send-email",
          },
        },
      ],
    },
    {
      traceId: "4",
      spans: [
        {
          spanId: "4.1",
          operation: "Authentication",
          duration: 90,
          startTime: 1609461000000,
          status: "ok",
          tags: {
            "auth.method": "OAuth",
            "user.id": "12345",
          },
        },
        {
          spanId: "4.2",
          operation: "API Request",
          duration: 250,
          startTime: 1609461000090,
          status: "error",
          tags: {
            "http.method": "POST",
            endpoint: "/api/update-profile",
          },
        },
      ],
    },
  ],
  metrics: [
    {
      route: "/api/data",
      duration: 200,
      errorRate: 0.01,
      requestsPerSecond: 50,
      avgResponseTime: 180,
    },
    {
      route: "/auth/login",
      duration: 300,
      errorRate: 0.05,
      requestsPerSecond: 10,
      avgResponseTime: 290,
    },
    {
      route: "/api/data/:id",
      duration: 220,
      errorRate: 0.02,
      requestsPerSecond: 25,
      avgResponseTime: 215,
    },
    {
      route: "/api/update-profile",
      duration: 500,
      errorRate: 0.03,
      requestsPerSecond: 15,
      avgResponseTime: 450,
    },
    {
      route: "/checkout/complete",
      duration: 700,
      errorRate: 0.1,
      requestsPerSecond: 5,
      avgResponseTime: 680,
    },
  ],
  logs: [
    {
      traceId: "1",
      log: "Database timeout occurred",
      timestamp: 1609459200200,
      level: "error",
    },
    {
      traceId: "2",
      log: "Cache hit for key: session_123",
      timestamp: 1609459300010,
      level: "info",
    },
    {
      traceId: "2",
      log: "Token validation successful",
      timestamp: 1609459300150,
      level: "info",
    },
    {
      traceId: "3",
      log: "Order inserted into database",
      timestamp: 1609460000250,
      level: "info",
    },
    {
      traceId: "3",
      log: "Failed to send confirmation email",
      timestamp: 1609460000300,
      level: "error",
    },
    {
      traceId: "4",
      log: "User authenticated successfully",
      timestamp: 1609461000050,
      level: "info",
    },
    {
      traceId: "4",
      log: "Profile update API request completed",
      timestamp: 1609461000340,
      level: "info",
    },
    {
      traceId: "4",
      log: "API call duration exceeded threshold",
      timestamp: 1609461000500,
      level: "warning",
    },
  ],
};
export default dashboardData;
