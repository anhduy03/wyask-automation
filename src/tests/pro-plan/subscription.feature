Feature: Subscription Settings (Pro Plan)

  Background:
    Given the user is logged in

  @pro @regression @WYASK-012
  Scenario: Pro user sees Switch plan option
    Given the user is on the subscription settings page
    Then the "Switch plan" button should be visible
    And the user should see the current plan indicator
