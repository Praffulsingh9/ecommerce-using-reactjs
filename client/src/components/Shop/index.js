import React, { Component } from "react";
import PageTop from "../utils/page_top";
import { connect } from "react-redux";
import { getBrands, getWoods } from "../../actions/product_actions";
class Shop extends Component {
  componentDidMount = () => {
    this.props.getBrands();
    this.props.getWoods();
  };

  render() {
    const products = this.props.products;
    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">left</div>
            <div className="right">right</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { getBrands, getWoods }
)(Shop);
