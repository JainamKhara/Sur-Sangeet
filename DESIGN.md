---
name: SurSangeet — Studio AI Music Deck
description: Dark brutalist hi-fi music deck with tactical hardware controls and spinning vinyl turntable
colors:
  primary: "#f43f5e"
  primary-hover: "#fb7185"
  neutral-bg: "#090a0f"
  neutral-surface: "#12141c"
  neutral-card-bg: "#07080c"
  border-subtle: "#232736"
  border-dark: "#1c1f2e"
  text-primary: "#f1ede6"
  text-muted: "#94a3b8"
  shadow-dark: "#040507"
typography:
  display:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "1.5rem"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Outfit, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "0.75rem"
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  card-brutalist:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: SurSangeet

## Overview

**Creative North Star: "The Dark Vinyl Sanctuary"**

SurSangeet combines a tactile hi-fi hardware console with a dark studio atmosphere. The visual identity reflects physical audio gear: dark metal enclosures, crimson LED indicators, mechanical sliders, and a central spinning vinyl turntable with a dynamic tonearm pickup needle.

### Key Characteristics:
- **Tactile Brutalism**: 2px solid borders (`#232736`), sharp corners, and 4px offset hard drop-shadows (`#040507`).
- **Signal Red Accents**: Rose crimson (`#f43f5e`) reserved for primary action triggers, active play states, and hardware sliders.
- **Grain & Micro-Grooves**: Radial noise backdrop with authentic vinyl micro-groove rings and glossy reflections.

## Colors

The color palette is built around an ultra-dark studio background paired with sharp tactical borders and high-contrast crimson highlights.

### Primary
- **Rose Crimson Signal** (`#f43f5e`): Used for primary action buttons, active turntable highlights, range slider thumbs, and playing track indicators.
- **Signal Rose Hover** (`#fb7185`): State transition color for interactive buttons and hover states.

### Neutral
- **Deep Console Black** (`#090a0f`): Root application background.
- **Surface Plate Dark** (`#12141c`): Card surfaces and container modules.
- **Platter Deck Black** (`#07080c`): Turntable deck stage background.
- **Tactile Border Slate** (`#232736`): 2px hard borders defining UI modules.
- **Cream Off-White** (`#f1ede6`): Primary headline typography.
- **Muted Slate** (`#94a3b8`): Secondary metadata labels and captions.

### Named Rules
**The One Signal Rule.** Crimson (`#f43f5e`) is strictly reserved for active audio state indicators and primary execution triggers. It must occupy ≤ 15% of any given view.

## Typography

**Display Font:** `Space Grotesk` (Monospace / Technical display)  
**Body Font:** `Outfit` (Clean geometric sans-serif)  

### Hierarchy
- **Display** (Weight: 900, `clamp(2rem, 5vw, 3.5rem)`, Line Height: 1.1): Hero titles and vector deck section headers.
- **Headline** (Weight: 900, `1.5rem`, Line Height: 1.2): Track titles and wizard step questions.
- **Title** (Weight: 700, `1.125rem`, Line Height: 1.3): Up Next song titles and card labels.
- **Body** (Weight: 400, `0.875rem`, Line Height: 1.5): Descriptive text and artist metadata.
- **Label** (Weight: 900, `0.75rem`, Letter Spacing: `0.1em` uppercase): Technical badges, duration timestamps, and metadata tags.

## Layout

- **Container Bounds**: Max width `1280px` (`max-w-7xl`) centered with responsive padding (`px-4 sm:px-6`).
- **Grid Models**: 12-column asymmetric desktop grid (7 cols for main player/wizard, 5 cols for queue matrix).
- **Hard Spacing Rhythm**: 8px modular scale (`gap-4`, `gap-6`, `space-y-6`).

## Elevation & Depth

SurSangeet avoids soft ambient ambient blur shadows. Depth is established through **Tactile Hard Drop Shadows**.

### Shadow Vocabulary
- **Card Brutalist Shadow** (`box-shadow: 4px 4px 0px #040507`): Rest state for player containers and wizard decks.
- **Card Hover Elevation** (`box-shadow: 6px 6px 0px #f43f5e`): Hover state for interactive song cards.
- **Button Click Inset** (`transform: translate(2px, 2px)`, `box-shadow: 1px 1px 0px #040507`): Active button click response.

## Shapes

- **Hard Rectangular Bounds**: Sharp corners (`border-radius: 0px`) on cards, buttons, and headers.
- **Circular Hardware Exceptions**: Turntable vinyl record disc (`rounded-full`), tonearm pivot base, and status indicator LEDs.

## Components

### Buttons
- **Shape**: Sharp rectangular (`border-radius: 0px`).
- **Border**: `2px solid #232736`.
- **Primary**: Background `#f43f5e`, text `#ffffff`, font `Space Grotesk` bold uppercase.
- **Hover/Active**: Offset shadow shift with `translate(2px, 2px)`.

### Cards & Decks
- **Background**: `#12141c`.
- **Border**: `2px solid #232736`.
- **Shadow**: Hard 4px `#040507` offset shadow.

### Range Sliders (Scrubber & Volume)
- **Track**: `#1b1e2b`, border `2px solid #282c3f`, height `12px`.
- **Thumb**: `22px x 24px`, background `#f43f5e`, border `2px solid #ffffff`, hard shadow `2px 2px 0px #000000`.

## Do's and Don'ts

### Do:
- **Do** maintain sharp 2px borders (`#232736`) and hard offset shadows (`#040507`).
- **Do** uppercase technical metadata text with `Space Grotesk` font.
- **Do** provide immediate physical visual feedback on button clicks.

### Don't:
- **Don't** use soft rounded border radii (`rounded-xl` or `rounded-2xl`) on rectangular cards or buttons.
- **Don't** use soft diffuse drop-shadows (`shadow-lg` or `shadow-xl`).
- **Don't** apply crimson (`#f43f5e`) to non-interactive decorative elements.
