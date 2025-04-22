// Add navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.closest('.nav-link').classList.add('active');
    });
});

// Existing user management functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get toggle buttons
    const toggleButtons = document.querySelectorAll('.view-toggle .btn');
    const adminUsers = document.querySelector('.admin-users');
    const userUsers = document.querySelector('.user-users');
    const adminInfo = document.querySelector('.admin-info');
    const userInfo = document.querySelector('.user-info');

    // Add click event listeners to toggle buttons
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Show/hide appropriate content based on role
            if (this.dataset.role === 'admin') {
                adminUsers.style.display = '';
                userUsers.style.display = 'none';
                adminInfo.style.display = '';
                userInfo.style.display = 'none';
            } else {
                adminUsers.style.display = 'none';
                userUsers.style.display = '';
                adminInfo.style.display = 'none';
                userInfo.style.display = '';
            }
        });
    });

    // Add sorting functionality
    const table = document.querySelector('.user-table');
    const headers = table.querySelectorAll('th');
    
    headers.forEach((header, index) => {
        if (header.querySelector('.fa-sort')) {
            header.addEventListener('click', () => {
                const sortDirection = header.classList.contains('asc') ? -1 : 1;
                const sortedRows = Array.from(adminUsers.querySelectorAll('tr'))
                    .concat(Array.from(userUsers.querySelectorAll('tr')));
                
                const sortedData = sortedRows.sort((a, b) => {
                    const aCol = a.querySelectorAll('td')[index].textContent;
                    const bCol = b.querySelectorAll('td')[index].textContent;
                    return aCol > bCol ? sortDirection : -sortDirection;
                });

                headers.forEach(h => h.classList.remove('asc', 'desc'));
                header.classList.toggle('asc', sortDirection === 1);
                header.classList.toggle('desc', sortDirection === -1);

                // Update the table with sorted data
                const adminRows = sortedData.filter(row => 
                    row.querySelector('td:nth-child(5)').textContent.includes('Admin')
                );
                const userRows = sortedData.filter(row => 
                    row.querySelector('td:nth-child(5)').textContent.includes('User')
                );

                adminUsers.innerHTML = '';
                userUsers.innerHTML = '';
                adminRows.forEach(row => adminUsers.appendChild(row));
                userRows.forEach(row => userUsers.appendChild(row));
            });
        }
    });
});

// User dropdown functionality
function toggleUserDropdown() {
    const dropdownMenu = document.getElementById('userDropdownMenu');
    dropdownMenu.classList.toggle('active');
}

function openSettings() {
    // Implement settings functionality
    console.log('Opening settings...');
}

// Add click outside to close dropdown
document.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.user-dropdown');
    const dropdownMenu = document.getElementById('userDropdownMenu');
    
    if (!dropdown.contains(e.target) && dropdownMenu.classList.contains('active')) {
        dropdownMenu.classList.remove('active');
    }
});