import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import './Auth.Style.scss'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import userIcon from  "../../Assets/images/person.png";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


/**
 * @VALIDATION_SCHEMA
 * This code is used for the validations
 */
const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /**
     * @FETCH_REDUX_DATA
     * Below code is used to fetch data from redux
     */
    const {isAuth, users} = useSelector((state)=>{
        return{
            isAuth: state.auth?.isAuth,
            users: state.auth?.users
        }
    })

    /**
     * @TOKEN
     * User will be navigate on the dashboard page if isAuth?.token is exist
     */
    useEffect(()=>{
        if(isAuth?.token){
            navigate('/dashboard')
        }
    },[isAuth?.token])

    /**
     * @LOGIN_USER
     * Below method is used to login user
     */
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            /**
             * @HAS_USER
             * Below code is checking entered email/password is exist or not in users (local storage)
             * if User email & password is matches user will be redirect on the dashboard
             * else throw an error
             */
            const hasUser = users?.find((user)=>user.email?.toLocaleLowerCase()===values?.email?.toLocaleLowerCase() && user.password===values.password);
            if(hasUser){
               dispatch(authLogin(values))
            }else{
                toast.error('Invalid Credentials')
            }   
        },
    });

    return(
        <Box className='login-page'>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h5" mb={4} sx={{textAlign: 'center'}}>
                    Login Account
                </Typography>
                <Box className='user-icon'>
                    <img src={userIcon} alt='user'/>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Email</InputLabel>
                        <TextField
                            data-test-id="emailInput"
                            fullWidth
                            id="email"
                            name="email"
                            placeholder='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Password</InputLabel>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            type='password'
                            placeholder='Password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            color="primary" 
                            variant="contained" 
                            fullWidth 
                            type="submit"
                            className='login-btn'
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className='form-small-text'>
                            Don't have an account? 
                            <Link to='/register'>Register here</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}
export default Login;