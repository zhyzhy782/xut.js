/************************
 * 左边页面钩子
 *     distance 正数，1-2-3-4 -> N 变化
 *     pageStyles：3个页面的style配置
 *************************/
export const leftPageHook = {
  flipMove: {
    prev(distance, pageStyles) {
      let middlePageStyle = pageStyles.middle
      let leftPageStyle = pageStyles.left

      //中间：溢出
      if(middlePageStyle && middlePageStyle.visualLeftInteger) {
        //左边：溢出
        if(leftPageStyle && leftPageStyle.visualLeftInteger) {
          return -leftPageStyle.visualWidth + distance
        }
        //左边：正常
        else {
          return distance - leftPageStyle.visualWidth - middlePageStyle.visualLeftInteger
        }
      }
      //中间：正常
      else {
        //左边：溢出
        if(leftPageStyle && leftPageStyle.visualLeftInteger) {
          return distance - leftPageStyle.visualWidth + leftPageStyle.visualLeftInteger
        }
        //左边：正常
        else {
          return distance - leftPageStyle.visualWidth
        }
      }
    },
    next() {}
  },
  flipRebound: {
    prev(distance, pageStyles) {
      let middlePageStyle = pageStyles.middle
      let leftPageStyle = pageStyles.left

      //中间：溢出
      if(middlePageStyle && middlePageStyle.visualLeftInteger) {
        //左边：溢出
        if(leftPageStyle && leftPageStyle.visualLeftInteger) {
          return -leftPageStyle.visualWidth
        }
        //左边：正常
        else {
          return -(leftPageStyle.visualWidth + middlePageStyle.visualLeftInteger)
        }
      }
      //中间：正常
      else {
        //左边：溢出
        if(leftPageStyle && leftPageStyle.visualLeftInteger) {
          return -(leftPageStyle.visualWidth - leftPageStyle.visualLeftInteger)
        }
        //左边：正常
        else {
          return -leftPageStyle.visualWidth
        }
      }

    },
    next() {}
  },
  flipOver: {
    prev() {
      return 0
    },
    next() {}
  }
}