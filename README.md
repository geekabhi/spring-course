Spring Course
============

This is a sample application for using in memory h2 database services with the [Spring Framework](http://spring.io) and [Spring Boot](http://projects.spring.io/spring-boot/).

This application has been built to store the same domain objects in one of a variety of different persistence technologies - relational, document, and key-value stores. This is not meant to represent a realistic use case for these technologies, since you would typically choose the one most applicable to the type of data you need to store, but it is useful for testing and experimenting with different types of services on Cloud Foundry.

The application use Spring Java configuration and [bean profiles](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html) to configure the application and the connection objects needed to use the persistence stores. 

## Building

This project requires a Java version between 8 and 15 to compile.

To build a runnable Spring Boot jar file, run the following command: 

~~~
$ ./gradlew clean assemble
~~~

## Running the application locally

The application can be started locally using the following command:

~~~
$ java -jar build/libs/spring-course.jar
~~~

If no profile is provided, an in-memory relational database will be used. Spring Boot will auto-configure a connection to the database using it's auto-configuration defaults. The connection parameters can be configured by setting the appropriate [Spring Boot properties](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html).

If more than one of these profiles is provided, the application will throw an exception and fail to start.

## Frameworks and coding structure

It is using Angular 1.2 for UI and Spring boot 2.4.0 version. 

It has following coding structure:

*domain:* This contains the JPA entity of Course with id(auto generated), title, description, duration etc.

*repsositories:* This is a JPA repository of Course to usind CRUD (Create, Read, Update, Delete) operations.

*web:* This contains the controller to do the api REST operations.

*resources/static:* This contains the static html, js, and css for rendering the UI.
