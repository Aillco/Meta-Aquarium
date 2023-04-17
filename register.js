const form = document.getElementById('registration-form');
const usernameInput = document.getElementById('username');
const usernameError = document.getElementById('username-error');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');
const confirmPasswordInput = document.getElementById('confirm-password');
const confirmPasswordError = document.getElementById('confirm-password-error');
const showPasswordIcon = document.querySelector('.show-password i');

// 随机生成背景图片
const backgroundImages = [
  'https://picsum.photos/1920/1080?random=1',
  'https://picsum.photos/1920/1080?random=2',
  'https://picsum.photos/1920/1080?random=3',
  'https://picsum.photos/1920/1080?random=4',
  'https://picsum.photos/1920/1080?random=5'
];
const backgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
document.querySelector('.background').style.backgroundImage = `url(${backgroundImage})`;

// 验证密码是否符合要求
function validatePassword() {
  const password = passwordInput.value;
  if (password.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters long.';
  } else if (/^\d+$/.test(password)) {
    passwordError.textContent = 'Password cannot be all digits.';
  } else {
    passwordError.textContent = '';
  }
}

// 验证确认密码是否与密码相同
function validateConfirmPassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  if (password !== confirmPassword) {
    confirmPasswordError.textContent = 'Passwords do not match.';
  } else {
    confirmPasswordError.textContent = '';
  }
}

// 验证用户名是否重复
function checkUsername() {
  const username = usernameInput.value;
  fetch('check-username.php?username=' + encodeURIComponent(username))
    .then(response => response.text())
    .then(result => {
      if (result === 'duplicate') {
        usernameError.textContent = 'Username is already taken.';
      } else {
        usernameError.textContent = '';
      }
    });
}

// 添加表单提交事件监听器
form.addEventListener('submit', event => {
  event.preventDefault();
  validatePassword();
  validateConfirmPassword();
  if (passwordError.textContent || confirmPasswordError.textContent) {
    alert('Passwords do not match.');
  } else {
    checkUsername();
    if (!usernameError.textContent) {
      const data = new FormData(form);
      fetch('save-user.php', {
        method: 'POST',
        body: data
      })
      .then(response => response.text())
      .then(result => {
        alert(result);
        form.reset();
      })
      .catch(error => console.error(error));
    }
  }
});

// 添加密码可见性切换事件监听器
showPasswordIcon.addEventListener('click', event => {
  const password = passwordInput.value;
  if (showPasswordIcon.classList.contains('fa-eye')) {
    passwordInput.type = 'text';
    showPasswordIcon.classList.remove('fa-eye');
    showPasswordIcon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    showPasswordIcon.classList.remove('fa-eye-slash');
    showPasswordIcon.classList.add('fa-eye');
  }
});
