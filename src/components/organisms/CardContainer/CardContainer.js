import React, { useState, useEffect } from 'react';
import { Row, Pagination } from 'antd';
import PropTypes from 'prop-types';

import CardComponent from '../../molecules/CardComponent/CardComponent';

// This is where we call product cards (CardComponent)
// Takes 2 props:
// One of them is state from Main components
// One of them is function we use to add to cart that specific product (or increase existing product's number)
const CardContainer = ({ state, addToCart }) => {
  const { filteredProducts } = state;
  const [minProductIndex, setMinProductIndex] = useState(0)
  const [maxProductIndex, setMaxProductIndex] = useState(16)

  // this is to handle pagination change
  // min/max product index is set by page value and 16 (which is number of product carts that's wanted in every pages)
  const handleChange = (value) => {
    setMinProductIndex((value - 1) * 16)
    setMaxProductIndex(value * 16)
  }

  return (
    <>
    <Row gutter={[15, 15]} style={{alignItems: "center"}}>
      {filteredProducts?.slice(minProductIndex, maxProductIndex).map(
        (product) => <CardComponent product={product} addToCart={addToCart} />)}     
    </Row>
    <Row style={{ justifyContent: "center" , marginTop: 20}}>
      <Pagination
        defaultCurrent={1}
        defaultPageSize={16}
        onChange={handleChange}
        total={filteredProducts.length}
      />
  </Row>
  </>
  );
};

CardContainer.propTypes = {
  state: PropTypes.objectOf(PropTypes.any),
  addToCart: PropTypes.func
};
CardContainer.defaultProps = {
  state: [],
  addToCart: null
};

export default CardContainer;
