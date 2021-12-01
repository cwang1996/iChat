import { Circle } from 'better-react-spinkit';

function Loading() {
    return (
        <center style={{ display: 'flex', placeItems: 'center' , height: '100vh', justifyContent: 'center' }}>
            <div>
                <img
                    src='https://lh3.googleusercontent.com/proxy/93vbU7dfyiW2YlRGVGD3fgGj5IPzJfDvEhI00xxaUeNQJiWNPm8X8ETbZvcP0mBAjbw-Gz7d39S43DKQR3RSOhzfTnUOCd3tvX0uMeNHBPfu6NDQifMfPr92Q3YJ54rcm_HMn0UKa1tvPfzyAyNCy3TnBVruoW5u5Bsp7jpM'
                    alt='chatbubble'
                    style={{ marginBottom: 40 }}
                    height={200}
                />

                <Circle color='#4385f3' size={60} />
            </div>
        </center>
    )
}

export default Loading
