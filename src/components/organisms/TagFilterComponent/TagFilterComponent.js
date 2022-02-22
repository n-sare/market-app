import React, { useEffect, useState } from 'react';
import { Col, Row, Input, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { StyledScrollableDiv } from './styled';


// This component is created to use for tag filtering
// it takes three props:
// onInit is function to set state (passed from MainDesktopPage and MainMobilePage components)
// state is, well it is state we use to access states we need from Main page components
// onFilter is function defined in Main Components to filter by three criterias altogether (tag, brand, itemtype)
const TagFilterComponent = ({ state, onInit, onFilter }) => {
  const { tags, tagValuesFilter } = state;
  const [filteredTags, setFilteredTags] = useState(tags);

  // We need useEffect, everytime tags or tagValuesFilter change, update in state is necessary
  useEffect(() => {
    setFilteredTags(tags)
  }, [tags, tagValuesFilter])

  // Function to filter by Input
  const onChangeInput = (value) => {
    const a = tags.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    setFilteredTags(a);
  }

  // Function to filter products and update state when checkbox changes  
  const onChangeCheckBox = (checkedValues) => {
    onInit("tagValuesFilter", checkedValues)
    onFilter();
  }
  return (
    <Col span={24} style={{ width: 300 }}>
      <div style={{ backgroundColor: "white", borderRadius: "5px" }} >
        <Input
          onChange={(e) => onChangeInput(e.target.value)}
          style={{ marginTop: 10, width: 270, marginLeft: 15, marginBottom: 10 }}
          placeholder="Search brand" />
        <StyledScrollableDiv
          style={{ backgroundColor: "white" }}
          id="scrollableDiv">
          <Row gutter={[10, 10]}>
            <Checkbox.Group onChange={onChangeCheckBox}>
              {filteredTags.map((item) => <Col span={24} style={{ marginTop: 10 }}><Checkbox value={item}>{item}</Checkbox></Col>)}
            </Checkbox.Group>
          </Row>
        </StyledScrollableDiv>
      </div>
    </Col>
  );
};

TagFilterComponent.propTypes = {
  state: PropTypes.objectOf(PropTypes.any),
  onInit: PropTypes.func,
  onFilter: PropTypes.func
};
TagFilterComponent.defaultProps = {
  state: [],
  onInit: null,
  onFilter: null
};

export default TagFilterComponent;
