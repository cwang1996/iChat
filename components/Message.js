import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import moment from 'moment';

const MessageContainer = styled.div`
`

const MessageElement = styled.p`
    width: fit-content;
    max-width: 600px;
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    min-width: 60px;
    padding-bottom: 26px;
    position: relative;
    font-family: 'Poppins';
    /* text-align: right; */

    @media screen and (max-width: 1300px) {
        max-width: 450px;
    }

    @media screen and (max-width: 650px) {
        max-width: 300px;
    }

    @media screen and (max-width: 450px) {
        max-width: 250px;
    }
`

const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #dcf8c6;
    font-size: 14px;
    @media screen and (max-width: 1050px) {
        font-size: 13px;
    }

    @media screen and (max-width: 450px) {
        font-size: 12px;
    }
`

const Receiver = styled(MessageElement)`
    font-size: 15px;
    text-align: left;
    background-color: whitesmoke;
    @media screen and (max-width: 1050px) {
        font-size: 14px;
    }

    @media screen and (max-width: 450px) {
        font-size: 12px;
    }
`

const Timestamp = styled.span`
    color: gray;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
`

function Message({ user, message }) {

    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

    return (
        <MessageContainer>
            <TypeOfMessage>
                {message.message}
                <Timestamp>
                    {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
                </Timestamp>
            </TypeOfMessage>
        </MessageContainer>
    )
}

export default Message
