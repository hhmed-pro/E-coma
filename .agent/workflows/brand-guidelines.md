---
description: Apply Anthropic brand styling to components and pages
---

# Anthropic Brand Guidelines Workflow

Use this workflow when you need to apply Anthropic's official brand identity to any UI element.

## Brand Colors

**Main Colors:**
- Dark: `#141413` (HSL: 60 4% 8%) - Primary text and dark backgrounds
- Light: `#faf9f5` (HSL: 45 38% 97%) - Light backgrounds and text on dark
- Mid Gray: `#b0aea5` (HSL: 49 8% 67%) - Secondary elements
- Light Gray: `#e8e6dc` (HSL: 50 22% 89%) - Subtle backgrounds

**Accent Colors:**
- Orange: `#d97757` (HSL: 15 62% 60%) - Primary accent
- Blue: `#6a9bcc` (HSL: 210 46% 61%) - Secondary accent
- Green: `#788c5d` (HSL: 89 21% 46%) - Tertiary accent

## Typography

- **Headings**: Use `font-heading` (Poppins) with `font-semibold` or `font-bold`
- **Body Text**: Use `font-body` (Lora) - default for paragraphs
- **Sans-serif UI**: Use `font-sans` (Poppins) for buttons, labels, UI elements

## Tailwind Classes

### Use These Classes:

```
// Backgrounds
bg-background     // Cream background (#faf9f5)
bg-card           // White card background
bg-primary        // Dark background (#141413)
bg-secondary      // Orange accent

// Text
text-foreground   // Dark text
text-muted-foreground // Gray text
text-primary      // Dark text
text-secondary    // Orange text

// Borders
border-border     // Light gray border

// Accent utilities (custom)
text-[hsl(var(--accent-orange))]
text-[hsl(var(--accent-blue))]
text-[hsl(var(--accent-green))]
```

## Design Principles

1. **Clean and minimal** - Avoid heavy shadows and glows
2. **Warm neutrals** - Cream backgrounds, not pure white
3. **Subtle accents** - Use orange, blue, green sparingly
4. **Elegant typography** - Serif body text (Lora) adds sophistication
5. **Rounded but not too much** - Use `rounded-md` or `rounded-lg` (0.5rem)

## Reference

Full brand guidelines: `skills/brand-guidelines/SKILL.md`
