var seatRose = [];
var seatPrincess = [];
var roseExist = false;
var princessExist = false;

function seat(id, row, isBooked, price) {
    this.id = id;
    this.row = row;
    this.isBooked = isBooked;
    this.price = price;
}

function getRose() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "rose.xml", true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            createRoseSeat(this);
        }
    };
    xmlhttp.send(null);
}

function getPrincess() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "princess.xml", true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            createPrincessSeat(this);
        }
    };
    xmlhttp.send(null);
}

function createRoseSeat(xmlhttp) {
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
        seatRose[i] = newSeat;
    }
}

function createPrincessSeat(xmlhttp) {
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
        seatPrincess[i] = newSeat;
    }
}

//Init
window.onload = function () {
    getRose();
    getPrincess();
}

//Table Functions
function selectSeat(cell) {
    var cart = document.getElementById('selected-seats');
    var liCart = document.createElement("li");
    var rmCart;
    if (cell.classList.contains("rose")) {
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
            liCart.appendChild(document.createTextNode("R. Seat " + cell.id));
            cart.append(liCart);
            seatDetails(cell);
            //console.log(cell);
        }
    } else if (cell.classList.contains("princess")) {
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
            liCart.appendChild(document.createTextNode("P. Seat " + cell.id));
            cart.append(liCart);
            seatDetails(cell);
            //console.log(cell);
        }
    }
}

function seatDetails(cell) {
    var seatInfo = document.getElementById('seatInfo');
    var seatPrice = document.getElementById('seatPrice');
    if (cell.classList.contains("rose")) {
        if (cell.classList.contains("selected")) {
            seatInfo.textContent = cell.id;
            seatPrice.textContent = getSeatPrice("rose", cell.id);
            total.textContent = calcTotal("rose", cell.id);
        } else {
            seatInfo.textContent = " ";
            seatPrice.textContent = " ";
            total.textContent = calcTotal("rose", cell.id);
        }
    } else if (cell.classList.contains("princess")) {
        if (cell.classList.contains("selected")) {
            seatInfo.textContent = cell.id;
            seatPrice.textContent = getSeatPrice("princess", cell.id);
            total.textContent = calcTotal("princess", cell.id);
        } else {
            seatInfo.textContent = " ";
            seatPrice.textContent = " ";
            total.textContent = calcTotal("princess", cell.id);
        }
    }
    if (!cell.classList.contains("selected")) {
        seatInfo.textContent = "";
        seatPrice.textContent = "";
        total.textContent = "";
    }
}

function getSeatPrice(boat, id) {
    //console.log(id);
    if (boat == "rose") {
        for (var i = 0; i < seatRose.length; i++) {
            if (seatRose[i].id == id) {
                var sP = seatRose[i].price;
            }
        }
    } else if (boat = "princess") {
        for (var i = 0; i < seatPrincess.length; i++) {
            if (seatPrincess[i].id == id) {
                var sP = seatPrincess[i].price;
            }
        }
    }
    return sP;
}

function calcTotal(boat) {
    var total = document.getElementById('total');
    var nTotal = 0;
    if (boat == "rose") {
        var selected = document.getElementsByClassName('rose');
        for (var i = 0; i < selected.length; i++) {
            if (selected[i].classList.contains("selected")) {
                nTotal += parseFloat(getSeatPrice(boat, selected[i].id));
                console.log(nTotal);
            }
        }
    } else if (boat == "princess") {
        var selected = document.getElementsByClassName('princess');
        for (var i = 0; i < selected.length; i++) {
            if (selected[i].classList.contains("selected")) {
                nTotal += parseFloat(getSeatPrice(boat, selected[i].id));
                console.log(nTotal);
            }
        }
    }
    return nTotal;
}

function bookSelected(table){
    if (table == "roseLayout"){
        console.log(table);
    }
    else if (table == "princessLaybout"){
        console.log(table);
    }
}

// Displaying the Layouts
function display_rose() {
    var table = document.getElementById('roseLayout');
    var numRows = 9;
    var numCol = 9;
    var sNum = 0;
    for (var i = 0; i < numRows; i++) {
        var row = table.insertRow(i);
        for (var j = 0; j < numCol; j++) {
            //cellName = seatRose[sNum].id + "_" + seatRose[sNum].row;
            cellName = seatRose[sNum].id
            //console.log(cellName);
            cell = row.insertCell(row.cells.length);
            if (seatRose[sNum].id == 'M' || seatRose[sNum].id == 'W') {
                cell.innerHTML = '<div>' + '</div>';
                cell.setAttribute("class", "walk rose");
                //console.log("Cell:" + seatRose[sNum].id);
            } else {
                if (seatRose[sNum].isBooked == "yes") {
                    cell.innerHTML = '<div>' + seatRose[sNum].id + '</div>';
                    cell.setAttribute("class", "seat booked rose");
                } else {
                    cell.innerHTML = '<div>' + seatRose[sNum].id + '</div>';
                    cell.setAttribute("class", "seat rose");
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

function display_Princess() {
    var table = document.getElementById('princessLayout');
    var numRows = 13;
    var numCol = 9;
    var sNum = 0;
    for (var i = 0; i < numRows; i++) {
        var row = table.insertRow(i);
        for (var j = 0; j < numCol; j++) {
            //cellName = seatPrincess[sNum].id + "_" + seatPrincess[sNum].row;
            cellName = seatPrincess[sNum].id
            //console.log(cellName);
            cell = row.insertCell(row.cells.length);
            if (seatPrincess[sNum].id == 'M' || seatPrincess[sNum].id == 'W') {
                cell.innerHTML = '<div>' + '</div>';
                cell.setAttribute("class", "walk princess");
                //console.log("Cell:" + seatPrincess[sNum].id);
            } else {
                if (seatPrincess[sNum].isBooked == "yes") {
                    cell.innerHTML = '<div>' + seatPrincess[sNum].id + '</div>';
                    cell.setAttribute("class", "seat booked princess");
                } else {
                    cell.innerHTML = '<div>' + seatPrincess[sNum].id + '</div>';
                    cell.setAttribute("class", "seat princess");
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