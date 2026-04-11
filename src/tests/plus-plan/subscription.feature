Feature: Subscription Settings (Plus Plan)

  Background:
    Given the user is logged in

  @plus @regression @WYASK-020
  Scenario: Plus user sees Upgrade to Pro option
    Given the user is on the subscription settings page
    Then the "Upgrade to Pro" button should be visible
    And the user should see the current plan indicator

  @plus @regression @WYASK-021
  Scenario: Plus user does not see Switch plan option
    Given the user is on the subscription settings page
    Then the "Switch plan" button should not be visible
