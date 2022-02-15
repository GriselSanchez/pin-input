import styled from "styled-components";

interface StyledPinInputProps {
  $hasValue: boolean;
  $isVisible: boolean;
  $color?: string;
}

export const StyledPinInput = styled.input<StyledPinInputProps>`
  border-radius: 10px;
  height: 40px;
  text-align: center;
  font-weight: 600;
  -webkit-text-security: ${(props) => (props.$isVisible ? "none" : "disc")};

  background: ${(props) => (props.$hasValue ? props.$color : "white")};
  color: ${(props) => (props.$hasValue ? "white" : "black")};
  border: ${(props) => (props.$hasValue ? "none" : `1px solid black`)};

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
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  align-items: center;
  box-sizing: border-box;
`;
