# Login Modal - Visual Preview

## DESKTOP VIEW (What You'll See)

```
╔═══════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║   🥦 🥕 🥔 [VEGETABLES BACKGROUND IMAGE]  🥦 🥕   ┌─────────────┐  ║
║   [Fills entire left/center area]                 │ Login Now   │  ║
║   [Potatoes, broccoli, peppers, etc.]             │             │  ║
║   [Beautiful food photography]                    │ Hi,Welcome  │  ║
║                                                   │ Back 👋      │  ║
║   [Background continues under form]               │             │  ║
║                                                   │[Google Btn] │  ║
║   [Image is central focus]                        │             │  ║
║                                                   │── or Login  │  ║
║   [Dark overlay optional]                         │ With Email ─│  ║
║                                                   │             │  ║
║   [All vegetables visible and prominent]          │ Email:      │  ║
║                                                   │ [________]  │  ║
║                                                   │             │  ║
║                                                   │ Password:   │  ║
║                                                   │ [________]  │  ║
║                                                   │             │  ║
║                                                   │ Forget      │  ║
║                                                   │ Password?   │  ║
║                                                   │             │  ║
║                                                   │ [Login Btn] │  ║
║                                                   │             │  ║
║                                                   │ Create New  │  ║
║                                                   │ Account     │  ║
║                                                   │ Sign Up     │  ║
║                                                   │             │  ║
║                                                   │ [X close]   │  ║
║                                                   └─────────────┘  ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝

Desktop Dimensions:
- Modal: ~1000px wide × 600px tall
- Form container: 380px wide × auto height
- Form background: Tan/Brown gradient (#C99A6A → #E5B580)
- Form rounded corners: 15px
- Form shadow: Soft drop shadow for depth
```

## MOBILE VIEW (What You'll See)

```
╔═══════════════════════════════════════════════════╗
║                                                   ║
║  🥦 🥕 [VEGETABLES BACKGROUND]  🌶️  🥔          ║
║  [Shown behind form, slightly blurred]            ║
║                                                   ║
║         ┌─────────────────────────────┐           ║
║         │     Login Now               │           ║
║         │                             │           ║
║         │ Hi, Welcome Back 👋          │           ║
║         │                             │           ║
║         │ [Google Login Button]       │           ║
║         │                             │           ║
║         │ ─── or Login With Email ─── │           ║
║         │                             │           ║
║         │ Email:                      │           ║
║         │ [________________________]  │           ║
║         │                             │           ║
║         │ Password:                   │           ║
║         │ [________________________]  │           ║
║         │                             │           ║
║         │ Forget Password?            │           ║
║         │                             │           ║
║         │ [Login Button]              │           ║
║         │                             │           ║
║         │ Create New Account Sign Up  │           ║
║         │ [X]                         │           ║
║         └─────────────────────────────┘           ║
║                                                   ║
╚═══════════════════════════════════════════════════╝

Mobile Dimensions:
- Modal: 95% width (max 500px)
- Height: Auto (content driven)
- Form: Full width container
- Form background: Tan/Brown gradient
- Form rounded: 15px
- Single column layout
```

## FORM ELEMENT DETAILS

### Header Section
```
White Text on Tan/Brown Gradient:

"Login Now"
- Font: Poppins
- Size: 42px
- Weight: Bold
- Color: #FFFFFF
- Margin: 0 0 15px 0

"Hi, Welcome Back 👋"
- Font: Montserrat
- Size: 16px
- Weight: 500
- Color: rgba(255, 255, 255, 0.95)
- Margin: 0 0 30px 0
```

### Google Login Button
```
White Button:
- Background: #FFFFFF
- Text: "Login With Google"
- Font: Poppins, 15px, Bold
- Color: #333333
- Padding: 14px 20px
- Border Radius: 8px
- Shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
- Icon: Google 'G' logo (colorful)
- Width: Full width of form
- Hover: Slight lift effect
```

### Divider
```
Text: "or Login With Email"
- Color: White/translucent
- Style: Text with lines on both sides
- Margin: 20px 0
```

### Form Fields
```
Email Field:
- Label: "Email" (Pragati Narrow, 15px, bold, white)
- Input: White background, 12px padding
- Placeholder: "Enter your email"
- Rounded: 8px
- Shadow: 0 2px 8px rgba(0, 0, 0, 0.1)

Password Field:
- Label: "Password" (Pragati Narrow, 15px, bold, white)
- Input: White background, 12px padding
- Placeholder: "Enter your password"
- Type: Password (shows dots/asterisks)
- Rounded: 8px
- Shadow: 0 2px 8px rgba(0, 0, 0, 0.1)

Focus State (both fields):
- Background: #FFFFFF (pure white)
- Shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
- Transform: translateY(-1px) (slight lift)
```

### Links & Buttons
```
"Forget Password?" Link:
- Font: Cambay
- Size: 13px
- Color: #4a90e2 (blue)
- Position: Right-aligned
- Hover: Underline + darker blue

Login Button:
- Text: "Login"
- Font: Poppins, 16px, Bold
- Background: Gradient (#D4A574 → #C99A6A)
- Color: #FFFFFF (white)
- Width: 100%
- Padding: 14px 20px
- Rounded: 8px
- Shadow: 0 6px 16px rgba(0, 0, 0, 0.15)
- Hover: Lifted effect + deeper shadow
- Active: Returns to normal

Sign Up Link:
- Text: "Create New Account Sign Up"
- Regular text color: #FFFFFF
- "Sign Up" link color: #4a90e2 (blue)
- Font: Poppins
- Clickable: Toggles to signup form
```

## COLOR PALETTE

### Tan/Brown Gradient (Form Background)
```
- Start: #C99A6A (Light Tan)
- Middle: #D4A574 (Medium Tan)
- End: #E5B580 (Lighter Tan)
- Direction: 135deg (top-left to bottom-right)
```

### Text Colors
```
- Primary Text (headings): #FFFFFF (white)
- Subtitle Text: rgba(255, 255, 255, 0.95) (near white)
- Input Text: #333333 (dark gray)
- Links: #4a90e2 (medium blue)
- Placeholder: #999999 (light gray)
```

### Backgrounds
```
- Input Fields: rgba(255, 255, 255, 0.95) (near white)
- Focus State: #FFFFFF (pure white)
- Modal Overlay: rgba(0, 0, 0, 0.5) (semi-transparent black)
```

## ANIMATIONS

### Modal Entrance
```
Name: slideUp
Duration: 0.4s
Effect: 
  - Starts 30px lower
  - Fade in from opacity 0 to 1
  - Slides up to final position
Timing: ease
```

### Overlay Fade
```
Name: fadeIn
Duration: 0.3s
Effect:
  - Opacity transitions from 0 to 1
Timing: ease
```

### Button Hover
```
Effect: Slight lift (translateY(-2px))
Shadow: Increases
Transition: 0.3s ease
```

### Input Focus
```
Effect: 
  - Background brightens
  - Shadow intensifies
  - Slight lift (translateY(-1px))
Transition: 0.3s ease
```

## RESPONSIVE BREAKPOINTS

### Desktop (768px and above)
- ✅ Two-layer display (background + form overlay)
- ✅ Fixed dimensions (1000px × 600px)
- ✅ Form on right side (flex-end)
- ✅ No scroll unless form content overflows

### Tablet (768px and below)
- ✅ Mobile layout kicks in
- ✅ Full width form container
- ✅ Single column layout
- ✅ Auto height (content-driven)
- ✅ Scrollable if needed

### Mobile (small phones)
- ✅ Maximum 95% width
- ✅ Form fills almost all space
- ✅ Background shows faintly in back
- ✅ Touch-friendly button sizes
- ✅ Optimal for portrait orientation

---

**Ready to implement!** 🚀

Once you place the background image at `/images/vegetables-background.jpg`, 
the modal will display exactly like this.
