import axios from "axios";

// 添加统一的默认的借口地址前缀
axios.defaults.baseURL = "http://react.zbztb.cn/site/";

// 添加响应拦截器 请求成功后会被调用的一个方法
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // console.log(response.data)
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/**
 * 获取首页轮播图+推荐商品数据
 */
export const getGoods = () => axios.get("goods/gettopdata/goods");

/**
 * 获取首页商品列表数据
 */
export const getGoodsList = () => axios.get("goods/getgoodsgroup");

/**
 * 获取商品的详情
 * @param {String} id 商品的id
 */
export const getGoodsInfo = (id) => axios.get("goods/getgoodsinfo/"+id);
