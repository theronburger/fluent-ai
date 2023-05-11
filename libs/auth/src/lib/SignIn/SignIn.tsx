import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import {FormFieldComponent, Validation, ButtonComponent} from '@tool-ai/ui';


/* eslint-disable-next-line */
export interface SignInProps {}
const auth = getAuth();

export function SignIn(props: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 const EmailInput = {
  label: 'Email',
  validations: [{
    match: 'valueMissing',
    message: 'Please enter your email'
  }as Validation,
  {
    match: 'typeMismatch',
    message: 'Please provide a valid email'
  }as Validation],
  type:'email',
  required: true,
  onChange: {setEmail},
  placeholder:'Enter your email'
 }
 const PasswordInput = {
  label: 'Password',
  validations: [{
    match: 'valueMissing',
    message: 'Please enter your Password'
  } as Validation,
  {
    match: 'typeMismatch',
    message: 'Please provide a valid Password'
  }as Validation],
  type:'password',
  required: true,
  onChange: {setPassword},
  placeholder:'Enter your password'
 }
  return (
  <Form.Root
    onSubmit={signIn}
    className='w-full'>
    <FormFieldComponent {...EmailInput} value={email} />
    <FormFieldComponent {...PasswordInput} value={password} />
    <Form.Submit asChild>
      <ButtonComponent
        type='submit'
        ariaLabel='sign in button'
        buttonContent='Log in'
      />
    </Form.Submit>
  </Form.Root>
  );
}

export default SignIn;
