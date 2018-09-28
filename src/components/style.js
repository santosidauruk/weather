import styled from 'styled-components'

export const WrapperPage = styled.div`
    background: ${(props) => props.bgColor || 'red'};
`

export const Container = styled.div`
    width: 94%;
    max-width: 1024px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 194px 0;

    @media screen and (max-width: 767px) {
        flex-direction: column;
        padding: 30px 0;
    }
`

export const Content = styled.div``

export const CurrentTimeContent = styled.div`
    .today {
        margin: 70px 0;
        > h2 {
            font-size: 48px;
            margin: 0.5rem 0;
            font-weight: 400;
        }
    }
    > h1 {
        font-size: 72px;
        margin-top: 0.25rem;
        font-weight: 300;
    }
    p {
        font-size: 24px;
        margin: 0;
        line-height: 1.5;
    }
    @media screen and (max-width: 767px) {
        text-align: center;
        p {
            font-size: 20px;
        }
        .today {
            margin: 30px 0;
        }
    }
`

export const NextDayContent = styled.div`
    margin-bottom: 42px;
    display: flex;
    font-weight: 600;
    font-size: 24px;
    align-items: center;
    .next-day__desc {
        margin: 0;
        line-height: 1.5;
        font-size: 20px;
    }
`

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    flex: 1;
    @media screen and (max-width: 767px) {
        width: 100%;
    }
`
export const NextDayWeather = styled.div`
    float: right;
`

export const WeatherImage = styled.div`
    display: flex;
    flex: 1;
    align-self: flex-start;
    justify-content: center;
    @media screen and (max-width: 767px) {
        width: 100%;
    }
    .icon {
        margin: 0 auto;
        width: 315px;
        @media screen and (max-width: 767px) {
            width: 250px;
        }
    }
`
