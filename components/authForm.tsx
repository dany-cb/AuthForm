import { useForm } from 'react-hook-form'
import {
  Center,
  HStack,
  Heading,
  VStack,
  Button,
  Image,
  Stack,
} from '@chakra-ui/react'
import InputField from '../components/inputField'
import { FC, useEffect, useState } from 'react'
import fetcher from '../lib/fetcher'

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

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  /**
   * Returns value based on the current mode value
   * @returns signInVal | signUpVal
   */
  const picker = (signInVal, signUpVal) => {
    return mode === 'signin' ? signInVal : signUpVal
  }
  // Callback function when mapping over fields
  const fieldsFactory = (field) => {
    if (Array.isArray(field)) {
      return (
        <Stack direction={{ base: 'column', lg: 'row' }} key={field[0].label}>
          {field.map(fieldsFactory)}
        </Stack>
      )
    }
    return (
      <InputField
        register={register}
        errors={errors}
        key={field.id}
        {...field}
      />
    )
  }
  const submitHandler = (data) => {
    setSubmit(true)
    fetcher(picker('/signin', '/signup'), data)
    setTimeout(() => setSubmit(false), 5000)
  }

  const fields = picker(FIELDS.signin, FIELDS.signup)
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })
  const [isSubmitting, setSubmit] = useState(false)
  const confirmPwdValue = watch(['confirmPwd', 'pwd'])

  if (confirmPwdValue[0] && confirmPwdValue[0] !== confirmPwdValue[1]) {
    setError(
      'confirmPwd',
      { type: 'custom', message: "Passwords don't match" },
      { shouldFocus: false },
    )
    console.log('error set')
  }

  return (
    <Center height="100vh">
      <HStack maxW="container.xl" justifyContent="space-around">
        <VStack
          as="form"
          px="10"
          width={{ lg: '40%', md: 'fit-content' }}
          alignItems="start"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Heading as="h2" size="2xl" fontWeight={600}>
            {picker('Sign In', 'Sign Up')}
          </Heading>
          <Heading as="h3" size="md" fontWeight={600} py={3}>
            {picker("Let's get started", "Let's create your account")}
          </Heading>

          {fields.map(fieldsFactory)}
          <Button
            type="submit"
            alignSelf="flex-end"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Just a moment"
          >
            Log In
          </Button>
        </VStack>
        <Image
          src="https://dummyimage.com/500x500/000/fff"
          height="500px"
          width="500px"
          display={{ base: 'none', md: 'block' }}
        ></Image>
      </HStack>
    </Center>
  )
}

export default AuthForm
