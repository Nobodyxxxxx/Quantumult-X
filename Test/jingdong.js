// 获取请求的 URL
const url = $request.url;

// 如果响应体为空，则直接结束脚本
if (!$response.body) $done({});

// 解析响应体
let obj = JSON.parse($response.body);

// 广告元素的 functionId 列表，用于识别哪些是广告
const sortLists = [
  "applezhushou",     // apple助手
  "lingjindouxin",    // 签到领豆
  "dongdongnongchangxin", // 京东农场
  "chongwangwang",    // 宠汪汪
  "kehufuwu",         // 客户服务
  "xianzhiguanjia",   // 闲置换钱
  "wenyisheng",       // 问医生
  "jijianfuwu",       // 寄件服务
  "zhuanzuanhongbao", // 天天赚红包
  "huanletaojin"      // 欢乐淘金
];

// 递归函数，用于移除广告并保留有效功能
function filterToolbar(floor) {
  if (floor?.data?.nodes?.length > 0) {
    let node = floor.data.nodes;

    if (node?.[0]?.length > 0) {
      console.log("Before filtering Group 1:", JSON.stringify(node[0])); // 调试输出，查看过滤前的内容
      // 第一组十个功能，过滤并排序
      node[0] = node[0]
        .filter((i) => sortLists.includes(i?.functionId)) // 过滤非广告功能
        .sort((a, b) => sortLists.indexOf(a?.functionId) - sortLists.indexOf(b?.functionId)); // 按照 sortLists 排序
      console.log("After filtering Group 1:", JSON.stringify(node[0])); // 调试输出，查看过滤后的内容
    }
    
    if (node?.[1]?.length > 0) {
      console.log("Before filtering Group 2:", JSON.stringify(node[1])); // 调试输出，查看过滤前的内容
      // 第二组四个功能，过滤并排序
      node[1] = node[1]
        .filter((i) => sortLists.includes(i?.functionId)) // 过滤非广告功能
        .sort((a, b) => sortLists.indexOf(a?.functionId) - sortLists.indexOf(b?.functionId)); // 按照 sortLists 排序
      console.log("After filtering Group 2:", JSON.stringify(node[1])); // 调试输出，查看过滤后的内容
    }
  }
}

// 检查请求的 functionId 是否为 personinfoBusiness
if (url.includes("functionId=personinfoBusiness")) {
  // 遍历 floors 移除广告
  if (obj?.floors?.length > 0) {
    obj.floors.forEach(floor => {
      filterToolbar(floor); // 过滤底部工具栏广告
    });
  }
}

// 将修改后的对象重新转换为 JSON 字符串并返回
$done({ body: JSON.stringify(obj) });