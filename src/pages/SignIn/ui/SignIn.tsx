import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import Button from '../../../shared/ui/Button'
import Input from '../../../shared/ui/Input'
import LayoutForm from '../../LayoutForm'
import axios from 'axios'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[AIzaSyCvgjDwx-IkME7BzVSpEgp98H4c4vyIj1o]',
      {
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }
    )
    console.log(res)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <LayoutForm>
        <form
          className="flex flex-col items-center gap-9 w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold leading-7">Авторизация</h1>
          <div className="flex flex-col gap-6 w-full">
            <Input
              type="text"
              label="E-mail"
              placeholder="Введите ваш email"
              inputValue={watch('email')}
              error={errors.email}
              {...register('email', {
                required: 'Поле обязательно для заполнения',
                pattern: { value: /^\S+@\S+$/i, message: 'Некорректный email' },
              })}
            />
            <Input
              type="password"
              label="Пароль"
              placeholder="Введите ваш пароль"
              inputValue={watch('password')}
              error={errors.password}
              {...register('password', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 8,
                  message: 'Пароль должен содержать не менее 8 символов',
                },
              })}
            />
            <Button disabled={isSubmitting} type="submit">
              Авторизоваться
            </Button>
          </div>
        </form>
      </LayoutForm>
      <div>
        Ещё не зарегистрированы?{' '}
        <a className="underline hover:no-underline" href="/">
          Зарегистрироваться
        </a>
      </div>
    </div>
  )
}

export default SignIn
