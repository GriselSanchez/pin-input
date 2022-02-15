import React, { useState, useRef, useEffect } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { KeyCode } from "./KeyCode.enum";
import { StyledContainer, StyledPinInput } from "./Pin.style";

const invalidCodes = [KeyCode.SLASH, KeyCode.PERIOD, KeyCode.COMMA];
const PIN_LENGTH = 4;

interface Props {
  pinValues: (number | undefined)[];
  setPinValues: (values: (number | undefined)[]) => void;
  color?: string;
}

const Pin = ({ pinValues, setPinValues, color = "#000" }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusPosition, setFocusPosition] = useState(0);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const setFocus = (id: number) => {
    const next = inputsRef.current[id];
    if (next) next.focus();
  };

  const removeValues = (position: number, value?: number) =>
    setPinValues([
      ...pinValues
        .slice(0, position)
        .concat(...[value, pinValues.slice(position + 1)])
    ]);

  const onInputChange = (
    { nativeEvent: { code, key } }: React.KeyboardEvent<HTMLInputElement>,
    position: number
  ) => {
    if (invalidCodes.some((invalidCode) => code === invalidCode)) {
      setPinValues([...pinValues]);
      return false;
    }

    switch (key) {
      case KeyCode.BACKSPACE:
        removeValues(position, undefined);
        setFocusPosition(position > 0 ? position - 1 : position);
        break;
      case KeyCode.TAB:
        setFocus(position);
        break;
      default:
        const value = Number(key.trim());
        if (isNaN(value) || (value && (value < 0 || value > 9))) {
          setPinValues([...pinValues]);
          return false;
        }
        removeValues(position, value);
        setFocusPosition(position + 1);
        break;
    }

    return true;
  };

  useEffect(() => {
    setFocus(focusPosition);
  }, [pinValues, focusPosition]);

  const NumberInput = ({ id }: { id: number }) => (
    <StyledPinInput
      type="number"
      value={pinValues[id]}
      ref={(el) => {
        if (el) inputsRef.current[id] = el;
      }}
      onKeyUp={(e) => onInputChange(e, id)}
      onChange={(e) => e.preventDefault()}
      autoComplete="chrome-off"
      $hasValue={pinValues[id] !== undefined}
      $isVisible={isPasswordVisible}
      $color={color}
    />
  );

  return (
    <StyledContainer>
      {[...Array(PIN_LENGTH)].map((_, index) => (
        <div key={index}>
          <NumberInput id={index} />
        </div>
      ))}
      <div>
        {isPasswordVisible ? (
          <EyeOutlined onClick={() => setIsPasswordVisible(false)} />
        ) : (
          <EyeInvisibleOutlined onClick={() => setIsPasswordVisible(true)} />
        )}
      </div>
    </StyledContainer>
  );
};

export default Pin;
