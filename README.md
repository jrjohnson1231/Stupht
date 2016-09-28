# Stupht (pron. 'stuffed')

What is Stupht?
---------------
Stupht is a everything a food-lover is missing on social media. Post recipes, links, at chat about food with your friends!

How does it work?
-----------------
The application is an Angular 2 application built on top of a Ruby on Rails 5 API. Webpack is used to bundle the application, making it super fast. Stupht uses JWTs for authentication, and Rails' ActionCable + JavaScript's native WebSockets to allow real time updating. Even though ActionCable is meant to be used inside a pure Rails app, I have build an Angular interface that converts the ActionCable stream into an RxJs Observable subscription. This makes connecting to ActionCable seemless within the app, as Observable's are already heavily used in Angular 2.

How do I sign up?
----------------
The most up to data production code is currently on https://stupht.herokuapp.com.

What's coming next?
-------------------
Features soon to be added:

* Following of users
* Private chats between users (currently the app just has a single chatroom)
* Ability to create different types of posts i.e. opinions, recipes, reviews
