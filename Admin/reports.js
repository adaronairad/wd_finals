document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('resolve-btn') && !this.disabled) {
            const card = this.closest('.report-card');
            const status = card.querySelector('.report-status');
            status.classList.remove('status-pending');
            status.classList.add('status-resolved');
            status.textContent = 'Resolved';
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-check"></i> Resolved';
        }
    });
});