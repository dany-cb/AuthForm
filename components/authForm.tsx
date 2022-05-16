import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Center, HStack, Heading, VStack } from '@chakra-ui/react'
import InputField from '../components/inputField'
import { FC } from 'react'

const submitHandler = (data) => {
  console.log(data)
}

const errorHandler = (error) => {
  console.log(error)
}

const signInFields = [
  {
    id: 'user',
    label: 'Username/Email',
    type: 'text',
    required: true,
  },
  {
    id: 'pwd',
    label: 'Password',
    type: 'password',
    required: true,
  },
]

const signUpFields = [
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    required: true,
    pattern: /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  // Nested array for Optional Horizontal-Stacking
  [
    {
      id: 'pwd',
      label: 'Password',
      type: 'password',
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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
]

const signUpDefaultVals = {
  username: '',
  email: '',
  pwd: '',
  confirmPwd: '',
}

const signInDefaltVals = {
  user: '',
  pwd: '',
}

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  // Pick one of the value based on mode
  const picker = (signInVal, signUpVal) => {
    return mode === 'signin' ? signInVal : signUpVal
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: picker(signInDefaltVals, signUpDefaultVals),
  })

  const fields = picker(signInFields, signUpFields)

  // Callback function for map that returns InputFields
  const fieldsFactory = (field) => {
    if (Array.isArray(field)) {
      return <HStack key={field[0].label}>{field.map(fieldsFactory)}</HStack>
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

  return (
    <Center height="100vh">
      <HStack maxW="container.xl" justifyContent="space-around">
        <VStack
          as="form"
          px="10"
          width="40%"
          alignItems="start"
          onSubmit={handleSubmit(submitHandler, errorHandler)}
        >
          <Heading as="h2" size="2xl" fontWeight={600}>
            {picker('Sign In', 'Sign Up')}
          </Heading>
          <Heading as="h3" size="md" fontWeight={600} py={3}>
            {picker("Let's get started", "Let's create your account")}
          </Heading>

          {fields.map(fieldsFactory)}
        </VStack>
        <Image
          src="https://dummyimage.com/500x500/000/fff"
          height="500px"
          width="500px"
        ></Image>
      </HStack>
    </Center>
  )
}

export default AuthForm
