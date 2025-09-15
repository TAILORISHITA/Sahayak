document.addEventListener('DOMContentLoaded', () => {
  const upcomingTab = document.getElementById('upcoming-tab');
  const registeredTab = document.getElementById('registered-tab');
  const pastTab = document.getElementById('past-tab');

  const upcomingContent = document.getElementById('upcoming-events-content');
  const registeredContent = document.getElementById('registered-events-content');
  const pastContent = document.getElementById('past-events-content');

  const tabs = [upcomingTab, registeredTab, pastTab];
  const contents = [upcomingContent, registeredContent, pastContent];
  const indicator = document.querySelector('.tab-indicator');

  function setActiveTab(activeTab) {
    // Reset
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.add('hidden'));

    // Activate
    activeTab.classList.add('active');
    if (activeTab === upcomingTab) {
      upcomingContent.classList.remove('hidden');
    } else if (activeTab === registeredTab) {
      registeredContent.classList.remove('hidden');
    } else if (activeTab === pastTab) {
      pastContent.classList.remove('hidden');
    }

    // Move underline
    if (indicator) {
      const rect = activeTab.getBoundingClientRect();
      const containerRect = activeTab.parentElement.getBoundingClientRect();
      indicator.style.width = `${rect.width}px`;
      indicator.style.left = `${rect.left - containerRect.left}px`;
    }
  }

  // Add listeners
  tabs.forEach(tab => tab.addEventListener('click', () => setActiveTab(tab)));

  // Default active = Upcoming
  setActiveTab(upcomingTab);

  // Fix on window resize
  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) setActiveTab(activeTab);
  });
});
