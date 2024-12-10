document.getElementById('password').addEventListener('input', updateStrengthMeter);
document.getElementById('toggle-password').addEventListener('click', togglePasswordVisibility);
document.getElementById('copy-password').addEventListener('click', copyPasswordToClipboard);
document.getElementById('generate-password').addEventListener('click', generateRandomPassword);

function updateStrengthMeter() {
    const password = document.getElementById('password').value;
    const result = zxcvbn(password);
    
    const strengthMeter = document.getElementById('strength-meter');
    const feedback = document.getElementById('feedback');
    
    strengthMeter.className = '';
    const strengthClasses = ['weak', 'weak', 'fair', 'good', 'strong'];
    if (password) {
        strengthMeter.className = strengthClasses[result.score];
        strengthMeter.style.width = `${(result.score + 1) * 20}%`;
    } else {
        strengthMeter.style.width = '0';
    }
    
    let feedbackText = '';
    if (result.feedback.warning) {
        feedbackText += `<p><strong>Warning:</strong> ${result.feedback.warning}</p>`;
    }
    if (result.feedback.suggestions.length) {
        feedbackText += '<p><strong>Suggestions:</strong></p><ul>';
        result.feedback.suggestions.forEach(suggestion => {
            feedbackText += `<li>${suggestion}</li>`;
        });
        feedbackText += '</ul>';
    }
    feedback.innerHTML = feedbackText;
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show';
    }
}

function copyPasswordToClipboard() {
    const passwordInput = document.getElementById('password');
    passwordInput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

function generateRandomPassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = '';
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    document.getElementById('password').value = password;
    updateStrengthMeter();
} 