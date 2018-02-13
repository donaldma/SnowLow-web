import { dataThatNeedsSantization, categoryDataHash } from './DataList'

export default {
  getSanitizedSearchTerm(searchTerm) {
    const searchTermToLower = searchTerm.toLowerCase()
    const searchTermToLowerSplitJoin = searchTermToLower.split(' ').join('-')

    if(!dataThatNeedsSantization.includes(searchTermToLower)) {
      return searchTermToLowerSplitJoin
    }

    for(let category in categoryDataHash) {
      for(let equipment of categoryDataHash[category]) {
        if(equipment === searchTermToLower) {
          return `${category}-${searchTermToLowerSplitJoin}`
        }
      }
    }
  }
}