# Sparkle & Rain Effects

A beautiful interactive web application featuring mouse-following sparkle effects in light mode and animated rain effects in dark mode.

## Features

- **Mouse Sparkle Effect**: Stars follow your mouse cursor in light mode
- **Rain Animation**: Animated rain drops fall in dark mode
- **Dark/Light Mode Toggle**: Switch between themes with smooth transitions
- **Theme Persistence**: Your theme preference is saved in localStorage
- **Responsive Design**: Works on both desktop and mobile devices

## Files

- `index.html` - Main HTML structure
- `script.js` - JavaScript functionality for effects and theme switching
- `style.css` - Styles for the interface, animations, and effects
- `image/` - Directory containing SVG assets for stars and theme toggle icons

## How to Use

1. Open `index.html` in a web browser
2. Move your mouse around to see sparkle effects (in light mode)
3. Click the theme toggle button to switch between light and dark modes
4. In dark mode, enjoy the rain animation

## Fixed Issues

- ✅ Fixed undefined variable `newTheme` in toggle event listener
- ✅ Corrected theme persistence in localStorage
- ✅ Added proper CSS animations for stars and rain
- ✅ Created responsive design for mobile devices
- ✅ Added SVG placeholders for missing image assets

## Technical Details

### Light Mode Features:
- Blue gradient background
- Mouse-following star sparkles
- Sun icon for theme toggle

### Dark Mode Features:
- Dark gradient background
- Animated rain effect with 100 drops
- Moon icon for theme toggle
- No sparkle effects (disabled)

The effects are optimized with `requestAnimationFrame` for smooth performance and use CSS transitions for seamless theme switching.