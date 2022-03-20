$(document).ready(function () {


    var searchId = window.location.search.split("=")[1]
    console.log(searchId)
    var searchApi = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + searchId


    $.get(searchApi, function (data) {
        var selectedProduct = data;
        var bigImageWrapper = document.getElementById("left-column");

        bigImageWrapper.innerHTML = ` <img id = "productImg" src = ${selectedProduct.preview}   /> `

        var productOverview = document.getElementById("right-column")

        productOverview.innerHTML = `<div class="product-description">
<h1 id="name"> ${selectedProduct.name}   </h1>
<h4 id="brand">  ${selectedProduct.brand} </h4>
<h3>Price: Rs <span id="price"> ${selectedProduct.price} </span></h3>
<div class="description" >
    <h3>Description</h3>
    <p id = "description" >
        ${selectedProduct.description}

    </p>

</div>

<div class="product-preview" >
    <h3>Product Preview</h3>
    <div id = "preview-img" class="previewImg">
       

    </div>

</div>
    <button id="add_to_cart">Add to Cart </button>
</div>`

        var small_images = selectedProduct.photos

        var previewDiv = document.getElementById("preview-img")

        for (var i = 0; i < small_images.length; i++) {
            imageCreate(small_images[i])
        }


        function imageCreate(image) {
            var img = document.createElement("img")
            img.src = image;
            img.className = "preview-card";
            previewDiv.appendChild(img)
            img.addEventListener("click", function () {
                bigImageWrapper.innerHTML = `<img src="${image}">`
            })
        }

        var temp = document.getElementsByClassName('preview-card')
        temp[0].style.border = '2px solid #009688'
        for (var i = 0; i < temp.length; i++) {
            temp[i].addEventListener('click', function (e) {
                for (var j = 0; j < temp.length; j++) {
                    temp[j].style.border = '0px solid black'
                }
                e.target.style.border = '2px solid #009688'
            })
        }


      
        var cartBtn = document.getElementById("add_to_cart")
        cartBtn.addEventListener("click", function () {

            if (window.localStorage.getItem("product-list") === null) {
                myCartData = [];
            }

            else {
                myCartData = JSON.parse(window.localStorage.getItem("product-list"));
            }


            if (myCartData.length === 0) {
                var myObj = {
                    id: selectedProduct.id,
                    title: selectedProduct.name,
                    count: 1,
                    price: selectedProduct.price,
                    preview: selectedProduct.preview
                };
                myCartData.push(myObj);
            }

            else if (myCartData.length != 0) {
                var w = 0;

                for (var i = 0; i < myCartData.length; i++) {
                    if (myCartData[i].id == selectedProduct.id) {
                        myCartData[i].count = parseInt(myCartData[i].count) + 1;
                        w += 1;
                    }
                }

                if (w == 0) {
                    var myObj = {
                        id: selectedProduct.id,
                        title: selectedProduct.name,
                        count: 1,
                        price: selectedProduct.price,
                        preview: selectedProduct.preview
                    };
                    myCartData.push(myObj);
                }
            }

            window.localStorage.setItem("product-list", JSON.stringify(myCartData));



            var productList = JSON.parse(window.localStorage.getItem("product-list"))
            var totalCount = 0;
            for (var i = 0; i < productList.length; i++) {
                totalCount = totalCount + productList[i].count;

            }

            $('#items-count').html(totalCount);

        })







    })






})
