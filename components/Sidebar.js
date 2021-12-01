import styled from 'styled-components';
import { Avatar, Button, IconButton } from '@material-ui/core';
import { auth, db } from '../firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import * as EmailValidator from 'email-validator';
import Chat from '../components/Chat';

const SidebarContainer = styled.div`
    border-right: 1px solid whitesmoke;
    height: 100vh;
    /* min-width: 300px;
    max-width: 350px; */
    max-width: 350px;
    overflow-y: scroll;
    transition: all .2s ease;
    z-index: 1000;
    background-color: white;
    font-family: 'Poppins';

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    @media screen and (max-width: 1050px) {
        transform: translateX(${({ isToggle }) => (isToggle ? '100%' : '-100%')});
        margin-right: ${({ isToggle }) => (isToggle ? '0px' : '-332px')};
    }
`

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
`

const IconsContainer = styled.div``

const IconHover = styled.div`
    &:hover {
        transform: scale(1.1);
    }
`

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
        padding: 15px;
    }
`

function Sidebar({ isToggle, handleToggle }) {

    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt('Please enter in the email of the user');

        if(!input) return null;

        // add chat into DB chats collection if it does not already exists or is valid
        if(EmailValidator.validate(input) && !chatExists(input) && input !== user.email) {
            db.collection('chats').add({
                users: [user.email, input]
            })
        }
    };

    const chatExists = (recipientEmail) => {
        // optional chaining
        // go through existing chats, and find if any users in the user array is located inside the firebase db
        !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0);
    }

    return (
        <SidebarContainer isToggle={isToggle}>
            <Header>
                <UserAvatar src={user.photoURL} />
                <IconsContainer>
                    <IconHover>
                        <ExitToAppIcon style={{color: '#707070', marginTop: 5, cursor: 'pointer'}} onClick={() => auth.signOut()} />
                    </IconHover>
                </IconsContainer>
            </Header>

            <SidebarButton onClick={createChat}>New chat</SidebarButton>

            {chatsSnapshot?.docs.map(chat => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </SidebarContainer>
    )
}

export default Sidebar
