# Contributing Guide

Thank you for considering contributing to E-coma! This document provides guidelines and standards for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:
- Experience level
- Gender identity and expression
- Sexual orientation
- Disability
- Personal appearance
- Body size
- Race
- Ethnicity
- Age
- Religion
- Nationality

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct deemed inappropriate

### Enforcement

Violations can be reported to: conduct@e-coma.com

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

1. **Node.js 18+** installed
2. **Git** configured
3. **Code editor** (VS Code recommended)
4. Read the [Setup Guide](SETUP.md)

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/e-coma.git
cd e-coma

# Add upstream remote
git remote add upstream https://github.com/original/e-coma.git
```

### Install Dependencies

```bash
npm install
```

### Create a Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bug fix branch
git checkout -b fix/issue-description
```

---

## Development Workflow

### 1. Sync with Upstream

Always work on the latest code:

```bash
# Fetch latest changes
git fetch upstream

# Merge into your branch
git merge upstream/main
```

### 2. Make Changes

- Write clean, readable code
- Follow coding standards (see below)
- Add comments for complex logic
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run development server
npm run dev

# Type check
npx tsc --noEmit

# Lint code
npm run lint

# Build to verify
npm run build
```

### 4. Commit Changes

```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat: add new feature"
```

### 5. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
```

---

## Coding Standards

### TypeScript

#### Type Safety

```typescript
// ✅ Good: Explicit types
interface UserProps {
  id: string;
  name: string;
  email: string;
}

function UserProfile({ id, name, email }: UserProps) {
  // ...
}

// ❌ Bad: Any types
function UserProfile(props: any) {
  // ...
}
```

#### Type Inference

```typescript
// ✅ Good: Let TypeScript infer when obvious
const count = 5; // inferred as number
const items = ['a', 'b']; // inferred as string[]

// ❌ Bad: Redundant type annotations
const count: number = 5;
const items: string[] = ['a', 'b'];
```

#### Null Safety

```typescript
// ✅ Good: Handle null/undefined
function getUser(id: string): User | null {
  const user = users.find(u => u.id === id);
  return user ?? null;
}

// Use optional chaining
const email = user?.profile?.email;

// ❌ Bad: Assume non-null
function getUser(id: string): User {
  return users.find(u => u.id === id)!; // Dangerous!
}
```

### React Components

#### Component Structure

```typescript
// ✅ Good: Clear structure
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  onClick,
  children 
}: ButtonProps) {
  // Early returns
  if (!children) return null;
  
  // Hooks at top
  const [isLoading, setIsLoading] = useState(false);
  
  // Event handlers
  const handleClick = () => {
    setIsLoading(true);
    onClick?.();
  };
  
  // Render
  return (
    <button 
      className={cn(styles[variant], styles[size])}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
```

#### Naming Conventions

```typescript
// ✅ Good: Descriptive names
const handleSubmit = () => {};
const isLoading = true;
const userData = fetchUser();

// ❌ Bad: Vague names
const func = () => {};
const flag = true;
const data = fetch();
```

#### Component Organization

```typescript
// File structure within component:
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface Props { }

// 3. Constants
const DEFAULT_TIMEOUT = 5000;

// 4. Component
export function MyComponent({ }: Props) {
  // 4a. Hooks
  const [state, setState] = useState();
  
  // 4b. Derived values
  const computedValue = useMemo(() => {}, []);
  
  // 4c. Effects
  useEffect(() => {}, []);
  
  // 4d. Event handlers
  const handleClick = () => {};
  
  // 4e. Render helpers
  const renderItem = () => {};
  
  // 4f. Return JSX
  return <div />;
}

// 5. Exports
export default MyComponent;
```

### File Naming

```
# Components: PascalCase
UserProfile.tsx
DataTable.tsx

# Utilities: camelCase
formatDate.ts
calculateTotal.ts

# Configs: kebab-case
hub-config.ts
feature-favorites-config.ts

# Types: PascalCase
User.types.ts
API.types.ts
```

### Imports

```typescript
// ✅ Good: Organized imports
// 1. External dependencies
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Internal components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 3. Utilities
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/formatters';

// 4. Types
import type { User } from '@/types';

// 5. Styles (if any)
import styles from './Component.module.css';
```

### Styling with Tailwind

```typescript
// ✅ Good: Use cn() utility for conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === 'primary' && "primary-class"
)} />

// ✅ Good: Extract complex classes
const buttonClasses = cn(
  "px-4 py-2 rounded-lg font-medium transition-colors",
  variant === 'primary' && "bg-blue-500 text-white hover:bg-blue-600",
  variant === 'secondary' && "bg-gray-200 text-gray-900 hover:bg-gray-300"
);

// ❌ Bad: Inline complex conditionals
<div className={isActive ? "class1 class2 class3" : "class4 class5"} />
```

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(analytics): add revenue chart` |
| `fix` | Bug fix | `fix(auth): resolve login redirect` |
| `docs` | Documentation | `docs: update setup guide` |
| `style` | Code style (formatting) | `style: format with prettier` |
| `refactor` | Code refactoring | `refactor(api): simplify error handling` |
| `perf` | Performance improvement | `perf(charts): optimize rendering` |
| `test` | Add/update tests | `test: add order validation tests` |
| `chore` | Maintenance tasks | `chore: update dependencies` |
| `ci` | CI/CD changes | `ci: add deployment workflow` |

### Examples

```bash
# Simple feature
git commit -m "feat(social): add post scheduling"

# Bug fix with description
git commit -m "fix(orders): correct COD calculation

- Fixed rounding error in COD amounts
- Added validation for delivery fees
- Updated tests

Closes #123"

# Breaking change
git commit -m "feat(api)!: redesign credit system

BREAKING CHANGE: Credit balance endpoint now returns object instead of number"
```

### Scope Guidelines

Use feature/module names as scopes:
- `analytics`
- `social`
- `marketing`
- `inventory`
- `orders`
- `auth`
- `api`
- `ui`
- `config`

---

## Pull Request Process

### Before Creating PR

- [ ] Code follows style guidelines
- [ ] Tests pass (when available)
- [ ] Documentation updated
- [ ] No console.log or debugger statements
- [ ] Commit messages follow conventions
- [ ] Branch is up-to-date with main

### PR Title

Use same format as commit messages:

```
feat(analytics): add wilaya heatmap visualization
fix(orders): resolve duplicate order creation
docs: add component usage examples
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
[Add screenshots]

## Testing
- [ ] Tested locally
- [ ] Verified in all browsers
- [ ] Mobile responsive checked

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. **Automated Checks** - Must pass:
   - Build succeeds
   - Linting passes
   - Type checking passes

2. **Code Review** - At least 1 approval required
   - Reviewers check code quality
   - Test functionality
   - Verify documentation

3. **Merge** - After approval:
   - Squash and merge (preferred)
   - Merge commit (for large features)
   - Delete branch after merge

### Addressing Review Comments

```bash
# Make requested changes
git add .
git commit -m "refactor: address review comments"

# Push to same branch
git push origin feature/your-feature

# PR automatically updates
```

---

## Testing Guidelines

### Manual Testing

Always test:

1. **Happy Path** - Expected user flow
2. **Edge Cases** - Empty states, max values
3. **Error Handling** - Invalid inputs, network errors
4. **Responsive Design** - Mobile, tablet, desktop
5. **Browser Compatibility** - Chrome, Firefox, Safari, Edge

### Test Checklist

```markdown
## Feature Testing Checklist

### Functionality
- [ ] Feature works as expected
- [ ] Handles edge cases
- [ ] Error states display correctly
- [ ] Loading states work

### UI/UX
- [ ] Responsive on mobile
- [ ] Works on tablet
- [ ] Desktop layout correct
- [ ] Dark mode supported
- [ ] Animations smooth

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Proper ARIA labels
- [ ] Color contrast sufficient

### Performance
- [ ] No console errors
- [ ] Fast load time
- [ ] No memory leaks
- [ ] Smooth scrolling
```

### Future: Automated Tests

When test infrastructure is added:

```typescript
// Unit test example
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Documentation

### Code Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Use exponential backoff to prevent API throttling
await retry(fetchData, { maxAttempts: 3 });

// Calculate return risk based on customer history
// Algorithm weights: 40% return rate, 30% order value, 30% location
const riskScore = calculateRisk(customer);

// ❌ Bad: State the obvious
// Increment counter
counter++;

// Set user to null
user = null;
```

### JSDoc for Complex Functions

```typescript
/**
 * Calculates return risk score for an order
 * 
 * @param order - The order to analyze
 * @param customer - Customer history data
 * @returns Risk score from 0 (low risk) to 10 (high risk)
 * 
 * @example
 * const risk = calculateReturnRisk(order, customer);
 * if (risk > 7) {
 *   showWarning();
 * }
 */
export function calculateReturnRisk(
  order: Order,
  customer: Customer
): number {
  // Implementation
}
```

### Component Documentation

```typescript
/**
 * KPI Card component for displaying key performance metrics
 * 
 * Features:
 * - Supports trend indicators (up/down)
 * - Animated number counter
 * - Responsive design
 * 
 * @example
 * <KPICard
 *   title="Total Revenue"
 *   value={45000}
 *   trend={12.5}
 *   format="currency"
 * />
 */
export function KPICard({ ... }: KPICardProps) {
  // ...
}
```

### Update Documentation

When making changes:

- [ ] Update README if adding features
- [ ] Update API docs for endpoint changes
- [ ] Add examples for new components
- [ ] Update architecture docs for major changes

---

## Project-Specific Guidelines

### Feature Development

1. **Check existing patterns** - Look for similar features
2. **Use config files** - Add to `hub-config.ts` or `feature-favorites-config.ts`
3. **Follow layout system** - Use existing contexts and layouts
4. **Reuse components** - Check `components/ui/` first
5. **Mock data for demo** - Add to `lib/mock-data.ts`

### Adding New Pages

```typescript
// 1. Create page in src/app/
// src/app/new-feature/page.tsx

export default function NewFeaturePage() {
  return <div>New Feature</div>;
}

// 2. Add to navigation
// src/config/navigation.tsx
{
  label: 'New Feature',
  href: '/new-feature',
  icon: IconName
}

// 3. Add to hub config
// src/config/hub-config.ts
```

### Adding API Routes

```typescript
// src/app/api/feature/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    // Process request
    // Return response
    
    return NextResponse.json({
      success: true,
      data: {}
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: 'Error message' } },
      { status: 500 }
    );
  }
}
```

### State Management Guidelines

**Use useState for:**
- Local component state
- Form inputs
- UI toggles

**Use Context for:**
- Layout state
- Theme preferences
- UI panel states

**Use Zustand for:**
- Global app state
- User preferences
- Cross-component data

**Use Supabase for:**
- Persistent data
- User data
- Database records

---

## Getting Help

### Resources

- **Documentation**: [docs/](.)
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Setup Guide**: [SETUP.md](SETUP.md)
- **API Reference**: [API.md](API.md)

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and ideas
- **Email**: dev@e-coma.com

### Questions?

Before asking:
1. Check documentation
2. Search existing issues
3. Review closed PRs

When asking:
- Provide context
- Include error messages
- Share code snippets
- Describe what you tried

---

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project README

Thank you for contributing to E-coma! 🚀
