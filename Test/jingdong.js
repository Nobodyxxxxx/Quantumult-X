let url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (url.includes("/client.action?functionId=readCustomSurfaceList")) {
  // 调试: 输出 dark 模式下的导航项
  if (obj?.result?.modeMap?.dark?.navigationAll?.length > 0) {
    $notify("调试信息", "过滤前 dark 模式下的导航项", JSON.stringify(obj.result.modeMap.dark.navigationAll));
    
    // 进行过滤
    obj.result.modeMap.dark.navigationAll = obj.result.modeMap.dark.navigationAll.filter((i) => !/(find|new)/.test(i?.functionId));

    // 调试: 输出过滤后的导航项
    $notify("调试信息", "过滤后 dark 模式下的导航项", JSON.stringify(obj.result.modeMap.dark.navigationAll));
  }

  // 调试: 输出 normal 模式下的导航项
  if (obj?.result?.modeMap?.normal?.navigationAll?.length > 0) {
    $notify("调试信息", "过滤前 normal 模式下的导航项", JSON.stringify(obj.result.modeMap.normal.navigationAll));

    // 进行过滤
    obj.result.modeMap.normal.navigationAll = obj.result.modeMap.normal.navigationAll.filter((i) => !/(find|new)/.test(i?.functionId));

    // 调试: 输出过滤后的导航项
    $notify("调试信息", "过滤后 normal 模式下的导航项", JSON.stringify(obj.result.modeMap.normal.navigationAll));
  }

  $done({ body: JSON.stringify(obj) });
}