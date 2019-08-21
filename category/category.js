 (function(){
    // category类目
    var itemTmpl = '<div class="category-item">'+
                        '<img class="item-icon" src=$url />'+
                        '<p class="item-name">$name</p>'+
                    '</div>';

    function initCategory(argument) {
        $.get('../json/head.json', function(data){
            console.log(data);
            var list = data.data.primary_filter.splice(0,8);
            list.forEach(function(item, index){
                var str = itemTmpl.replace('$url',item.url).
                replace('$name',item.name);


                $('.category-content').append(str);

            });
        });
    }     


    function addClick(){
        $('.category-content').on('click','.category-item', function(){
            alert(1);
        });
    }


    function init(argument) {
        initCategory();
        addClick();
    }


    init();
})();
