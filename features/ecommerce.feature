Feature: Ecommerce Regression
@Regression
  Scenario: Say hello
  Given A login to Ecommerce Application with "pavitttt@gmail.com" and "Pavitt@1234567"
    When Add "ZARA COAT 3" to the cart 
    Then Verify "ZARA COAT 3" is displayed in the cart page
    When Enter valid details and place the order
    Then Verify order is present in the order history page