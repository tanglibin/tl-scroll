/**是否为IE浏览器 */
const isIE = function(){
    let userAgent = navigator.userAgent;
    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //IE<11
    let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;//IE11
    return isIE || isEdge || isIE11;
}


/**是否显示滚动条 */
const isShowScroll = function(viewWidth, viewHeight, boxWidth, boxHeight, barSize){
    let diffY = viewHeight - boxHeight;
    let diffX = viewWidth - boxWidth;
    let showY = false;
    let showX = false;

    if(diffY > 0){
        if(diffX > 0 || Math.abs(diffX) < barSize){
            showX = true;
        }
        showY = true;
    }
    else if(diffX > 0){
        if(Math.abs(diffY) < barSize){
            showY = true;
        }
        showX = true;
    }
    return {showX, showY};
}


/**滚动至 */
const tlScrollTo = function(dom, target, isX){
    let method = isX ? 'scrollLeft' : 'scrollTop'
    const fun = function(){
        let curVal = dom[method];
        let diff = target - curVal;
        if(!diff){
            return ;
        }
        setTimeout(() => {
            curVal += Math.ceil(diff / 10);
            dom[method] = curVal;
            if( Math.abs(diff) <= 10){
                dom[method] = target;
            }else{
                fun();
            }
        }, 1);
    }
    fun();
}

export {isIE, isShowScroll, tlScrollTo};