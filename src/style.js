import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: ${(props) => props.bgColor || 'red'};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Content = styled.div``

export const CurrentTimeContent = styled.div`
    height: calc(100% - 120px);
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > h2 {
        font-size: 48px;
        margin-bottom: 0.5rem;
    }
    > h1 {
        font-size: 72px;
        margin-top: 0.25rem;
    }
    p {
        font-size: 18px;
    }
`

export const NextDayContent = styled.div`
    padding: 1em;
    background-color: white;
    height: 60px;
    width: 100%;
`

export const NextDayWeather = styled.div`
    float: right;
`
