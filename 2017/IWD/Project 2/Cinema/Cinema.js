function seat(id,booking, row){
	this.id = id ;
	this.booking = booking; 
	this.row = row;
}











function florenceRoom(){
	
	var cinemaXMLHttp = new XMLHttpRequest();
	cinemaXMLHttp.open("GET", "Cinema_FR.xml", true);
	cinemaXMLHttp.send();
	cinemaDoc= cinemaXMLHttp.responseXML;
	
	var seatlist[];
	
	//everything to add all seats from room to SeatList 
	var seatarray = cinemaDoc.getElementsByTagName("cinemaRoom");
	var currentSeatID = '';
	var currentSeatBooking = '';
	var currentSeatRow = 0;
	for (i=0<seatarray.length;i++){
		currentSeatID = seatarray.getElementsByTagName('id')[0].childNodes[0].nodevalue;
		currentSeatBooking = seatarray.getElementsByTagName('booking')[0].childNodes[0].nodeValue;
		currentSeatRow = seatarray.getElementsByTagName('booking')[0].childNodes[0].nodeValue;
		var addSeat = new seat(currentSeatID,currentSeatBooking,currentSeatRow);
		seatlist[i] = addSeat;
	}
	for (i=0<sealist.length; i++){
			var seat = seatlist[i];
			seat.
		} 
	 }
	

	}
	}	
	

}
function ronaldRoom(){
	var cinemaXMLHttp = new XMLHttpRequest();
	cinemaXMLHttp.open("GET", "Cinema_RR.xml", true);
	cinemaXMLHttp.send();

	var loop = cinemaDoc.getElementsByTagName("cinemaRoom");
	for (i=0;i<loop.length; i++){
		seat = document.createElement('div');

		rowSeat = loop[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;

		seat.className = "seat" ;
		switch (rowSeat){
			case "a"
				seat.id = "seat-a";
				break;
			case "b"
				seat.id = "seat-b";
				break;
			case "c"
				seat.id = "seat-c";
				break;				
		}

		document.bodyappendChild(seat)
	}
	}	
	
}
function cinemaBack(){
	
}
function cinemaBook(){
	
}