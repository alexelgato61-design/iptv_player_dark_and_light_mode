# Player 13 - Design Language

## Overall Layout & Structure
The interface uses a **left sidebar navigation** (approximately 200-240px wide) with the main content area taking up the remaining space. The layout follows a **card-based design system** with clean separation between sections. The entire interface sits on a **light neutral background** (off-white/very light gray, around #F5F5F7).

## Color Palette
- **Primary Brand Color**: Deep red (#E50914 or similar) used for the Netflix logo and primary CTAs
- **Background**: Light gray/off-white (#F5F5F7 or #FAFAFA)
- **Card Backgrounds**: Pure white (#FFFFFF) with subtle shadows
- **Text Hierarchy**: 
  - Primary text: Dark charcoal/near black
  - Secondary text: Medium gray (#6B7280 or similar)
  - Tertiary text: Light gray (#9CA3AF)
- **Accent Colors**: Orange/amber for secondary actions, various colors for party avatars

## Typography
- **Logo**: Bold, sans-serif, likely custom Netflix typeface
- **Headings**: Large, bold sans-serif (probably 28-32px for hero titles, 20-24px for section headers)
- **Body Text**: Clean sans-serif, medium weight (14-16px)
- **Metadata**: Smaller text (12-14px) in gray tones
- **Hierarchy**: Clear weight differentiation - bold for titles, regular for body, light for metadata

## Buttons & Interactive Elements

### Primary Button (Watch)
- **Style**: Filled, rounded rectangle
- **Color**: Netflix red background with white text
- **Border Radius**: Medium (6-8px)
- **Padding**: Generous (12-16px horizontal, 8-12px vertical)
- **Hover State**: Likely slightly darker red or subtle shadow

### Secondary Button (Plus/Add)
- **Style**: Semi-transparent dark background
- **Color**: Dark gray/black with 30-40% opacity, white icon
- **Border Radius**: Matching primary (6-8px)
- **Size**: Square or nearly square aspect ratio

### Tertiary Button (View Challenges)
- **Style**: Subtle filled button
- **Color**: Muted blue-gray background (#A8B5C8 or similar)
- **Border Radius**: Medium (6-8px)
- **Text**: White, centered

### Icon Buttons
- **Style**: Minimal, icon-only
- **States**: Gray default, red when active/selected
- **Size**: Consistent (20-24px icon size)

## Cards & Containers

### Hero Card (The Witcher)
- **Border Radius**: Large, pronounced (16-20px)
- **Shadow**: Soft, elevated shadow (0 4px 12px rgba(0,0,0,0.1))
- **Aspect Ratio**: Wide cinematic (approximately 16:7 or 2:1)
- **Overlay**: Dark gradient from bottom for text readability
- **Image**: Full bleed to card edges

### Party Cards (Smaller rectangular cards)
- **Border Radius**: Medium (12-14px)
- **Shadow**: Subtle (0 2px 8px rgba(0,0,0,0.08))
- **Background**: White
- **Padding**: 16-20px internal padding
- **Layout**: Icon/image at top, title below, subtitle in gray

### Continue Watching Cards
- **Border Radius**: Medium (10-12px)
- **Aspect Ratio**: Standard video thumbnail (16:9)
- **Hover State**: Subtle scale up (1.05) or shadow increase
- **Badge**: Small "10XP" indicator in top-left corner with dark background

### Profile Card (Popcorn Addict)
- **Border Radius**: Large (16-18px)
- **Background**: Light blue-gray tint
- **Padding**: 20-24px
- **Layout**: Centered content with avatar, text, and button stacked

## Spacing & Grid System
- **Base Unit**: Appears to be 8px or 4px system
- **Section Spacing**: Large gaps between major sections (32-40px)
- **Card Gaps**: Medium spacing in grids (16-20px)
- **Internal Padding**: Consistent 16-24px inside cards
- **Content Margins**: Main content has comfortable margins from viewport edges (40-60px)

## Sidebar Navigation
- **Width**: Fixed (approximately 220px)
- **Background**: White
- **Border**: None or very subtle right border
- **Item Spacing**: 8-12px between menu items
- **Active State**: Red accent bar on left edge (4px wide), red icon
- **Inactive State**: Gray icons and text
- **Icon Size**: 20-24px
- **Section Headers**: Small caps or smaller gray text ("Menu", "Social", "General")

## Iconography
- **Style**: Outline/stroke-based icons (not filled)
- **Weight**: Medium stroke weight (1.5-2px)
- **Size**: Consistent 20-24px
- **Style**: Rounded ends/joins, modern line icons

## Badges & Indicators
- **Notification Dots**: Small red circles (8-10px) positioned top-right of icons
- **XP Badges**: Small rounded rectangles with white text on dark/semi-transparent backgrounds
- **Match Percentage**: Small text with percentage, subtle styling

## Avatars & Profile Pictures
- **Shape**: Perfect circles
- **Sizes**: Multiple sizes (24px for small, 40-48px for medium, 64px+ for large)
- **Border**: None or subtle white border when overlapped
- **Grouping**: Overlapping avatars shift left by 60-70% of width

## Search Bar
- **Border Radius**: Large pill shape (24-32px)
- **Background**: Light gray fill (#F0F0F0)
- **Border**: None or 1px subtle border
- **Padding**: Medium (12-16px horizontal)
- **Icon**: Left-aligned search icon in gray
- **Width**: Wide, spanning significant portion of header

## Navigation Arrows (Top)
- **Style**: Simple chevron icons
- **Background**: None or very subtle circular hover state
- **Size**: Small (16-20px)
- **Color**: Medium gray

## Floating Action Button (Plus)
- **Shape**: Perfect circle
- **Color**: Netflix red
- **Shadow**: Elevated (0 4px 16px rgba(0,0,0,0.15))
- **Position**: Fixed to right side of screen
- **Size**: Large (48-56px diameter)
- **Icon**: White plus sign, centered

## Progress Indicators
- **Style**: Horizontal bar/slider
- **Active**: Colored fill (likely red or blue)
- **Inactive**: Light gray track
- **Height**: Thin (2-4px) with larger thumb/handle

## Borders & Dividers
- **Philosophy**: Minimal use of borders
- **Separation**: Achieved through whitespace, shadows, and background color changes
- **When Used**: Very subtle (1px, #E5E5E5 or similar)

## Shadows
- **Elevation System**: Multiple levels
  - **Low**: 0 1px 3px rgba(0,0,0,0.08)
  - **Medium**: 0 4px 12px rgba(0,0,0,0.1)
  - **High**: 0 8px 24px rgba(0,0,0,0.12)
- **Philosophy**: Subtle and soft, never harsh

## Responsive Behavior (Implied)
- **Grid**: Flexible grid that adjusts card count based on viewport
- **Sidebar**: Likely collapsible on mobile
- **Cards**: Maintain aspect ratios, scale proportionally

## Micro-interactions (Implied)
- **Hover States**: Subtle transforms (scale, shadow, opacity changes)
- **Transitions**: Smooth, approximately 200-300ms
- **Easing**: Likely ease-out for natural feel

This design language emphasizes **clean modernism**, **generous whitespace**, **subtle depth through shadows**, and **bold use of the brand red** for primary actions while keeping most of the interface neutral and content-focused.