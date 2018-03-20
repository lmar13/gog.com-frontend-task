$(document).ready(function() {
    
//    Initialize spots
    createSpots();
    
    
//    Cart item on hover show remove link
    $('.cart-item').hover(
      function() {
        $(this).find('small').css('visibility', 'visible');
      }, function() {
        $(this).find('small').css('visibility', 'hidden');
      }
    );
    
//    Open dropdown menu - cart menu
    $('a.open-cart').on('click', function (event) {
        $('div.dropdown-menu.dropdown-menu-right').toggleClass('show');
    });
    
//    Close dropdown (cart) on click but only outside of dropdown
    $('body').on('click', function (e) {
        if (!$('a.open-cart').is(e.target) 
            && $('a.open-cart').has(e.target).length === 0 
            && $('.show').has(e.target).length === 0
        ) {
            $('div.dropdown-menu.dropdown-menu-right').removeClass('show');
        }
    });
    
//    Count items and pirces and update required fileds
    countItems();
    countPrice();
    
//    Clear cart when button clicked
    $('#btn-clear').on('click', function(){
        $('.cart-items').empty();
        $.post('/clearCart');
        createSpots();
//        TODO when invoke functions to calculate priceses and number of items
    });
    
    $('#spotsContainer').on('click','button', function() {
        let btnText = $(this).html();
        let btnId = $(this).attr('id');
        let id = btnId.substring(4);
        if(btnText === 'IN CART') {
            return false;
        }
        else {
            $(this).html('IN CART');
            
            $.post('/addItemToCart', {"itemId": id}, function(data){
                let newElem = '';
                const mouseOver = "$(this).find('small').css('visibility', 'visible');";
                const mouseLeave = "$(this).find('small').css('visibility', 'hidden');";
                newElem += `<div class="dropdown-divider"></div>
                            <div class="cart-item" onmouseover="${mouseOver}" onmouseleave="${mouseLeave}">
                            <img src="${data.image}" alt="">
                            <div class="cart-item-title align-middle">
                            <div>${data.title}</div>
                            <small class="form-text text-muted cart-item-remove">
                            <a href="#">Remove</a>
                            </small></div>
                            <div class="cart-item-price">$${data.priceBtn}</div></div>`;
    
                $('.cart-items').append(newElem);
            });
            
            
        }
    });
    
    $('.cart-items').bind("DOMSubtreeModified",function(){
        countPrice();
        countItems();
    });
    
});

function countPrice(){
    let res = 0;
    $('.cart-item-price').each(function() {
        res += parseFloat($(this).html().trim().substring(1));
    });
    $('.cart-price-all').html('$' + res);
}

function countItems(){
    const items = $('.cart-item').length;
    $('.text-cart').html(items);
    const str = items === 1 ? 'item' : 'items';
    $('.cart-item-all').html(items + ' ' + str + ' in cart');
}

function createSpots() {
    $.get('/getAllData', function(data){
        let newElem = '';
        
        $.each(data, (key, val) => {
            
            if(key === 0) newElem += `<div class="col-2 offset-1">`;
            else newElem += `<div class="col-2">`;
            
            newElem += `<div class="small-spots" id="spot-${val.id}">
                        <img src="${val.image}" />
                        <p class="text-spots">${val.title}</p>
                        <div class="price-tags d-flex justify-content-end">`;
            
            if(val.discount !== false) newElem += `<span class="badge badge-success">${val.discount}</span>`;
            
            if(val.priceBtn === 'OWNED') newElem += `<button class="btn" id="btn-owned" disabled>`;
            else newElem += `<button class="btn" id="btn-${val.id}">$`;
            
            newElem += `${val.priceBtn}</button></div></div></div>`;
            
        });
        
        $("#spotsContainer").html(newElem);
        
    });
}