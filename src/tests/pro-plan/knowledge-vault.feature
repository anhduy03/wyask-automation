Feature: Knowledge Vault (Pro Plan Only)

  Background:
    Given the user is logged in

  @pro @regression @WYASK-010
  Scenario: Pro user can access Knowledge Vault
    When the user navigates to "/workspace/knowledge-vault"
    Then the Knowledge Vault page should be accessible
