function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Email or password entered incorrectly'

    case 'EMAIL_EXISTS':
      return 'User with this Email already exists'

    default:
      return 'Too many login attempts. try later'
  }
}

export default generateAuthError
