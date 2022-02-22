import React from 'react';
import { PageHeader } from 'antd';
import { ShoppingFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';


// Header is page's Header component
// It takes 3 props
// state: to display totalPrice in carts
// headerMargin and cartMargin: to set different margins when it is called from Mobile or Desktop
const Header = ({ state, headerMargin, cartMargin }) => {
  const { carts }= state

  return (
    <PageHeader
      style={{
        display: "flex",
        backgroundColor: "#1EA4CE"
      }}
      className="site-page-header"
      title={<div style={{ color: "#FFFFFF", alignItems: "center", display: "flex", marginLeft: headerMargin }}>MARKET</div>}
      backIcon={false}
      extra={[
        <div style={{ backgroundColor: "#147594", width: "90px", marginLeft: cartMargin, color:"#FFFFFF", fontSize:"16px", fontWeight: "400", borderRadius:"5px", justifyContent: "center" }} key="1" type="primary">
          <ShoppingFilled style={{ fontSize: "18px", color: "#FFFFFF", marginLeft: "7px" }} />{' '}₺{carts.map((cart) => cart.productPrice).reduce((acc, item)=> item + acc, 0).toFixed(2)}
        </div>
      ]}
    />
  );
};

Header.propTypes = {
  state: PropTypes.objectOf(PropTypes.any),
  headerMargin: PropTypes.number.isRequired, // desktop 900 
  cartMargin: PropTypes.number.isRequired // desktop 700
};
Header.defaultProps = {
  state: [],
};

export default Header;
