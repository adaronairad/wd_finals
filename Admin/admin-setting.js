document.addEventListener('DOMContentLoaded', () => {

    // Function to show a temporary success message
    function showSuccessMessage(formElement, message) {
        // Check if a message element already exists, remove it
        const existingMessage = formElement.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.color = 'green';
        messageDiv.style.marginTop = '10px';
        messageDiv.style.fontWeight = 'bold';
        messageDiv.classList.add('success-message'); // Add class for potential removal

        // Add it after the button
        const button = formElement.querySelector('button[type="submit"]');
        if (button) {
            button.parentNode.insertBefore(messageDiv, button.nextSibling);
        } else {
            formElement.appendChild(messageDiv); // Fallback if no button found
        }


        // Optional: Remove message after a few seconds
        setTimeout(() => {
            if (messageDiv.parentNode) { // Check if it still exists
                 messageDiv.remove();
            }
        }, 4000); // Remove after 4 seconds
    }

     // Function to show an error message
     function showErrorMessage(formElement, message) {
         const existingError = formElement.querySelector('.error-message');
         if (existingError) {
             existingError.remove();
         }

         const errorDiv = document.createElement('div');
         errorDiv.textContent = message;
         errorDiv.style.color = 'red';
         errorDiv.style.marginTop = '10px';
         errorDiv.style.fontWeight = 'bold';
         errorDiv.classList.add('error-message');

         const button = formElement.querySelector('button[type="submit"]');
          if (button) {
            button.parentNode.insertBefore(errorDiv, button.nextSibling);
        } else {
            formElement.appendChild(errorDiv);
        }

         setTimeout(() => {
            if (errorDiv.parentNode) {
                 errorDiv.remove();
            }
        }, 5000);
     }

    // Clear previous success/error messages on input focus
    function clearMessages(formElement) {
         const successMsg = formElement.querySelector('.success-message');
         const errorMsg = formElement.querySelector('.error-message');
         if (successMsg) successMsg.remove();
         if (errorMsg) errorMsg.remove();
    }

    // --- Form Submission Handlers ---

    // Site Configuration Form
    const siteConfigForm = document.getElementById('site-config-form');
    if (siteConfigForm) {
        siteConfigForm.addEventListener('focusin', () => clearMessages(siteConfigForm)); // Clear message on focus
        siteConfigForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission
            const siteName = document.getElementById('site-name').value;
            const siteDescription = document.getElementById('site-description').value;

            // --- Simulate saving ---
            console.log('Saving Site Config:', { siteName, siteDescription });
            showSuccessMessage(siteConfigForm, 'Site configuration saved!');
            // --- End of simulated save ---
        });
    }

    // Features Form
    const featuresForm = document.getElementById('features-form');
    if (featuresForm) {
         featuresForm.addEventListener('focusin', () => clearMessages(featuresForm));
        featuresForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const listingApproval = document.getElementById('listing-approval').checked;
            const maintenanceMode = document.getElementById('maintenance-mode').checked;

            // --- Simulate saving ---
            console.log('Saving Feature Settings:', { listingApproval, maintenanceMode });
             showSuccessMessage(featuresForm, 'Feature settings saved!');
            // --- End of simulated save ---
        });
    }

    // Admin Profile Form (Password Update)
    const adminProfileForm = document.getElementById('admin-profile-form');
    if (adminProfileForm) {
        adminProfileForm.addEventListener('focusin', () => clearMessages(adminProfileForm));
        adminProfileForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

             // Clear previous messages first
            clearMessages(adminProfileForm);

            // Basic Validation
            if (!currentPassword) {
                showErrorMessage(adminProfileForm, 'Please enter your current password.');
                return;
            }
            // Only validate new password if it's entered
            if (newPassword) {
                if (newPassword.length < 8) {
                     showErrorMessage(adminProfileForm,'New password must be at least 8 characters long.');
                     return;
                }
                if (newPassword !== confirmPassword) {
                    showErrorMessage(adminProfileForm,'New password and confirmation password do not match.');
                    return;
                }
                 if (newPassword === currentPassword) {
                     showErrorMessage(adminProfileForm,'New password cannot be the same as the current password.');
                     return;
                }
            } else {
                // If no new password entered, maybe just show a confirmation or do nothing?
                // For now, we'll assume they must enter a new password if they hit update.
                 showErrorMessage(adminProfileForm,'Please enter a new password.');
                 return;
            }


            // --- Simulate successful save ---
            console.log('Updating Password:', { currentPassword: '***', newPassword: '***' }); // Don't log actual passwords
            showSuccessMessage(adminProfileForm, 'Password updated successfully!');

            // Clear password fields after "successful" update
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
             // --- End of simulated save ---
        });
    }

});