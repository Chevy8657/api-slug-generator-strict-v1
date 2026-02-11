# Slug Generator (v1)

Stateless utility API that generates a URL-safe **slug** from input text.

## Non-Expansion Clause
This API performs **one function only**: convert an input string to a deterministic slug.
It will not add storage, authentication, analytics, user tracking, multi-endpoint behavior, or side effects.

---

## Endpoint

### POST `/v1/slug`

**Payload**
```json
{ "text": "Hello world from strict counter" }
