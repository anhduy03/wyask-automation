Feature: Knowledge Vault (Plus Plan - Restricted)

  Background:
    Given the user is logged in

  @plus @regression @WYASK-022
  Scenario: Plus user cannot access Knowledge Vault
    When the user navigates to "/workspace/knowledge-vault"
    Then the Knowledge Vault page should NOT be accessible
