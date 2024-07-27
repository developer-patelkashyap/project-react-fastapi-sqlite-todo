import React from 'react'
import RegistrationForm from '../../forms/register'
import Copyright from '../../components/copyright'

export default function SignUpPage() {
  return (
    <>
      <RegistrationForm></RegistrationForm>
      <Copyright sx={{ mt: 8, mb: 4 }}></Copyright>
    </>
  )
}
