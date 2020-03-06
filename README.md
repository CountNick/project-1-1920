# Oba data editor
*__You decide which data you share__*

[Checkout the live version](https://countnick.github.io/project-1-1920/), __login with number: 1, 2 or 3 as username and password__

![Screenshot](https://user-images.githubusercontent.com/47485018/76060182-fb9c5280-5f80-11ea-876e-eb21efe6dbd5.png)


## Table of contents

* ### [Concept](https://github.com/CountNick/project-1-1920#concept)
* ### [Data](https://github.com/CountNick/project-1-1920#data)
* ### [Wishlist](https://github.com/CountNick/project-1-1920#wishlist)
* ### [Initial Ideas](https://github.com/CountNick/project-1-1920#wishlist)
* ### [Installation]()

## Concept

Oba data editor is a user profile where people can change or remove the information they have previously shared with OBA, check their reading behaviour, check rented books and get reading recomendations according to genre.

### Login 
![Login](https://user-images.githubusercontent.com/47485018/76058929-e7a32180-5f7d-11ea-8230-fe7c4bb7f3f2.gif)


### User profile
![profile1](https://user-images.githubusercontent.com/47485018/76059149-6a2be100-5f7e-11ea-96ba-28d45ab4c7d9.gif)

![profile 2](https://user-images.githubusercontent.com/47485018/76059317-d3abef80-5f7e-11ea-85f4-294e8dabb872.gif)

### Book detail
![bookDetail](https://user-images.githubusercontent.com/47485018/76059480-4321df00-5f7f-11ea-83f3-ed441f59ce4f.gif)

![bookDetail2](https://user-images.githubusercontent.com/47485018/76059619-9b58e100-5f7f-11ea-9b41-7a2d4ee43e8f.gif)

## Data

### __Data__

* Oba excell datasheet with user data(not published), the file in this project is a [mockup](https://github.com/CountNick/project-1-1920/blob/master/fakeSet.json)

* The valid ISBN numbers get filtered out of the excel dataset and a fetch request to the OBA api gets send with these numbers

### How the data flow works: 

When the user enters his or her subscriber number the profile page gets rendered and a fetch request gets send with each isbn number of the books rented by the user. When the user clicks on one of the previously rented books a detailpage of said book gets rendered and a new fetch to the API is done with the genre of the book that has been clicked.

For the live version i made a mock up of the data. If you want to try it out you can login with number: 1, 2 or 3. The number has to be typed in the username and password input.

## Wishlist

Things i wanted to do but didn't have any time for

* Data visualisations
    * Reading behaviour
    * How many males / females are interested in your favorite genre
    * How many people from your postal code are interested in the same genre 

* Detail page for each recommended books

* Make data changeble

* Render appropriate color schemes in profile according to age of user

## Initial ideas

Search engine for kids' books based on user input:

* Choose a subject
* Enter your age
* Show suited books for kid based on the given input

## Installation 

Installation

__*Note in order to run this project locally you need some kind of local server to start it up. I used the liveServer extension in VS Code*__

Open up terminal, and type:

```
git clone https://github.com/CountNick/project-1-1920.git
```
```
cd project-1-1920
```
Open up the folder in VS code and start live server. The app will now be running on localhost:5500