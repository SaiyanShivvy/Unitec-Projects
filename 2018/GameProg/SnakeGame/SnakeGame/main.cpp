// SnakeGame.cpp : Defines the entry point for the console application.
// Author: Shivneel Achari
// For Unitec, Game Programming, Assignment 1
//

#include "stdafx.h"

#include <SFML\Graphics.hpp>
#include <SFML\Window.hpp>

#include <iostream>
#include <string>
#include <sstream>
#include <stdlib.h>

#include "snake.h"
#include "coord.h"

using namespace std;

enum GameState { MENU, LEAVE, PLAY, GAMEOVER };
enum Direction { UP, DOWN, RIGHT, LEFT, SPACE }; //declares enum for snake movement
int direction = DOWN;

//functions
int snakeEat(COORD &food, SNAKE &asnake); //snake eats and get score
void snakeReset(bool &run, SNAKE &snake, GameState &CurrentState, sf::RenderWindow &window); //resets snake to inital position and restarts game after colliding
void warpSnake(SNAKE &snake, sf::RenderWindow &window); //should act like a portal and allow the snake to warp around the window
void mainGame(GameState &CurrentState); //plays the game
void menu(GameState &CurrentState); //switchs between states, effectively a finite state machine

//variables
SNAKE snake; //snake class
GameState CurrentState; //Initalizes Game State
COORD food = snake.food(); //coords of the food
bool run = true; //game over condition

//main
int main() {
	CurrentState = MENU; //sets the current state
	srand(time(NULL)); //gets a random seed
	menu(CurrentState); //goes to menu
}

void menu(GameState &CurrentState) { //Switch State machine to handle retrys mainly
	char res;
	switch (CurrentState)
	{
	case MENU:
		cout << "Hello, Would you like to play? {y/n}" << endl; //it actually only looks for 'y'
		cin >> res; //gets user input
		if (res == 'y' || res == 'Y') {
			CurrentState = PLAY; //changes state
			mainGame(CurrentState); //calls a function with the current state
			break; //ends the case
		}
		else {
			CurrentState = LEAVE;
			menu(CurrentState);
			break;
		}
	case GAMEOVER:
		cout << "Nice Try!, Would you like to try again?";
		cin >> res;
		if (res == 'y' || res == 'Y') {
			CurrentState = PLAY;
			mainGame(CurrentState);
			break;
		}
		else {
			CurrentState = LEAVE;
			menu(CurrentState);
			break;
		}
	case LEAVE:
		cout << "Thanks for Playing!" << endl;
		cout << "Have a nice day! <3" << endl;
		break;
	default:
		break;
	}
}

void mainGame(GameState &CurrentState) {
	if (CurrentState == PLAY) {
		sf::Clock clock;

		snake.setDirection(); //initial set direction func
		snake.grow(); //inital growth of snake

		sf::RenderWindow window(sf::VideoMode(800, 600), "SNAKE GAME {Single Player}");
		window.setKeyRepeatEnabled(false); //disables keys being held down
		window.setFramerateLimit(30); //limits the framerate

		//sfml window loop
		while (window.isOpen()) {
			sf::Event event;
			while (window.pollEvent(event)) {
				switch (event.type) {
				case sf::Event::Closed:
					window.close();
					break;
				}

				if (event.type == sf::Event::KeyPressed) {
					if (event.key.code == sf::Keyboard::Left) {
						direction = LEFT; //switches snake direction
						snake.move(direction); //calls the move func
					}
					if (event.key.code == sf::Keyboard::Right) {
						direction = RIGHT; //switches snake direction
						snake.move(direction); //calls the move func
					}
					if (event.key.code == sf::Keyboard::Up) {
						direction = UP; //switches snake direction
						snake.move(direction); //calls the move func
					}
					if (event.key.code == sf::Keyboard::Down) {
						direction = DOWN; //switches snake direction
						snake.move(direction); //calls the move func
					}
				}
			}

			//function calls
			snakeEat(food, snake);//detect the food
			snakeReset(run, snake, CurrentState, window);//resets game after collision
			warpSnake(snake, window); //should act like a portal and allow the snake to warp back around if it went off-screen

			//clock for the game
			if (clock.getElapsedTime().asMilliseconds() > 60) {
				snake.justAte = false;
			}
			if (clock.getElapsedTime().asMilliseconds() >= 120) { //effective speed of the snake.
				run = snake.move(snake.getDirection());
				clock.restart();
			}
			window.clear(sf::Color::Black);

			// SFML Draw elements //
			//Create a grid
			sf::VertexArray rows(sf::Lines, 2);
			sf::VertexArray cols(sf::Lines, 2);

			for (float gy = 0; gy < 600; gy += 25) {
				rows[0].position = sf::Vector2f(800, gy);
				rows[1].position = sf::Vector2f(0, gy);

				window.draw(rows);

				for (float gx = 0; gx < 800; gx += 25) {
					cols[0].position = sf::Vector2f(gx, 600);
					cols[1].position = sf::Vector2f(gx, 0);

					window.draw(cols);
				}
			};

			//draw food
			int x = food.getX(); //gets coords of the food
			int y = food.getY();

			sf::RectangleShape foodPos(sf::Vector2f(25, 25)); //using rect shape to represent the food
			foodPos.setFillColor(sf::Color::Red); //color of the food
			foodPos.setPosition(x, y); //sets the coord of the food
			window.draw(foodPos); //draws to screen

			//draws the snake
			for (unsigned int i = 1; i < (snake.getCoords().size()); i++) {
				int x = (snake.getCoords()[i].getX()); //gets the coord of the snake segements.
				int y = (snake.getCoords()[i].getY());
				sf::RectangleShape coord(sf::Vector2f(24, 24)); //creates a vector,

				coord.setFillColor(sf::Color::Green);
				coord.setPosition(x, y); //sets the x and y coords of the snake
				window.draw(coord); //draws the snake
			}

			//gets food count can coverts to displayable string from int
			int sScore = snake.foodCount;
			std::ostringstream ostr; //outputs the string stream
			ostr << sScore; //uses string stream like cout
			std::string scoreString = ostr.str(); //converts to string

			//display score ingame - Broken, Font doesn't load (Issue Only comes up in debug). Commented out for now so I can keep working on it.
			sf::Font font;
			if (!font.loadFromFile("arial.ttf"))
			{
				cout << "Error while loading font" << endl;
			}
			sf::Text score;
			score.setFont(font);
			score.setString("Score:" + scoreString);
			score.setCharacterSize(25);
			score.setFillColor(sf::Color::Yellow);
			score.setStyle(sf::Text::Bold);
			score.setPosition(655, 20);
			window.draw(score);

			window.display();
		}
	}
}

//if the snake goes off screen it warps to the other size of the screen (window)
void warpSnake(SNAKE &snake, sf::RenderWindow &window) {
	if (snake.getX() < 0) { //Checks if the snake is off the window
		snake.setX(window.getSize().x); //sets its to the other side of the window
	}
	if (snake.getY() < 0) {
		snake.setY(window.getSize().y);
	}
	if (snake.getX() > window.getSize().x) {
		snake.setX(0);
	}
	if (snake.getY() > window.getSize().y) {
		snake.setY(0);
	}
}

//increase snake size
int snakeEat(COORD &food, SNAKE &snake) {
	if (snake.foodCollide(food)) {
		snake.grow(); //makes the snake grow after it collides with food
		food = snake.food(); //calls the food function to spawn another food
		snake.justAte = true; //used to flash color when snake eats something, however currently not in use
		cout << "FOOD COUNT: " << snake.foodCount << endl; //debug
		snake.foodCount += 1; //increases score count
		return snake.foodCount; //returns the current score
	}
}

//reset the game
void snakeReset(bool &run, SNAKE &snake, GameState &CurrentState, sf::RenderWindow &window) {
	if (!run) {
		cout << "Game Over!\n" << "Your score was: " << snake.foodCount << endl; //debug
		snake.reset(); //resets the size of the snake
		window.close(); //closes the current window
		run = true; //resets the game
		CurrentState = GAMEOVER;
		menu(CurrentState); //calls the switch state machine with a new state
	}
}