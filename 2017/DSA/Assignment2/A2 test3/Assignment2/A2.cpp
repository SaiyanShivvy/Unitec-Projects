/* 
Assignment 2
<---------->
By: Shivneel Achari
Student ID: 1463570
<---------->
Last Update: 19 June 2017
<---------->
How to Use:
<---------->
Without making any changes put the Dictionary text file in the same directory
as the .cpp file.
<---------->
Missing Features:
<--------------->
Dictionary Updating after a new word is added,
though the tree itself does contain the new word.
<--------------->
Known Issue:
<----------->
Entering 'n' in menu causing infinite loop
Regardless of any know issues the code compiles
<----------->
*/

//Includes all the Libraries needed
#include "stdafx.h" 
#include <iostream>
#include <string>
#include <fstream>

using namespace std;

//There wasn't much reason to use Class instead of Struct.
//It's mainly so I can pass a node as reference. 
class dictionaryTrie
{
	class node
	{
	protected: //Accessible by defined class and class that inherit from the defining class, So it can be called by other functions.
		friend class dictionaryTrie; //The friend class gives access to protected or private members of another class.
		char data; //Char is used here as we are dealing will strings. 
		node *next; 
		bool wordEnd; //Used to check where the word ends
		int sizeNext; //Used in moving through the chars of a string when adding words.
	public:
		node() //Used when adding new words to the tree
		{
			//Intializes Values 
			data = '0'; 
			next = NULL;
			wordEnd = false;
			sizeNext = 0;
		}

		//Function to a words to the Tree
		//Goes through each char of the word
		void aNext(char tA)
		{
			if (sizeNext == 0)
			{
				next = new node();
				next->data = tA;
				sizeNext++;
			}
			else
			{
				node* temp;
				temp = new node[sizeNext];
				for (int i = 0; i<sizeNext; i++)
					temp[i] = next[i];
				int size = sizeNext + 1;
				delete[] next;
				next = new node[size];
				for (int i = 0; i<size - 1; i++)
					next[i] = temp[i];
				sizeNext = size;
				next[sizeNext - 1].data = tA;
				delete[] temp;
			}
		}

		//Function the searchs for a word in the list, by going through each char of the word and see if there are any matches.
		//If none exist but there is something similar in the tree it would display it as a suggestion.
		int sNext(char tS)
		{
			if (sizeNext == 0)
				return -1;
			else
				for (int i = 0; i <= sizeNext; i++)
					if (tS == next[i].data)
						return i;
			return -1;
		}
		void sLast(string tS)
		{
			for (int i = 0; i<sizeNext; i++)
			{
				if (next[i].wordEnd)
				{
					tS.pop_back();
					tS.push_back(next[i].data);
					cout << "Suggestion : " << tS << endl;
				}
			}
		}

		void sSecond(string tS)
		{
			for (int i = 0; i<sizeNext; i++)
				for (int j = 0; j<next[i].sizeNext; j++)
				{
					if (next[i].next[j].wordEnd)
						if (next[i].next[j].data == tS[tS.length() - 1])
						{
							char t = tS[tS.length() - 1];
							tS.pop_back();
							tS.pop_back();
							tS.push_back(next[i].data);
							tS.push_back(t);
							cout << "Suggestion : " << tS << endl;
						}
				}

		}
	};
	node* root;
public:
	//Calls the class
	dictionaryTrie()
	{
		//create a root using the attributes of node
		root = new node();
	}

	//Function to add word.
	//It checks whether or not the size of the string is greater than 0 (there is actually a word entered)
	//then iterates through the string, send each char to the aNext function to create the node in the tree
	//until the end of the word
	void addWord(string tA)
	{
		if (tA.size() == 0)
			return;
		else
		{
			node* temp = root;
			for (int i = 0; i<tA.size(); i++)
			{
				if (temp->sNext(tA[i]) == -1)
					temp->aNext(tA[i]);
				temp = &(temp->next[temp->sNext(tA[i])]);
			}
			temp->wordEnd = true;
		}
	}

	//Function to search for a word
	//check each char, to see if there are any matches
	//if the word is present it will print a dialogue to console
	//same thing if the word isn't in the dictionary
	void searchWord(string tS)
	{
		node* temp = root;
		for (int i = 0; i<tS.size(); i++)
		{
			if (temp->sNext(tS[i]) != -1)
			{
				if (tS.length() - i == 2 && temp->next[temp->sNext(tS[i])].sNext(tS[i + 1]) != -1)
				{
					if (temp->next[temp->sNext(tS[i])].next[temp->next[temp->sNext(tS[i])].sNext(tS[i + 1])].wordEnd == false)
						temp->sSecond(tS);
				}
				else if (tS.length() - i == 2 && temp->next[temp->sNext(tS[i])].sNext(tS[i + 1]) == -1)
				{
					temp->sSecond(tS);
				}
				if (temp->next[temp->sNext(tS[i])].wordEnd == false && tS.length() - i == 1)
				{
					cout << "Word not found.\n";
					temp->sLast(tS);
					return;
				}
				temp = &(temp->next[temp->sNext(tS[i])]);
			}
			else if (tS.length() - i == 1)
			{
				temp->sLast(tS);
				return;
			}
			else if (tS.length() - i == 2)
			{
				cout << "Word not found.\n";
				temp->sSecond(tS);
			}
			else
			{
				cout << tS << " is not in the dictionary\n";
				return;
			}
		}
		if (temp->wordEnd)
			cout <<tS << " is in the dictionary\n"; //same as outputting a '1' as the word was found
		else
			cout <<tS << " is not in the dictionary\n"; //same as outputting a '0' as the words wasn't found
	}
};

//Function to read the dictionary file.
void readDictionary(dictionaryTrie &t)
{
	string path;
	ifstream dFile;
	dFile.open("Dictionary.txt"); //requests i/o mode of a file
	if (dFile)
		cout << "Adding Dictionary\n"; //Outputs to the console that the dictionary is being added. Same as outputing a '1' if the dictionary was read.
	else
	{
		do //repeats until it can find a dictionary to read from
		{
			cout << "The Dictionary is missing. Enter the path to the file\n";  //Asks the user for the path to the dictionary. Same as outputting a '0' as the files doesn't exist or wasn't found.
			cin >> path; //gets the users input and sets it to the variable
			dFile.open(path); //opens the file and path that the user entered and starts to reading the dictionary
		} while (!dFile);
	}
	string temp;//Repeats the code block until it reachs the end of the file. 
	while (!dFile.eof())
	{ //Auto Populating the tree with words from the dictionary
		dFile >> temp; //sets the value of temp
		t.addWord(temp);//calls addWord using the temp variable to add the word to the tree
	}
	dFile.close();
}
void searchDictionary(dictionaryTrie &t)
{
	cout << "**************Search Word to Dictionary****************\n";
	cout << "Enter a word: "; //Asks the user for an input
	string temp; //creates a variable where the users input will be kept
	cin >> temp; //sets the variable temp as the users input
	t.searchWord(temp);//calls the searchWord function using the users input which was assigned to temp
}

void userAddWord(dictionaryTrie &t)
{
	cout << "*****************Add Word to Dictionary****************\n";
	cout << "\n\n Enter word to add: "; //Asks the users for an input
	string temp; //create a variable that will be used to hold the users input
	cin >> temp; //sets the temp variable to the users input
	t.addWord(temp); //Calls the addWord() function with the parameter (temp) which was obtained through the users input
}


void menu()
{
	dictionaryTrie dic; 
	readDictionary(dic);
	int a, b; //creates variables to handle user inputs
	char c; //creates variables to handle user inputs
	
	do {
		//Display menu
		cout << "Menu" << endl;
		cout << "1) Add Word" << endl;
		cout << "2) Search Word" << endl;
		cout << "3) Quit." << endl;
		cout << "Please enter your choice: ";
		cin >> a; //Get user input
		switch (a) {
		case 1:  //If 1 is entered then the user is directed to add a word.
			do
			{
				system("cls");
				userAddWord(dic);
				cout << "\n\nDo you want to add another word : Y/N\n";//Prompts the user if they want to continue adding more words
				cin >> c; //Takes the input from the user
			} while (c != 'N' && c != 'n');  //continues repeating this case until 'n'/'N' is enter, when that condition is met it displays the main menu again
			break;
		case 2: //If 2 is entered then the user is directed on how to search for a word
			do
			{ //Does a similar process as case 1, but instead calls searchDictionary using the root 
				system("cls");
				searchDictionary(dic);
				cout << "\n\nDo you want to search another word : Y/N\n";
				cin >> c;
			} while (c != 'N' && c != 'n');
			break;
		case 3: //Exits program
			break; //Trigger the while statement
		default: //This runs when no other case is trigger, so when the user enters something other than 1,2 or 3.
			cout << "Please choose an integer between 1 and 3: ";
			cin >> b;
			a = b;
			break;
		}
	} while (a != 3);

}
int main()
{
	menu();//Calls the Menu Function to display the menu and let the user choose what they want to do.
}