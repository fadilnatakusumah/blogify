import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { authenticate, signin } from '../../api/auth';
import { useAuthContextValue } from '../../contexts/authContext';


interface SigninPayload {
  email: string,
  password: string,
}

export function Signin() {
  const [isLoading, setLoading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState('');
  const { setAuthState } = useAuthContextValue();
  const { register, handleSubmit, watch, errors, clearErrors, formState } = useForm();
  const router = useRouter();

  useEffect(() => {
    setErrorSubmit('');
  }, [handleSubmit])

  const onSubmit = async (data: SigninPayload) => {
    setLoading(true);
    setErrorSubmit('');
    const { email, password } = data;
    signin({ email, password })
      .then(res => {
        if (res.success) {
          const { token, ...rest } = res.data;
          setAuthState!({
            token,
            user: rest,
          });
          authenticate(res, () => {
            router.push('/home');
          })
        } else {
          setErrorSubmit(res.message);
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <SigninStyled>
      <h2>Log in</h2>
      {/* TODO: add social network logins (GOOGLE, FACEBOOK) */}
      {/* <div>
          Social Network Buttons
        </div> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input placeholder="Type email here" type="email" required name="email" ref={register({ required: true })} />
          {errors?.email && <span>Required</span>}
        </div>
        <div>
          <label>Password</label>
          <input placeholder="Type password here" name="password" type="password" ref={register({ required: true })} />
          {errors?.password && <span>Required</span>}
        </div>
        {errorSubmit && <div className="error-text">{errorSubmit}</div>}
        <div>
          <button disabled={isLoading} type="submit">
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </SigninStyled>
  )
}


const SigninStyled = styled.section`
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 30px;

  >h2{
    padding: 12px 0;
    border-bottom: 1px solid #ccc;
  }

  form{
    padding: 20px 0;

    >div{
      label,span{
        display: block;
      }

      span{
        color: red;
      }

      input{
        padding: 10px 12px;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 100%;
        outline: none;

        &:active,:focus{
         border-color: var(--accent-color);
        }
      }
      margin: 14px 0;

      button {
        width: 100%;
        background-color: var(--accent-color);
        color: white;
        padding: 12px;
        font-size: 16px;
        border: none;
        cursor: pointer;

        &:hover{
          background-color: var(--light-accent-color);
        }
      }
    }

    .error-text{
      color:red;
    }
  }
`