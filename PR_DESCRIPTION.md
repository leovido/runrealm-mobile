# Replace ESLint with Biome and Fix All Linting Errors

## Summary
Migrated from ESLint to Biome for faster, unified linting and formatting. Fixed all 59 linting errors across the codebase, improving type safety and code quality.

## Benefits
- **Faster linting**: Biome is significantly faster than ESLint
- **Unified tooling**: Single tool for linting, formatting, and import organization
- **Better DX**: Simpler configuration, faster feedback loops

## Quality Improvements
- **Fixed 59 errors**: Resolved all error-level linting issues
- **Type safety**: Replaced 50+ `any` types with proper types (`RunSession`, `Territory`, `Achievement`, etc.) or `unknown` where appropriate
- **Code consistency**: Fixed forEach callbacks, untyped variables, and expression assignments
- **Accessibility**: Improved a11y compliance in React components
- **CSS validation**: Fixed invalid CSS selectors and pseudo-classes

## Changes
- Added Biome configuration matching project style (single quotes, semicolons, 2-space indent)
- Updated npm scripts: `lint`, `lint:check`, `lint:errors`, `format`
- Integrated with Lefthook git hooks for pre-commit checks
- Removed ESLint dependencies and configuration

## Impact
- **Zero linting errors** (down from 59)
- **Reduced type-related bugs** through proper TypeScript types
- **Improved maintainability** with consistent code style
- **Better IDE integration** with faster linting feedback

