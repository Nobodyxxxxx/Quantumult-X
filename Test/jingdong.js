const url = $request.url;
if (!$response.body) $done({});

let obj = JSON.parse($response.body);

// 移除广告的功能ID列表
const removeList = [
  "applezhushou",     // Apple助手
  "dongdongnongchangxin", // 东东农场
  "wenyishengxin",       // 问医生
  "wangwangleyuan",    // 汪汪庄园
  "zhuanzuanhongbao", // 天天赚红包
"niudanshangdian",
"gengduoxin",
"jijianfuwu",
  "lingjifen",
  "wanyiwan",
  "xianzhiguanjia",
  "doudizhu",
  "huanletaojin",
  "yangzhuzhu"
];

// 过滤并将按钮整合到一行
function filterAndAlign(floor) {
  if (floor?.data?.nodes?.length > 0) {
    let node = floor.data.nodes;

    // 过滤广告
    node[0] = node[0].filter((i) => !removeList.includes(i?.functionId));

    // 如果 node[0] 有多个子项，合并它们为一行
    if (node[0]?.length > 0) {
      node[0] = [...node[0], ...node[1]];
      node[1] = []; // 清空第二行
    }
  }
}

// 检查是否为 personinfoBusiness 请求
if (url.includes("functionId=personinfoBusiness")) {
  if (obj?.floors?.length > 0) {
    obj.floors.forEach(floor => {
      filterAndAlign(floor); // 移除广告并整合按钮
    });
  }
}

// 返回修改后的响应体
$done({ body: JSON.stringify(obj) });