import { Circle } from 'better-react-spinkit';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import styled from 'styled-components';

const IconContainer = styled.div`
    width: fit-content;
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 38%, rgba(0,212,255,1) 100%);
    border-radius: 20px;
    padding: 20px 10px;
    margin-bottom: 30px;
`

function Loading() {
    return (
        <center style={{ display: 'flex', placeItems: 'center' , height: '100vh', justifyContent: 'center' }}>
            <div>
                {/* <img
                    src='https://lh3.googleusercontent.com/proxy/93vbU7dfyiW2YlRGVGD3fgGj5IPzJfDvEhI00xxaUeNQJiWNPm8X8ETbZvcP0mBAjbw-Gz7d39S43DKQR3RSOhzfTnUOCd3tvX0uMeNHBPfu6NDQifMfPr92Q3YJ54rcm_HMn0UKa1tvPfzyAyNCy3TnBVruoW5u5Bsp7jpM'
                    alt='chatbubble'
                    style={{ marginBottom: 40 }}
                    height={200}
                /> */}
                <IconContainer>
                    <ChatBubbleOutlineOutlinedIcon  style={{color: 'white', width: 200, height: 150}}/>
                </IconContainer>
                <Circle color='#4385f3' size={60} />
            </div>
        </center>
    )
}

export default Loading
