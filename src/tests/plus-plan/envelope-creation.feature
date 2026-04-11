Feature: Envelope Creation (Plus Plan - Shared Flow)

  Note: Envelope creation flow is identical between pro and plus plans.
  The pro-plan envelope tests cover the shared flow comprehensively.
  Plus-plan specific tests focus on plan restrictions (subscription, knowledge vault).

  Background:
    Given the user is logged in

  @plus @regression @WYASK-030
  Scenario: Plus user can access the envelopes page
    Given the user is on the envelopes page
    Then the user should see the envelopes list
