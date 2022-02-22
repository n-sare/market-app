import React from 'react';
import { Card, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { StyledPrice, StyledTitle, StyledImage } from './styled';

import ButtonComponent from '../../atoms/ButtonComponent';

 // This is single card component which is displayed in CardContainer component
 // takes two props: product is single product object (JSON), used for displaying
 // addToCart is a function we use to add product to shopping cart
const CardComponent = ({ product, addToCart }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={6}>
      <Card
        hoverable
        style={{ width: 240 , minHeight: "100%", borderRadius: "10px"}}
      >
        <StyledImage src={product?.img} />
        <Row gutter={[10, 10]}>
          <Col span={24}><StyledPrice>₺{product?.price}</StyledPrice></Col>
          <Col span={24} style={{height: "45px"}}><StyledTitle>{product?.name}</StyledTitle></Col>
          <Col span={24}>
            <ButtonComponent 
              onClick={()=>addToCart({"productName": product.name, "productPrice": product.price, "productCount": 1})} 
              text="Add" />
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

CardComponent.propTypes = {
  product: PropTypes.objectOf(PropTypes.any),
  addToCart: PropTypes.func
};
CardComponent.defaultProps = {
  product: {},
  addToCart: null
};

export default CardComponent;
