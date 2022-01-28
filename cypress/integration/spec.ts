describe('The application loads', () => {
  it('Visits the initial page', () => {
    cy.visit('/')
    cy.contains('EU DCC Validation')
    cy.contains('Welcome')

    cy.get('[id="mat-radio-2-input"]').first().check({force: true});
  })

  it('Selects Platform and Country', () => {
    cy.visit('/')
    cy.contains('EU DCC Validation')
    cy.contains('Welcome')

    cy.get('#mat-radio-3 > .mat-radio-label > .mat-radio-label-content').click({force: true})
    cy.get('#mat-input-1').clear()
    cy.get('#mat-input-1').type('EL{enter}')
    cy.wait(500)
    cy.get('.mat-dialog-actions > button.mat-focus-indicator').click()

    cy.contains('IOS');
    cy.contains('EL');

    cy.get('.dcc-main-menu').click()
    cy.get(':nth-child(369) > .mat-focus-indicator > .mat-button-wrapper').scrollIntoView().should('be.visible');
  })


  it('Submits test results and navigates', () => {
    cy.visit('/')

    cy.get('#mat-radio-3 > .mat-radio-label > .mat-radio-label-content').click({force: true})
    cy.get('#mat-input-1').clear()
    cy.wait(500)
    cy.get('#mat-input-1').type('{selectall}DE{enter}')
    cy.wait(500)
    cy.get('.mat-dialog-actions > button.mat-focus-indicator').click()

    cy.contains('IOS');
    cy.contains('EL');

    cy.get('.dcc-btn-valid').click();
    cy.contains('Valid: 1')

    cy.get('.dcc-text-reason').clear().type('This is invalid.')
    cy.get('.dcc-btn-invalid').click();
    cy.contains('Invalid: 1')

    cy.get('.dcc-text-reason').clear().type('There is an error.')
    cy.get('.dcc-text-reason').should('have.value', 'There is an error.')
    cy.get('.dcc-btn-error').click();
    cy.contains('Error: 1')

    cy.get('.dcc-text-reason').should('have.value', '')

    // Access the previously posted messages 
    cy.get('.dcc-btn-previous').click();
    cy.get('.dcc-text-reason').should('have.value', 'There is an error.')

    cy.get('.dcc-btn-previous').click();
    cy.get('.dcc-text-reason').should('have.value', 'This is invalid.')

    cy.get('.dcc-btn-previous').click();
    cy.get('.dcc-text-reason').should('have.value', '')
  })

})
