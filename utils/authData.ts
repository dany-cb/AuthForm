const REGEX = {
  username: /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
}

const FIELDS = {
  signin: [
    {
      id: 'user',
      label: 'Username/Email',
      type: 'text',
      required: true,
      pattern: {
        value: new RegExp(`(${REGEX.username.source})|(${REGEX.email.source})`),
        message: 'Invalid',
      },
    },
    {
      id: 'pwd',
      label: 'Password',
      type: 'password',
      required: true,
    },
  ],
  signup: [
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      pattern: REGEX.username,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      pattern: REGEX.email,
    },
    // Nested array for Horizontal-Stacking
    [
      {
        id: 'pwd',
        label: 'Password',
        type: 'password',
        pattern: {
          value: REGEX.password,
          message:
            'Minimum eight characters, at least one letter, one number and one special character',
        },
        required: true,
      },
      {
        id: 'confirmPwd',
        label: 'Confirm',
        type: 'password',
        required: false,
      },
    ],
  ],
}

export default FIELDS
