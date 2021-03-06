import { parseJSON } from '../../util/index'
import { config } from '../../config/index'
import { triggerAudio, autoAudio } from '../../component/audio/manager'
import { triggerVideo, autoVideo, hasVideoObj } from '../../component/video/manager'

//临时音频动作数据
const tempData = {}

//音频按钮尺寸
const mediaIconSize = 74

/**
 * 仅创建一次
 * data传递参数问题
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
const onlyCreateOnce = (id) => {
  let data = tempData[id]
  if(data) {
    delete tempData[id]
    return data;
  }
}


export default {

  createDom({
    _id,
    md5,
    actType,
    category,
    itemArray,
    scaleWidth,
    scaleHeight,
    scaleTop,
    scaleLeft
  }, chpaterData, chapterId, pageIndex, zIndex, pageType) {

    let html
    let mediaIcon = ''
    let startImage = ''

    //如果没有宽高则不创建绑定节点
    if(!scaleWidth || !scaleHeight) return ''

    //解析音乐动作
    //冒泡动作靠节点传递数据
    if(itemArray) {
      itemArray = parseJSON(itemArray);
      let start = itemArray[0];
      let stop = itemArray[1];
      tempData[_id] = {};
      if(start) {
        if(start.startImg) {
          startImage = start.startImg;
          tempData[_id]['startImg'] = startImage;
          startImage = 'background-image:url(' + config.pathAddress + startImage + ');';
        }
        if(start.script) {
          tempData[_id]['startScript'] = start.script;
        }
      }
      if(stop) {
        if(stop.stopImg) {
          tempData[_id]['stopImg'] = stop.stopImg;
        }
        if(stop.script) {
          tempData[_id]['stopScript'] = stop.script
        }
      }
    }

    //只针对网页插件增加单独的点击界面
    //如果有视频图标
    if(category == 'webpage' &&
      (scaleWidth > 200) &&
      (scaleHeight > 100) &&
      (scaleWidth <= config.visualSize.width) &&
      (scaleHeight <= config.visualSize.height)) {
      mediaIcon =
        `<div id="icon_${_id}"
              type="icon"
              style="width:${mediaIconSize}px;
                     height:${mediaIconSize}px;
                     top:${(scaleHeight - mediaIconSize) / 2}px;
                     left:${(scaleWidth - mediaIconSize) / 2}px;
                     position:absolute;background-image:url(images/icons/web_hotspot.png)">
         </div>`
    }

    //首字母大写
    const mediaType = category.replace(/(\w)/, v => v.toUpperCase())

    //创建音频对象
    //Webpage_1
    //Audio_1
    //Video_1
    return String.styleFormat(
      `<div id="${mediaType + "_" + _id}"
            data-belong="${pageType}"
            data-delegate="${category}"
            style="width:${scaleWidth}px;
                   height:${scaleHeight}px;
                   left:${scaleLeft}px;
                   top:${scaleTop}px;
                   z-index:${zIndex};
                   ${startImage}
                   background-size:100% 100%;
                   position:absolute;">
            ${mediaIcon}
       </div>`
    )
  }

  /**
   * 自动运行
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  ,
  autoPlay({
    id,
    category,
    rootNode,
    pageIndex,
    chapterId
  }) {
    if(!category) return
    if(category == 'audio') {
      autoAudio(chapterId, id, onlyCreateOnce(id));
    } else {
      autoVideo(chapterId, id, rootNode, pageIndex)
    }
  }


  /**
   * touchEnd 全局派发的点击事件
   * 如果stopGlobalEvent == ture 事件由全局派发
   */
  ,
  trigger({
    id,
    target,
    rootNode,
    pageIndex,
    activityId
  }) {
    const category = target.getAttribute('data-delegate')
    if(category) {
      /**
       * 传入chapterId 页面ID
       * activityId    视频ID
       * eleName       节点名  //切换控制
       * 根节点
       */
      const chapterId = Xut.Presentation.GetPageId(pageIndex);
      if(category == 'audio') {
        triggerAudio(chapterId, activityId, onlyCreateOnce(id))
      } else {
        let videoObj = hasVideoObj(chapterId, activityId)
        if(videoObj) {
          videoObj.play()
        } else {
          triggerVideo(chapterId, activityId, rootNode, pageIndex)
        }
      }
    }
  }
}
