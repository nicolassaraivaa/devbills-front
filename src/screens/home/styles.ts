import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem; 
    width: 100%;

    > div{
        display: flex;
        gap: 0.5rem;
    }

    @media (max-width: 640px){
        flex-direction:column;
        gap: 1rem;
        justify-content: center;
    }
`
export const Main = styled.main`
    display: flex;
    gap: 0.75rem;
    width: 100%;
    padding: 0 1.5rem 1.5rem 1.5rem ;

    @media (max-width: 970px){
        flex-direction:column;
    }
    
`
export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
`
export const Filters = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 640px){
        flex-direction:column;
        gap: 1.5rem;
    }
`

export const InputGroup = styled.div`
    display: flex;
    align-items: flex-end;
    max-width: 22.5rem;
    width: 100%;
    gap: 0.5rem;
`

export const Balance = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;

    @media (max-width: 640px){
        flex-direction:column;
        gap: 1rem;
    }

`

export const ChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.dark};
    border-radius: 0.25rem;
    gap: 0.75rem;
    padding: 0 0 1rem 0;
    
    header{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        @media (max-width: 640px){
            align-items: center;
            gap: 1.5rem;
        }
    }
`

export const ChartContent = styled.div`
    height: 14.5rem;
`

export const ChartAction = styled.div`
    display: flex;
    align-items: flex-end;
    width: 8rem;
    gap: 0.5rem;

`
export const Aside = styled.aside`
    min-width: 22.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 0.25rem;
    background-color: ${theme.colors.dark};

    header{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @media (max-width: 640px){
        min-width: 15rem;
    }
    
`
export const SearchTransaction = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem; 
`

export const TransactionGroup = styled.div`
    display: flex;
    flex-direction:column;
    padding: 0.075rem;
    
`

