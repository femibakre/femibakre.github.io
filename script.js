
document.addEventListener("DOMContentLoaded", () => {
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Tab functionality for projects
    const projectTabs = document.querySelectorAll('.project-tab');
    const projectContents = document.querySelectorAll('.project-content');

    projectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all tabs and contents
            projectTabs.forEach(t => t.classList.remove('active'));
            projectContents.forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked tab and corresponding content
            const target = tab.getAttribute('data-tab');
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
});
