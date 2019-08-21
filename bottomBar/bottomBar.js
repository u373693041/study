
(function(){


    var itemTmpl = '<a class="$key btn-item" href="$key.html"><div class="tab-icon"></div><div class="btn-name">$text</div></a>';


    function init(){
        var items = [{
            key: 'index',
            text: '首页',
            href:'http://www.gyx.com'
        },{
            key: 'order',
            text: '订单',
            href:'http://www.gyx.com/order/order.html'
        },{
            key: 'my',
            text: '我的',
            href:'http://www.gyx.com/my/my.html'
        }];

        var str = '';

        items.forEach(function(items, index){
            str += itemTmpl.replace('$key',items.key)
                    .replace('$text',items.text)
                    .replace('$key.html',items.href);

        });
        
        $('.bottom-bar').append(str);

        var arr = window.location.pathname.split('/') ;
        var page = arr[arr.length-1].replace('.html','') || 'index';
    
        $('a.'+page).addClass('active');


    }


    init();



})();
