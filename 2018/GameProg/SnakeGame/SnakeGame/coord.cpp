#include "stdafx.h"
#include "coord.h"
#include <iostream>

using namespace std;

//Coords for X and Y, gets a point on the screen
COORD::COORD(int x, int y) {
	ax = x;
	ay = y;
}

//Gets X and Y
int COORD::getX() {
	return ax;
}
int COORD::getY() {
	return ay;
}

//Checks the COORD, and returns a bool
bool COORD::same(COORD c1, COORD c2) {
	//Checks if one coord's x and y values the same as another.
	if ((c1.ax == c2.ax) && (c1.ay == c2.ay)) {
		return true;
	}
	else {
		return false;
	}
}

//Sets X and Y
void COORD::setX(int x) {
	ax = x;
}
void COORD::setY(int y) {
	ay = y;
}