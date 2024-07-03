import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import Button from '../../components/Button'
import Input from '../../components/Input'
import LayoutForm from '../LayoutForm'

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
    console.log(data)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <LayoutForm>
        <form
          className="flex flex-col items-center gap-9"
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
        <a className="underline hover:no-underline" href="/sign-up">
          Войти
        </a>
      </div>
    </div>
  )
}

export default SignUp
