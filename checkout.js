$(document).ready(function() {

    var placeOrderBtn =document.getElementById("place-order")
    placeOrderBtn.addEventListener("click",function(){
      window.localStorage.removeItem("product-list")
    })

    var cardContainer = document.getElementById("cart-item-container");
    var totalAmount = document.getElementById("total-amount");
    var numberOfItem = document.getElementById("number-of-item");
    
    var myLocalStorageData = JSON.parse(
      window.localStorage.getItem("product-list")
    );
    
    function createItemOnCheckOut(iPreview, iName, iCount, iPrice) {
      var item = document.createElement("div");
      item.setAttribute("class", "item");
    
      var itemImg = document.createElement("img");
      itemImg.src = iPreview;
    
      var itemDetail = document.createElement("div");
      itemDetail.setAttribute("class", "detail");
    
      var itemName = document.createElement("h3");
      var itemNameText = document.createTextNode(iName);
      itemName.appendChild(itemNameText);
    
      var itemCount = document.createElement("p");
      itemCountText = document.createTextNode("X" + iCount);
      itemCount.appendChild(itemCountText);
    
      var itemPrice = document.createElement("p");
      var itemPriceText = document.createTextNode("Amount: " + iCount * iPrice);
      itemPrice.appendChild(itemPriceText);
    
      itemDetail.appendChild(itemName);
      itemDetail.appendChild(itemCount);
      itemDetail.appendChild(itemPrice);
    
      item.appendChild(itemImg);
      item.appendChild(itemDetail);
    
      return item;
    }
    
    for (var z = 0; z < myLocalStorageData.length; z++) {
      cardContainer.append(
        createItemOnCheckOut(
          myLocalStorageData[z].preview,
          myLocalStorageData[z].title,
          myLocalStorageData[z].count,
          myLocalStorageData[z].price
        )
      );
    }
    var cost = 0;
    var counter = 0;
    
    for (var y = 0; y < myLocalStorageData.length; y++) {
      counter += myLocalStorageData[y].count;
     
      cost +=
        parseInt(myLocalStorageData[y].count) *
        parseInt(myLocalStorageData[y].price);
      
    }
    totalAmount.innerHTML = cost;
    numberOfItem.innerHTML = counter;
    
    
    });























