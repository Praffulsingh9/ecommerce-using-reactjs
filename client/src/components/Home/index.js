import React, { Component } from "react";
import HomeSlider from "./home_slider";
import HomePromotion from "./home_promotions";
import { connect } from "react-redux";
import {
  getProductsByArrival,
  getProductsBySell
} from "../../actions/product_actions";

class Home extends Component {
  componentDidMount() {
    this.props.getProductsBySell();
    this.props.getProductsByArrival();
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <HomePromotion />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});
export default connect(
  mapStateToProps,
  { getProductsByArrival, getProductsBySell }
)(Home);
