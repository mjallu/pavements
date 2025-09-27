// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                showLoadingState();
                
                // Simulate form submission (replace with actual submission logic)
                setTimeout(() => {
                    hideLoadingState();
                    showSuccessMessage();
                    contactForm.reset();
                }, 2000);
            }
        });
    }
    
    // Form validation
    function validateForm(data) {
        let isValid = true;
        const errors = {};
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Phone validation (optional but if provided, should be valid)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (data.phone && !phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
            errors.phone = 'Please enter a valid phone number';
            isValid = false;
        }
        
        // Service validation
        if (!data.service) {
            errors.service = 'Please select a service';
            isValid = false;
        }
        
        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
            isValid = false;
        }
        
        // Display errors
        displayFormErrors(errors);
        
        return isValid;
    }
    
    // Display form validation errors
    function displayFormErrors(errors) {
        // Clear previous errors
        const existingErrors = document.querySelectorAll('.field-error');
        existingErrors.forEach(error => error.remove());
        
        // Remove error classes
        const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        inputs.forEach(input => input.classList.remove('error'));
        
        // Add new errors
        Object.keys(errors).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const fieldGroup = field.closest('.form-group');
            
            // Add error class to field
            field.classList.add('error');
            
            // Create error message element
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = errors[fieldName];
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '5px';
            
            // Insert error message
            fieldGroup.appendChild(errorElement);
        });
    }
    
    // Show loading state during form submission
    function showLoadingState() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        // Store original text for restoration
        submitButton.setAttribute('data-original-text', originalText);
    }
    
    // Hide loading state after form submission
    function hideLoadingState() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.getAttribute('data-original-text') || 'Send Message';
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
    
    // Show success message after successful submission
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for your inquiry. We'll get back to you within 24 hours.</p>
            </div>
        `;
        
        // Style the success message
        successMessage.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const successContent = successMessage.querySelector('.success-content');
        successContent.style.cssText = `
            background-color: white;
            padding: 3rem;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            margin: 0 20px;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        const successIcon = successMessage.querySelector('.success-icon');
        successIcon.style.cssText = `
            width: 60px;
            height: 60px;
            background-color: #27ae60;
            color: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            font-weight: bold;
            margin: 0 auto 1rem;
        `;
        
        // Add to page
        document.body.appendChild(successMessage);
        
        // Animate in
        setTimeout(() => {
            successMessage.style.opacity = '1';
            successContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close on click or after delay
        successMessage.addEventListener('click', function(e) {
            if (e.target === successMessage) {
                closeSuccessMessage();
            }
        });
        
        setTimeout(closeSuccessMessage, 5000);
        
        function closeSuccessMessage() {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(successMessage)) {
                    document.body.removeChild(successMessage);
                }
            }, 300);
        }
    }
    
    // Real-time validation
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error state on input
            this.classList.remove('error');
            const errorElement = this.closest('.form-group').querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        });
    });
    
    // Validate single field
    function validateSingleField(field) {
        const fieldName = field.name;
        const fieldValue = field.value;
        let error = '';
        
        switch (fieldName) {
            case 'name':
                if (!fieldValue || fieldValue.trim().length < 2) {
                    error = 'Name must be at least 2 characters long';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!fieldValue || !emailRegex.test(fieldValue)) {
                    error = 'Please enter a valid email address';
                }
                break;
            case 'phone':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (fieldValue && !phoneRegex.test(fieldValue.replace(/[\s\-\(\)]/g, ''))) {
                    error = 'Please enter a valid phone number';
                }
                break;
            case 'service':
                if (!fieldValue) {
                    error = 'Please select a service';
                }
                break;
            case 'message':
                if (!fieldValue || fieldValue.trim().length < 10) {
                    error = 'Message must be at least 10 characters long';
                }
                break;
        }
        
        if (error) {
            displayFormErrors({ [fieldName]: error });
        }
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            
            e.target.value = value;
        });
    }
});

// Add CSS for form validation styles
const formStyle = document.createElement('style');
formStyle.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #e74c3c;
        background-color: #fdf2f2;
    }
    
    .field-error {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 5px;
    }
    
    .form-group input:focus.error,
    .form-group select:focus.error,
    .form-group textarea:focus.error {
        border-color: #e74c3c;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
    }
`;
document.head.appendChild(formStyle);