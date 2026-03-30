// personal.js
// Handles Personal Details page: full name, email, contact number, edit mode, OTP verification for email/phone changes.

const API = '/api';

function showMessage(msg, type = 'info'){
  const el = document.getElementById('personalMessage');
  el.style.display = 'block';
  el.textContent = msg;
  el.style.background = type === 'success' ? '#e6ffed' : (type === 'error' ? '#ffecec' : '#f3f4f6');
  el.style.color = type === 'success' ? '#0f5132' : (type === 'error' ? '#9b2c2c' : '#374151');
}

function hideMessage(){
  const el = document.getElementById('personalMessage');
  el.style.display = 'none';
  el.textContent = '';
}

async function saveToServer(userId, payload){
  try{
    const res = await fetch(`${API}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const data = await res.json().catch(()=>({}));
      throw new Error(data.message || 'Server error');
    }
    return await res.json();
  }catch(err){
    console.warn('Server save failed', err);
    throw err;
  }
}

function populateForm(user){
  document.getElementById('name').value = user.name || '';
  document.getElementById('email').value = user.email || '';
  document.getElementById('contactNumber').value = user.contactNumber || '';
  document.getElementById('createdAt').value = user.createdAt ? new Date(user.createdAt).toLocaleString() : '';
  // show inline verify text and mark Verified when present
  const verifyEmailBtn = document.getElementById('verifyEmailBtn');
  const verifyContactBtn = document.getElementById('verifyContactBtn');
  // initialize verify text state
  if (verifyEmailBtn) {
    verifyEmailBtn.style.display = 'inline-block';
    if (user.email) {
      verifyEmailBtn.textContent = 'Verified';
      verifyEmailBtn.classList.remove('clickable');
      verifyEmailBtn.classList.remove('pending');
      verifyEmailBtn.classList.add('verified');
    } else {
      verifyEmailBtn.textContent = 'Verify';
      verifyEmailBtn.classList.add('clickable');
      verifyEmailBtn.classList.remove('verified');
      verifyEmailBtn.classList.remove('pending');
    }
  }
  if (verifyContactBtn) {
    verifyContactBtn.style.display = 'inline-block';
    if (user.contactNumber) {
      verifyContactBtn.textContent = 'Verified';
      verifyContactBtn.classList.remove('clickable');
      verifyContactBtn.classList.remove('pending');
      verifyContactBtn.classList.add('verified');
    } else {
      verifyContactBtn.textContent = 'Verify';
      verifyContactBtn.classList.add('clickable');
      verifyContactBtn.classList.remove('verified');
      verifyContactBtn.classList.remove('pending');
    }
  }
}

function setVerifyStateForField(field, state) {
  // field: 'email' or 'contactNumber'
  const el = field === 'email' ? document.getElementById('verifyEmailBtn') : document.getElementById('verifyContactBtn');
  if (!el) return;
  el.classList.remove('pending', 'verified', 'clickable');
  if (state === 'pending') {
    el.textContent = 'Verify now';
    el.classList.add('pending', 'clickable');
  } else if (state === 'verified') {
    el.textContent = 'Verified';
    el.classList.add('verified');
  } else if (state === 'ready') {
    el.textContent = 'Verify';
    el.classList.add('clickable');
  }
}

function validateContactNumber(value) {
  if (!value) return { ok: false, message: 'Enter a contact number.' };
  // allow digits, remove non-digit chars for validation
  const digits = (value.match(/\d/g) || []).join('');
  if (digits.length !== 10) return { ok: false, message: 'Contact number must be exactly 10 digits.' };
  return { ok: true };
}

function showContactError(msg) {
  const el = document.getElementById('contactError');
  if (!el) return;
  if (!msg) { el.style.display = 'none'; el.textContent = ''; }
  else { el.style.display = 'block'; el.textContent = msg; }
}

function setReadonly(readonly) {
  ['name','email','contactNumber'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.readOnly = !!readonly;
  });
  document.getElementById('editPersonal').style.display = readonly ? 'inline-block' : 'none';
  document.getElementById('cancelPersonal').style.display = readonly ? 'none' : 'inline-block';
  document.getElementById('savePersonal').style.display = readonly ? 'none' : 'inline-block';
  // Keep verify text visible; its content/class is managed by populateForm
  const verifyEmailBtn = document.getElementById('verifyEmailBtn');
  const verifyContactBtn = document.getElementById('verifyContactBtn');
  if (verifyEmailBtn) verifyEmailBtn.style.display = 'inline-block';
  if (verifyContactBtn) verifyContactBtn.style.display = 'inline-block';
}

function updateSaveEnabled() {
  // Disable Save if there are pendingChanges OR if email/contact fields are changed but not verified
  const pending = sessionStorage.getItem('pendingChanges');
  if (pending) {
    document.getElementById('savePersonal').disabled = true;
    return;
  }
  // If editable, enable save; otherwise, keep disabled
  const editable = document.getElementById('savePersonal').style.display !== 'none';
  document.getElementById('savePersonal').disabled = !editable ? true : false;
}

function simulateSendOtp(target, pendingChanges) {
  // In a real app we'd send OTP via SMS/email. Here we simulate and store OTP and pending changes in sessionStorage.
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  sessionStorage.setItem('pendingOtp', code);
  sessionStorage.setItem('pendingTarget', target);
  sessionStorage.setItem('pendingChanges', JSON.stringify(pendingChanges || {}));
  console.log('Simulated OTP for', target, code);
  const otpSection = document.getElementById('otpSection');
  document.getElementById('otpMessage').textContent = `An OTP has been sent to ${target}. Use code ${code} (simulated).`;
  // We'll insert/position the OTP popup in its final inline spot before making it visible
  otpSection.style.zIndex = 10002;
  const anchorId = sessionStorage.getItem('pendingAnchorId');
  if (anchorId) {
    const anchor = document.getElementById(anchorId);
    if (anchor) {
      // Find the container to insert after (form-group preferred)
      const container = anchor.closest('.form-group') || anchor.parentElement;
      try {
        // Keep it hidden while we move it to avoid any transient overlay
        otpSection.style.display = 'none';
        container.insertAdjacentElement('afterend', otpSection);
        // make it part of flow so it pushes content down
        otpSection.style.position = 'relative';
        otpSection.style.left = '';
        otpSection.style.top = '';
        otpSection.style.transform = '';
        // match width to the input where reasonable
        const rect = anchor.getBoundingClientRect();
        const desiredWidth = Math.min(720, Math.max(260, rect.width));
        otpSection.style.minWidth = `${Math.round(desiredWidth)}px`;
        // Now reveal it (no fixed overlay step -> no blink)
        otpSection.style.display = 'block';
        // Scroll the anchor into view (no blocking waiting) so popup is visible
        try { anchor.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
        const otpInput = document.getElementById('otpInput');
        if (otpInput) otpInput.focus();
        return;
      } catch (e) {
        // fallthrough to centered overlay fallback
        console.warn('inline OTP insertion failed, falling back to centered overlay', e);
      }
    }
    // Anchor not found or insertion failed: fallback to centered overlay
    otpSection.style.position = 'fixed';
    otpSection.style.left = '50%';
    otpSection.style.top = '50%';
    otpSection.style.transform = 'translate(-50%, -50%)';
    otpSection.style.minWidth = '320px';
    otpSection.style.display = 'block';
    const otpInput = document.getElementById('otpInput');
    if (otpInput) otpInput.focus();
    return;
  }
  // no anchor specified: default centered overlay
  otpSection.style.position = 'fixed';
  otpSection.style.left = '50%';
  otpSection.style.top = '50%';
  otpSection.style.transform = 'translate(-50%, -50%)';
  otpSection.style.minWidth = '320px';
  otpSection.style.display = 'block';
  const otpInput = document.getElementById('otpInput');
  if (otpInput) otpInput.focus();
}

function clearOtp() {
  sessionStorage.removeItem('pendingOtp');
  sessionStorage.removeItem('pendingTarget');
  sessionStorage.removeItem('pendingChanges');
  sessionStorage.removeItem('pendingAnchorId');
  document.getElementById('otpInput').value = '';
  const otpSection = document.getElementById('otpSection');
  // move the OTP section back below the form to keep DOM predictable
  const form = document.getElementById('personalForm');
  if (form && otpSection) {
    form.insertAdjacentElement('afterend', otpSection);
    otpSection.style.position = '';
    otpSection.style.left = '';
    otpSection.style.top = '';
    otpSection.style.transform = '';
    otpSection.style.minWidth = '';
  }
  if (otpSection) otpSection.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  const stored = JSON.parse(localStorage.getItem('user') || 'null');
  if (!stored || !stored._id) {
    // not logged in - redirect to home (no login modal on this page)
    window.location.href = '/index.html';
    return;
  }
  populateForm(stored);
  setReadonly(true);

  // live change detection: mark field pending when user edits email/contact
  document.getElementById('email').addEventListener('input', (e) => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null') || {};
    const current = e.target.value.trim();
    if (current && current !== (storedUser.email || '')) {
      setVerifyStateForField('email', 'pending');
    } else {
      setVerifyStateForField('email', storedUser.email ? 'verified' : 'ready');
    }
    updateSaveEnabled();
  });

  document.getElementById('contactNumber').addEventListener('input', (e) => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null') || {};
    const current = e.target.value.trim();
    // Validate contact number length (10 digits) before allowing verify
    const v = validateContactNumber(current);
    if (!v.ok) {
      showContactError(v.message);
      // mark verify as non-clickable
      setVerifyStateForField('contactNumber', 'ready');
      document.getElementById('verifyContactBtn').classList.remove('clickable');
    } else {
      showContactError('');
      if (current && current !== (storedUser.contactNumber || '')) {
        setVerifyStateForField('contactNumber', 'pending');
      } else {
        setVerifyStateForField('contactNumber', storedUser.contactNumber ? 'verified' : 'ready');
      }
    }
    updateSaveEnabled();
  });

  // Edit button toggles editable state
  document.getElementById('editPersonal').addEventListener('click', (e) => {
    e.preventDefault();
    setReadonly(false);
    hideMessage();
  updateSaveEnabled();
  });

  // Cancel resets form to stored values
  document.getElementById('cancelPersonal').addEventListener('click', (e) => {
    e.preventDefault();
    populateForm(JSON.parse(localStorage.getItem('user') || 'null'));
    setReadonly(true);
    clearOtp();
    hideMessage();
  });

  // Save button: handle possible email/contact change -> OTP flow
  document.getElementById('savePersonal').addEventListener('click', async (e) => {
    e.preventDefault();
    hideMessage();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contactNumber').value.trim();

    const user = JSON.parse(localStorage.getItem('user') || 'null') || {};

    // Detect sensitive changes that require OTP: email or contactNumber changed
    const emailChanged = email && email !== user.email;
    const contactChanged = contact && contact !== (user.contactNumber || '');

    if (emailChanged || contactChanged) {
      // Build the pendingChanges object including all fields the user modified
      const pendingChanges = { name };
      if (emailChanged) pendingChanges.email = email;
      if (contactChanged) pendingChanges.contactNumber = contact;

      // Choose a target to send OTP to (prefer email if changed, otherwise contact)
      const target = pendingChanges.email ? pendingChanges.email : pendingChanges.contactNumber;
      simulateSendOtp(target, pendingChanges);
      showMessage('OTP sent. Please enter the OTP to verify changes before saving.', 'info');
      // mark save disabled until verification
      updateSaveEnabled();
      return;
    }

    // No OTP-required changes: persist immediately
    const updates = { name };
    if (contact) updates.contactNumber = contact;

    try {
      if (user._id) {
        const res = await saveToServer(user._id, updates);
        // res.user is the updated user
        localStorage.setItem('user', JSON.stringify(res.user));
        populateForm(res.user);
        setReadonly(true);
        showMessage('Saved to your account', 'success');
      } else {
  // Require login to persist to database
  showMessage('You must be logged in to save changes to your account. Please login.', 'error');
  return;
      }
    } catch (err) {
      showMessage('Save failed. Please try again.', 'error');
    }
  });

  // Verify OTP
  document.getElementById('verifyOtp').addEventListener('click', async (e) => {
    e.preventDefault();
    const entered = document.getElementById('otpInput').value.trim();
  const expected = sessionStorage.getItem('pendingOtp');
  const target = sessionStorage.getItem('pendingTarget');
  const pendingChanges = JSON.parse(sessionStorage.getItem('pendingChanges') || '{}');
    if (!entered || !expected) {
      showMessage('Please enter the OTP.', 'error');
      return;
    }
    if (entered !== expected) {
      showMessage('Invalid OTP. Please try again.', 'error');
      return;
    }

  // OTP valid -> apply pending changes (all) to server/local
  const user = JSON.parse(localStorage.getItem('user') || 'null') || {};
  let updates = Object.assign({}, pendingChanges || {});
  // Ensure name reflects current input
  const name = document.getElementById('name').value.trim();
  if (name) updates.name = name;

    try {
      if (user._id) {
        const res = await saveToServer(user._id, updates);
        localStorage.setItem('user', JSON.stringify(res.user));
        populateForm(res.user);
        setReadonly(true);
        showMessage('Verified and saved to your account', 'success');
      } else {
  // require login to persist to DB
  showMessage('You must be logged in to verify and save changes. Please login.', 'error');
  return;
      }
    } catch (err) {
      showMessage('Server save failed after OTP verification.', 'error');
    } finally {
      clearOtp();
  // update save button now that verification completed
  updateSaveEnabled();
    }
  });

  document.getElementById('resendOtp').addEventListener('click', (e) => {
    e.preventDefault();
    const target = sessionStorage.getItem('pendingTarget');
    if (target) {
      const pendingChanges = JSON.parse(sessionStorage.getItem('pendingChanges') || '{}');
      simulateSendOtp(target, pendingChanges);
      showMessage('OTP resent (simulated).', 'info');
    } else {
      showMessage('No pending verification to resend.', 'error');
    }
  });

  // Wire up verify field buttons which trigger OTP for that specific field
  document.getElementById('verifyEmailBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.currentTarget || document.getElementById('verifyEmailBtn');
    // only trigger OTP flow when the element is explicitly clickable
    if (!btn.classList.contains('clickable')) return;
    const email = document.getElementById('email').value.trim();
    if (!email) { showMessage('Enter an email to verify.', 'error'); return; }
  const pendingChanges = { email };
  // store anchor id so the OTP popup can be positioned under the email input element
  sessionStorage.setItem('pendingAnchorId', 'email');
  simulateSendOtp(email, pendingChanges);
    updateSaveEnabled();
  });

  document.getElementById('verifyContactBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.currentTarget || document.getElementById('verifyContactBtn');
    // only trigger OTP flow when the element is explicitly clickable
    if (!btn.classList.contains('clickable')) return;
    const contact = document.getElementById('contactNumber').value.trim();
    if (!contact) { showMessage('Enter a contact number to verify.', 'error'); return; }
  const pendingChanges = { contactNumber: contact };
  // position under the contact input element
  sessionStorage.setItem('pendingAnchorId', 'contactNumber');
  simulateSendOtp(contact, pendingChanges);
    updateSaveEnabled();
  });

  // initial save state
  updateSaveEnabled();
});
