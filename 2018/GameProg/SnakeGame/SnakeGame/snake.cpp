#include "stdafx.h"
#include "snake.h"
#include "coord.h"
#include <iostream>
#include <deque> //Used to manage snake body, similar to vector.
#include <math.h>
#include <cstdlib>
#include <time.h>
#include <random>

using namespace std;

//Creates the Snake
SNAKE::SNAKE() {
	asnake.push_front(COORD(25, 25)); //Inital position of the snake
	asnake.push_front(COORD(50, 25));
	asnake.push_front(COORD(75, 25));
	foodCount = 0;
}

//Resets the snake
void SNAKE::reset() {
	asnake.clear();//clears the snake
	asnake.push_front(COORD(25, 25)); //set new snake
	asnake.push_front(COORD(50, 25));
	asnake.push_front(COORD(75, 25));
	foodCount = 0; //Reset foodCount
}

//Grows the Snake
void SNAKE::grow() {
	asnake.push_back(COORD(asnake.back().getX(), asnake.back().getY())); //the snake grows using deque function by adding a section to the end of queue
}

//Shrinks the snake (used when moving)
void SNAKE::shrink() {
	asnake.pop_back();
}

//checks for food collision
bool SNAKE::foodCollide(COORD food) {
	if (asnake.front().getX() == food.getX() && asnake.front().getY() == food.getY()) { //Checks if the snake is touching the food
		cout << "FOOD EATEN" << endl; //Debug
		return true;
	}
	else {
		return false;
	}
}

//create food
COORD SNAKE::food() {
	int posX = getX();
	int posY = getY();

	/*srand(time(NULL)); // Random time seed for setting food
	//random food location
	posX = (rand() % 15 + 1) * 25;
	posY = (rand() % 15 + 1) * 25;
	*/

	//now with <random> lib instead of rand()
	std::random_device rd;
	std::uniform_int_distribution<> distribution(1, 22); //distribution
	std::default_random_engine generator(rd()); //Will be used to obtain a seed for the random number engine
	std::mt19937 gen(rd()); //Standard mersenne_twister_engine seeded with rd()

	posX = (distribution(rd) * 25);
	posY = (distribution(rd) * 25);

	COORD food(posX, posY);

	//sets food if index is empty
	for (int i = 0; i < asnake.size() + 1; i++) { //checks all coords to make sure indexs are empty
		if (!food.same(food, asnake[i])) { //if the location is not currently being used by the snake
			return food;
		}
	}
}

//the coords of the snake
std::deque<COORD> SNAKE::getCoords() {
	return asnake;
}

//return X coord of the head of the snake
int SNAKE::getX() {
	return asnake.front().getX();
}

//return Y coord of the head of the snake
int SNAKE::getY() {
	return asnake.front().getY();
}

void SNAKE::setX(int x) {
	asnake.front().setX(x);
}

void SNAKE::setY(int y) {
	asnake.front().setY(y);
}

//sets direction of snake
void SNAKE::setDirection() {
	adirection = RIGHT;
}

//checks for snake collision
bool SNAKE::touch() {
	for (int i = 1; i < static_cast<ptrdiff_t>(asnake.size()); i++) {
		if ((asnake.front().getX() == asnake[i].getX()) && (asnake.front().getY() == asnake[i].getY())) { //if the head is touching the body
			return true;
		}
	}
	return false;
}

//snake moves as long as it doesn't collide
bool SNAKE::move(int NewDirection) {
	//Controls the snake
	if (!touch()) {
		shrink();
		if (NewDirection == UP) {
			if (adirection != DOWN) { //When the snake faces one way, it cannot go back on itself (so if it goes UP it cannot go DOWN)
				asnake.push_front(COORD(asnake.front().getX(), asnake.front().getY() - 25));
				adirection = UP;
			}
			else {
				asnake.push_front(COORD(asnake.front().getX(), asnake.front().getY() + 25));
			}
		}
		else if (NewDirection == RIGHT) {
			if (adirection != LEFT) { //When the snake faces one way, it cannot go back on itself
				asnake.push_front(COORD(asnake.front().getX() + 25, asnake.front().getY()));
				adirection = RIGHT;
			}
			else {
				asnake.push_front(COORD(asnake.front().getX() - 25, asnake.front().getY()));
			}
		}
		else if (NewDirection == DOWN) {
			if (adirection != UP) { //When the snake faces one way, it cannot go back on itself
				asnake.push_front(COORD(asnake.front().getX(), asnake.front().getY() + 25));
				adirection = DOWN;
			}
			else {
				asnake.push_front(COORD(asnake.front().getX(), asnake.front().getY() - 25));
			}
		}
		else if (NewDirection == LEFT) {
			if (adirection != RIGHT) { //When the snake faces one way, it cannot go back on itself
				asnake.push_front(COORD(asnake.front().getX() - 25, asnake.front().getY()));
				adirection = LEFT;
			}
			else {
				asnake.push_front(COORD(asnake.front().getX() + 25, asnake.front().getY()));
			}
		}
		return true;
	}
	else return false;
}