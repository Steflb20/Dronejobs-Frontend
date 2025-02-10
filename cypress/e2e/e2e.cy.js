"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('PilotPage', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:3000');
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
