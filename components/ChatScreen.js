import styled from 'styled-components';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { Avatar, IconButton } from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
// import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
// import MicIcon from '@material-ui/icons/Mic';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import DehazeOutlinedIcon from '@material-ui/icons/DehazeOutlined';
import firebase from 'firebase';
import { useState, useRef } from 'react';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

const ChatScreenContainer = styled.div``

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 999;
    top: 0;
    display: flex;
    padding: 12px 20px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
    font-family: 'Poppins';
    
    @media screen and (max-width: 450px) {
        font-size: 12px;
    }
`

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    > h3 {
        margin-bottom: 2px;
    }

    > p {
        font-size: 12px;
        color: gray;
        margin-top: 2px;
    }
`

const EndMessage = styled.div`
    margin-bottom: 50px;
`

const MessageContainer = styled.div`
    padding: 10px 5px;
    padding-top: 20px;
    background-color: #e5ded8;
    min-height: 90vh;
`

const HeaderIcons = styled.div``

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    padding-left: 5px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 999;
`

const Input = styled.input`
    flex: 1;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 20px 20px;
    position: sticky;
    bottom: 0;
    background-color: whitesmoke;
    z-index: 999;
    margin: 0px 5px;
    font-family: 'Poppins';
`

const IconHover = styled.div`
    &:hover {
        transform: scale(1.1);
    }
`

const Toggle = styled.div`
    display: none;

    @media screen and (max-width: 1050px) {
        display: flex;
        cursor: pointer;
    }
`

function ChatScreen({ chat, messages }) {

    const [isToggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!isToggle);
    }

    const [user] = useAuthState(auth);
    const [input, setInput] = useState(''); 
    const endOfMessagesRef = useRef(null);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'));

    const [recipientSnapshot] = useCollection (
            db.collection('users').where('email', '==', getRecipientEmail(chat.users, user))
    )

    const showMessages = () => {
        if(messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        } else {
            return JSON.parse(messages).map(message => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ))
        }
    }

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const sendMessage = (e) => {
        e.preventDefault();

        // Update the last seen activity
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true })

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email, 
            photoURL: user.photoURL,
        })
    setInput('');
    scrollToBottom();
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);

    return (
        <ChatScreenContainer>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}

                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last active: {' '}
                        {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                        ) : 'unknown'}
                        </p>
                    ) : (
                        <p>Loading last active time</p>
                    )}
                </HeaderInformation>
            <Toggle onClick={handleToggle}>
                <DehazeOutlinedIcon style={{color: '#707070'}}/>
            </Toggle>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndMessage ref={endOfMessagesRef}/>
            </MessageContainer>

            <InputContainer>
                {/* <InsertEmoticonIcon /> */}
                <Input placeholder='Type a message' value={input} onChange={e => setInput(e.target.value)}/>
                <button disabled={!input} hidden type='submit' onClick={sendMessage}>Send Message</button>
                <IconHover> 
                    <SendOutlinedIcon style={{fontSize: 20, marginLeft: 10, marginRight: 5, marginTop: 2, cursor: 'pointer', color: '#707070'}} type='submit' onClick={sendMessage}></SendOutlinedIcon>
                </IconHover>  
                {/* <MicIcon /> */}
            </InputContainer>
        </ChatScreenContainer>
    )
}

export default ChatScreen
