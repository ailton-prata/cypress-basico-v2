Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Ailton')
    cy.get('#lastName').type('Prata')
    cy.get('#email').type('junio.kade@gmail.com')
    cy.get('#open-text-area').type('Test')
    cy.contains('button', 'Enviar').click()

})