// campusinformation.js
document.addEventListener('DOMContentLoaded', () => {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const tabContents = Array.from(document.querySelectorAll(".tab-content"));
  const tabsContainer = document.querySelector(".tabs");

  // if no tabs found, nothing to do
  if (!tabsContainer || tabs.length === 0) {
    // still wire up map button if present
    const mapBtnFallback = document.getElementById("mapBtn");
    if (mapBtnFallback) {
      mapBtnFallback.addEventListener("click", () => {
        alert("Interactive campus map feature coming soon!");
      });
    }
    return;
  }

  // Create underline element
  const indicator = document.createElement("div");
  indicator.className = "tab-indicator";
  tabsContainer.appendChild(indicator);

  function positionIndicator(tab) {
    // Position relative to tabs container
    const left = tab.offsetLeft;
    const width = tab.offsetWidth;
    indicator.style.width = `${width}px`;
    indicator.style.left = `${left}px`;
  }

  function setActiveTab(tab) {
    // switch active class on tabs
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // switch content
    tabContents.forEach(c => c.classList.remove("active"));
    const targetId = tab.dataset.tab;
    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) target.classList.add("active");
    }

    // move indicator
    positionIndicator(tab);
  }

  // Add event listeners
  tabs.forEach(tab => {
    tab.addEventListener("click", () => setActiveTab(tab));
  });

  // Initialize indicator on the first active tab or first tab
  const initialTab = tabs.find(t => t.classList.contains("active")) || tabs[0];
  // ensure layout done before positioning
  window.requestAnimationFrame(() => {
    setActiveTab(initialTab);
  });

  // Adjust on resize (debounced)
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const activeTab = document.querySelector(".tab.active") || tabs[0];
      if (activeTab) positionIndicator(activeTab);
    }, 60);
  });

  // Map button alert (safe guard)
  const mapBtn = document.getElementById("mapBtn");
  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      alert("Interactive campus map feature coming soon!");
    });
  }

  // Optional: auto-set sidebar active menu item based on pathname
  // (this is non-destructive — it only sets/clears .active class on sidebar menu items)
  try {
    const sidebarItems = document.querySelectorAll('.sidebar .menu li');
    const path = location.pathname.split('/').pop() || 'index.html';
    sidebarItems.forEach(li => {
      const onclick = li.getAttribute('onclick') || '';
      const m = onclick.match(/location\.href\s*=\s*['"]([^'"]+)['"]/);
      if (m && m[1] === path) {
        sidebarItems.forEach(i => i.classList.remove('active'));
        li.classList.add('active');
      }
    });
  } catch (e) {
    // fail silently
  }
});
