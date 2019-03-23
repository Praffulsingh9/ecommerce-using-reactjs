import React, { Component } from "react";
import PageTop from "../utils/page_top";
import ProdNfo from "./prodNfo";
import ProdImage from "./prodImage";
import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail
} from "../../actions/product_actions";
class ProductPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProductDetail(id).then(response => {
      if (!this.props.products.prodDetail) {
        this.props.history.push("/");
      }
    });
  }

  componentWillUnmount() {
    this.props.clearProductDetail();
  }

  render() {
    return (
      <div>
        <PageTop title="Product Detail" />
        <div className="container">
          {this.props.products.prodDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProdImage detail={this.props.products.prodDetail} />
                </div>
              </div>
              <div className="right">
                <ProdNfo
                  detail={this.props.products.prodDetail}
                  addToCart={id => this.addToCartHandler(id)}
                />
              </div>
            </div>
          ) : (
            "Loading"
          )}
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
  { getProductDetail, clearProductDetail }
)(ProductPage);
