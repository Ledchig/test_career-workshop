import { redirect, useNavigate } from 'react-router-dom'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import LayoutForm from '../LayoutForm'
import Button from '../../shared/ui/Button'
import Input from '../../shared/ui/Input'
import { changeData, logout } from '../../shared/store/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'

const Profile = () => {
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
  const { idToken } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if(data.email.length < 1 && data.password.length < 1) return toast.warning('Заполните хотя бы одно поле')
    if (!idToken) return redirect('/sign-in')
    dispatch(changeData({ idToken: idToken, email: data.email, password: data.password }))
      .unwrap()
      .then(() => {
        toast.success('Данные обновлены')
      })
      .catch((err) => {
        toast.warning(err.message)
      })
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/sign-in')
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <LayoutForm>
        <form
          className="flex w-96 flex-col items-center gap-9"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold leading-7">Изменение данных</h1>
          <div className="flex w-full flex-col gap-6">
            <Input
              type="text"
              label="E-mail"
              placeholder="Введите ваш email"
              inputValue={watch('email')}
              error={errors.email}
              {...register('email', {
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
                minLength: {
                  value: 8,
                  message: 'Пароль должен содержать не менее 8 символов',
                },
              })}
            />
            <Button disabled={isSubmitting} type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </LayoutForm>
      <div>
        <button className="underline hover:no-underline" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  )
}

export default Profile
