## Form in three steps with AngularJS
---


### Instalation
____

Just download and run locale in some of your browser


### What script I use
____

- Angular ngAnimate module [a link](https://docs.angularjs.org/api/ngAnimate)
- AngularUI Router [a link](https://github.com/angular-ui/ui-router)
- Angular Local Storage [a link](https://github.com/grevory/angular-local-storage)


### Task
___

Using AngularJS, create a web registration form with **three consecutive steps**. 

The first step should allow a person to enter their first name, last name, and email address. 

The second step should prompt that person for their vehicle information: Make (ex Honda, Toyata), Model (ex. Civic, Accord, Camery), and Year. 

The final step should prompt a person for a credit card number and expiration date. In addition, the following criteria should also be met:

* All input fields are required to be filled out
* A person should not be able to progress to the next step until all input forms on the current step have been filled in.
* A person should be able to go back to previous steps and change any information
* If the webpage is closed then reopened, any information the user filled in should be automatically populated and the user should be directed to the next uncompleted step
* Submitting the full registration form should persist the user to a list of completed users saved in localstorage.
* After a user successfully submits the registration form, they should be directed to another page thanking them for signing up. Any subsequent page refreshes should restart the registration process.

Additionally, there should be a separate 'index' page that lists all the users who have registered. Since there is no backend component to this project, the page only needs to display people who have registered on that computer.

The site need not be pretty but bonus points for styles and animations.

Additional bonus points for any sort of automated tests.

Please write your code using ES6/7 and include a method of transpiling the code using Babel.js. 

Also include a README.md file with instructions for installing dependencies, transpiling the code, and running the website locally. 

Please use git while developing the project. The final deliverable should be a link to a repository on Github that can be cloned and run by a developer without additional instructions besides those described in the README.

Delivery format: link to GIT repo
Please send your solution within a week.