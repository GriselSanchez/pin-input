import styled from "styled-components";

interface StyledPinInputProps {
  $hasValue: boolean;
  $isVisible: boolean;
  $color?: string;
}

export const StyledPinInput = styled.input<StyledPinInputProps>`
  height: 40px;
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  -webkit-text-security: ${(props) => (props.$isVisible ? "none" : "disc")};

  background: ${(props) => (props.$hasValue ? props.$color : "white")};
  color: ${(props) => (props.$hasValue ? "white" : "black")};
  border-radius: 25px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const StyledContainer = styled.div`
  position: absolute;
  display: grid;
  box-sizing: border-box;
  width: 90%;

  grid-template-columns: repeat(4, 1fr) 5%;
  grid-template-rows: 1fr;
  grid-column-gap: 4%;
  align-items: center;
`;
