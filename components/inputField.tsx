import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'

const InputField = ({ register, errors, ...props }) => {
  return (
    <FormControl isInvalid={errors[props.id] ? true : false}>
      <Input
        id={props.id}
        type={props.type}
        {...register(props.id, {
          required: props.required && `${props.label} required`,
          pattern: props.pattern && {
            value: props.pattern.value || props.pattern,
            message:
              props.pattern.message || `Invalid ${props.label.toLowerCase()}`,
          },
        })}
      />
      <FormLabel htmlFor={props.id} variant="float">
        {props.label}
      </FormLabel>
      {errors[props.id] && (
        <FormErrorMessage>{errors[props.id].message}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default InputField
