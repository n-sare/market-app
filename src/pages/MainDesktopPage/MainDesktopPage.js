import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography } from 'antd'
import { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  Button,
  notification,
} from 'antd';

import { getProducts } from '../../redux/modules/product/getProducts';
import { getCompanies } from '../../redux/modules/company/getCompanies';
import { saveToCart } from '../../redux/modules/cart/saveToCart';
import { updateCart } from '../../redux/modules/cart/updateCart';
import { getCarts } from '../../redux/modules/cart/getCarts';
import { deleteFromCart } from '../../redux/modules/cart/deleteFromCart';

import Preloader from '../../components/atoms/PreloaderComponent/PreloaderComponent';
import CardContainer from '../../components/organisms/CardContainer/CardContainer';
import TagFilterComponent from '../../components/organisms/TagFilterComponent/TagFilterComponent';
import BrandFilterComponent from '../../components/organisms/BrandFilterComponent/BrandFilterComponent';
import Header from '../../components/organisms/Header/Header';
import SortingComponent from '../../components/organisms/SortingComponent/SortingComponent';
import ButtonRadioComponent from '../../components/organisms/ButtonRadioComponent/ButtonRadioComponent';
import ShoppingCartContainer from '../../components/organisms/ShoppingCartContainer/ShoppingCartContainer';

import {StyledBody} from './styled'
import FooterComponent from '../../components/atoms/FooterComponent/FooterComponent';

const { Text } = Typography

// This is main desktop component. It manages state and functions sent as props to components is defined here. Determines desktop layout.  
// Unlike others, this is class component because I wanted to show that I am comfortable with both of components, class or function
class MainDesktopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      companies: [],
      tags: [],
      carts: [],
      checkedTagValues: [],
      loading: true,
      itemTypesOptions: [],
      defaultCurrent: 1,
      productTypeFilter: null,
      brandValuesFilter: [],
      tagValuesFilter: []
    };
  }
  // calling actions to get products, companies and carts when component is mounted
  componentDidMount() {
    this.props.getProducts();
    this.props.getCompanies();
    this.props.getCarts();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      getProductsResult,
      getCompaniesResult,
      saveToCartResult,
      getCartsResult,
      updateCartResult,
      deleteFromCartResult
    } = this.props;

    const {
      products,
      filteredProducts,
      brandValuesFilter,
      tagValuesFilter,
      productTypeFilter
    } = this.state

    // when getProduct action is called and finished this if block runs and sets states
    // in this case it is products, loading (so that preloader stops spinning) and 
    // filteredProducts: at the beginning it is equals to all products so later user can sort or filter
    if (getProductsResult && getProductsResult.isLoaded && !prevProps.getProductsResult.isLoaded) {
      this.onInit('products', getProductsResult?.payload);
      this.onInit('loading', false);
      this.onInit("filteredProducts", getProductsResult?.payload)
    }

    // When getCart action is called and finished, this if block runs and sets states
    // In this case it is carts so we can display products in cart and loading so we can stop Preloader and display page if it hasn't already
    if (getCartsResult && getCartsResult.isLoaded && !prevProps.getCartsResult.isLoaded) {
      this.onInit('carts', getCartsResult?.payload);
      this.onInit('loading', false);
    }

    
    // When getCompanies action is called and finished, this if block runs and sets states
    // In this case it is companies so we can set content of brand filter and loading so we can stop Preloader and display page if it hasn't already
    if (getCompaniesResult && getCompaniesResult.isLoaded && !prevProps.getCompaniesResult.isLoaded) {
      this.onInit('companies', getCompaniesResult?.payload);
      this.onInit('loading', false);
    }

    // tags and item types (mug and shirt) has to be taken from products dynamically. In this if block we checked if products state is changed
    // if true, we set those states (tags and itemTypesOptions)
    if (prevState.products!==products) {
      this.onInit('itemTypesOptions', [...new Set(this.state.products.map((item)=>item.itemType))])
      this.onInit("tags", this.state.products.map((item)=> item.tags).flat(1).filter((x, i, a) => a.indexOf(x) === i))
    }

    // if filteredProduct state is altered (filter or sort is applied), we need to listen and change this state so we can display
    if (prevState.filteredProducts!==filteredProducts) {
      this.onInit('filteredProducts', filteredProducts)
    }
    // brandValuesFilter is a state that's set in BrandFilterComponent by onInit, we need to make changes to this state immediately and call onFilter
    // because onFilter is a function which one of it's arguments is brandFilterValues state and it needs to run every time these states change
    if (prevState.brandValuesFilter!==brandValuesFilter) {
      this.onInit('brandValuesFilter', brandValuesFilter)
      this.onFilter()
    }
    // tagValuesFilter is a state that's set in TagFilterComponent by onInit, we need to make changes to this state immediately and call onFilter
    // because onFilter is a function which one of it's arguments is tagValuesFilter state and it needs to run every time these states change
    if (prevState.tagValuesFilter!==tagValuesFilter) {
      this.onInit('tagValuesFilter', tagValuesFilter)
      this.onFilter()
    }
    // productTypeFilter is a state that's set in ButtonRadioComponent by onInit, we need to make changes to this state immediately and call onFilter
    // because onFilter is a function which one of it's arguments is productTypeFilter state and it needs to run every time these states change
    if (prevState.productTypeFilter!==productTypeFilter) {
      this.onInit('productTypeFilter', productTypeFilter)
      this.onFilter()
    }

    // This if block is to listen when saveToCart action is called and product is added to cart
    // after product is saved, we need to call getCarts action again since cart is changed and needs to be updated on page
    if (saveToCartResult && saveToCartResult.isLoaded && !prevProps.saveToCartResult.isLoaded) {
      notification.open({
        message: <div dangerouslySetInnerHTML={{__html: `Product is added to cart.` }} />,
        btn: (
          <>
            <Button 
              type="master-transparent" 
              size="large"
              className="font-weight-bold text-uppercase rounded-3"
              onClick={() => notification.destroy()}
            >Ok
            </Button>
          </>
        ),
        onClose: () => notification.destroy(),
        className: 'message-dark',
        duration: 5,
      });
      this.props.getCarts();
    } 

    // This if block is to listen when deleteFromCart action is called and product is deleted from cart
    // after product is deleted, we need to call getCarts action again since cart is changed and needs to be updated on page
    if (deleteFromCartResult && deleteFromCartResult.isLoaded && !prevProps.deleteFromCartResult.isLoaded) {
      notification.open({
        message: <div dangerouslySetInnerHTML={{ __html: `Product is deleted from cart.` }} />,
        btn: (
          <>
            <Button
              type="master-transparent"
              size="large"
              className="font-weight-bold text-uppercase rounded-3"
              onClick={() => notification.destroy()}
            >Ok
            </Button>
          </>
        ),
        onClose: () => notification.destroy(),
        className: 'message-dark',
        duration: 5,
      });
      this.props.getCarts()
    }
    // This if block is for listening when updateCart action is called and product existing in cart is increased or decreased
    // after cart is updated, we need to call getCarts action again since cart is changed and needs to be updated on page
    if (updateCartResult && updateCartResult.isLoaded && !prevProps.updateCartResult.isLoaded) {
      notification.open({
        message: <div dangerouslySetInnerHTML={{ __html: `Cart is updated.` }} />,
        btn: (
          <>
            <Button
              type="master-transparent"
              size="large"
              className="font-weight-bold text-uppercase rounded-3"
              onClick={() => notification.destroy()}
            >Ok
            </Button>
          </>
        ),
        onClose: () => notification.destroy(),
        className: 'message-dark',
        duration: 5,
      });
      this.props.getCarts()
    }
  }

  // this is famous function we call everywhere, it sets states in child components or main components
  onInit = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  // this function is called from SortingComponent by argument "value"
  // it sorts by time or price
  // time is in form of UNIX timestamp at database. In UNIX timestamp bigger means newer
  // So classical sorting would be sufficient
  onSort =(value)=>{
    if(value===1){
      this.onInit("filteredProducts",this.state.filteredProducts.sort((a, b) => a.price - b.price));
    }
    if(value===2){
      this.onInit("filteredProducts",this.state.filteredProducts.sort((a, b) => b.price - a.price));
    }
    if(value===3){
      this.onInit("filteredProducts",this.state.filteredProducts.sort((a, b) => a.added - b.added));
    }
    if(value===4){
      this.onInit("filteredProducts",this.state.filteredProducts.sort((a, b) => b.added - a.added));
    }

  }

  // This function is sent to CardContainer and from there to Card Component
  // We need to check if that specific product already exists in cart because we don't want to add new same-product-object repeatedly
  // So if that product already exists we just update its count by +1, if not we add
  addToCart =(data)=>{
    const checkIfExistInCartData = this.state.carts.filter((item)=> item.productName===data.productName)
    if(checkIfExistInCartData && checkIfExistInCartData.length>0){
      this.props.updateCart(checkIfExistInCartData[0].id, {"productCount": checkIfExistInCartData[0].productCount+1, "productName": checkIfExistInCartData[0].productName, "productPrice": checkIfExistInCartData[0].productPrice+(checkIfExistInCartData[0].productPrice/checkIfExistInCartData[0].productCount)})
    }else{
      this.props.saveToCart(data)
    }
    
  }

  // This function runs when three states change. These states are: tagValuesFilter, brandValuesFilter, productTypeFilter
  onFilter = () => {
    // three combination (if all these states are full) -> we need to filter by three criterias
    if(this.state.tagValuesFilter.length !== 0 && this.state.brandValuesFilter.length !== 0 && this.state.productTypeFilter !== null){
      const filteredByType = this.state.products.filter((item) => item.itemType===this.state.productTypeFilter)
      const filteredByBrand = this.state.brandValuesFilter.map((value)=>this.state.products.filter((item)=>item.manufacturer===value)).flat(1)
      const filteredByTag = this.state.tagValuesFilter.map((value)=>this.state.products.filter((item)=>item.tags.includes(value))).flat(1)
      const mergedArray = [filteredByType, filteredByBrand, filteredByTag]
      // getting common of these arrays so it's filtered by three criteria combination
      const filtered = mergedArray.reduce((p,c) => p.filter(e => c.includes(e)))
      // setting state so page updates
      this.onInit("filteredProducts" , filtered)
    }
    // two combination blocks (if two of these states are not empty and one of them is empty) -> we need to filter by these two criterias
    if(this.state.tagValuesFilter.length !== 0 && this.state.brandValuesFilter.length !== 0 && this.state.productTypeFilter === null){
      const filteredByBrand = this.state.brandValuesFilter.map((value)=>this.state.products.filter((item)=>item.manufacturer===value)).flat(1)
      const filteredByTag = this.state.tagValuesFilter.map((value)=>this.state.products.filter((item)=>item.tags.includes(value))).flat(1)
      const mergedArray = [filteredByBrand, filteredByTag]
      const filtered = mergedArray.reduce((p,c) => p.filter(e => c.includes(e)))
      this.onInit("filteredProducts" , filtered)
    }
    if(this.state.tagValuesFilter.length !== 0 && this.state.brandValuesFilter.length === 0 && this.state.productTypeFilter !== null){
      const filteredByType = this.state.products.filter((item) => item.itemType===this.state.productTypeFilter)
      const filteredByTag = this.state.tagValuesFilter.map((value)=>this.state.products.filter((item)=>item.tags.includes(value))).flat(1)
      const mergedArray = [filteredByType, filteredByTag]
      const filtered = mergedArray.reduce((p,c) => p.filter(e => c.includes(e)))
      this.onInit("filteredProducts" , filtered)
    }
    if(this.state.tagValuesFilter.length === 0 && this.state.brandValuesFilter.length !== 0 && this.state.productTypeFilter !== null){
      const filteredByType = this.state.products.filter((item) => item.itemType===this.state.productTypeFilter)
      const filteredByBrand = this.state.brandValuesFilter.map((value)=>this.state.products.filter((item)=>item.manufacturer===value)).flat(1)
      const mergedArray = [filteredByType, filteredByBrand]
      const filtered = mergedArray.reduce((p,c) => p.filter(e => c.includes(e)))
      this.onInit("filteredProducts" , filtered)
    }
    // single combinaton (if two of these states are empty and one of them is not) -> we need to filter by that criteria
    // we don't need array processes like merging or reducing though
    if(this.state.tagValuesFilter.length !== 0 && this.state.brandValuesFilter.length === 0 && this.state.productTypeFilter === null){
      const filteredByTag = this.state.tagValuesFilter.map((value)=>this.state.products.filter((item)=>item.tags.includes(value))).flat(1)
      this.onInit("filteredProducts" , filteredByTag)
    }
    if(this.state.tagValuesFilter.length === 0 && this.state.brandValuesFilter.length !== 0 && this.state.productTypeFilter === null){
      const filteredByBrand = this.state.brandValuesFilter.map((value)=>this.state.products.filter((item)=>item.manufacturer===value)).flat(1)
      this.onInit("filteredProducts" , filteredByBrand)
    }
    if(this.state.tagValuesFilter.length === 0 && this.state.brandValuesFilter.length === 0 && this.state.productTypeFilter !== null){
      const filteredByType = this.state.products.filter((item) => item.itemType===this.state.productTypeFilter)
      this.onInit("filteredProducts" , filteredByType)
    }

  }

  // This is to update cart ( product count) 
  plusMinusCart = ( cartId, count) =>{
    this.props.updateCart(cartId, count);
  }

  // this is to delete cart if productCount is 1 and user clicked minus
  deleteCart = ( cartId) =>{
    this.props.deleteFromCart(cartId);
  }

  render() {

    const {
      loading
    } = this.state;

    return (
      <StyledBody>
        {loading ? (
          <Preloader height={16} />
        ) : (
          <>
            <Header state={this.state} headerMargin={900} cartMargin={700}/>
            <Row style={{ marginTop: 20 }}>
              <Col xs={24} sm={24} md={24} lg={6}>
                <Row style={{marginLeft: 40}}>
                  <Col span={24} style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: "16px", fontWeight:600}}>Sorting</Text>
                  </Col>
                  <Col>
                    <SortingComponent
                      state={this.state}
                      listData={this.state.products}
                      onSort={this.onSort}
                    />
                  </Col>
                  <Col span={24} style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: "16px", fontWeight:600 }}>Brands</Text>
                  </Col>
                  <Col>
                    <BrandFilterComponent
                      state={this.state}
                      listData={this.state.companies}
                      onFilter={this.onFilter}
                      onInit= {this.onInit}
                    />
                  </Col>
                  <Col span={24} style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: "16px", fontWeight:600 }}>Tags</Text>
                  </Col>
                  <Col>
                    <TagFilterComponent
                      state={this.state}
                      listData={this.state.tags}
                      onInit={this.onInit}
                      onFilter={this.onFilter}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Row gutter={[0, 10]}>
                  <Col span={24} style={{ textAlign: "left" }}>
                    <Text style={{ fontSize: "24px" }}>Products</Text>
                  </Col>
                  <Col>
                    <ButtonRadioComponent 
                      options={this.state.itemTypesOptions} 
                      onInit={this.onInit}
                      onFilter={this.onFilter}
                    />
                  </Col>
                  <Col>
                    <CardContainer
                      state={this.state}
                      addToCart={this.addToCart}
                    />
                  </Col>

                </Row>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6}>
                <Row  style={{marginLeft: 40}}>
                  
                  <Col>
                    <ShoppingCartContainer 
                      state={this.state}
                      plusMinusCart={this.plusMinusCart}
                      deleteCart={this.deleteCart} 
                    />
                  </Col>
                  
                </Row>
              </Col>
            </Row>
            <FooterComponent />
          </>
        )}
      </StyledBody>

    );
  }
}

MainDesktopPage.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getProductsResult: PropTypes.objectOf(PropTypes.any),

  getCompanies: PropTypes.func.isRequired,
  getCompaniesResult: PropTypes.objectOf(PropTypes.any),

  saveToCart: PropTypes.func.isRequired,
  saveToCartResult: PropTypes.objectOf(PropTypes.any),

  updateCart: PropTypes.func.isRequired,
  updateCartResult: PropTypes.objectOf(PropTypes.any),

  getCarts: PropTypes.func.isRequired,
  getCartsResult: PropTypes.objectOf(PropTypes.any),

  deleteFromCart: PropTypes.func.isRequired,
  deleteFromCartResult: PropTypes.objectOf(PropTypes.any),
};

MainDesktopPage.defaultProps = {
  getProductsResult: null,
  getCompaniesResult: null,
  saveToCartResult: null,
  updateCartResult: null,
  getCartsResult: null,
  deleteFromCartResult: null

};

const mapStateToProps = state => ({
  getProductsResult: state.getProductsResult,
  getCompaniesResult: state.getCompaniesResult,
  saveToCartResult: state.saveToCartResult,
  updateCartResult: state.updateCartResult,
  getCartsResult: state.getCartsResult,
  deleteFromCartResult: state.deleteFromCartResult

});

const mapDispatchToProps = {
  getProducts,
  getCompanies,
  saveToCart,
  updateCart,
  getCarts,
  deleteFromCart
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(MainDesktopPage);
