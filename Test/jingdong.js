const url = $request.url;
if (!$response.body) $done({});

let obj = JSON.parse($response.body);

// 定义需要移除的广告功能ID
const removeList = [
  "applezhushou",     // Apple助手
  "dongdongnongchangxin", // 东东农场
  "wenyishengxin",       // 问医生
  "wangwangleyuan",    // 汪汪庄园
  "zhuanzuanhongbao", // 天天赚红包
  "lingjifen",
  "wanyiwan",
  "xianzhiguanjia",
  "doudizhu",
  "huanletaojin",
  "yangzhuzhu"
];

// 过滤节点
function filterAds(floor) {
  if (floor?.data?.nodes?.length > 0) {
    let node = floor.data.nodes;

    if (node?.[0]?.length > 0) {
      // 过滤第一组
      node[0] = node[0].filter((i) => !removeList.includes(i?.functionId));
    }

    if (node?.[1]?.length > 0) {
      // 过滤第二组
      node[1] = node[1].filter((i) => !removeList.includes(i?.functionId));
    }
  }
}

// 检查 functionId 是否为 personinfoBusiness，确保仅修改该 API 的响应
if (url.includes("functionId=personinfoBusiness")) {
  if (obj?.floors?.length > 0) {
    obj.floors.forEach(floor => {
      filterAds(floor); // 过滤广告
    });
  }
}

// 返回修改后的响应
$done({ body: JSON.stringify(obj) });