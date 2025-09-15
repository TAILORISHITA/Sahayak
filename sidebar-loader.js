document.addEventListener('DOMContentLoaded', () => {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    fetch('sidebar.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load sidebar.html: ' + response.statusText);
        }
        return response.text();
      })
      .then(html => {
        sidebarContainer.innerHTML = html;

        // After injecting sidebar, highlight the active page
        highlightActivePage();
      })
      .catch(error => {
        console.error('Error loading sidebar:', error);
        sidebarContainer.innerHTML = '<p>Error loading sidebar.</p>';
      });
  }
});

function highlightActivePage() {
  // Extract the current page filename (e.g., onboarding from onboarding.html)
  const currentPage = window.location.pathname.split('/').pop().split('.')[0];

  // Select all menu items
  const sidebarItems = document.querySelectorAll('.menu li');

  sidebarItems.forEach(item => {
    item.classList.remove('active'); // reset

    if (item.getAttribute('data-page') === currentPage) {
      item.classList.add('active'); // highlight match
    }
  });
}
