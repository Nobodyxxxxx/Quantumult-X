const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/client.action?functionId=readCustomSurfaceList")) {
  // 检查 modeMap 中的 dark 和 normal 模式的底部导航栏
  if (obj?.result?.modeMap?.dark?.navigationAll?.length > 0) {
    // 过滤掉“逛”和“新品” (find 和 new)
    obj.result.modeMap.dark.navigationAll = obj.result.modeMap.dark.navigationAll.filter((i) => !/(find|new)/.test(i?.functionId));
  }
  
  if (obj?.result?.modeMap?.normal?.navigationAll?.length > 0) {
    // 同样过滤掉 normal 模式下的“逛”和“新品”
    obj.result.modeMap.normal.navigationAll = obj.result.modeMap.normal.navigationAll.filter((i) => !/(find|new)/.test(i?.functionId));
  }
  
  // 其他可能需要删除的数据项
  delete obj.result.top_skin; // 删除顶部背景图
}

$done({ body: JSON.stringify(obj) });