import React, { Component, Fragment } from "react";

import { Carousel, WingBlank } from "antd-mobile";

// 调用API接口
import { getGoods } from "../api";

class Home extends Component {
  state = {
    sliderlist: [],
    imgHeight: 176
  };
  componentDidMount() {
    getGoods().then(result => {
      if (result.status === 0) {
        this.setState({ sliderlist: result.message.sliderlist });
        console.log(result);
      }
    });
  }
  render() {
    return (
      <Fragment>
        <WingBlank>
          <Carousel
            autoplay
            infinite
          >
            {this.state.sliderlist.map(val => (
              <a
                key={val.id}
                href="http://www.alipay.com"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: this.state.imgHeight
                }}
              >
                <img
                  src={val.img_url}
                  alt=""
                  style={{ width: "100%", verticalAlign: "top" }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event("resize"));
                    this.setState({ imgHeight: "auto" });
                  }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>
      </Fragment>
    );
  }
}

export default Home;
