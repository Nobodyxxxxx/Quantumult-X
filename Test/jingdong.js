//@RuCu6
// 2024-10-10

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);
 if (url.includes("functionId=personinfoBusiness")) {
// 个人页面
  if (obj?.floors?.length > 0) {
    let newFloors = [];
    for (let floor of obj.floors) {
      const items = [
        "basefloorinfo"
        "userinfo"
        "orderIdFloor", // 我的订单
        "recommendfloor" // 我的推荐
        "newStyleAttentionCard", // 新版关注的频道
        "keyToolsFloor", // 浏览记录 
        "newWalletIdFloor", // 我的钱包 
        "iconToolFloor", // 底部工具栏 
        "newsFloor", // 京东快讯 
         "supportFloors"
      
        //"bigSaleFloor", // 双十一
        //"buyOften", // 常买常逛
        //"newAttentionCard", // 关注的频道
        //"newBigSaleFloor", // 双十一
        //"noticeFloor", // 顶部横幅
      ];
      if (items?.includes(floor?.mId)) {
        continue;
      } else {
        if (floor?.mId === "basefloorinfo") {
          // 弹窗
          if (floor?.data?.commonPopup) {
            delete floor.data.commonPopup;
          }
          // 弹窗
          if (floor?.data?.commonPopup_dynamic) {
            delete floor.data.commonPopup_dynamic;
          }
          // 底部会员续费横幅
          if (floor?.data?.commonTips?.length > 0) {
            floor.data.commonTips = [];
          }
          // 弹窗
          if (floor?.data?.commonWindows?.length > 0) {
            floor.data.commonWindows = [];
          }
          // 右下角动图
          if (floor?.data?.floatLayer) {
            delete floor.data.floatLayer;
          }
        }
      }
