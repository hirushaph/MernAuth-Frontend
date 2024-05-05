import isStrongPassword from 'validator/es/lib/isStrongPassword';

export function validateUsername(username) {
  if (!username.trim()) {
    return 'Username is Required';
  } else if (username.length < 6) {
    return 'Username should be at least 7 characters';
  }
}

export function validateEmail(email) {
  if (!email.trim()) {
    return 'Email is Required';
  } else if (validateEmailAddress(email) == null) {
    return 'Email address is not valid';
  }
}

export function validatePassword(password, confirmPassword, type) {
  if (type === 'password') {
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!isStrongPassword(password)) return 'Please enter strong password';
  } else if (type === 'confirmPassword') {
    if (password !== confirmPassword) return 'Password does not match';
  }
}

// email address validation check
function validateEmailAddress(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
