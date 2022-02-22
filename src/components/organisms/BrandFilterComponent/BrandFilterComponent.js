import React, {useEffect, useState} from 'react';
import { Col, Row, Input, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { StyledScrollableDiv } from './styled';

// This component is created to use for brand filtering
// it takes three props:
// onInit is function to set state (passed from MainDesktopPage and MainMobilePage components)
// state is, well it is state we use to access states we need from Main page components
// onFilter is function defined in Main Components to filter by three criterias altogether (tag, brand, itemtype)
const BrandFilterComponent = ({ onInit, state, onFilter }) => {
  const { companies } = state;

  const [filteredBrands, setFilteredBrands] = useState(companies);
  const [value, setValue] = useState([])
  
  // We need useEffect, everytime companies or value change, update in state is necessary
  useEffect(()=>{
    setFilteredBrands(companies)
    onInit("brandValuesFilter",value)
  },[companies, value])

  // Function to filter by Input
  const onChangeInput = (value) => {
    const a = companies.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
    setFilteredBrands(a)
  }

  // Function to filter products and update state when checkbox changes  
  const onChangeCheckBox = (checkedValues) => {
    setValue(checkedValues)
    onInit("brandValuesFilter",value)
    onFilter();
  }
  return (


<Col span={24} style={{ width: 300  }}>
  <div style={{backgroundColor: "white", borderRadius: "5px"}} >
      <Input 
        onChange={(e) => onChangeInput(e.target.value)} 
        style={{marginTop:10, width:270, marginLeft: 15, marginBottom: 10}}
        placeholder="Search tag" />
      <StyledScrollableDiv
        style={{backgroundColor: "white"}}
        id="scrollableDiv">
        <Row gutter={[10, 10]}>
          <Checkbox.Group onChange={onChangeCheckBox}>
            {filteredBrands.map((item) => <Col span={24} style={{marginTop:10}}><Checkbox value={item.slug}>{item.name}</Checkbox></Col>)}
          </Checkbox.Group>
        </Row>
      </StyledScrollableDiv>
    </div>
    </Col>
  );
};

BrandFilterComponent.propTypes = {
  state: PropTypes.objectOf(PropTypes.any),
  onFilter: PropTypes.func,
  onInit: PropTypes.func
};
BrandFilterComponent.defaultProps = {
  state: [],
  onFilter: null,
  onInit: null,
};

export default BrandFilterComponent;
