import styled from "styled-components";
import { theme } from "../../styles/theme";
import { InputNumberFormat } from "@react-input/number-format";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    form{
        display: flex;
        flex-direction: column;
        gap: 1rem; 
    }

    footer{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.75rem;
    }
`
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    label{
        color: ${theme.colors.white};
        font-size: 0.725rem;
    }
    
    select{
        height: 2.25rem;
        border-radius: 0.25rem;
        padding: 0 0.75rem;
        background-color: ${theme.colors.black};
        color:${theme.colors.neutral};
        border: 1px solid transparent;
        cursor: pointer;
        transform: all 100ms;

        &:focus{
            border-color: ${theme.colors.primary};
        }
    }
`
export const CurrencyInput = styled(InputNumberFormat)`
    height: 2.25rem;
    background-color: ${theme.colors.black};
    border: 0;
    border-radius: 0.25rem;
    padding: 0 0.75rem;
    color: ${theme.colors.neutral};
    font-size: 1rem;
    width: 100%;
    transform: all 100ms;

    &:focus{
        border-color: ${theme.colors.primary};
    }

    &::placeholder{
        color: ${theme.colors.neutral};
    }
`

export const RadioForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem; 
`
export const RadioGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input{
        width: 1rem;
        height: 1rem;
        accent-color: ${theme.colors.primary};
        cursor: pointer;
    }

    label{
        color: ${theme.colors.white};
        font-size: 0.875rem;
        cursor: pointer;
    }
`
export const ErrorMessage = styled.span`
    margin-top: 0.125rem;
    font-size: 0.625rem;
    line-height: 80%;
    color: ${theme.colors.error}
`

