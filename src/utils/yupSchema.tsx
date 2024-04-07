import * as Yup from "yup";

export const SignUpCredentialsValidationSchema = Yup.object({
    first_name: Yup.string().required('Name must be provided'),
    email: Yup.string().email('Invalid email address').required('Email must be provided'),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters"),
    mobile_no: Yup.string()
        .required("Phone Number is required")
        .matches(/^\d{10}$/, "Phone Number must contain exactly 10 digits")
        .min(10, "Phone Number must contain exactly 10 digits")
        .max(10, "Phone Number must contain exactly 10 digits"),
})


export const LoginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email must be provided'),
    password: Yup.string().required('Password must be provided'),
})