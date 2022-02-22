import React from 'react';
import { Card, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { StyledPrice, StyledTitle, StyledButton, StyledCountDiv, StyledCartPriceDiv } from './styled';


// ShoppingCartContainer is component we use to display and set products in cart
// It takes 3 props, one of them is state, we use it to access cart state
// plusMinusCart is function to increase or decrease number of same product in the cart (if it's number is bigger than 1)
// delete cart is function we use to delete content from cart (if product number is equals to 1 and if user clicked minus icon)
const ShoppingCartContainer = ({ state, plusMinusCart, deleteCart }) => {

  const { carts } = state;
  return (
    <Col span={24} style={{ marginTop: 20 }}>
      <Card style={{ width: 345, border: "4px solid #1EA4CE" }}>
        {carts.map((item) =>
          <Row>
            <Col span={15}>
              <Row><StyledTitle>{item?.productName}</StyledTitle></Row>
              <Row><StyledPrice>₺{item?.productPrice.toFixed(2)}</StyledPrice></Row>
            </Col>
            <Col span={9}>
              <Row>
              <StyledButton
                onClick={() => {
                  item.productCount > 1 ? (plusMinusCart(item.id, { "productCount": item.productCount - 1, "productName": item.productName, "productPrice": item.productPrice - (item.productPrice / item.productCount) })) : (deleteCart(item.id))
                }}>-</StyledButton>
              <StyledCountDiv>{item?.productCount}</StyledCountDiv>
              <StyledButton
                onClick={() =>
                  plusMinusCart(item.id, { "productCount": item.productCount + 1, "productName": item.productName, "productPrice": item.productPrice + (item.productPrice / item.productCount) }
                  )}>+</StyledButton>
                  </Row>
            </Col>
          </Row>)}
        <Row style={{ justifyContent: "end" }}>
          <StyledCartPriceDiv>
            <StyledPrice>₺{carts.map((cart) => cart.productPrice).reduce((acc, item) => item + acc, 0).toFixed(2)}</StyledPrice>
          </StyledCartPriceDiv>
        </Row>
      </Card>
    </Col>
  );
};

ShoppingCartContainer.propTypes = {
  state: PropTypes.objectOf(PropTypes.any),
  plusMinusCart: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired
};
ShoppingCartContainer.defaultProps = {
  state: [],
};

export default ShoppingCartContainer;
