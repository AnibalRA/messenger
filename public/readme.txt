Readme
======

#1	We also need to remove Meteor's default ECMAScript2015 package named ecmascript because Angular-Meteor uses a package named 
	angular-babel in order to get both ECMAScript2015 and AngularJS DI annotations.

	So let's remove it by running:

	- meteor remove blaze-html-templates
	  ----------------------------------

	- meteor remove ecmascript
	  ------------------------

#2	Now let's add the Angular 1 package to Meteor, back in the command line, launch this command:

	- meteor add angular
	  ------------------
	  
#3	The routing functionality added by this step is provided by the ui-router module, which is distributed separately from the core
	Angular 1 framework.

	We will install ui-router with the help of the official Meteor package.
	
	Type in the command line:
	
	- meteor add angularui:angular-ui-router
	  --------------------------------------
      
#4  Instalados. Parte I

    - meteor add momentjs:moment
      --------------------------
      
    - meteor add jasonaibrahim:angular-moment
      ---------------------------------------
      
    - meteor add check
      ----------------
      
    - meteor add accounts-password
      ----------------------------
      
#5	First we need to remove the autopublish Meteor package.

	autopublish is added to any new Meteor project. It pushes a full copy of the database to each client. It helped us until now, but
	it's not so good for privacy...

	- meteor remove autopublish
	  -------------------------
      
    - meteor add reywood:publish-composite
      ------------------------------------
      
#6  Instalados. Parte II

    - meteor add ixdi:material-design-iconic-font
      -------------------------------------------
      
    - meteor add komorebi:waves
      -------------------------
      
    - meteor add mrt:humane
      ---------------------
      
      
      
      
      http://www.angular-meteor.com/tutorials/whatsapp/meteor/userprofile