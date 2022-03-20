$(document).ready(function(){

    
      
   var clothindDiv = $("#clothing-items");
   var accessoriesDiv = $("#accessories-items")

   function createItemCard(id,preview,name,brand,price){
      
        var itemCardDiv = document.createElement("div")
        itemCardDiv.setAttribute("class","cards");
        itemCardDiv.setAttribute("id",id);

        var linkToDetails = document.createElement("a");
        linkToDetails.href = "details.html?product_id=" + id;
        var imageCointainer = document.createElement("div")
        imageCointainer.setAttribute("class","productImg")

        var productImage = document.createElement("img");
        productImage.src = preview;

           imageCointainer.appendChild(productImage);

           var detailsDiv = document.createElement("div")
           detailsDiv.setAttribute("class","details")

           var titleTag = document.createElement("h3");
           var titleName = document.createTextNode(name);
           titleTag.appendChild(titleName)
           detailsDiv.appendChild(titleTag);

           var brandTag = document.createElement("h4");
           var brandName= document.createTextNode(brand);

           brandTag.appendChild(brandName);
           detailsDiv.appendChild(brandTag);

           var priceTag = document.createElement("h5");
           var priceText = document.createTextNode("Rs ");
           var dynamicPrice = document.createTextNode(price);

           priceTag.appendChild(priceText);
           priceTag.appendChild(dynamicPrice);
           detailsDiv.appendChild(priceTag)

           linkToDetails.appendChild(imageCointainer);
           linkToDetails.appendChild(detailsDiv);
            itemCardDiv.appendChild(linkToDetails);
      
                return itemCardDiv;

        }

   var api = "https://5d76bf96515d1a0014085cf9.mockapi.io/product"
    $.get(api,function(response){
        var productList = response;

        for(var i = 0; i< productList.length; i++){
            if(productList[i].isAccessory === false){
                clothindDiv.append(
                    createItemCard(
                    productList[i].id,
                    productList[i].preview ,
                    productList[i].name,
                    productList[i].brand,
                    productList[i].price
                    
                )
                );
            }else{
                accessoriesDiv.append(
                    createItemCard(
                        productList[i].id,
                    productList[i].preview ,
                    productList[i].name,
                    productList[i].brand,
                    productList[i].price
                    )
                );
            }
        }
    })
})