const url = $request.url;
if (!$response.body) $done({});

let obj = JSON.parse($response.body);

// 需要移除的广告功能ID列表
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

// 过滤并合并按钮到一行
function filterAndAlign(floor) {
  if (floor?.nodes?.length > 0) {
    let nodes = floor.nodes.flat();  // 合并多行的按钮为一个数组

    // 移除广告元素
    nodes = nodes.filter((item) => !removeList.includes(item.functionId));

    // 将过滤后的按钮重新放入nodes，并只保留一行
    floor.nodes = [nodes];
  }
}

// 确保这是正确的 API 请求
if (url.includes("functionId=personinfoBusiness")) {
  if (obj?.floors?.length > 0) {
    obj.floors.forEach(floor => {
      filterAndAlign(floor);  // 处理每个 floor，合并按钮
    });
  }
}

// 返回修改后的响应体
$done({ body: JSON.stringify(obj) });