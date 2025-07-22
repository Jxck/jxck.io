document.addEventListener("DOMContentLoaded", function () {
  // Check which page we're on
  const loginForm = document.getElementById("loginForm");
  const verifyForm = document.getElementById("verifyForm");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginForm) {
    initializeLoginPage();
  } else if (verifyForm) {
    initializeVerifyPage();
  } else if (logoutBtn) {
    initializeDashboard();
  }
});

function initializeLoginPage() {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      emailInput.focus();
      return;
    }

    // Password length check
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      passwordInput.focus();
      return;
    }

    // Simulate successful login
    console.log("Login successful", { email });

    // Store email for demo purposes
    localStorage.setItem("userEmail", email);

    // Redirect to verification page
    window.location.href = "verify.html";
  });

  // Add input event listeners for real-time feedback
  emailInput.addEventListener("input", function () {
    this.style.borderColor = this.value ? "#e1e1e1" : "";
  });

  passwordInput.addEventListener("input", function () {
    this.style.borderColor = this.value ? "#e1e1e1" : "";
  });
}

function initializeVerifyPage() {
  const verifyForm = document.getElementById("verifyForm");
  const codeInputs = document.querySelectorAll(".code-input");

  // Auto-focus first input
  codeInputs[0].focus();

  // Handle input events for code fields
  codeInputs.forEach((input, index) => {
    input.addEventListener("input", function (e) {
      const value = e.target.value;

      // Remove non-numeric characters
      e.target.value = value.replace(/[^0-9]/g, "");

      // Move to next input if current has value
      if (e.target.value && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }

      // Add filled class for styling
      if (e.target.value) {
        e.target.classList.add("filled");
      } else {
        e.target.classList.remove("filled");
      }

      // Remove error class on input
      e.target.classList.remove("error");
    });

    // Handle backspace
    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        codeInputs[index - 1].focus();
      }
    });

    // Handle paste
    input.addEventListener("paste", function (e) {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");

      if (pastedData.length === 6) {
        pastedData.split("").forEach((digit, i) => {
          if (codeInputs[i]) {
            codeInputs[i].value = digit;
            codeInputs[i].classList.add("filled");
          }
        });
        codeInputs[5].focus();
      }
    });
  });

  verifyForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect all code values
    const code = Array.from(codeInputs)
      .map((input) => input.value)
      .join("");

    // Validation
    if (code.length !== 6) {
      alert("Please enter a complete 6-digit code");

      // Add error class to empty inputs
      codeInputs.forEach((input) => {
        if (!input.value) {
          input.classList.add("error");
        }
      });

      // Focus first empty input
      const firstEmpty = Array.from(codeInputs).find((input) => !input.value);
      if (firstEmpty) {
        firstEmpty.focus();
      }

      return;
    }

    // Get stored email
    const userEmail = localStorage.getItem("userEmail") || "user@example.com";

    // Simulate successful verification
    console.log("Verification successful", { email: userEmail, code });

    // Don't clear stored data yet - dashboard needs it
    // localStorage.removeItem('userEmail');

    setTimeout(() => {
      // Redirect to dashboard without alert
      window.location.href = "main.html";
    }, 2000);
  });
}

function initializeDashboard() {
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  const userName = userEmail.split("@")[0];
  const userInitial = userName.charAt(0).toUpperCase();

  // Update user info in the UI
  document.getElementById("userEmail").textContent = userEmail;
  document.getElementById("userInitial").textContent = userInitial;
  document.getElementById("userName").textContent = userName;

  // Update login time
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  document.getElementById("loginTime").textContent = `Today at ${timeString}`;

  // Handle logout
  document.getElementById("logoutBtn").addEventListener("click", function () {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userEmail");
      window.location.href = "index.html";
    }
  });

  // Handle quick action buttons
  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const action = this.textContent.trim();
      console.log("Action clicked:", action);
      // In a real app, these would navigate to different pages
      alert(`${action} feature coming soon!`);
    });
  });
}
