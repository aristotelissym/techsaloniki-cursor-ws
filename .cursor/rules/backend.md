# Backend Rules (NestJS)

- Use NestJS modules to separate features.
- Use DTOs with `class-validator` for input validation.
- Keep controllers thin: no business logic.
- Business logic should go into services.
- Always use dependency injection for services.
- Handle all errors with try/catch or global exception filters.
- Return consistent API responses with HTTP status codes.
