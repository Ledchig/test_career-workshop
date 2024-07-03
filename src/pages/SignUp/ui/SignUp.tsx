import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import Button from '../../../shared/ui/Button'
import Input from '../../../shared/ui/Input'
import LayoutForm from '../../LayoutForm'
import axios from 'axios'

const SignUp = () => {
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
          <h1 className="text-2xl font-bold leading-7">Регистрация</h1>
          <div className="flex flex-col gap-6">
            <Input
              type="text"
              label="E-mail"
              placeholder="Введите ваш email"
              inputValue={watch('email')}
              error={errors.email}
              {...register('email')}
            />
            <Input
              type="password"
              label="Пароль"
              placeholder="Придумайте пароль"
              inputValue={watch('password')}
              error={errors.password}
              {...register('password')}
            />
            <Input
              type="password"
              label="Повторите пароль"
              placeholder="Повторите пароль"
              inputValue={watch('repeatPassword')}
              error={errors.repeatPassword}
              {...register('repeatPassword')}
            />
            <Button disabled={isSubmitting} type="submit">
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </LayoutForm>
      <div>
        Уже зарегистрированы?{' '}
        <a className="underline hover:no-underline" href="/sign-in">
          Войти
        </a>
      </div>
    </div>
  )
}

export default SignUp
