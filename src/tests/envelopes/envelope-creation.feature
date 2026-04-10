Feature: Envelope Creation

  Background:
    Given the user is logged in to the application

  @regression @WYASK-003
  Scenario: Verify that the name is a mandatory field
    Given the user is on the envelopes page
    When the user clicks on the "plus New envelope" button
    And the user leaves the "Name" field blank
    And the user uploads a mock file to the Knowledge field
    And the user selects a random language
    And the user selects a random tone
    Then the "Continue" button should be disabled
    When the user enters a name in the "Name" field
    Then the "Continue" button should be enabled

  @regression @WYASK-004
  Scenario: Verify that the Knowledge field is a mandatory field
    Given the user is on the envelopes page
    When the user clicks on the "plus New envelope" button
    And the user enters a name in the "Name" field
    And the user leaves the "Knowledge" field blank
    And the user selects a random language
    And the user selects a random tone
    Then the "Continue" button should be disabled
    When the user uploads a mock file to the Knowledge field
    Then the "Continue" button should be enabled
