// Accordion toggle
const headers = document.querySelectorAll(".accordion-header");
headers.forEach(header => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    body.style.display = body.style.display === "block" ? "none" : "block";
  });
});

// Tabs switching
const tabs = document.querySelectorAll(".tab");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");
  });
});
