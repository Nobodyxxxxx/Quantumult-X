// 去除特定广告元素
const body = $response.body;
let obj = JSON.parse(body);

// 过滤掉东东农场、玩一玩、问医生、Apple助手和汪汪庄园
const removeIds = ["dongdongnongchangxin", "wanyiwan", "askDoctor", "appleAssistant", "wangwangzhuangyuan"];

// 遍历并删除指定的广告元素
if (obj && obj.floors) {
  obj.floors = obj.floors.filter(floor => {
    // 删除包含指定广告 ID 的楼层
    return !removeIds.includes(floor.bId);
  });
}

// 将过滤后的内容返回
$done({ body: JSON.stringify(obj) });