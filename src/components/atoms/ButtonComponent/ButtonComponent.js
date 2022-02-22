import React from 'react';
import PropTypes from 'prop-types';
import { StyledCardButton } from './styled';

const ButtonComponent = ({ size, text, onClick, icon }) => {
  return (
    <StyledCardButton type='primary' size={size} onClick={onClick} icon={icon}>{text}</StyledCardButton>
  );
};

ButtonComponent.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  icon: PropTypes.any,
  size: PropTypes.string
};
ButtonComponent.defaultProps = {
  onClick: null,
  text: null,
  icon: null,
  size: "small"
};

export default ButtonComponent;
