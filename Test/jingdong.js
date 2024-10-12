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
  "yangzhuzhu",
  "kehufuwu"
];
// 过滤并合并按钮到一行
function filterAndAlign(floor) {
  if (floor?.data?.nodes?.length > 0) {
    let node = floor.data.nodes;

    // 移除广告元素
    node[0] = node[0].filter((i) => !removeList.includes(i?.functionId));

    // 如果第二行存在按钮，合并它们到第一行
    if (node[1]?.length > 0) {
      node[0] = [...node[0], ...node[1]];  // 合并到第一行
      node[1] = [];  // 清空第二行
    }

    // 如果存在其他多行布局样式字段，清除它
    if (floor.data?.style) {
      delete floor.data.style;  // 删除任何可能导致多行显示的样式
    }

    // 强制显示为一行
    if (node[0].length > 0) {
      // 你可以根据需要调整最大按钮显示数量
      floor.data.nodes = [node[0].slice(0, 1)];  // 将按钮放到一行
    }
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
// 需要移除的标题
const removeTitles = [
 "wodebaitiao", // "金条借款"
 "jijin" //"京东财富"
];
// 过滤掉 walletList 中带有特定标题的项目
function filterWalletList(data) {
  if (data?.walletList?.length > 0) {
    data.walletList = data.walletList.filter((item) => 
      !(item.title && removeTitles.includes(item.title.value))
    );
  }
}
// 返回修改后的响应体
$done({ body: JSON.stringify(obj) });



