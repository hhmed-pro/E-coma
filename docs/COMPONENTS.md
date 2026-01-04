# Component Documentation

Comprehensive guide to reusable components in E-coma.

## 📋 Table of Contents

- [Overview](#overview)
- [UI Primitives](#ui-primitives)
- [Layout Components](#layout-components)
- [Feature Components](#feature-components)
- [Usage Examples](#usage-examples)
- [Creating New Components](#creating-new-components)

---

## Overview

E-coma uses a component-based architecture with:

- **70 UI primitives** built on Radix UI and shadcn/ui
- **24 layout components** for the multi-panel system
- **200+ feature components** for business logic

### Component Structure

```
src/components/
├── core/
│   ├── ui/              # UI primitives (70 components)
│   └── layout/          # Layout system (24 components)
├── analytics/           # Analytics features
├── marketing/           # Marketing features
├── social/              # Social media features
├── store/               # E-commerce features
└── admin/               # Admin features
```

---

## UI Primitives

Located in `src/components/core/ui/`

### Button

Versatile button component with multiple variants.

**Props:**

```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  children: React.ReactNode;
}
```

**Usage:**

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">
  Click Me
</Button>

<Button variant="outline" size="sm">
  Cancel
</Button>

<Button variant="destructive">
  Delete
</Button>
```

---

### Card

Container component with header, content, and footer sections.

**Compound Components:**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

**Example:**

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Revenue</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">$45,231</p>
  </CardContent>
</Card>
```

---

### Dialog (Modal)

Modal dialog component.

**Props:**

```typescript
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}
```

**Usage:**

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

---

### Unified Modal System

E-coma uses a unified system for all modals and panels, categorized into three distinct patterns:

#### 1. Dialog (Modal)

Used for critical actions and focused tasks that require the user's full attention.

- **Location:** `src/components/core/ui/dialog.tsx`
- **When to use:** Confirmations, small forms, alerts.

#### 2. Sheet (Side Panel)

Used for secondary information, complex filters, or supplementary tasks that benefit from seeing the main content.

- **Location:** `src/components/core/ui/sheet.tsx`
- **When to use:** Advanced filters, detailed settings, AI agent interactions.

#### 3. Command Palette

Used for rapid navigation and global actions across the platform.

- **Location:** `src/components/core/ui/command-palette.tsx`
- **When to use:** Quick search, jumping between pages, executing commands.

---

```

---

### Input

Text input with variants and states.

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  error?: string;
}
```

**Usage:**

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div>
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email"
    type="email" 
    placeholder="you@example.com"
  />
</div>
```

---

### Select

Dropdown select component.

**Usage:**

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

---

### Tabs

Tabbed interface component.

**Usage:**

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content for Tab 1
  </TabsContent>
  <TabsContent value="tab2">
    Content for Tab 2
  </TabsContent>
  <TabsContent value="tab3">
    Content for Tab 3
  </TabsContent>
</Tabs>
```

---

### Table

Data table component with sorting and filtering.

**Usage:**

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### Badge

Small status or label indicator.

**Props:**

```typescript
interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}
```

**Usage:**

```tsx
import { Badge } from '@/components/ui/badge';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

---

### Tooltip

Hover tooltip component.

**Usage:**

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### Toast (Notifications)

Toast notification system.

**Usage:**

```tsx
import { useToast } from '@/components/ui/toast';

function MyComponent() {
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: "Success!",
      description: "Your changes have been saved.",
      variant: "default",
    });
  };

  return <Button onClick={showNotification}>Show Toast</Button>;
}
```

**Variants:**

```tsx
// Success
toast({ title: "Success!", variant: "default" });

// Error
toast({ title: "Error!", variant: "destructive" });

// With action
toast({
  title: "Undo available",
  action: <Button size="sm">Undo</Button>,
});
```

---

## Layout Components

Located in `src/components/core/layout/`

### LayoutWrapper

Root layout component that provides all contexts.

**Features:**

- Window layout state
- Right panel management
- Scroll tracking
- Help system
- Page actions

**Usage:**

```tsx
import { LayoutWrapper } from '@/components/core/layout/LayoutWrapper';

export default function RootLayout({ children }) {
  return (
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  );
}
```

---

### IconSidebar

Left sidebar with icon navigation.

**Features:**

- Category-based navigation
- Expandable popups on hover
- Active state tracking
- Favorites integration

**Configuration:**
Edit `src/config/navigation.tsx` to customize.

---

### CategoryRightPanel

Context-aware right sidebar.

**Features:**

- Dynamic content based on current page
- AI agents panel
- Quick actions
- Feature-specific tools

**Usage:**

```tsx
import { useCategoryRightPanel } from '@/components/core/layout/CategoryRightPanel';

function MyPage() {
  const { setContent } = useCategoryRightPanel();
  
  useEffect(() => {
    setContent(<MyCustomPanel />);
  }, []);
}
```

---

### EcosystemBar

Bottom status bar for AI agents.

**Features:**

- Module health indicators
- Connection status
- Quick access to agents
- Real-time updates

---

## Feature Components

### KPI Card

Analytics KPI display card.

**Location:** `src/components/analytics/KPICard.tsx`

**Props:**

```typescript
interface KPICardProps {
  title: string;
  value: number | string;
  trend?: number;
  format?: 'number' | 'currency' | 'percentage';
  icon?: React.ReactNode;
}
```

**Usage:**

```tsx
import { KPICard } from '@/components/analytics/KPICard';
import { DollarSign } from 'lucide-react';

<KPICard
  title="Total Revenue"
  value={45231}
  trend={12.5}
  format="currency"
  icon={<DollarSign />}
/>
```

---

### FeatureCluster

Collapsible feature group container.

**Location:** `src/components/core/ui/FeatureCluster.tsx`

**Usage:**

```tsx
import { FeatureCluster } from '@/components/core/ui/FeatureCluster';

<FeatureCluster
  title="Analytics Tools"
  description="Business intelligence features"
  icon={BarChart}
  defaultOpen={true}
>
  {/* Feature items */}
</FeatureCluster>
```

---

### DataTable with Filters

Advanced table with filtering and sorting.

**Location:** `src/components/core/ui/data-table-extras.tsx`

**Usage:**

```tsx
import { DataTable } from '@/components/ui/data-table-extras';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'status', header: 'Status' },
];

<DataTable
  columns={columns}
  data={users}
  searchable
  filterable
  sortable
/>
```

---

### Date Range Picker

Date range selection component.

**Location:** `src/components/core/ui/date-range-picker.tsx`

**Usage:**

```tsx
import { DateRangePicker } from '@/components/ui/date-range-picker';

<DateRangePicker
  from={startDate}
  to={endDate}
  onSelect={(range) => {
    setStartDate(range.from);
    setEndDate(range.to);
  }}
/>
```

---

### Charts

Recharts wrapper components.

**Location:** `src/components/analytics/charts/`

**Line Chart:**

```tsx
import { RevenueChart } from '@/components/analytics/RevenueChart';

<RevenueChart
  data={revenueData}
  height={300}
/>
```

**Bar Chart:**

```tsx
import { OrdersChart } from '@/components/analytics/OrdersChart';

<OrdersChart
  data={ordersData}
  height={400}
/>
```

---

### Wilaya Heatmap

Algerian province heatmap visualization.

**Location:** `src/components/ui/wilaya-heatmap.tsx`

**Usage:**

```tsx
import { WilayaHeatmap } from '@/components/ui/wilaya-heatmap';

<WilayaHeatmap
  data={[
    { wilayaCode: 16, value: 1250, label: 'Algiers' },
    { wilayaCode: 31, value: 850, label: 'Oran' },
    // ... more wilayas
  ]}
  colorScale="green"
/>
```

---

### Empty State

Empty state placeholder component.

**Location:** `src/components/ui/empty-state.tsx`

**Usage:**

```tsx
import { EmptyState } from '@/components/ui/empty-state';
import { Package } from 'lucide-react';

<EmptyState
  icon={<Package />}
  title="No products found"
  description="Get started by creating your first product"
  action={
    <Button onClick={() => createProduct()}>
      Create Product
    </Button>
  }
/>
```

---

## Usage Examples

### Complete Form Example

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';

export function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // API call
      await createProduct({ name, price, category });
      
      toast({
        title: "Product created!",
        description: "Your product has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create product.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price (DA)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Create Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

---

### Dashboard with KPIs

```tsx
import { KPICard } from '@/components/analytics/KPICard';
import { RevenueChart } from '@/components/analytics/RevenueChart';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value={45231}
          trend={12.5}
          format="currency"
          icon={<DollarSign />}
        />
        <KPICard
          title="Orders"
          value={1234}
          trend={8.2}
          format="number"
          icon={<ShoppingCart />}
        />
        <KPICard
          title="Customers"
          value={892}
          trend={-3.1}
          format="number"
          icon={<Users />}
        />
        <KPICard
          title="Conversion Rate"
          value={3.5}
          trend={1.2}
          format="percentage"
          icon={<TrendingUp />}
        />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart data={chartData} height={300} />
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Creating New Components

### Component Template

```tsx
// src/components/category/MyComponent.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// 1. Define Props Interface
interface MyComponentProps {
  title: string;
  description?: string;
  variant?: 'default' | 'compact';
  onAction?: () => void;
  className?: string;
}

// 2. Component Definition
export function MyComponent({
  title,
  description,
  variant = 'default',
  onAction,
  className,
}: MyComponentProps) {
  // 3. State
  const [isActive, setIsActive] = useState(false);

  // 4. Handlers
  const handleClick = () => {
    setIsActive(!isActive);
    onAction?.();
  };

  // 5. Render
  return (
    <div className={cn(
      "rounded-lg border p-4",
      variant === 'compact' && "p-2",
      isActive && "bg-accent",
      className
    )}>
      <h3 className="font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <Button onClick={handleClick} className="mt-2">
        Toggle
      </Button>
    </div>
  );
}
```

### Best Practices

1. **Export named functions** - Not default exports
2. **Define TypeScript interfaces** - For all props
3. **Use `cn()` utility** - For conditional classes
4. **Make components reusable** - Avoid hardcoded values
5. **Add default props** - For optional parameters
6. **Document complex logic** - With comments
7. **Keep components focused** - Single responsibility

---

## Component Library Reference

### Complete List of UI Components

Located in `src/components/ui/`:

- `accordion.tsx` - Collapsible sections
- `alert.tsx` - Alert messages
- `avatar.tsx` - User avatars
- `badge.tsx` - Status badges
- `breadcrumb.tsx` - Navigation breadcrumbs
- `button.tsx` - Buttons
- `calendar.tsx` - Date picker calendar
- `card.tsx` - Container cards
- `checkbox.tsx` - Checkboxes
- `collapsible.tsx` - Collapsible containers
- `command-palette.tsx` - Command menu (Cmd+K)
- `dialog.tsx` - Modals
- `dropdown-menu.tsx` - Dropdown menus
- `input.tsx` - Text inputs
- `label.tsx` - Form labels
- `popover.tsx` - Popovers
- `progress.tsx` - Progress bars
- `radio-group.tsx` - Radio buttons
- `scroll-area.tsx` - Scrollable areas
- `select.tsx` - Select dropdowns
- `separator.tsx` - Dividers
- `sheet.tsx` - Side panels
- `skeleton.tsx` - Loading skeletons
- `slider.tsx` - Range sliders
- `switch.tsx` - Toggle switches
- `table.tsx` - Data tables
- `tabs.tsx` - Tab navigation
- `textarea.tsx` - Multi-line text input
- `toast.tsx` - Notifications
- `tooltip.tsx` - Tooltips

And 40+ more specialized components!

---

For more examples, browse the `src/components/` directory or see [Architecture Documentation](ARCHITECTURE.md).
