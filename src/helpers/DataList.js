
const snowboardData = ['snowboards', 'mid layers', 'base layers', 'gloves', 'mittens', 'body armor', 'goggles', 'helmets', 'snowboard packages', 'snowboard boots', 'snowboard bindings', 'snowboard socks', 'snowboard bags', 'snowboard backcountry', 'snowboard jackets', 'snowboard pants']
const skiData = ['skis', 'ski Bags', 'ski packages', 'ski boots', 'ski bindings', 'ski poles', 'ski backcountry', 'ski jackets', 'ski pants']

export const categoryDataHash = {
  snowboard: snowboardData,
  ski: skiData
}

export const combinedDataList = snowboardData.concat(skiData)
export const dataThatNeedsSantization = ['snowboards', 'mid layers', 'base layers', 'gloves', 'mittens', 'body armor', 'googles', 'helmet', 'skis']