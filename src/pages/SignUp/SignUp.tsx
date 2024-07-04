import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import Button from '../../shared/ui/Button'
import Input from '../../shared/ui/Input'
import LayoutForm from '../LayoutForm'
import { signUp } from '../../shared/store/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'

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
    console.log({ email: data.email, password: data.password })
    dispatch(signUp({ email: data.email, password: data.password }))
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
          className="flex w-96 flex-col items-center gap-9"
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
