import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;

    h2{
        font-size:1.25rem;
        color: ${theme.colors.white};
        font-weight: 700;

        @media (max-width: 640px){
            text-align: center;
        }
    }

    span{
        font-size: 0.875rem;
        color: ${theme.colors.neutral};
        font-weight: 400;
    }

    @media (max-width: 640px){
        text-align: center;
    }
`