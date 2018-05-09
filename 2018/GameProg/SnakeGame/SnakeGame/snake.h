#pragma once

#ifndef SNAKE_H
#define SNAKE_H

#include "coord.h"
#include "stdafx.h"
#include <deque>
#include <iostream>

using namespace std;

//Declares the Snake Class
class SNAKE {
private:
	enum Direction { UP, DOWN, RIGHT, LEFT }; //Game Control for Snake
	std::deque<COORD> asnake; //coord's of the snake, using deque
	int adirection; //Set default direction of snake

public:
	SNAKE(); //for the snake itself
	COORD food(); //food location using COORD class and <random> lib
	bool move(int); //moves the snake
	bool touch(); //used when checking for collision of the snake colliding with itself
	bool foodCollide(COORD food); //used to check if the snake collides with the fruit
	bool justAte; //tracks food being eaten as by change of color, however this is not currently being used

	void grow(); //grows the snake
	void shrink(); //shrinks the snake, creates a movement motion.
	void reset(); //restores snake to initial size

	int foodCount; //tracks the amount of food eaten.
	int getDirection() {
		return adirection; //returns the current direction of the snake
	}

	//Accessors
	int getX();
	int getY();
	std::deque<COORD> getCoords(); //return the coord of the snake

	//Mutators
	void setX(int x);
	void setY(int y);
	void setDirection();
	std::deque<COORD> setCoords(int x, int y); //useful for second player
};

#endif