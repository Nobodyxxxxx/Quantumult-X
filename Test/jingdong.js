const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/client.action?functionId=readCustomSurfaceList")) {
  // 底部标签栏
  if (obj?.result?.modeMap?.dark?.navigationAll?.length > 0) {
    // 过滤掉“逛”和“新品”
    obj.result.modeMap.dark.navigationAll = obj.result.modeMap.dark.navigationAll.filter((i) => !/(find|new)/.test(i?.functionId));
  }

}

$done({ body: JSON.stringify(obj) });