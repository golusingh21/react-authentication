import React from 'react';
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
import { authRegisterUser } from '../../Redux/Slices/AuthSlice';
import { useSelector } from 'react-redux';
import userIcon from  "../../Assets/images/person.png";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * @VALIDATION_SCHEMA
 * This code is used for the validations
 */
const validationSchema = yup.object({
    name: yup
    .string('Enter your name')
    .required('Name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
});

const Register = () => {
    const dispatch = useDispatch()

    /**
     * @FETCH_REDUX_DATA
     * Below code is used to fetch data from redux
     */
    const {users} = useSelector((state)=>{
        return{
            users: state.auth?.users
        }
    })

    /**
     * @REGISTER_USER
     * Below method is used to register user
     */
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
             /**
             * @HAS_USER
             * Below code is checking entered email is exist or not in the users (local storage)
             * if User email is mathces with old users then trhow an error
             * else user will be registred and store on local storage
             */
            const hasUser = users?.find((user)=>user.email?.toLocaleLowerCase()===values?.email?.toLocaleLowerCase());
            if(hasUser){
                return toast.error(`User already exist with ${values.email} email`)
            }
            dispatch(authRegisterUser({name: values.name, email: values.email, password: values.password}))
            formik.resetForm()
            toast.success('User registered successfully.')
        },
    });

    return(
        <Box className='login-page'>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h5" mb={4} sx={{textAlign: 'center'}}>
                    Register User
                </Typography>
                <Box className='user-icon'>
                    <img src={userIcon} alt='user'/>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Name</InputLabel>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            placeholder='Name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Email</InputLabel>
                        <TextField
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
                            Register
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className='form-small-text'>
                            Already have an account? 
                            <Link to='/'>Login</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}
export default Register;