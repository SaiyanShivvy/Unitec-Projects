/*
Author: Shivneel Achari
Assignment 1
Date: 19/5/2017 -- Final Update --
*/


/* Just some information on the Assignment 

Required Functions
	MLL *CreateMultiLinkList()
	void InsertNode(MLL *myList, usigned int ID, char Name[], char LastName[], char Email[], char Country[])
	void PrintByID(MLL *myList)
	void PrintByLN(MLL *myList)
	Node *RetrieveNodeByID(MLL *myList, unsigned int ID)
	Node *RetrieveNodeByLN(MLL *myList, char LastName[])

Rules
	When inserting a node the pID should be used to place the node sorted in the acscending ID order

	When inserting a node, you will use the pLN pointer on the head to insert the new node in an alphabetical ordered way, using the Last Name field as the order index. pLN will address
	the node with the smallest alphabetical Last Name, and this node will address the next smallest one and so on. 

	All functions should fit the prosed prototype (in required fucntions)
*/

#include "stdafx.h"
#include <iostream>
#include <string>

using namespace std;

struct MLL {					//General node structure
	unsigned int ID;
	std::string Name;			
	std::string LastName;
	std::string Email;
	std::string Country;
	MLL* next;					//used when adding/traversing/deleting nodes 
};

struct node {
	unsigned int ID;		//Used in functions *RetrieveNodeByID and *RetrieveNodeByLN
};

struct MLL* head = NULL;	//Global Head pointer, since I couldnt get the other function to work.

MLL *CreateMultiLinkList() {
	MLL *myList = NULL;		
	MLL *pID = NULL;		//Pointer used to address nodes using the ID Field
	MLL *pLN = NULL;		//Pointer used to address nodes using the Last Name Field
	//return &myList;		//Meant to return the memory address of myList pointer 
	return 0;				//but that doesn't seem to work for me
}

void deleteList(struct MLL** head_ref)		//Fucntion to deletes all nodes in a list
{
	/* deref head_ref to get the real head */
	struct MLL* current = *head_ref;
	struct MLL* next;
	while (current != NULL)
	{
		if (current == NULL)		//Check if the list is already empty
			break;
		else
		{							//If it isn't empty it goes throgh the list deleting nodes.
			MLL *temp = current;
			current = current->next;
			delete temp;
		}
	}
	cout << "List Deleted" << "\n";		//outputs that the list has been deleted
}


void InsertNode(/*MLL *myList,*/unsigned int ID, char Name[15], char LastName[15], char Email[30], char Country[15]) //Couldnt get the pointer working so decided to remove it
{
	//head = myList;			//creates a pointer to use a temporary head which takes its value from myList pointer
	struct MLL *temp;
	temp = new MLL;				//Creates a temp node
	temp->ID = ID;				//Assigns Data to relevant fields
	temp->Name = Name;
	temp->LastName = LastName;
	temp->Email = Email;
	temp->Country = Country;
	temp->next = head;			
	head = temp;
}

void PrintByID(/*MLL *myList*/) {					//This function should print by ID but I haven't currently got a sorting function that handles that
	struct MLL *pID = head;							//creates a temp head 

	if (pID != NULL) {
		// Start from the beginning
		while (pID != NULL)
		{
			std::cout << pID->ID << ", ";				//Prints nodes
			std::cout << pID->Name << ", ";
			std::cout << pID->LastName << ", ";
			std::cout << pID->Email << ", ";
			std::cout << pID->Country << "\n";
			pID = pID->next;							//Goes to the next node
		}
	}
	else {
		std::cout << "List is Empty";					//Prints this if there aren't any nodes in the list
	}

	std::cout << std::endl;
}

void PrintByLN(/*MLL *myList*/) {						//Does the same thing as PrintByID()
	struct MLL *pLN = head;

	if (pLN != NULL) {
		while (pLN != NULL)
		{
			std::cout << pLN->ID << ", ";
			std::cout << pLN->Name << ",  ";
			std::cout << pLN->LastName << ",  ";
			std::cout << pLN->Email << ", ";
			std::cout << pLN->Country << "\n";
			pLN = pLN->next;
		}
	}
	else {
		std::cout << "List is Empty";
	}
	std::cout << std::endl;
}

/*
node *RetrieveNodeByID(MLL *myList, unsigned int ID) {				//Retrieves the node with an ID matching that of the parameter given
	return 0;														//Returns memory address of the retrieves node and takes it out of the list.
}

node *RetrieveNodeByLN(MLL *myList, char LastName[]) {				//Similar to *RetrieveNodeByID but instead uses LN
	return 0;
}
*/

int main()
{
	//Testing the Functions
	//Outputs to the console what operation is currently happening
	cout << "Inserting Test Nodes...." << "\n";						
	//*CreateMultiLinkList();				//Since I couldn't call the original pointer I decided it to remove it
	InsertNode(/*myList,*/ 5, "Alexa", "Perl", "test1@gmail.com", "New Zealand");		//Test data to add new nodes to the list
	InsertNode(/*myList,*/ 8, "Shrimp", "Xhaya", "test2@gmail.com", "USA");				//removed parameter for head pointer address
	InsertNode(/*myList,*/ 3, "Steven", "Wu", "test3@gmail.com", "Mexico");				//The InsertNode Function will create a temp head within the function
	InsertNode(/*myList,*/ 4, "Ray", "Jefferson", "test4@gmail.com", "Canada");
	InsertNode(/*myList,*/ 6, "June", "Davids", "test5@gmail.com", "Greece");
	InsertNode(/*myList,*/ 1, "Zack", "Smith", "test6@gmail.com", "Chile");

	cout << "Done...." << "\n\n";
	
	cout << "Printing List Sorted by ID" << "\n";
	PrintByID();									// Prints the Test Nodes (unsorted as there currently is any function/code to sort)
	cout << "Printing List Sorted by Last Name" << "\n";
	PrintByLN();
	
	cout << "Deleting List" << "\n";
	deleteList(&head);					//deletes all nodes in the list		

	system("pause");					//Pauses the console so the output can be seen
	return 0;
}


