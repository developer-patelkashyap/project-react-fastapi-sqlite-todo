import { useState } from "react";

// material ui
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// services
import { register } from "../../services/user";

// utils
import {
  atLeastMinimumLength,
  atLeastOneUppercaseLetter,
  atLeastOneSpecialChar,
} from "../../utils/password";

export default function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.validity.valid) {
      setFirstNameError(false);
    } else {
      setFirstNameError(true);
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.validity.valid) {
      setLastNameError(false);
    } else {
      setLastNameError(true);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (
      password &&
      atLeastMinimumLength(password) &&
      atLeastOneUppercaseLetter(password) &&
      atLeastOneSpecialChar(password)
    ) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullName = firstName + " " + lastName;

    const userData = {
      email,
      fullName,
      password,
    };

    console.log(userData);

    const responseStatus = await register(userData);

    // if (responseStatus === 200) {
    // } else if (responseStatus === 401) {
    // }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
                error={firstNameError}
                helperText={firstNameError ? "Letters Only" : ""}
                inputProps={{
                  pattern: "[A-Za-z]+",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
                error={lastNameError}
                helperText={lastNameError ? "Letters Only" : ""}
                inputProps={{
                  pattern: "[A-Za-z]+",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? "Please enter a valid email" : ""}
                inputProps={{
                  type: "email",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                helperText={
                  passwordError
                    ? "Password must have one uppercase letter, one special character and minimum length of 8"
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={firstName && lastName && email && password ? false : true}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
