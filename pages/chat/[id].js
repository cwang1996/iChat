import styled from 'styled-components';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { auth, db } from '../../firebase';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';

const IDContainer = styled.div`
    display: flex;
`

const ChatBoxContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-sstyle: none;
    scrollbar-width: none;
`

function Chat({ chat, messages }) {

    const [user] = useAuthState(auth);

    return (
        <IDContainer>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>
            <Sidebar />
            <ChatBoxContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatBoxContainer>
        </IDContainer>
    )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id);

    // Prepare the messages on server
    const messageRead = await ref.collection('messages').orderBy('timestamp', 'asc').get();

    const messages = messageRead.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));

    // Prepare the chats
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}
