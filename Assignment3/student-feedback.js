(function () {
  const form = document.getElementById('feedbackForm');
  const fields = {
    studentName: {
      input: document.getElementById('studentName'),
      wrapper: document.getElementById('field-name'),
      validate: (v) => v.trim().length > 0
    },
    email: {
      input: document.getElementById('email'),
      wrapper: document.getElementById('field-email'),
      validate: (v) => {
        if (v.trim().length === 0) return false;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(v.trim());
      }
    },
    course: {
      input: document.getElementById('course'),
      wrapper: document.getElementById('field-course'),
      validate: (v) => v.trim().length > 0
    },
    feedback: {
      input: document.getElementById('feedback'),
      wrapper: document.getElementById('field-feedback'),
      validate: (v) => v.trim().length > 0
    }
  };

  const sessionInfo = document.getElementById('sessionInfo');
  const successBanner = document.getElementById('successBanner');
  const storedContent = document.getElementById('storedContent');

  const LS_KEY = 'studentFeedbackData';
  const SS_KEY = 'currentSessionUser';

  // Validate a single field and toggle its error state live
  function validateField(key) {
    const f = fields[key];
    const isValid = f.validate(f.input.value);
    if (isValid) {
      f.wrapper.classList.remove('invalid');
    } else {
      f.wrapper.classList.add('invalid');
    }
    return isValid;
  }

  // Attach live validation: error disappears as soon as input becomes valid
  Object.keys(fields).forEach((key) => {
    const el = fields[key].input;
    const eventType = (el.tagName === 'SELECT') ? 'change' : 'input';
    el.addEventListener(eventType, () => validateField(key));
    el.addEventListener('blur', () => validateField(key));
  });

  function validateAll() {
    let allValid = true;
    Object.keys(fields).forEach((key) => {
      const valid = validateField(key);
      if (!valid) allValid = false;
    });
    return allValid;
  }

  function showBanner(message, type) {
    successBanner.innerHTML = `<div class="status-banner ${type}">${message}</div>`;
  }

  function clearBanner() {
    successBanner.innerHTML = '';
  }

  function renderSessionInfo() {
    const user = sessionStorage.getItem(SS_KEY);
    if (user) {
      sessionInfo.textContent = `Current Session User: ${user}`;
    } else {
      sessionInfo.textContent = '';
    }
  }

  function renderStoredData() {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      storedContent.innerHTML = '<div class="empty-msg">No feedback stored.</div>';
      return;
    }
    try {
      const data = JSON.parse(raw);
      storedContent.innerHTML = `
        <div class="stored-row"><div class="label">Student Name</div><div class="value">${escapeHtml(data.studentName)}</div></div>
        <div class="stored-row"><div class="label">Email</div><div class="value">${escapeHtml(data.email)}</div></div>
        <div class="stored-row"><div class="label">Course</div><div class="value">${escapeHtml(data.course)}</div></div>
        <div class="stored-row"><div class="label">Feedback</div><div class="value">${escapeHtml(data.feedback)}</div></div>
      `;
    } catch (e) {
      storedContent.innerHTML = '<div class="empty-msg">No feedback stored.</div>';
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearBanner();

    const allValid = validateAll();
    if (!allValid) {
      return;
    }

    const data = {
      studentName: fields.studentName.input.value.trim(),
      email: fields.email.input.value.trim(),
      course: fields.course.input.value.trim(),
      feedback: fields.feedback.input.value.trim()
    };

    // Store full details in Local Storage
    localStorage.setItem(LS_KEY, JSON.stringify(data));

    // Store only the student name in Session Storage
    sessionStorage.setItem(SS_KEY, data.studentName);

    showBanner('Feedback submitted successfully!', 'success');
    renderSessionInfo();
    renderStoredData();

    form.reset();
    Object.keys(fields).forEach((key) => fields[key].wrapper.classList.remove('invalid'));
  });

  document.getElementById('deleteBtn').addEventListener('click', function () {
    localStorage.removeItem(LS_KEY);
    sessionStorage.removeItem(SS_KEY);
    renderSessionInfo();
    renderStoredData();
    showBanner('No feedback stored.', 'success');
  });

  // Initial render on page load
  renderSessionInfo();
  renderStoredData();
})();