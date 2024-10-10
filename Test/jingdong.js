//@RuCu6
// 2024-10-10

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("functionId=personinfoBusiness")) {
    // 个人页面
    if (obj?.floors?.length > 0) {
        let newFloors = [];
        const items = [
            //"basefloorinfo",
            //"userinfo",
            //"orderIdFloor", // 我的订单
            //"recommendfloor", // 我的推荐
            //"newStyleAttentionCard", // 新版关注的频道
            //"keyToolsFloor", // 浏览记录
            //"newWalletIdFloor", // 我的钱包
            //"iconToolFloor", // 底部工具栏
            //"newsFloor", // 京东快讯
            //"supportFloors"
            //"bigSaleFloor", // 双十一
            //"buyOften", // 常买常逛
            //"newAttentionCard", // 关注的频道
            //"newBigSaleFloor", // 双十一
            //"noticeFloor", // 顶部横幅
        ];
        for (let floor of obj.floors) {
            if (!items.includes(floor?.mId)) {
                newFloors.push(floor); // 将未过滤的楼层添加到 newFloors 中
            }
        }
        obj.floors = newFloors; // 将过滤后的楼层赋值回去
    }
}

