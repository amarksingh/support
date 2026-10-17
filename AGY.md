# @ostro/support — Antigravity AI Architecture & Knowledge Base

> **Package Name**: `@ostro/support`
> **Version**: `1.3.0`
> **Role in Ecosystem**: Modular Core Framework Library

---

## 1. Package Purpose & Overview
Framework-wide utility library including Collections, Facades, Macroable mixins, DateTime, and String helpers.

- **Primary Architectural Patterns**: Static Facade proxy, Macroable dynamic method injection, immutable collections.
- **Key Exported Entities**: `Collection`, `Facade`, `Macroable`, `Date`, `Str`, `Arr`

---

## 2. Dependencies & Interoperability
- **Direct Dependencies**:
  - `@ostro/contracts`: `^1.0.2`
  - `lodash`: `^4.17.21`
  - `luxon`: `^2.0.2`
  - `fs-extra`: `^10.0.0`
- **Framework Consumers**: Consumed across the OstroJS ecosystem via `@ostro/framework` and direct imports.

---

## 3. Directory & Source Layout
```text
origin/support/
├── aggregateServiceProvider.ts
├── array.ts
├── bond.ts
├── collection.ts
├── compose.ts
├── configurationUrlParser.ts
├── dateTime.ts
├── deferrableProvider.ts
├── env.ts
├── errorBag.ts
├── exceptions/accessDeniedHttpException.ts
├── exceptions/httpException.ts
├── exceptions/invalidArgumentException.ts
├── exceptions/invalidDataTypeException.ts
├── exceptions/logicException.ts
├── exceptions/methodNotAvailable.ts
├── exceptions/mixException.ts
├── exceptions/pageNotFoundException.ts
├── exceptions/runtimeException.ts
├── exceptions/unauthenticatedException.ts
└── ... (35 more files)
```

---

## 4. TypeScript Typing & Code Standards
1. **Access Modifiers**: All class properties and methods declare explicit visibility (`public`, `protected`, `private`).
2. **Inheritance & Overrides**: Classes overriding base class methods use the `override` keyword to safeguard contracts.
3. **Immutability**: Constant lookup tables and static registries use `readonly` and strict record types.
4. **No Implicit Any**: Public APIs avoid `any` in favor of generics (`<T = unknown>`) and typed contracts from `@ostro/contracts`.
5. **Contract Binding**: Core managers implement contracts from `@ostro/contracts/support/*`.

---

## 5. Development & Verification Guide
- **Compile / Build**: `npm run build` (runs `tsc -p tsconfig.build.json`)
- **Run Tests**: `npm test` (executes Jest with 100% coverage target via `c8`)
- **Published Artifacts**: Target output compiled to `./build` with accompanying `.d.ts` declarations and source maps.

---
*Generated for Antigravity AI high-speed codebase comprehension with minimal token consumption.*
