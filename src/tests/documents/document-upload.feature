Feature: Document Upload

  Background:
    Given the user is logged in to the application

  @regression @WYASK-002
  Scenario: User can navigate to document upload page
    Given the user is on the home page
    When the user clicks on "Upload your first document" link
    When the user clicks on "Upload file" button
    Then the user should see the "New knowledge envelope" heading
