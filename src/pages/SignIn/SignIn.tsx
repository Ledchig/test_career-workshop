import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { toast } from 'sonner'
import LayoutForm from '../LayoutForm'
import Button from '../../shared/ui/Button'
import Input from '../../shared/ui/Input'
import { signIn } from '../../shared/store/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'

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

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    dispatch(signIn({ email: data.email, password: data.password }))
      .unwrap()
      .then(() => {
        navigate('/profile')
      })
      .catch((err) => {
        toast.warning(err.message)
      })
  }

  useEffect(() => {
    isLoggedIn && navigate('/profile')
  }, [isLoggedIn, navigate])

  return (
    <div className="flex flex-col items-center gap-6">
      <LayoutForm>
        <form
          className="flex w-64 flex-col items-center gap-9 md:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold leading-7">Авторизация</h1>
          <div className="flex w-full flex-col gap-6">
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
      <div className="flex justify-center text-sm md:text-base">
        <p>
          Ещё не зарегистрированы?{' '}
          <a className="underline hover:no-underline" href="/sign-up">
            Зарегистрироваться
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignIn
