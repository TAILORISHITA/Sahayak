document.addEventListener("DOMContentLoaded", () => {
    fetch('sidebar.html')
        .then(response => {
            if (!response.ok) throw new Error('Sidebar not found');
            return response.text();
        })
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading sidebar:', error));
});
