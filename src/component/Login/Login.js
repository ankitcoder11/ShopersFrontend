import React, { useState } from 'react'
import { CiLock, CiMail, CiUser } from 'react-icons/ci'
import InputLoginComponent from '../CommonUtiles/InputLoginComponent';
import LoginButtonComponent from '../CommonUtiles/LoginButtonComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const formikSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full name is required.')
        .min(2, 'Full name must be at least 2 characters.'),
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
    const [ani, setAni] = useState(false);
    const formikSignup = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: formikSchema,
        onSubmit: (values) => console.log(values),
    })
    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: formikLoginSchema,
        onSubmit: (values) => console.log(values),
    })
    const buttonHandler = () => {
        setAni(!ani);
    }
    return (
        <div className='h-[100vh] relative overflow-hidden bg-gray-100 flex items-center justify-center'>
            <div className='h-[400px] w-[400px] rounded-full absolute bottom-[-100px] left-[-100px] bg-yellow-300'></div>
            <div className='w-0 h-0 border-red-500 border-l-[250px] border-l-transparent border-r-[250px] border-b-[250px] absolute right-[-20px] top-[-20px] rotate-[-5deg]'></div>
            <div className=' z-[1] w-[80vw] h-[90vh] rounded-[10px] bg-white flex relative overflow-hidden'>
                {/* //////////////////////////////Sign Up Page///////////////////// */}
                <form className={`w-[65%] rounded-l-[10px] flex flex-col items-center justify-center h-full gap-[20px] absolute ${ani ? 'animate-formSecondReturn' : 'animate-formSecond'}`}>
                    <h1 className='font-logoFont text-[30px] text-sky-400'>Create Account</h1>
                    <div className='flex items-center w-full justify-center flex-col gap-[10px]'>
                        <InputLoginComponent icon={<CiUser />} placeholder={'Full Name'} name={'fullName'} value={formikSignup?.values?.fullName} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.fullName} touched={formikSignup?.touched?.fullName} />
                        <InputLoginComponent icon={<CiMail />} placeholder={'Email'} name={'email'} value={formikSignup?.values?.email} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.email} touched={formikSignup?.touched?.email} />
                        <InputLoginComponent icon={<CiLock />} placeholder={'Password'} name={'password'} value={formikSignup?.values?.password} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.password} touched={formikSignup?.touched?.password}/>
                        <InputLoginComponent icon={<CiLock />} placeholder={'Confirm Password'} name={'confirmPassword'} value={formikSignup?.values?.confirmPassword} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.confirmPassword} touched={formikSignup?.touched?.confirmPassword}/>
                    </div>
                    <p className='font-bodyFont text-[12px] border-b'>Forgot your Password?</p>
                    <LoginButtonComponent buttonText={'Sign Up'} handler={formikSignup.handleSubmit} />
                </form>
                <div className={`z-[1] w-[35%] rounded-r-[10px] flex flex-col gap-[20px] items-center h-full right-[-30%] absolute justify-center ${ani ? 'animate-form' : 'animate-formReturn'}`}>
                    <h1 className='font-logoFont text-[30px] text-black'>Welcome, Back!</h1>
                    <p className='w-[60%] font-bodyFont text-black text-[14px] text-center'>To keep connected with us please login with your personal info</p>
                    {/* <button className='uppercase text-[14px] font-bodyFont font-medium text-black border p-[10px] w-[150px] rounded-full' onClick={(e) => { e.preventDefault(); setAni(false); }}>Sign In</button> */}
                    <LoginButtonComponent buttonText={'Sign In'} handler={buttonHandler} textColor={'black'} />
                </div>
                {/*///////////////////////////// Sign in Page//////////////////// */}
                <form className={`w-[65%] rounded-l-[10px] flex flex-col items-center justify-center h-full left-[-50%] gap-[20px] absolute ${ani ? 'animate-formReturn' : 'animate-form'}`}>
                    <h1 className='font-logoFont text-[30px] text-sky-400'>Sign in to Shopper'sAdda</h1>
                    <div className='flex items-center w-full justify-center flex-col gap-[10px]'>
                        <InputLoginComponent icon={<CiMail />} placeholder={'Email'} name={'email'} value={formikLogin?.values?.email} changeHandler={formikLogin.handleChange} errors={formikLogin?.errors?.email} touched={formikLogin?.touched?.email} />
                        <InputLoginComponent icon={<CiLock />} placeholder={'Password'} name={'password'} value={formikLogin?.values?.password} changeHandler={formikLogin.handleChange} errors={formikLogin?.errors?.password} touched={formikLogin?.touched?.password} />
                    </div>
                    <p className='font-bodyFont text-[12px] border-b'>Forgot your Password?</p>
                    <LoginButtonComponent buttonText={'Sign In'} handler={formikLogin.handleSubmit} />
                </form>
                <div className={`z-[1] w-[35%] rounded-r-[10px] flex flex-col gap-[20px] items-center h-full right-0 absolute justify-center ${ani ? 'animate-formSecond' : 'animate-formSecondReturn'}`}>
                    <h1 className='font-logoFont text-[30px] text-black'>Hellow, Friend!</h1>
                    <p className='w-1/2 font-bodyFont text-black text-[14px] text-center'>Enter ypur personal details and start journy with us</p>
                    <LoginButtonComponent buttonText={'Sign Up'} handler={buttonHandler} textColor={'black'} />
                    {/* <button className='uppercase text-[14px] font-bodyFont font-medium text-black border p-[10px] w-[150px] rounded-full' onClick={() => { ; }}>Sign Up</button> */}
                </div>
                <div className={`absolute w-1/2 h-full bg-sky-400 ${ani ? 'animate-blueSlider' : 'right-[-15%] animate-returnBlueSlider'} `}></div>
            </div>
        </div>
    )
}

export default Login