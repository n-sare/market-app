import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import StyledSpinContainer from './styled';

const PreloaderComponent = ({ height }) => {
  return (
    <StyledSpinContainer height={height}>
      <Spin />
    </StyledSpinContainer>
  );
};

PreloaderComponent.propTypes = {
  height: PropTypes.number,
};
PreloaderComponent.defaultProps = {
  height: null,
};

export default PreloaderComponent;
