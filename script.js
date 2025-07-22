const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const tabs = document.querySelectorAll(".tab");
    const steps = document.querySelectorAll(".step");
    const progressBar = document.querySelector(".progress-bar");
    const form = document.getElementById("regForm");

    let currentTab = 0; // Current tab is set to be the first tab (0)

    function showTab(n) {
      tabs.forEach((tab, i) => {
        tab.classList.toggle("active", i === n);
      });
      updateStepper(n);
      updateProgressBar(n);
      prevBtn.style.display = n === 0 ? "none" : "inline-block"; // Show or hide the previous button
      nextBtn.style.display = n === tabs.length - 1 ? "none" : "inline-block"; // Show or hide the next button
    }

    function updateStepper(n) {
      steps.forEach((step, i) => {
        step.classList.toggle("active", i === n);
      });
    }

    function updateProgressBar(n) {
      const widthPercent = ((n + 1) / tabs.length) * 100;
      progressBar.style.width = widthPercent + "%";
    }

    function validateForm() {
      const inputs = tabs[currentTab].querySelectorAll("input[required]");
      let valid = true;
      inputs.forEach(input => {
        if (!input.checkValidity()) {
          valid = false;
        }
        if (input.name === "confirm_password") {
          const password = form.querySelector('input[name="password"]').value;
          if (input.value !== password) {
            valid = false;
            input.setCustomValidity("Passwords must match.");
          } else {
            input.setCustomValidity("");
          }
        }
      });
      return valid;
    }

    nextBtn.addEventListener("click", () => {
      if (!validateForm()) {
        tabs[currentTab].querySelector("input[required]").reportValidity();
        return false;
      }
      currentTab++;
      if (currentTab >= tabs.length) {
        currentTab = tabs.length - 1;
      }
      showTab(currentTab);
    });

    prevBtn.addEventListener("click", () => {
      currentTab--;
      if (currentTab < 0) {
        currentTab = 0;
      }
      showTab(currentTab);
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!validateForm()) {
        tabs[currentTab].querySelector("input[required]").reportValidity();
        return false;
      }
      alert("Form submitted successfully!");
      form.reset();
      currentTab = 0;
      showTab(currentTab);
    });

    // Initialize form display
    showTab(currentTab);