import React, { useContext, useState } from 'react'
import { CiLock, CiMail, CiMobile1, CiUser } from 'react-icons/ci'
import InputLoginComponent, { InputPasswordComponent } from '../LoginInputs/InputLoginComponent';
import LoginButtonComponent from '../LoginInputs/LoginButtonComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MyContext } from '../contextApi/MyContext';
import { loginUsers, registerUsers } from '../../api/users';
import LargeButton, { ButtonWhite } from '../../utiles/LargeButton';

const formikSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full name is required.')
        .min(2, 'Full name must be at least 2 characters.'),
    mobileNumber: Yup.string()
        .required('Mobile Number is required.')
        .min(10, 'Mobile number must be at least 10 numbers')
        .max(10, 'Mobile number must be 10 numbers'),
    email: Yup.string()
        .required('Email is required.')
        .email('Invalid email address.'),
    password: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters long.')
        .max(30, 'Password must be less than 30 characters long.')
        .test('has-lowercase', 'Password must contain at least one lowercase letter.', value => /[a-z]/.test(value))
        .test('has-uppercase', 'Password must contain at least one uppercase letter.', value => /[A-Z]/.test(value))
        .test('has-number', 'Password must contain at least one number.', value => /\d/.test(value))
        .test('has-special-char', 'Password must contain at least one special character.', value => /[@$!%*?&]/.test(value)),
    confirmPassword: Yup.string()
        .required('Please confirm your password.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
});

const formikLoginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required.')
        .email('Invalid email address.'),
    password: Yup.string()
        .required('New password is required.')
});

const Login = () => {
    const navigate = useNavigate();
    const { setIsAdmin } = useContext(MyContext)
    // Loaders
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [ani, setAni] = useState(false);

    const createUser = async (values) => {
        setSignUpLoading(true)
        try {
            const response = await registerUsers({
                fullName: values.fullName,
                email: values.email,
                password: values.password,
                mobileNumber: values.mobileNumber
            });
            if (response?.statusCode !== 200) {
                toast.error(response.message);
                return;
            }
            toast.success(response?.message);
            formikSignup.resetForm();
            setAni(!ani);
            navigate(`/login/verify-otp/${response?.data._id}`)
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
            console.error('Error:', error.message);
        } finally {
            setSignUpLoading(false);
        }
    };

    const loginUser = async (values) => {
        setLoginLoading(true)
        try {
            const response = await loginUsers({
                email: values.email,
                password: values.password
            });
            if (response?.statusCode !== 200) {
                toast.error(response.message);
                return;
            }
            if (!response?.data?.user?.isOtpVerified) {
                toast.success(response.message);
                navigate(`/login/verify-otp/${response?.data?.user?._id}`)
                return;
            }
            Cookies.set('accessToken', response?.data?.accessToken, { expires: 1 });
            localStorage.setItem('user', JSON.stringify(response?.data?.user))
            setIsAdmin(response?.data?.user?.email === 'ankit@gmail.com');
            toast.success(response.message);
            formikLogin.resetForm();
            setShowPassword(false)
            window.location.reload();
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
            console.error('Error:', error.message);
        } finally {
            setLoginLoading(false);
        }
    };

    const formikSignup = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: formikSchema,
        onSubmit: (values) => createUser(values),
    })

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: formikLoginSchema,
        onSubmit: (values) => loginUser(values),
    })

    const token = Cookies.get('accessToken');
    if (token) {
        return <Navigate to="/" />
    }
    return (
        <div className=' z-[1] w-[80vw] h-[90vh] rounded-[10px] bg-white flex relative overflow-hidden'>
            {/* Sign Up Page */}
            <form className={`w-[65%] rounded-l-[10px] flex flex-col items-center justify-center h-full gap-[20px] absolute ${ani ? 'animate-formSecondReturn' : 'animate-formSecond'}`}
                onSubmit={formikSignup.handleSubmit}>
                <h1 className='font-logoFont text-[30px] text-black'>Create Account</h1>
                <div className='flex items-center w-full justify-center flex-col gap-[15px]'>
                    <InputLoginComponent icon={<CiUser />} placeholder={'Full Name'} name={'fullName'} value={formikSignup?.values?.fullName} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.fullName} touched={formikSignup?.touched?.fullName} />
                    <InputLoginComponent icon={<CiMail />} placeholder={'Email'} name={'email'} value={formikSignup?.values?.email} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.email} touched={formikSignup?.touched?.email} />
                    <InputLoginComponent icon={<CiMobile1 />} placeholder={'Mobile Number'} name={'mobileNumber'} value={formikSignup?.values?.mobileNumber} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.mobileNumber} touched={formikSignup?.touched?.mobileNumber} />
                    <InputPasswordComponent icon={<CiLock />} showPassword={showPassword} setShowPassword={() => setShowPassword(prev => !prev)} placeholder={'Password'} name={'password'} value={formikSignup?.values?.password} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.password} touched={formikSignup?.touched?.password} />
                    <InputPasswordComponent icon={<CiLock />} showPassword={showPassword} setShowPassword={() => setShowPassword(prev => !prev)} placeholder={'Confirm Password'} name={'confirmPassword'} value={formikSignup?.values?.confirmPassword} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.confirmPassword} touched={formikSignup?.touched?.confirmPassword} />
                </div>
                {/* <LoginButtonComponent buttonText={'Sign Up'} handler={formikSignup.handleSubmit} loader={signUpLoading} bg={'black'} /> */}
                <LargeButton text="Sign Up" onClick={formikSignup.handleSubmit} isLoading={signUpLoading} />
            </form>
            <div className={`z-[1] w-[35%] rounded-r-[10px] flex flex-col gap-[20px] items-center h-full right-[-30%] absolute justify-center ${ani ? 'animate-form' : 'animate-formReturn'}`}>
                <h1 className='font-logoFont text-[30px] text-white'>Welcome, Back!</h1>
                <p className='w-[60%] font-bodyFont text-white text-[14px] text-center'>To keep connected with us please login with your personal info</p>
                {/* <LoginButtonComponent buttonText={'Sign In'} handler={() => { setAni(!ani); setShowPassword(false); formikSignup.resetForm(); }} textColor={'black'} bg={'white'} /> */}
                <ButtonWhite text="Sign In" className='border-none' onClick={() => { setAni(!ani); setShowPassword(false); formikSignup.resetForm(); }} />
            </div>
            {/*Sign in Page */}
            <form className={`w-[65%] rounded-l-[10px] flex flex-col items-center justify-center h-full left-[-50%] gap-[20px] absolute ${ani ? 'animate-formReturn' : 'animate-form'}`}
                onSubmit={formikLogin.handleSubmit}>
                <h1 className='font-logoFont text-[30px] text-black'>Sign in to Shopper'sAdda</h1>
                <div className='flex items-center w-full justify-center flex-col gap-[10px]'>
                    <InputLoginComponent icon={<CiMail />} placeholder={'Email'} name={'email'} value={formikLogin?.values?.email} changeHandler={formikLogin.handleChange} errors={formikLogin?.errors?.email} touched={formikLogin?.touched?.email} />
                    <InputPasswordComponent icon={<CiLock />} showPassword={showPassword} setShowPassword={() => setShowPassword(prev => !prev)} placeholder={'Password'} name={'password'} value={formikLogin?.values?.password} changeHandler={formikLogin.handleChange} errors={formikLogin?.errors?.password} touched={formikLogin?.touched?.password} />
                </div>
                <Link to={'forgot-password'} className='font-bodyFont text-[12px] border-b'>Forgot your Password?</Link>
                {/* <LoginButtonComponent buttonText={'Sign In'} handler={formikLogin.handleSubmit} loader={loginLoading} bg={'black'} /> */}
                <LargeButton text="Sign In" onClick={formikLogin.handleSubmit} isLoading={loginLoading} />
            </form>
            <div className={`z-[1] w-[35%] rounded-r-[10px] flex flex-col gap-[20px] items-center h-full right-0 absolute justify-center ${ani ? 'animate-formSecond' : 'animate-formSecondReturn'}`}>
                <h1 className='font-logoFont text-[30px] text-white'>Hellow, Friend!</h1>
                <p className='w-1/2 font-bodyFont text-white text-[14px] text-center'>Enter ypur personal details and start journy with us</p>
                {/* <LoginButtonComponent buttonText={'Sign Up'} handler={() => { setAni(!ani); setShowPassword(false); formikLogin.resetForm(); }} textColor={'black'} bg={'white'} /> */}
                <ButtonWhite text="Sign Up" className='border-none' onClick={() => { setAni(!ani); setShowPassword(false); formikLogin.resetForm(); }} />
            </div>
            <div className={`absolute w-1/2 h-full bg-black ${ani ? 'animate-blueSlider' : 'right-[-15%] animate-returnBlueSlider'} `}></div>
        </div>
    )
}

export default Login