import React, {useState} from 'react';
import { Card, Col, Row, Radio } from 'antd';
import PropTypes from 'prop-types';

// This component is used for sorting low to high vice vera
// It takes 1 props which is a function and sorts by sent value
const SortingComponent = ({ onSort }) => {
  const [value, setValue] = useState(1);

  const onChange = e => {
    setValue(e.target.value)
    onSort(e.target.value)
    
  };

  return (
    <Col span={24} style={{ width: 300}}>
      <Card style={{ borderRadius: "5px"}}>
        <Row gutter={[10, 10]}>
          <Radio.Group onChange={onChange} value={value}>
            <Col ><Radio value={1}>Price low to high</Radio></Col>
            <Col style={{marginTop:10}}><Radio value={2}>Price high to low</Radio></Col>
            <Col style={{marginTop:10}}><Radio value={3}>New to old</Radio></Col>
            <Col style={{marginTop:10}}><Radio value={4}>Old to new</Radio></Col>
          </Radio.Group>
        </Row>
      </Card>
    </Col>
  );
};

SortingComponent.propTypes = {
  listData: PropTypes.string,
  onSort: PropTypes.func,
};
SortingComponent.defaultProps = {
  listData: null,
  onSort: null
};

export default SortingComponent;
