
(function(){
    // 订单详情模版

    var itemBottomTmpl = '<div class="bottom-content">'+
                        '<div class="shop-icon">'+
                            '<div class="dot-num hide" ></div>'+
                        '</div>'+
                        '<div class="price-content">'+
                            '<p class="total-price">¥<span class="total-price-span">0</span></p>'+
                            '<p class="other-price">另需配送&nbsp;¥<span class="shipping-fee"></span></p>'+
                        '</div>'+
                        '<div class="submit-btn">去结算</div>'+
                    '</div>';

    var itemTopTmpl = '<div class="choose-content hide">'+
                        '<div class="content-top">'+
                            '<div class="clear-car">清空购物车</div>'+
                        '</div>'+
                      '</div>';

    var $strBottom = $(itemBottomTmpl);
    var $strTop = $(itemTopTmpl);


    function addClick(){
        $('.shop-bar').on('click','.shop-icon', function(e){
            $('.mask').toggle();
            $strTop.toggle();
        });
        $strTop.on('click','.plus', function(e){
            
            var $count = $(e.currentTarget).parent().find('.count');
            $count.text(parseInt($count.text()||'0')+1);

            var $item = $(e.currentTarget).parents('.choose-item').first();

            var itemData = $item.data('itemData');

            // window.ShopBar.addItems(itemData);

            itemData.chooseCount = itemData.chooseCount +1;

            renderItems();
            //因为每次点击左侧栏，都会对右侧项目进行重新渲染，以此来打到右侧数量的加减
            $('.left-item.active').click();


        });
        $strTop.on('click','.minus', function(e){
            
            var $count = $(e.currentTarget).parent().find('.count');
            var val = Math.max((parseInt($count.text()||'0')-1),0);
            
            if ($count.text() == 0) return;
            var $item = $(e.currentTarget).parents('.choose-item').first();

            var itemData = $item.data('itemData');

            // window.ShopBar.minusItem(itemData);

            $count.text(val);

            itemData.chooseCount = itemData.chooseCount -1;
            renderItems();
            $('.left-item.active').click();
        });
    }

    function changeShippingPrice(val){
        $strBottom.find('.shipping-fee').text(val);
    }
    function changeTotalPrice(val){
        $strBottom.find('.total-price-span').text(val);
    }

    function changeDot(){
        
        var $counts = $strTop.find('.count');
        var total = 0;
        for (var i = 0 ; i < $counts.length ; i++) {
            total += parseFloat($($counts[i]).text());
        }
        
        if (total > 0) {
            $('.dot-num').show().text(total);
        } else {
            $('.dot-num').hide();
        }
        
    }

    function renderItems() {
        $($strTop).find('.choose-item').remove();
        var list = window.food_spu_tags;
        var tmpl =  '<div data-id="$id" class="choose-item">'+
                '<div class="item-name">$name</div>'+
                '<div class="price">¥<span class="total">$price</span></div>'+
                '<div class="select-content">'+
                    '<div class="minus"></div>'+
                    '<div class="count">$chooseCount</div>'+
                    '<div class="plus"></div>'+
                '</div>'+
            '</div>';
        var totalPrice = 0;
        list.forEach(function(item){
            item.spus.forEach(function(_item){
                if (_item.chooseCount > 0) {
                    var price = _item.min_price*_item.chooseCount;
                    var row = tmpl.replace('$id',_item.id)
                            .replace('$name',_item.name)
                            .replace('$price',price)
                            .replace('$chooseCount',_item.chooseCount);

                    totalPrice += price;
                    $row = $(row);
                    $row.data('itemData',_item);
                    $($strTop).append($row);
                }
            })
        })
        changeTotalPrice(totalPrice);
        changeDot();
    }
/*由于每次调用renderItems，都是所有数据的重新渲染，故无需特意加减
    function addItems(item){
        // $($strTop).find('.choose-item').remove();


        
        var repeatItem = $($strTop).find('[data-id='+item.id+']');
        if (repeatItem.length === 0) {
            var row = tmpl.replace('$id',item.id)
                .replace('$name',item.name)
                .replace('$price',item.min_price)
                .replace('$chooseCount',1);

            var $row = $(row);

            $($strTop).append($row);


        } else {
            var total = repeatItem.find('.total');
            var count = repeatItem.find('.count');
            var totalPrice = (parseFloat(count.text())+1)*item.min_price;
            total.text(totalPrice);
            count.text((parseFloat(count.text())+1));

        }

        var totalPrice = parseFloat($('.total-price-span').text()) + item.min_price
        changeTotalPrice(totalPrice);


        changeDot();

    }

    function minusItem(item){
        
        var repeatItem = $($strTop).find('[data-id='+item.id+']').first();
        var count = repeatItem.find('.count');
        var total = repeatItem.find('.total');
        if (parseFloat(count.text()) === 1) {
            repeatItem.remove();
        } else {
            var totalPrice = (parseFloat(count.text())-1)*item.min_price;
            count.text(parseFloat(count.text())-1);
            total.text(totalPrice);
        }

        var totalPrice = Math.max(parseFloat($('.total-price-span').text()) - item.min_price,0)

        changeTotalPrice(totalPrice);

        changeDot();
    }

*/

    /**
     * @constructor init
     * @description 列表单个组件
     */
    function init(){
        
        $('.shop-bar').append($strTop);
        $('.shop-bar').append($strBottom);
        addClick();
    }

    window.ShopBar = {
        changeTotalPrice:changeTotalPrice,
        changeShippingPrice:changeShippingPrice,
        //addItems:addItems,
        //minusItem:minusItem,
        renderItems:renderItems
    }


    init()


})();
