document.addEventListener('DOMContentLoaded', () => {
  const notificationBell = document.getElementById('notification-bell');
  const notificationPanel = document.getElementById('notification-panel');
  const unreadCountElem = document.getElementById('unread-count');

  // Toggle notification panel
  notificationBell.addEventListener('click', (e) => {
    e.stopPropagation(); 
    notificationPanel.classList.toggle('show'); // use .show instead of .hidden
    unreadCountElem.classList.add('hidden'); 
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!notificationPanel.contains(e.target) && !notificationBell.contains(e.target)) {
      notificationPanel.classList.remove('show');
    }
  });

  // Sidebar active class
  document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
      const currentActive = document.querySelector('.menu li.active');
      if (currentActive) currentActive.classList.remove('active');
      item.classList.add('active');
    });
  });
});
