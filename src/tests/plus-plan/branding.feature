Feature: Branding Verification (Shared)

  Background:
    Given the user is logged in

  @shared @regression @WYASK-001
  Scenario: User can see WYASK branding on the home page
    Given the user is on the home page
    When the user scrolls to the bottom of the page
    Then the user should see "WYASK" branding
