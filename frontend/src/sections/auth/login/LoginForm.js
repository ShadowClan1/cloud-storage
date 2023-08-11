import { useState } from "react";
import * as Yup from "yup";
// @mui
// import {
//   Stack,
//   IconButton,
//   InputAdornment,
//   TextField,
//   Checkbox,
// } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
// import { LoadingButton } from "@mui/lab";
// components
// import Iconify from "../../../components/iconify";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { logIn } from "../../../api/api";

// import { logIn } from "src/api/api";

// ----------------------------------------------------------------------

export default function LoginForm({ setloading }) {
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const [error, seterror] = useState("");

  const { handleSubmit, register, formState, setError } = useForm(formOptions);
  const { errors } = formState;
 const navigate = useNavigate()
  const onSubmitForm = async (data) => {
    setloading(true);
    const user = await logIn(data, setError, seterror, setloading);
    if (user) {
        console.log(user)
      localStorage.setItem(
        "USER",
        JSON.stringify({
          token: user?.data?.token,
          id: user?.data?.id,
        })
      );
    //   window.location.reload();
navigate("/");
    }
  };

  return (
    <>
 <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email address"
            {...register("email", { onChange: () => seterror("") })}
            error={errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            name="password"
            label="Password"
            {...register("password", { onChange: () => seterror("") })}
            error={errors.password}
            helperText={errors.password?.message}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  > 
                    {/* <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    /> */}
                   </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
          )}
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <div className="">
            <Checkbox name="remember" label="Remember me" />
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Remember Me
            </span>
          </div>
          <Link
            to="/forget-password"
            variant="subtitle2"
            underline="hover"
            style={{ color: "#000", fontWeight: "bold" }}
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          className="loginBtn"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          LOGIN
        </LoadingButton> 
        
      </Box> 
    </>
  );
}
