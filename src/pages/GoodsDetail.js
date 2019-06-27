import React, { Component, Fragment } from "react";

// 导入API接口
import { getGoodsInfo } from "../api";
// 导入UI组件
import { NavBar, Icon, Carousel, WingBlank } from "antd-mobile";
// 轮播图组件

class GoodsDetail extends Component {
  state = {
    imglist: [],
    imgHeight: 176,
    goodsinfo: {}
  };
  componentDidMount() {
    // 从props解构一个id出来
    const { id } = this.props.match.params;
    // console.log(this.props)
    getGoodsInfo(id).then(result => {
      console.log(result);
      if (result.status === 0) {
        this.setState({
          imglist: result.message.imglist,
          goodsinfo: result.message.goodsinfo
        });
      }
    });
  }
  render() {
    const { goodsinfo } = this.state;
    return (
      <Fragment>
        <NavBar
          mode="dark"
          leftContent={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          商品详情
        </NavBar>
        <WingBlank>
          {/* 轮播图 */}
          <Carousel autoplay infinite>
            {this.state.imglist.map(val => (
              <a
                key={val.id}
                href="javascript:;"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: this.state.imgHeight
                }}
              >
                <img
                  src={val.thumb_path}
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
          {/* 轮播图结束 */}
          {/* 商品介绍 */}
          <div className="goods_production">
            <div className="goods_title">{goodsinfo.title}</div>
            <div className="sub_title">{goodsinfo.sub_title}</div>
            <div className="goods_price">
              <span className="sell_price">{goodsinfo.sell_price}</span>
              <span className="market_price">{goodsinfo.market_price}</span>
            </div>
            <div className="goods_info">
              <div className="goods_info_title">商品参数</div>
              <div className="goods_no">商品编号 : {goodsinfo.goods_no}</div>
              <div className="add_time">上架时间 : {goodsinfo.add_time}</div>
              <div
                className="goods_des"
                dangerouslySetInnerHTML={{ __html: goodsinfo.content }}
              />
            </div>
          </div>
          <style jsx>
            {`
              .goods_production {
                padding: 10px;
                background-color: #fff;
                .goods_title {
                  padding: 5px 0;
                  font-size: 15px;
                }
                .sub_title {
                  padding: 5px 0;
                  font-size: 13px;
                  color: #333;
                }
                .goods_price {
                  padding: 5px 0;
                  .sell_price {
                    font-size: 14px;
                    color: red;
                    margin-right: 7px;
                  }
                  .market_price {
                    color: #ccc;
                    text-decoration: line-through;
                  }
                }
                .goods_info {
                  margin-bottom: 50px;
                  .goods_info_title {
                    font-size: 15px;
                    padding: 5px 0;
                  }
                  .goods_no {
                    padding: 5px 0;
                  }
                  .add_time {
                    padding: 5px 0;
                  }
                }
              }
            `}
          </style>
          {/* 商品介绍结束 */}
        </WingBlank>
        {/* 底部工具栏 */}
        <div className="btm_tool">
          <div className="btn_item btn_content">
            <span className="iconfont icon-kefu" />
            <p>客服</p>
          </div>
          <div className="btn_item btn_cart">
            <span className="iconfont icon-gouwuche" />
            <p>购物车</p>
          </div>
          <div className="btn_item btn_add_cart">加入购物车</div>
          <div className="btn_item btn_shopping">立即购买</div>
          <style jsx>
            {`
              .btm_tool {
                display: flex;
                height: 40px;
                width: 100%;
                position: fixed;
                bottom: 0;
                left: 0;
                background-color: #fff;
                .btn_item {
                  flex: 2;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                }
                .btn_content {
                  font-size:12px;
                }
                .btn_cart {
                  font-size:12px;
                }
                .btn_add_cart {
                  color: #fff;
                  font-size: 12px;
                  background-color: orangered;
                  flex: 4;
                }
                .btn_shopping {
                  flex: 3;
                  color: #fff;
                  font-size: 12px;
                  background-color: orange;
                }
              }
            `}
          </style>
        </div>
        {/* 底部工具栏结束 */}
      </Fragment>
    );
  }
}

export default GoodsDetail;
