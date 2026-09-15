Feature: Error Validation
@Validation 
@foo
  Scenario Outline: : Verify Error
  Given A login to Ecommerce Application2 with "<email>" and "<password>"
   Then Verify Error Message is displayed
   Examples:
       | email | password |
       | rahulshettyacademy@gmail.com | Learning@830$3mK2 |
          | rahulshettyacademy12@gmail.com | Learning@830$3mK2  |