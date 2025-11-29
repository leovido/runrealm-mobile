# AI Agent Guidelines for RunRealm

> **For AI agents working on this codebase**: This document outlines critical guidelines to ensure quality and prevent regressions.

## 🎯 Primary Goals

1. **Maintain Quality**: All code must pass tests, linting, and type checking
2. **Prevent Regressions**: Never break existing functionality
3. **Preserve Features**: Do not remove or disable features without explicit request
4. **Minimize Changes**: Only make changes that are necessary for the task

## 🔧 Quality Checks (MANDATORY)

Before committing any code, ensure:

### 1. Tests Pass
```bash
npm run test
```
- All existing tests must pass
- If you add new functionality, add tests for it
- If you fix a bug, add a regression test

### 2. Linting Passes
```bash
npm run lint
```
- Biome will auto-fix formatting issues
- All linting errors must be resolved
- CI will fail if linting fails

### 3. Type Checking Passes
```bash
npm run build:shared
```
- TypeScript must compile without errors
- No `any` types unless absolutely necessary

### 4. CI Pipeline Will Pass
The CI pipeline (`.github/workflows/ci.yml`) runs:
- Tests for all packages
- Linting checks
- Type checking
- Build verification

**Your changes must pass all of these before committing.**

## 🚫 Critical Don'ts

### ❌ Never Remove Features
- **Do not delete** existing features, functions, or components
- **Do not comment out** code that appears unused - it may be used elsewhere
- **Do not simplify** by removing functionality
- If code exists, assume it's there for a reason

### ❌ Never Make Unnecessary Changes
- **Do not refactor** code unless explicitly requested
- **Do not rename** variables, functions, or files unless asked
- **Do not reorganize** code structure unless necessary
- **Do not change** formatting beyond what Biome requires
- **Do not "improve"** code that works correctly

### ❌ Never Break Functionality
- **Do not modify** function signatures without checking all usages
- **Do not change** API contracts in shared packages
- **Do not remove** parameters or return values
- **Do not change** behavior of existing functions

## ✅ Required Workflow

### Before Starting
1. Read the task/request carefully
2. Understand what needs to be changed
3. Identify related files and dependencies
4. Check if tests exist for the code you'll modify

### During Development
1. Make **minimal** changes - only what's necessary
2. Follow **existing patterns** and code style
3. Preserve **existing functionality**
4. Add **tests** for new features or bug fixes

### Before Committing
1. ✅ Run `npm run test` - all tests must pass
2. ✅ Run `npm run lint` - auto-fix formatting
3. ✅ Run `npm run build:shared` - verify types
4. ✅ Review your changes - ensure nothing was removed unnecessarily

## 📁 Project Structure

### Monorepo Layout
```
packages/
├── shared-core/         # Domain logic (most services here)
├── shared-types/        # TypeScript interfaces
├── shared-utils/        # Common utilities
├── shared-blockchain/   # Web3 services
├── web-app/            # Web platform
└── mobile-app/         # Mobile platform
```

### Key Files
- `biome.json` - Linting and formatting configuration
- `lefthook.yml` - Git hooks (pre-commit, pre-push)
- `.github/workflows/ci.yml` - CI/CD pipeline
- `jasmine.json` - Test configuration
- `docs/ARCHITECTURE.md` - System architecture

### Test Structure
- Test files: `**/*.spec.ts` in source directories
- Example: `packages/shared-core/services/__tests__/`
- Run tests: `npm run test` or `npm run test:unit`

## 🛠️ Tools & Commands

### Quality Checks
```bash
npm run lint          # Format and lint (auto-fixes)
npm run lint:check    # Check without fixing
npm run lint:errors   # Show only errors
npm run test          # Run all tests
npm run test:unit     # Run unit tests
npm run build:shared  # Build and type-check shared packages
```

### Git Hooks (Automatic)
- **Pre-commit**: Auto-formats staged files with Biome
- **Pre-push**: Runs tests, linting, and type checking

## 📋 Architecture Principles

From `docs/ARCHITECTURE.md`:

1. **ENHANCEMENT FIRST**: Enhance existing components over creating new ones
2. **AGGRESSIVE CONSOLIDATION**: Delete unnecessary code (but verify first!)
3. **PREVENT BLOAT**: Audit before adding
4. **DRY**: Single source of truth
5. **CLEAN**: Clear separation of concerns
6. **MODULAR**: Composable, testable modules

## ⚠️ When to Ask for Clarification

Stop and ask the user if you encounter:
- Code that appears unused but might be needed
- Features that seem incomplete
- Tests that fail for unclear reasons
- Architecture decisions that seem inconsistent
- Any uncertainty about whether a change is safe

## 🎯 Success Checklist

Before considering a task complete:

- [ ] All tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run build:shared`)
- [ ] No existing features were removed
- [ ] No unnecessary changes were made
- [ ] Code follows existing patterns
- [ ] Tests were added/updated if needed
- [ ] CI pipeline will succeed

## 📚 Additional Resources

- **Architecture**: See `docs/ARCHITECTURE.md`
- **Features**: See `docs/features.md`
- **Project Status**: See `docs/PROJECT_STATUS_AND_TICKETS.md`
- **Biome Guide**: See `docs/BIOME_FIX_GUIDE.md`

---

## 🤝 Collaboration Note

This project is worked on by multiple developers using different AI tools. These guidelines ensure consistency and prevent regressions across all contributors.

**Remember**: When in doubt, preserve existing functionality. It's better to be conservative than to break something.

