import React, { Component, Fragment } from "react";

// import "./styles/App.css";
// 引入layout组件
import Mylayout from "./compoments/Mylayout";

// 引入路由组件
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
// import Mine from "./pages/Mine";
import GoodsDetail from "./pages/GoodsDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "redTab",
      hidden: false,
      fullScreen: false
    };
  }
  render() {
    return (
      <Fragment>
        <Router>
          {/* 首页 */}
          <Route
            path="/"
            exact
            render={props => (
              <Mylayout {...props}>
                <Home />
              </Mylayout>
            )}
          />
          {/* 购物车 */}
          <Route
            path="/Cart"
            render={props => (
              <Mylayout {...props}>
                <Cart />
              </Mylayout>
            )}
          />
          {/* 我的 */}
          <Route
            path="/Mine"
            render={props => (
              <Mylayout {...props}>
                <Cart />
              </Mylayout>
            )}
          />
          {/* 商品的详情 */}
          <Route path="/GoodsDetail/:id" component={GoodsDetail} />
        </Router>
      </Fragment>
    );
  }
}

export default App;
