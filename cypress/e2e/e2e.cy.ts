import * as cypress from "cypress";

describe('PilotPage', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000", { retryOnNetworkFailure: true });
  });

  it('displays the title', () => {
    cy.get('[data-testid="cypress-title"]').should('contain', 'Dronejobs');
  });

  it('allows searching for pilots', () => {
    cy.get('.grid').children().should('have.length', 10);

    cy.get('input[placeholder="Search pilots..."]').type('John Doe');

    cy.get('.grid').children().should('have.length', 1);
    cy.contains('John Doe').should('be.visible');
  });

  it('filters pilots by specialty', () => {
    it('filters pilots by specialty', () => {
      cy.get('.grid').children().should('have.length', 10);

      cy.get('[data-testid="cypress-title"]').contains('Dronejobs');
      cy.get('.select-trigger').click();
      cy.contains('.select-item', 'Aerial Photography').click();

      cy.get('.grid').children().should('have.length', 2);
      cy.contains('.card-title', 'John Doe').should('be.visible');
      cy.contains('.card-title', 'Thomas Müller').should('be.visible');

      cy.get('.select-trigger').click();
      cy.contains('.select-item', 'All Specialties').click();
      cy.get('.grid').children().should('have.length', 10);
    });

  });

  it('opens the booking dialog for a pilot', () => {
    cy.get('.grid').children().first().find('button').contains('Book Now').click();

    cy.get('h2').should('contain', 'Book');
  });

  it('allows booking a pilot', () => {
    cy.get('.grid').children().first().find('button').contains('Book Now').click();


    cy.get('button').contains('Confirm Booking').click();

    cy.on('window:alert', (str) => {
      expect(str).to.contain('Booked');
    });
  });
});
