const url = $request.url;
if (!$response.body) $done({});

let obj = JSON.parse($response.body);

// 需要移除的功能ID列表
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

// 过滤并合并按钮为一行
function filterAndAlign(floor) {
  if (floor?.data?.nodes?.length > 0) {
    let node = floor.data.nodes;

    // 移除广告元素
    node[0] = node[0].filter((i) => !removeList.includes(i?.functionId));

    // 检查第二组按钮，如果有内容，将它们合并到第一组
    if (node[1]?.length > 0) {
      node[0] = [...node[0], ...node[1]];
      node[1] = []; // 清空第二行
    }

    // 限制按钮数量，防止布局溢出
    if (node[0].length > 5) {
      node[0] = node[0].slice(0, 5); // 只显示前5个按钮
    }
  }
}

// 确保处理正确的请求
if (url.includes("functionId=personinfoBusiness")) {
  if (obj?.floors?.length > 0) {
    obj.floors.forEach(floor => {
      filterAndAlign(floor); // 过滤并合并按钮
    });
  }
}

// 返回修改后的响应
$done({ body: JSON.stringify(obj) });