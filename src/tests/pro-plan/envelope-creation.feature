Feature: Envelope Creation (Pro Plan)

  Background:
    Given the user is logged in

  @pro @regression @WYASK-003
  Scenario: Verify that the name is a mandatory field
    Given the user is on the envelopes page
    When the user clicks on the "New envelope" button
    And the user leaves the "Name" field blank
    And the user uploads a mock file to the Knowledge field
    And the user selects "English" from the Language dropdown
    And the user selects "Formal" from the Tone dropdown
    Then the Continue button should be disabled
    When the user enters a name in the "Name" field
    Then the Continue button should be enabled

  @pro @regression @WYASK-004
  Scenario Outline: Verify that the Knowledge field is a mandatory field
    Given the user is on the envelopes page
    When the user clicks on the "New envelope" button
    And the user enters "<Name>" in the "Name" field
    And the user selects "English" from the Language dropdown
    And the user selects "Formal" from the Tone dropdown
    Then the Continue button should be disabled
    When the user uploads "<Mock File>" to the Knowledge field
    Then the Continue button should be enabled

    Examples:
      | Name            | Mock File        |
      | Test Envelope 1 | mock_file_1.png  |
      | Test Envelope 2 | mock_file_2.jpg  |
      | Test Envelope 3 | mock_file_3.pdf  |

  @pro @regression @WYASK-005
  Scenario: Verify that the envelope can be created successfully
    Given the user is on the envelopes page
    When the user clicks on the "New envelope" button
    And the user enters "WYASK-005 Envelope" in the "Name" field
    And the user uploads "mock_file_5.pdf" to the Knowledge field
    And the user selects "English" from the Language dropdown
    And the user selects "Formal" from the Tone dropdown
    And the user submits the envelope form
    Then a successful notification should display
    And the "Brand your envelope" page should display

  @pro @regression @WYASK-006
  Scenario: Verify envelope form has Language and Tone options
    Given the user is on the envelopes page
    When the user clicks on the "New envelope" button
    Then the Language dropdown should be visible
    And the Tone dropdown should be visible
