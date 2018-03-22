$(document).ready(function () {

    //    Initialize spots
    createSpots();

    //    Initialize cart
    createCart();

    //    Count items and pirces and update required fileds
    countItems();
    countPrice();

    //    Add event listener to each element in cart to show remove btn
    $('.cart-items').on({
        mouseenter: function () {
            //stuff to do on mouse enter
            $(this).find('small').css('visibility', 'visible');
        },
        mouseleave: function () {
            //stuff to do on mouse leave
            $(this).find('small').css('visibility', 'hidden');
        }
    }, ".cart-item");

    //    Event listener for logo
    $('.logo-classic').click(function () {
        $('.secretButton').toggleClass('moveForward');
    });

    //    Open dropdown menu - cart menu
    $('a.open-cart').on('click', function (event) {
        $('div.dropdown-menu.dropdown-menu-right').toggleClass('show');
    });

    //    Close dropdown (cart) on click but only outside of dropdown
    $('body').on('click', function (e) {
        if (!$('a.open-cart').is(e.target) &&
            $('a.open-cart').has(e.target).length === 0 &&
            $('.show').has(e.target).length === 0 &&
            !$('#spotsContainer button.btn').is(e.target)
        ) {
            $('div.dropdown-menu.dropdown-menu-right').removeClass('show');
        }
    });

    //    Clear cart when button clicked
    $('#btn-clear').on('click', function () {
        $('.cart-items').empty();
        $.post('/deleteAllFromCart');
        createSpots();
    });

    //    Event listener for remove button for each cart item
    $('.cart-items').on('click', '.cart-item-remove a', function () {
        var elemId = $(this).attr('id');
        elemId = elemId.substring(4);
        $.post('/deleteOneFromCart', {
            "itemId": elemId
        }, function (data) {
            $.post('/getOneFromData', {
                "itemId": elemId
            }, function (datafromserver) {
                $('#btn-' + elemId).html('$' + datafromserver.priceBtn);
                createCart();
            });
        });
    })

    //    Event listener for each element in spots container
    $('#spotsContainer').on('click', 'button', function () {
        let btnText = $(this).html();
        let btnId = $(this).attr('id');
        let id = btnId.substring(4);
        if (btnText === 'IN CART') {
            return false;
        } else {
            //$(this).html('IN CART');

            $.post('/addItemToCart', {
                "itemId": id
            }, function (data) {
                console.log(data);
            }).done(function () {

                //                createCart();
            });

            //            alert('test');
            setTimeout(function () {
                createCart();
            }, 500);
            //            createCart();
        }
    });

    //    Event listener for change in cart container
    $('.cart-items').bind("DOMSubtreeModified", function () {
        countPrice();
        countItems();
    });

    //    Event listener for add button in secret modal
    $('#addBtn').on('click', function () {
        $("#serverMessage").html('');
        $.post('/addToData', function (data) {
            $("#serverMessage").html(data);
        });
    });

    //    Event listener for delete button in secret modal
    $('#delBtn').on('click', function () {
        $("#serverMessage").html('');
        $.post('/deleteFromData', function (data) {
            $("#serverMessage").html(data);
        });
    });

    //    Event listener for X button in secret modal
    $("#secretModal .close").on('click', function () {
        createSpots();
    });

    //    Modal settings
    $("#secretModal").modal({
        keyboard: false,
        backdrop: 'static',
        show: false
    });

});

// Function to recalculate summary price in cart
function countPrice() {
    let res = 0;
    $('.cart-item-price').each(function () {
        res += parseFloat($(this).html().trim().substring(1));
    });
    $('.cart-price-all').html('$' + res);
}

// Function to recalculate how many items are in cart
function countItems() {
    const items = $('.cart-item').length;
    $('.text-cart').html(items);
    const str = items === 1 ? 'item' : 'items';
    $('.cart-item-all').html(items + ' ' + str + ' in cart');
}

// Function to create spots items 
function createSpots() {
    $.get('/getAllFromData', function (data) {
        let newElem = '';

        $.each(data, (key, val) => {

            if (key % 5 === 0) newElem += `<div class="col-2 offset-1">`;
            else newElem += `<div class="col-2">`;

            newElem += `<div class="small-spots" id="spot-${val.id}">
                        <img src="${val.image}" />
                        <p class="text-spots">${val.title}</p>
                        <div class="price-tags d-flex justify-content-end">`;

            if (val.discount !== false) newElem += `<span class="badge badge-success">${val.discount}</span>`;

            if (val.priceBtn === 'OWNED') newElem += `<button class="btn" id="btn-owned" disabled>`;
            else newElem += `<button class="btn" id="btn-${val.id}">$`;

            newElem += `${val.priceBtn}</button></div></div></div>`;

        });

        $("#spotsContainer").html(newElem);

    });
}

// Function to create cart items
function createCart() {
    $.get('/getAllFromCart', function (data) {
        if ($.isEmptyObject(data[0]) === false) {
            let newElem = '';

            $.each(data, (key, val) => {
                newElem += `<div class="dropdown-divider"></div>
                            <div class="cart-item" id="cart-${val.id}">
                            <img src="${val.image}" alt="">
                            <div class="cart-item-title align-middle">
                            <div>${val.title}</div>
                            <small class="form-text text-muted cart-item-remove">
                            <a href="#" id="del-${val.id}">Remove</a>
                            </small></div>
                            <div class="cart-item-price">$${val.priceBtn}</div></div>`;
                $('#btn-' + val.id).html('IN CART');
            });

            $('.cart-items').html(newElem);
        } else {
            $('.cart-items').html('');
        }
    });
}
