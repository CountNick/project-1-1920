# Oba data editor
*__You decide which data you share__*

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

When the user enters a subscriber number the profile page gets rendered and a fetch request gets send with each isbn number of the books rented by the user. 

## Wishlist

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

## To Do's:

* Make a color/stylesheet for the application

* Make a from which will take the follwoing user input:
    * Age
    * Genre/subject
    * Surprise button

* Make a fetch request based on the given userinput, this input can be:
    * Genre/subject
    * Age
    * Suprise me (give a random genre or subject to the fetch request) 

* Render the search results
    * Render a list of suited books
