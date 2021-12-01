import styled from 'styled-components';
import { auth, provider } from '../firebase';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import Head from 'next/head'

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const LoginHeader = styled.div``

const LoginCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`

const Button = styled.button`
    padding: 13px 20px;
    outline: none;
    font-size: 14px;
    background-color: #4385F3;
    border-radius: 2px;
    font-weight: 600;
    border: none;
    color: #fff;
    cursor: pointer;
    font-family: 'Poppins';
    transition: all .2s ease;

    &:hover {
        background-color: #434ff3;
    }
`

const IconContainer = styled.div`
    width: fit-content;
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 38%, rgba(0,212,255,1) 100%);
    border-radius: 20px;
    padding: 20px 10px;
    margin-bottom: 30px;
`

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <LoginContainer>
            <LoginHeader>            
            </LoginHeader>
            <Head>
                <title>iChat</title>
            </Head>

            <LoginCard>
                <IconContainer>
                    <ChatBubbleOutlineOutlinedIcon  style={{color: 'white', width: 200, height: 150}}/>
                </IconContainer>
                <Button onClick={signIn}>Sign in with Google</Button>
            </LoginCard>

        </LoginContainer>
    )
}

export default Login
