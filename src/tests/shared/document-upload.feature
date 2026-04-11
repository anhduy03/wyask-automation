Feature: Document Upload (Shared)

  Background:
    Given the user is logged in

  @shared @regression @WYASK-002
  Scenario: User can navigate to document upload page
    Given the user is on the home page
    When the user clicks on Upload your first document
    And the user clicks the Upload file button
    Then the user should see the New knowledge envelope heading
