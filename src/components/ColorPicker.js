import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ColorPickerContainer = styled.div`
  position: relative;
`;

const ColorSwatch = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;

const ColorPreview = styled.div`
  width: 36px;
  height: 14px;
  border-radius: 2px;
`;

const PopoverWrapper = styled.div`
  position: absolute;
  z-index: 2;
`;

const PopoverCover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ColorPicker = ({ selectedColor, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    onChange(color.hex);
  };

  return (
    <ColorPickerContainer>
      <ColorSwatch onClick={handleClick}>
        <ColorPreview style={{ background: selectedColor }} />
      </ColorSwatch>
      {displayColorPicker && (
        <PopoverWrapper>
          <PopoverCover onClick={handleClose} />
          <SketchPicker color={selectedColor} onChange={handleChange} />
        </PopoverWrapper>
      )}
    </ColorPickerContainer>
  );
};

ColorPicker.propTypes = {
  selectedColor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorPicker;