// 获取请求的 URL
const url = $request.url;

// 如果响应体为空，则直接结束脚本
if (!$response.body) $done({});

// 解析响应体
let obj = JSON.parse($response.body);

// 广告元素的关键词，通常以广告的功能ID或相关描述为标识
const removeKeywords = ["dongdongnongchangxin", "wanyiwan", "askDoctor", "appleAssistant", "wangwangzhuangyuan", "东东农场", "玩一玩", "问医生", "Apple助手", "汪汪庄园"];

// 递归函数，用于查找并移除包含广告的节点
function removeAds(node) {
    // 判断当前节点是否包含广告关键字
    if (node && typeof node === "object") {
        for (let key in node) {
            if (typeof node[key] === "string") {
                // 如果某个字段的值包含广告关键词，则删除该节点
                if (removeKeywords.some(keyword => node[key].includes(keyword))) {
                    delete node[key];
                }
            } else if (Array.isArray(node[key])) {
                // 递归处理数组中的每个对象
                node[key] = node[key].filter(item => !removeKeywords.some(keyword => JSON.stringify(item).includes(keyword)));
                node[key].forEach(removeAds);
            } else if (typeof node[key] === "object") {
                // 递归处理对象
                removeAds(node[key]);
            }
        }
    }
}

// 检查请求的 functionId 是否为 personinfoBusiness
if (url.includes("functionId=personinfoBusiness")) {
    // 移除广告
    removeAds(obj);
}

// 将修改后的对象重新转换为 JSON 字符串并返回
$done({ body: JSON.stringify(obj) });