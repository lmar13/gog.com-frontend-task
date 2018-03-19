$(document).ready(function() {
    
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
    
//    How many items in cart and update required fields
//    TODO change this to function
    countPrice();
    
//    Count cart prices and update required fileds
//    TODO change this to function
    let res = 0;
    $('.cart-item-price').each(function() {
        res += parseFloat($(this).html().trim().substring(1));
    });
    $('.cart-price-all').html('$' + res);
    
//    Clear cart when button clicked
    $('#clearCart').on('click', function(){
        $('.cart-items').empty();
        $('.small-spots .btn').html('test');
//        TODO when invoke functions to calculate priceses and number of items
    });
    
    $('.small-spots .btn').on('click', function() {
        let btnText = $(this).html();
        const imgUrl = $(this).parents('.small-spots').children('img').attr('src');
        const title = $(this).parents('.small-spots').children('p').html();
        if(btnText === 'IN CART') {
            return false;
        }
        else {
            $(this).html('IN CART');
            btnText = btnText.substring(1)
            console.log(btnText);
            console.log(imgUrl);
            console.log(title);
            addNewElementToCart(btnText, imgUrl, title);
        }
    });
    
    $('.cart-items').bind("DOMSubtreeModified",function(){
        countPrice();
    });
    
});

function addNewElementToCart(price, imgUrl, title) {
    let newElem = '';
    
    newElem += `<div class="dropdown-divider"></div>
                <div class="cart-item">
                    <img src="${imgUrl}" alt="">
                    <div class="cart-item-title align-middle">
                        <div>${title}</div>
                        <small class="form-text text-muted cart-item-remove">
                            <a href="#">Remove</a>
                        </small>
                    </div>
                    <div class="cart-item-price">$${price}</div>
                </div>`;
    
    $('.cart-items').append(newElem);
}

function countItems(){
    
}

function countPrice(){
    const items = $('.cart-item').length;
    $('.text-cart').html(items);
    const str = items === 1 ? 'item' : 'items';
    $('.cart-item-all').html(items + ' ' + str + ' in cart');
}