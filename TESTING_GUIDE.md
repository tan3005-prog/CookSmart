# 🧪 Login Modal - Testing Guide

## Quick Start Testing

### Prerequisites
- Node.js installed
- MongoDB Atlas account with connection string
- `.env` file with `MONGO_URI` configured

### Step 1: Install & Start
```bash
npm install
npm start
```

You should see:
```
Connected to MongoDB Atlas
Server running at http://localhost:3000
```

### Step 2: Test Home Page Access
```
URL: http://localhost:3000
Expected: Page loads directly without login
Status: ✓ No login required
```

## Test Scenarios

### Scenario 1: Access Protected Page Without Login

**Steps:**
1. Go to `http://localhost:3000`
2. Click "Discover" in navbar

**Expected Result:**
- ✓ Login modal popup appears
- ✓ Modal shows "Login Now" heading
- ✓ Has gradient background (tan/brown)
- ✓ Google button visible
- ✓ Email & Password fields visible
- ✓ "Forget Password?" link visible
- ✓ "Sign Up" link visible

---

### Scenario 2: Sign Up New Account

**Steps:**
1. Click "Discover" (triggers login modal)
2. Click "Sign Up" link
3. Fill form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Confirm: `password123`
4. Click "Sign Up" button

**Expected Result:**
- ✓ Form validates inputs
- ✓ Button shows "Creating account..." while loading
- ✓ Green success message appears
- ✓ Modal closes after 1.5s
- ✓ Redirected to Discover page
- ✓ "Logout" button appears in navbar

**Database Check:**
```bash
# In MongoDB Atlas, check Users collection
# Should have new document with:
# - email: john@example.com
# - name: John Doe
# - password: hashed (not readable)
# - createdAt: timestamp
```

---

### Scenario 3: Login With Existing Account

**Steps:**
1. Logout (click "Logout" in navbar)
2. Go to home page
3. Click "Trending" in navbar
4. Fill form:
   - Email: `john@example.com`
   - Password: `password123`
5. Click "Login" button

**Expected Result:**
- ✓ Button shows "Logging in..." while loading
- ✓ Green success message: "Login successful! Redirecting..."
- ✓ Modal closes
- ✓ Redirected to Trending page
- ✓ Logout button visible in navbar

---

### Scenario 4: Login With Wrong Password

**Steps:**
1. Go to "About" page (triggers login)
2. Fill form:
   - Email: `john@example.com`
   - Password: `wrongpassword`
3. Click "Login"

**Expected Result:**
- ✓ Red error message: "Invalid credentials"
- ✓ Modal stays open
- ✓ Form not cleared
- ✓ Can retry

---

### Scenario 5: Login With Non-Existent Email

**Steps:**
1. Go to protected page
2. Fill form:
   - Email: `nonexistent@example.com`
   - Password: `password123`
3. Click "Login"

**Expected Result:**
- ✓ Red error message: "Invalid credentials"
- ✓ Modal stays open
- ✓ Cannot proceed without correct email

---

### Scenario 6: Sign Up With Existing Email

**Steps:**
1. Trigger login modal
2. Click "Sign Up"
3. Fill form with same email as existing user:
   - Name: `Jane Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Confirm: `password123`
4. Click "Sign Up"

**Expected Result:**
- ✓ Red error message: "User already exists with this email"
- ✓ Modal stays open
- ✓ Form not cleared
- ✓ Can retry with different email

---

### Scenario 7: Sign Up With Mismatched Passwords

**Steps:**
1. Trigger login modal
2. Click "Sign Up"
3. Fill form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `different123`
4. Click "Sign Up"

**Expected Result:**
- ✓ Red error message: "Passwords do not match"
- ✓ Modal stays open
- ✓ Form not cleared

---

### Scenario 8: Sign Up With Short Password

**Steps:**
1. Trigger login modal
2. Click "Sign Up"
3. Fill form:
   - Name: `Test User`
   - Email: `test2@example.com`
   - Password: `123`
   - Confirm: `123`
4. Click "Sign Up"

**Expected Result:**
- ✓ Red error message: "Password must be at least 6 characters"
- ✓ Modal stays open
- ✓ Cannot submit

---

### Scenario 9: Logout

**Steps:**
1. Login successfully (you should have "Logout" in navbar)
2. Click "Logout" button
3. Confirm logout

**Expected Result:**
- ✓ Confirmation dialog appears
- ✓ User redirected to home page
- ✓ Logout button removed from navbar
- ✓ LocalStorage cleared
- ✓ Next protected page access shows login modal

---

### Scenario 10: Session Persistence

**Steps:**
1. Login successfully
2. Verify "Logout" appears
3. Refresh page (F5)

**Expected Result:**
- ✓ Page reloads
- ✓ User still logged in
- ✓ "Logout" still visible
- ✓ Can access protected pages directly
- ✓ No login modal appears

---

### Scenario 11: Modal Close Button

**Steps:**
1. Trigger login modal
2. Click X button (top right)

**Expected Result:**
- ✓ Modal closes smoothly
- ✓ Not logged in yet
- ✓ Clicking protected page again shows modal again

---

### Scenario 12: Modal Overlay Click

**Steps:**
1. Trigger login modal
2. Click outside modal (on gray overlay)

**Expected Result:**
- ✓ Modal closes
- ✓ Not logged in yet
- ✓ Protected page redirect triggered again

---

### Scenario 13: Multiple Page Access

**Steps:**
1. Logout (or start fresh)
2. From navbar, try clicking:
   - "Discover" → Login modal
   - Close modal
   - "Trending" → Login modal appears
   - Close modal
   - "About" → Login modal appears

**Expected Result:**
- ✓ Modal appears for all protected pages
- ✓ Modal closes properly each time
- ✓ Only Home accessible without modal

---

## Styling Verification Checklist

### Fonts
- [ ] "Login Now" is bold Poppins
- [ ] "Hi, Welcome Back 👋" is Montserrat
- [ ] "Email" / "Password" labels are bold Pragati Narrow
- [ ] "Forget Password?" is Cambay italic/regular

### Colors
- [ ] Modal background gradient is tan/brown
- [ ] Google button is white with Google logo
- [ ] Login button has tan/brown gradient
- [ ] Error messages are red
- [ ] Success messages are green
- [ ] Text colors are correct

### Animations
- [ ] Modal slides up on appear
- [ ] Messages slide down when shown
- [ ] Buttons have hover effects
- [ ] Close button rotates on hover
- [ ] Smooth transitions all around

### Responsiveness
- [ ] Desktop (1200px): Modal wide, left panel visible
- [ ] Tablet (800px): Modal medium, left panel visible
- [ ] Mobile (400px): Modal full width, no left panel
- [ ] All text readable on mobile
- [ ] Inputs full width on mobile
- [ ] Buttons easy to tap on mobile

---

## Browser Console Errors to Check

Open DevTools (F12) and look for:

❌ **CORS Errors**
```
Access to XMLHttpRequest... has been blocked
```
→ Check server.js has cors() middleware

❌ **404 Errors**
```
Failed to load resource: the server responded with a status of 404
```
→ Check login-modal.js and login-modal.css are linked

❌ **MongoDB Connection**
```
MongoDB connection error
```
→ Check .env file has correct MONGO_URI

❌ **Parse Errors**
```
Uncaught SyntaxError
```
→ Check JavaScript syntax in login-modal.js

---

## Network Tab Checks

1. Go to any protected page
2. Open DevTools → Network tab
3. Try to login

**Should see requests to:**
- ✓ `/api/auth/login` (POST)
- ✓ `200 OK` response with user data

**Response should look like:**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "message": "Login successful"
}
```

---

## Troubleshooting

### Modal doesn't appear
```
1. Check browser console for JS errors
2. Ensure login-modal.js is loaded
3. Check network tab for 404s
4. Clear browser cache (Ctrl+Shift+Delete)
```

### Login fails silently
```
1. Check MongoDB connection in server logs
2. Verify .env MONGO_URI is correct
3. Check network tab for API response
4. Look for error message in console
```

### Styling looks wrong
```
1. Verify login-modal.css is loaded (Network tab)
2. Check if other CSS is overriding
3. Clear CSS cache
4. Check Google Fonts are loading
5. Inspect element to see applied styles
```

### Password doesn't hash
```
1. Check bcryptjs is installed (npm list bcryptjs)
2. Verify user.save() is called
3. Check MongoDB for saved password
4. Ensure User model pre-save hook is active
```

---

## Performance Testing

### Load Time
```
1. Open DevTools → Performance tab
2. Reload page
3. Record performance
4. Check FCP (First Contentful Paint)
5. Should be < 2s
```

### Modal Load
```
1. Time from click to modal visible
2. Should be instant (< 100ms)
3. Check for jank/stuttering
```

---

## Security Testing

### ✓ Password Hashing
- Passwords should NEVER be stored in plain text
- Check MongoDB: passwords should be bcrypt hash (~60 chars)

### ✓ LocalStorage Security
- User data in localStorage is readable
- Don't store sensitive info beyond email/name
- Session should clear on logout

### ✓ API Security
- Login endpoint should return 200 on success
- Should return 401 on invalid credentials
- Never return unhashed passwords in response

---

## Final Verification Checklist

- [ ] Home page accessible without login
- [ ] Discover requires login
- [ ] Trending requires login
- [ ] About requires login
- [ ] Sign up creates new user in MongoDB
- [ ] Login works with correct credentials
- [ ] Login fails with wrong password
- [ ] Logout removes session
- [ ] Modal styling matches mockup
- [ ] All fonts are correct
- [ ] Colors are correct
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] No 404 errors
- [ ] MongoDB connected successfully

---

**Once all tests pass, your system is ready for production! 🚀**
