import React, { Component, Fragment } from "react";

import { Carousel, WingBlank } from "antd-mobile";

// 调用API接口
import { getGoods, getGoodsList } from "../api";

class Home extends Component {
  state = {
    sliderlist: [],
    imgHeight: 176,
    toplist: [],
    goodslist: []
  };
  componentDidMount() {
    getGoods().then(result => {
      if (result.status === 0) {
        this.setState({ sliderlist: result.message.sliderlist });
        // console.log(result);
        this.setState({ toplist: result.message.toplist });
      }
    });
    getGoodsList().then(result => {
      this.setState({ goodslist: result.message });
    });
  }
  render() {
    return (
      <Fragment>
        {/* 轮播图部分开始 */}
        <WingBlank>
          <Carousel autoplay infinite>
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
          {/* 轮播图部分结束 */}
          {/* 推荐商品部分开始 */}
          <div className="recommend_row">
            <div className="recommend_row_title">推荐商品</div>
            <div className="recommend_row_content">
              {this.state.toplist.map(v => (
                <a href="javascript:;" className="top_item" key={v.id}>
                  <div className="top_item_img">
                    <img src={v.img_url} />
                  </div>
                  <div className="top_item_name">
                    <p>{v.title}</p>
                  </div>
                </a>
              ))}
            </div>
            <style jsx>{`
              .recommend_row_title {
                background-color: #ccc;
                color: #666;
                font-size: 14px;
                padding: 8px;
                margin-top: 5px;
              }
              .recommend_row_content {
                .top_item {
                  display: flex;
                  background-color: #fff;
                  border-bottom: 1px solid #ccc;
                  .top_item_img_wrap {
                    width: 20%;
                    padding: 20px;
                    img {
                      width: 80%;
                    }
                  }
                  .top_item_name {
                    width: 80%;
                    display: flex;
                    align-items: center;
                    p {
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                    }
                  }
                }
              }
            `}</style>
          </div>

          {/* 推荐商品部分结束 */}
          {/* 商品列表部分开始 */}
          <div className="goods_list">
            {this.state.goodslist.map(v => {
              return (
                <div key={v.level1cateid} className="goods_item">
                  <div className="goods_title">{v.catetitle}</div>
                  <div className="goods_content">
                    {v.datas.map(v2 => (
                      <a href="#" key={v2.artID}>
                        <img src={v2.img_url} alt="" />
                        <div className="art_title">{v2.artTitle}</div>
                        <div className="goods_price">
                          <span className="sell_price">{v2.sell_price}</span>
                          <span className="market_price">
                            {v2.market_price}
                          </span>
                        </div>
                        <div className="hot_sell">
                          热卖中 <span>{v2.stock_quantity}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}

            <style jsx>{`
              .goods_item {
                .goods_title {
                  background-color: #f5f5f9;
                  color: #666;
                  font-size: 14px;
                  padding: 8px;
                }
                .goods_content {
                  display: flex;
                  flex-wrap: wrap;
                  > a {
                    width: 50%;
                    border-bottom: 1px solid #ccc;
                    background-color: #fff;
                    padding: 5px;
                    &:nth-child(odd) {
                      border-right: 1px solid #ccc;
                    }
                    img {
                      width: 80%;
                      margin: 0 auto;
                    }
                    .art_title {
                      font-size: 12px;
                      color: #666;
                      padding: 5px 0;
                    }
                    .goods_price {
                      display: flex;
                      justify-content: space-between;
                      padding: 5px 0;
                      .sell_price {
                        font-size: 12px;
                        color: red;
                      }
                      .market_price {
                        font-size: 12px;
                        color: #ccc;
                        text-decoration: line-through;
                      }
                    }
                    .hot_sell {
                      padding: 5px 0;
                      span {
                        color: red;
                        font-size: 14px;
                      }
                    }
                  }
                }
              }
            `}</style>
          </div>
          {/* 商品列表部分结束 */}
        </WingBlank>
      </Fragment>
    );
  }
}

export default Home;
