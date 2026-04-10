Feature: Branding Verification

  Background:
    Given the user is logged in to the application

  @regression @WYASK-001
  Scenario: User can see WYASK branding on the page
    Given the user is on the home page
    When the user scroll down to the bottom of the page
    Then the user will see the "WYASK" image