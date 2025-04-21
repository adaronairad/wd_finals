
const dashboardData = {
    totalUsers: 1458,
    totalListings: 892,
    pendingListings: 124
};

// animate number counting
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// dashboard stats with animation
document.addEventListener('DOMContentLoaded', () => {
    const totalUsersElement = document.getElementById('totalUsers');
    const totalListingsElement = document.getElementById('totalListings');
    const pendingListingsElement = document.getElementById('pendingListings');

    animateNumber(totalUsersElement, dashboardData.totalUsers);
    animateNumber(totalListingsElement, dashboardData.totalListings);
    animateNumber(pendingListingsElement, dashboardData.pendingListings);
});


const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.closest('.nav-link').classList.add('active');
    });
});