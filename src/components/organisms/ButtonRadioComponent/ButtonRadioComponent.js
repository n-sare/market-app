import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

// This component is created to filter by item type. It takes three props
// options is passed from Main Components (MainDesktopPage and MainMobilePage), it is all unique itemTypes (in this case it is only mug and shirt)
// onInit is a function we use to set state (defined in Main components)

const ButtonRadioComponent = ({ options, onFilter, onInit }) => {
  const [value, setValue] = useState(null);

  // function to filter and setting states
  const onChange = e => {
    setValue(e.target.value)
    onInit("productTypeFilter", e.target.value)
    onFilter();
  };

  // we need useEffect to listen changes in "value", so it can immediately update state and filter by "productTypeFilter"
  useEffect(() => {
    onInit("productTypeFilter", value)
  }, [value])

  return (
    <Radio.Group
      options={options}
      onChange={onChange}
      value={value}
      optionType="button"
      buttonStyle="solid"
    >
      {options.map((item) => <Radio>{item}</Radio>)}
    </Radio.Group>
  );
};

ButtonRadioComponent.propTypes = {
  options: PropTypes.array,
  onFilter: PropTypes.func,
  onInit: PropTypes.func,
};
ButtonRadioComponent.defaultProps = {
  options: [],
  onFilter: null,
  onInit: null
};

export default ButtonRadioComponent;
