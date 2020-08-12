
$(document).ready(function () {
      $('select').selectize({
          sortField: 'text'
      });
});


let productTitle = null;
function getProductData() {

    let productDetails = JSON.parse(document.getElementById("select-product").options[document.getElementById("select-product").selectedIndex].value);
    productTitle = Object.keys(productDetails)[0];
    displayColorsTitle(productTitle);

    if (productTitle){
        displayColorTiles(productDetails[productTitle]);
    }
}

function displayColorsTitle(title){

    //SET VALUE OF span with id "product-colors-heading"
    document.getElementById("product-colors-heading").innerHTML = title.toUpperCase() + " AVAILABLE COLORS";
}

let selectedHTMLElementTile = null;
let selectedColorDetails = null;


function displayColorTiles(product_details){
    document.getElementById("order-details-selection").style.display = "block";
    let colorTilesTable = document.getElementById("color-tiles");
    colorTilesTable.innerHTML = "";
    let maxRowDataCount = 5;
    let currentRowDataCount = 0;
    let totalRowsCount = 0;
    let tableRow = null;
    for(let data in product_details){
        if(currentRowDataCount === 0){
            //insert table row
           tableRow = colorTilesTable.insertRow(totalRowsCount);
           totalRowsCount++;
        }
        else if(currentRowDataCount > maxRowDataCount){
            currentRowDataCount = 0;
            tableRow = colorTilesTable.insertRow(totalRowsCount);
            totalRowsCount++;
        }

        let product_color_option = product_details[data]["nuancier_ref_html"];
        let product_color_name = product_details[data]["tag_nuancier_coul"];

        //create div for each tile
        let tableData = tableRow.insertCell(currentRowDataCount);
        currentRowDataCount++;
        let tile = document.createElement("div");
        tile.className = "card";
        tile.style.width = "6rem";
        tile.style.height = "10rem";
        tile.style.position = "relative";
        tile.style.background = "white";
        tile.style.borderRadius = "3px";

        let tileColor = document.createElement("div");
        tileColor.style.background = product_color_option;
        tileColor.style.position = "absolute";
        tileColor.style.width = "6rem";
        tileColor.style.height = "6rem";
        tileColor.style.top = "0rem";

        let tileText = document.createElement("div");
        tileText.innerText = product_color_name.toUpperCase();
        tileText.className = "card-body";
        tileText.style.wordWrap = "break-word";
        tileText.style.position = "absolute";
        tileText.style.textAlign = "center";
        tileText.style.width = "6rem";
        tileText.style.height = "4rem";
        tileText.style.background = "white";
        tileText.style.bottom = "0rem";
        tileText.style.fontSize = "small";

        tile.appendChild(tileColor);
        tile.appendChild(tileText);

        tile.onmouseover  = function(){
            tileColor.style.filter = "brightness(85%)";
        };
        tile.onmouseout = function(){
            tileColor.style.filter = "brightness(100%)";
        };
        tile.onclick = function(){
            if(selectedHTMLElementTile === tile){
                selectedHTMLElementTile.style.border = null;
                selectedHTMLElementTile.style.boxShadow = null;
                document.getElementById("selectedColor").value = null;
                selectedHTMLElementTile = null;
            }
            else{
                tile.style.border = "4px solid DodgerBlue";
                tile.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
                if(selectedHTMLElementTile){
                    selectedHTMLElementTile.style.border = null;
                    selectedHTMLElementTile.style.boxShadow = null;
                }
                selectedHTMLElementTile = tile;
                selectedColorDetails = JSON.stringify(product_details[data]);
                document.getElementById("selectedColor").value = selectedColorDetails;
            }
        };

        tableData.appendChild(tile);
    }
}

function formValidation(){
    if(!selectedHTMLElementTile){
        document.getElementById("choose-color-error").style.display="block";
        return false;
    }
    return true;
}

window.document.onkeydown = function(e) {
    if (!e) {
        e = event;
    }
    if (e.keyCode === 27) {
        lightbox_close();
    }
};

function lightbox_open() {
      window.scrollTo(0, 0);
      document.getElementById('light').style.display = 'block';
}

function lightbox_close() {
      let lightBoxVideo = document.getElementById("headervideo");
      lightBoxVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      document.getElementById('light').style.display = 'none';
}

