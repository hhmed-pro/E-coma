# API Documentation

This document provides comprehensive information about the E-coma API endpoints.

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
  - [Marketing APIs](#marketing-apis)
  - [Sales Agent APIs](#sales-agent-apis)
  - [Credits APIs](#credits-apis)
  - [Products APIs](#products-apis)

---

## Overview

The E-coma API is built using Next.js 15 API Routes with TypeScript. All endpoints return JSON responses and follow RESTful conventions where applicable.

### Current Status

⚠️ **Note**: API endpoints currently return mock data for UI demonstration purposes. Backend integration is in progress.

---

## Authentication

### Method: Cookie-Based Sessions

Authentication uses Supabase Auth with server-side sessions via cookies.

```typescript
// Middleware protects routes automatically
// Located in: src/middleware.ts

import { createServerClient } from '@supabase/ssr'
```

### Protected Routes

All API routes under `/api/*` are protected and require authentication. The middleware automatically:
- Validates session cookies
- Refreshes expired tokens
- Redirects unauthenticated requests to `/auth/login`

### Headers Required

```http
Cookie: sb-access-token=<token>; sb-refresh-token=<refresh-token>
```

---

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

---

## Error Handling

All API endpoints follow a consistent error response format:

### Error Response Structure

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Common HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request - Invalid input |
| `401` | Unauthorized - Authentication required |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error |
| `503` | Service Unavailable |

### Example Error Response

```json
{
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "You don't have enough credits to perform this action",
    "details": {
      "required": 10,
      "available": 3
    }
  }
}
```

---

## Rate Limiting

### Current Limits

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
| AI Generation | 20 requests | per minute |
| Standard API | 100 requests | per minute |
| Authentication | 10 requests | per minute |

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

---

## Endpoints

### Marketing APIs

#### Generate Marketing Content

Generate AI-powered marketing content using Google Gemini.

**Endpoint:** `POST /api/marketing/generate`

**Request Body:**
```json
{
  "type": "ad_copy" | "caption" | "hook" | "article",
  "context": {
    "productName": "string",
    "productDescription": "string",
    "targetAudience": "string",
    "tone": "professional" | "casual" | "humorous" | "urgent",
    "platform": "facebook" | "instagram" | "tiktok" | "linkedin"
  },
  "options": {
    "length": "short" | "medium" | "long",
    "includeDarja": boolean,
    "includeEmojis": boolean,
    "includeHashtags": boolean
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": "Your generated content here...",
    "metadata": {
      "wordCount": 45,
      "characterCount": 280,
      "estimatedReadTime": "15 seconds",
      "qualityScore": 8.5,
      "aiModel": "gemini-1.5-flash"
    },
    "suggestions": [
      "Consider adding a call-to-action",
      "Hook could be more engaging"
    ],
    "creditsUsed": 5
  }
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/marketing/generate \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=..." \
  -d '{
    "type": "ad_copy",
    "context": {
      "productName": "Premium Smartphone Case",
      "productDescription": "Shockproof case with 360° protection",
      "targetAudience": "Tech enthusiasts aged 18-35",
      "tone": "urgent",
      "platform": "facebook"
    },
    "options": {
      "length": "medium",
      "includeDarja": true,
      "includeEmojis": true,
      "includeHashtags": true
    }
  }'
```

**Error Codes:**
- `INVALID_TYPE` - Invalid content type specified
- `INSUFFICIENT_CREDITS` - Not enough AI credits
- `AI_SERVICE_ERROR` - Gemini API error
- `RATE_LIMIT_EXCEEDED` - Too many requests

---

#### ROAS Guard

Analyze and optimize Return on Ad Spend with AI recommendations.

**Endpoint:** `POST /api/marketing/roas-guard`

**Request Body:**
```json
{
  "campaignId": "string",
  "adAccountId": "string",
  "metrics": {
    "spend": number,
    "revenue": number,
    "conversions": number,
    "impressions": number,
    "clicks": number
  },
  "period": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "roas": 3.5,
    "roasTarget": 2.5,
    "status": "healthy" | "warning" | "critical",
    "recommendations": [
      {
        "type": "budget",
        "action": "increase",
        "amount": 500,
        "reason": "Campaign performing above target ROAS",
        "expectedImpact": "+25% revenue"
      },
      {
        "type": "targeting",
        "action": "optimize",
        "suggestion": "Focus on 25-34 age group showing 4.2 ROAS",
        "expectedImpact": "+15% efficiency"
      }
    ],
    "stopLoss": {
      "enabled": true,
      "threshold": 1.5,
      "triggered": false
    },
    "predictions": {
      "nextWeekRoas": 3.7,
      "confidence": 0.85
    }
  }
}
```

**Error Codes:**
- `CAMPAIGN_NOT_FOUND` - Campaign ID doesn't exist
- `INVALID_METRICS` - Metric values are invalid
- `INSUFFICIENT_DATA` - Not enough data for analysis

---

### Sales Agent APIs

#### Analyze Purchase Intent

Analyze customer messages to determine purchase intent using AI.

**Endpoint:** `POST /api/agents/sales/intent`

**Request Body:**
```json
{
  "conversationId": "string",
  "messages": [
    {
      "role": "customer" | "agent",
      "content": "string",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "productContext": {
    "productId": "string",
    "productName": "string",
    "price": number,
    "inStock": boolean
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "intentScore": 8.5,
    "intentLevel": "high" | "medium" | "low",
    "signals": {
      "positive": [
        "Asked about delivery time",
        "Mentioned price is good",
        "Asked for color options"
      ],
      "negative": [
        "Mentioned competitors"
      ]
    },
    "customerProfile": {
      "buyingStage": "decision",
      "priceConsciousness": "moderate",
      "urgency": "high"
    },
    "recommendations": {
      "nextAction": "send_payment_link",
      "suggestedResponse": "Great choice! I can process your order right now. Which color would you prefer?",
      "upsellOpportunity": true,
      "upsellProduct": "Premium warranty package"
    },
    "conversionProbability": 0.85
  }
}
```

**Error Codes:**
- `INVALID_CONVERSATION` - Conversation format invalid
- `MISSING_CONTEXT` - Product context required
- `AI_ANALYSIS_FAILED` - AI service error

---

#### Sales Guard

Validate sales conversations and prevent potential issues.

**Endpoint:** `POST /api/agents/sales/guard`

**Request Body:**
```json
{
  "agentMessage": "string",
  "conversationContext": {
    "customerId": "string",
    "customerName": "string",
    "orderHistory": number,
    "blacklisted": boolean
  },
  "productInfo": {
    "productId": "string",
    "price": number,
    "inStock": boolean,
    "restrictions": string[]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "approved": boolean,
    "issues": [
      {
        "severity": "error" | "warning" | "info",
        "type": "policy_violation" | "misinformation" | "unprofessional",
        "message": "Price mentioned (800 DA) doesn't match product price (750 DA)",
        "suggestion": "Correct the price to 750 DA"
      }
    ],
    "correctedMessage": "The price is 750 DA with free delivery to your wilaya.",
    "complianceScore": 9.2,
    "customerRisk": {
      "blacklisted": false,
      "returnRate": 0.15,
      "riskLevel": "low"
    }
  }
}
```

**Error Codes:**
- `CUSTOMER_BLACKLISTED` - Customer is on blacklist
- `PRODUCT_UNAVAILABLE` - Product out of stock
- `POLICY_VIOLATION` - Message violates policies

---

### Credits APIs

#### Get Credit Balance

Retrieve current AI credit balance for the authenticated user.

**Endpoint:** `GET /api/credits/balance`

**Response:**
```json
{
  "success": true,
  "data": {
    "balance": 150,
    "currency": "credits",
    "subscriptionTier": "tajer" | "imbrator" | "free",
    "monthlyAllowance": 100,
    "usedThisMonth": 45,
    "resetDate": "2024-02-01T00:00:00Z",
    "transactions": [
      {
        "id": "txn_123",
        "type": "usage" | "purchase" | "refund" | "bonus",
        "amount": -5,
        "description": "AI content generation",
        "createdAt": "2024-01-15T14:30:00Z"
      }
    ]
  }
}
```

**Query Parameters:**
- `includeTransactions` (boolean): Include transaction history (default: false)
- `limit` (number): Number of transactions to return (default: 10, max: 100)

**Example Request:**
```bash
curl http://localhost:3000/api/credits/balance?includeTransactions=true&limit=20 \
  -H "Cookie: sb-access-token=..."
```

**Error Codes:**
- `USER_NOT_FOUND` - User account not found

---

#### Use Credits

Deduct credits for AI operations (internal use, called by other endpoints).

**Endpoint:** `POST /api/credits/use`

**Request Body:**
```json
{
  "amount": number,
  "operation": "string",
  "metadata": {
    "featureId": "string",
    "resourceId": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn_456",
    "previousBalance": 150,
    "newBalance": 145,
    "amountUsed": 5
  }
}
```

**Error Codes:**
- `INSUFFICIENT_CREDITS` - Not enough credits available
- `INVALID_AMOUNT` - Amount must be positive

---

### Products APIs

#### Generate Product Content

Generate AI-powered product descriptions, titles, and metadata.

**Endpoint:** `POST /api/products/generate`

**Request Body:**
```json
{
  "productId": "string",
  "type": "description" | "title" | "tags" | "seo",
  "input": {
    "category": "string",
    "features": string[],
    "targetAudience": "string",
    "keywords": string[]
  },
  "options": {
    "language": "ar" | "fr" | "en",
    "includeDarja": boolean,
    "tone": "professional" | "casual" | "enthusiastic",
    "length": number
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "description",
    "content": {
      "primary": "Main generated content...",
      "alternatives": [
        "Alternative version 1...",
        "Alternative version 2..."
      ]
    },
    "seo": {
      "title": "SEO-optimized title",
      "metaDescription": "Meta description...",
      "keywords": ["keyword1", "keyword2"],
      "slug": "product-url-slug"
    },
    "quality": {
      "score": 8.7,
      "readability": 9.2,
      "keywordDensity": 0.035
    },
    "creditsUsed": 3
  }
}
```

**Error Codes:**
- `PRODUCT_NOT_FOUND` - Product ID doesn't exist
- `INVALID_TYPE` - Invalid generation type
- `INSUFFICIENT_CREDITS` - Not enough credits

---

## Webhooks (Coming Soon)

Future support for webhooks to receive real-time notifications:

- Order status changes
- Stock level alerts
- Credit balance warnings
- Campaign performance triggers
- Customer message received

---

## SDK & Libraries (Coming Soon)

Official SDKs planned for:
- JavaScript/TypeScript
- Python
- PHP

---

## API Versioning

Currently on **v1** (implicit). Future versions will be explicitly versioned:

```
/api/v2/marketing/generate
```

---

## Best Practices

### 1. Error Handling
Always handle errors gracefully:

```typescript
try {
  const response = await fetch('/api/marketing/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error.error.message);
    return;
  }
  
  const result = await response.json();
  // Handle success
} catch (error) {
  console.error('Network error:', error);
}
```

### 2. Credit Management
Check credit balance before expensive operations:

```typescript
const { data } = await fetch('/api/credits/balance').then(r => r.json());
if (data.balance < 5) {
  // Show low credit warning
}
```

### 3. Retry Logic
Implement exponential backoff for failed requests:

```typescript
async function retryRequest(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000));
    }
  }
}
```

### 4. Caching
Cache responses when appropriate to reduce API calls and credit usage.

---

## Support

For API support:
- **Documentation Issues**: [GitHub Issues](https://github.com/yourusername/e-coma/issues)
- **Email**: api-support@e-coma.com
- **Discord**: [Join our server](https://discord.gg/ecoma)

---

## Changelog

### v1.0.0 (Current)
- Initial API implementation
- Mock data for all endpoints
- Authentication via Supabase
- Basic rate limiting

### Upcoming
- Real backend integration
- Webhook support
- GraphQL endpoint
- Bulk operations
- Export/import APIs
