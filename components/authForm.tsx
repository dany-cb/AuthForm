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
import { FC, useState } from 'react'
import fetcher from '../lib/fetcher'
import FIELDS from '../utils/authData'
import { useRouter } from 'next/router'
import { errorData } from '../types'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const router = useRouter()

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
      .then(() => router.push('/'))
      .catch((err: errorData) => console.log('Error Message:', err.title))

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
