var seatArray = [];

function seat(id, row, isBooked, price) {
  this.id = id;
  this.row = row;
  this.isBooked = isBooked;
  this.price = price;
}

function getRows() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("get", "rose.xml", true);
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Hello I am here");
      createSeat(this);
    }
  };
  xmlhttp.send(null);
}

function createSeat(xmlhttp) {
  var xmlDoc = xmlhttp.responseXML.documentElement;
  var x = xmlDoc.getElementsByTagName("seat");

  var sID = '';
  var sRow = '';
  var sBook = '';
  var sPrice = '';
  for (i = 0; i < x.length; i++) {
    sID = x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
    sRow = x[i].getElementsByTagName("row")[0].childNodes[0].nodeValue;
    sBook = x[i].getElementsByTagName("isBooked")[0].childNodes[0].nodeValue;
    sPrice = x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
    //console.log(sID, sRow, sBook, sPrice);

    var newSeat = new seat(sID, sRow, sBook, sPrice);
    seatArray[i] = newSeat;
  }
}

function selectSeat(cell) {
  // - [x] TODO: Add or Remove Seat from Cart
  // - [ ] TODO: Calculate Total

  //console.log("I cell " + cell.id + " have been touched!");

  var cart = document.getElementById('selected-seats');
  var liCart = document.createElement("li");
  var rmCart;
  if (cell.classList.contains("booked")) {
    alert("Sorry, bud. You were to slow and this seat " + cell.id + " is now booked.")
  } else if (cell.classList.contains('selected')) {
    cell.classList.toggle("selected");
    rmCart = document.getElementById("cart-item-" + cell.id);
    rmCart.parentNode.removeChild(rmCart);

    //console.log(cell);
  } else {
    cell.classList.toggle("selected");
    liCart.setAttribute("id", "cart-item-" + cell.id)
    liCart.appendChild(document.createTextNode("Seat " + cell.id));
    cart.append(liCart);
    bookingDetails(cell);
    //console.log(cell);
  }
}

function bookingDetails(cell) {
  // - [ ] TODO: When Seat is selected display the booking details from the array.
  var seatInfo = document.getElementById('seatInfo');
  var seatPrice = document.getElementById('seatPrice');
  if (cell.classList.contains("selected")) {
    seatInfo.textContent = cell.id;
    seatPrice.textContent = findSeat(cell.id);
  } else {
    seatInfo.textContent = " ";
    seatPrice.textContent = " ";
  }
}

function findSeat(id){
  //console.log(id);
  for (var i = 0; i < seatArray.length; i++){
    if (seatArray[i].id == id){
      var sP = seatArray[i].price;
      //console.log(sP);
      return sP;
    }
  }
}

function display_rose() {
  var displaytext = '';
  var table = document.getElementById('roseLayout');
  var numRows = 9;
  var numCol = 9;
  var sNum = 0;
  for (var i = 0; i < numRows; i++) {
    var row = table.insertRow(i);
    for (var j = 0; j < numCol; j++) {
      //cellName = seatArray[sNum].id + "_" + seatArray[sNum].row;
      cellName = seatArray[sNum].id
      //console.log(cellName);
      cell = row.insertCell(row.cells.length);
      if (seatArray[sNum].id == 'M' || seatArray[sNum].id == 'W') {
        cell.innerHTML = '<div>' + '</div>';
        cell.setAttribute("class", "walk");
        //console.log("Cell:" + seatArray[sNum].id);
      } else {
        if (seatArray[sNum].isBooked == "yes") {
          cell.innerHTML = '<div>' + seatArray[sNum].id + '</div>';
          cell.setAttribute("class", "seat booked");
        } else {
          cell.innerHTML = '<div>' + seatArray[sNum].id + '</div>';
          cell.setAttribute("class", "seat");
        }
        cell.setAttribute("id", cellName);
        cell.setAttribute("onclick", "selectSeat(this)");
        row.appendChild(cell);
      }
      sNum = sNum + 1;
    }
  }
  table.appendChild(row);
}
