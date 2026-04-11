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
  Scenario Outline: Verify that the Knowledge field is a mandatory field
    Given the user is on the envelopes page
    When the user clicks on the "plus New envelope" button
    And the user enters "<Name>" in the "Name" field
    And the user leaves the "Knowledge" field blank
    And the user selects a random language
    And the user selects a random tone
    Then the "Continue" button should be disabled
    When the user uploads "<Mock File>" to the Knowledge field
    Then the "Continue" button should be enabled

  Examples:
    | Name            | Mock File        |
    | Test Envelope 1 | mock_file_1.png  |
    | Test Envelope 2 | mock_file_2.jpg  |
    | Test Envelope 3 | mock_file_3.pdf  |

  @regression @WYASK-005
  Scenario: Verify that the envelope can be created successfully
    Given the user is on the envelopes page
    When the user clicks on the "plus New envelope" button
    And the user enters "WYASK-005 Envelope" in the "Name" field
    And the user uploads "mock_file_5.png" to the Knowledge field
    And the user selects a random language
    And the user selects a random tone
    When the user clicks enter button
    Then a successful notification displays
    And the Brand your envelope page displays
