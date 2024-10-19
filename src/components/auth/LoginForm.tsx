import { useState, type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';

import { Eye, EyeOff } from '@/icons/index';

interface Props {
    children: React.ReactNode
}

type Inputs = {
    email: string,
    password: string
    remember: boolean
}

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop();
        if (cookieValue) {
            return decodeURIComponent(cookieValue.split(';').shift() ?? '');
        }
    }
};

export const LoginForm: FC<Props> = ({ children }) => {

    const email = getCookie('email') ?? '';
    const rememberMe = !!email;

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: { email, remember: rememberMe }
    });

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {

        try {

            // await actions.login.orThrow(formData);
            // window.location.href = '/admin/register';
        } catch (error) {

            const errorMsg = error as Error


            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMsg.message,
            })
        } finally {
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                <input
                    type="email"
                    className="text-input"
                    placeholder="example@example.com"
                    {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                />
                {errors.email && errors.email.type === "required" && <span className="text-red-500">Este campo es requerido</span>}
                {errors.email && errors.email.type === "pattern" && <span className="text-red-500">Ingrese un correo válido</span>}
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="text-input"
                        {...register('password', { required: true, minLength: 6 })}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className='size-6' /> : <Eye className='size-6' />}
                    </button>
                </div>
                {errors.password && errors.password.type === "required" && <span className="text-red-500">Este campo es requerido</span>}
                {errors.password && errors.password.type === "minLength" && <span className="text-red-500">La contraseña debe tener al menos 6 caracteres</span>}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            aria-describedby="remember"
                            type="checkbox"
                            {...register('remember')}
                            className="w-4 h-4 border text-green-color border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-color dark:border-gray-600 dark:focus:ring-green-color"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500">Remember me</label>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="flex justify-center items-center w-full h-10 text-white bg-green-800 font-semibold rounded-lg text-balance px-5 py-2.5 text-center">
               Iniciar sesión

            </button>
        </form>


    )
}