import * as cypress from "cypress";

describe('PilotPage', () => {
  beforeEach(() => {
    cy.visit("http://web:3000", { retryOnNetworkFailure: true });
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
