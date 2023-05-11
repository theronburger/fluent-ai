
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import {FormFieldComponent, Validation, ButtonComponent} from '@tool-ai/ui';

/* eslint-disable-next-line */
export interface SignUpProps {}
const auth = getAuth();

export function SignUp(props: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
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
     // TODO: related to FormFieldComponent, maybe the change has to be here?
    onChange: {setEmail},
    placeholder:'Enter your email'
   }
   const PasswordInput = {
    label: 'Password',
    validations: [{
      match: 'valueMissing',
      message: 'Please enter a Password'
    } as Validation,
    {
      match: 'typeMismatch',
      message: 'Please provide a valid Password'
    }as Validation],
    type:'password',
    required: true,
    // TODO: related to FormFieldComponent, maybe the change has to be here?
    onChange: {setPassword},
    placeholder:'Enter a password'
   }

  return (
    <Form.Root
      onSubmit={signUp}>
    <FormFieldComponent {...EmailInput} value={email} />
    <FormFieldComponent {...PasswordInput} value={password} />
    <Form.Submit asChild>
    <ButtonComponent
        type='submit'
        ariaLabel='sign up button'
        buttonContent='Register'
      />
    </Form.Submit>
  </Form.Root>
  );
}

export default SignUp;
