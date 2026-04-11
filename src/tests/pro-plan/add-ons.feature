Feature: Add-ons (Pro Plan Only)

  Background:
    Given the user is logged in

  @pro @regression @WYASK-011
  Scenario: Pro user can access Add-ons page
    When the user navigates to "/workspace/add-ons"
    Then the Add-ons page should be accessible
