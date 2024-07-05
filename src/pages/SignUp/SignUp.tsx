import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import Button from '../../shared/ui/Button'
import Input from '../../shared/ui/Input'
import LayoutForm from '../LayoutForm'
import { signUp } from '../../shared/store/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { regExpForEmail } from '../../shared/constants'

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

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    dispatch(signUp({ email: data.email, password: data.password }))
      .unwrap()
      .then(() => {
        toast.success('Аккаунт создан! Перенаправляем на страницу авторизации')
        setTimeout(() => navigate('/sign-in'), 5000)
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
          className="flex w-60 flex-col items-center gap-9 md:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold leading-7">Регистрация</h1>
          <div className="flex w-full flex-col gap-6">
            <Input
              type="text"
              label="E-mail"
              placeholder="Введите ваш email"
              inputValue={watch('email')}
              error={errors.email}
              {...register('email', {
                required: 'Поле обязательно для заполнения',
                pattern: {
                  value: regExpForEmail,
                  message: 'Некорректный email',
                },
              })}
            />
            <Input
              type="password"
              label="Пароль"
              placeholder="Придумайте пароль"
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
            <Input
              type="password"
              label="Повторите пароль"
              placeholder="Повторите пароль"
              inputValue={watch('repeatPassword')}
              error={errors.repeatPassword}
              {...register('repeatPassword', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 8,
                  message: 'Пароль должен содержать не менее 8 символов',
                },
                validate: (value) =>
                  value === watch('password') || 'Пароли не совпадают',
              })}
            />
            <Button disabled={isSubmitting} type="submit">
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </LayoutForm>
      <div className="flex justify-center text-sm md:text-base">
        <p>
          Уже зарегистрированы?{' '}
          <a className="underline hover:no-underline" href="/sign-in">
            Войти
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUp
