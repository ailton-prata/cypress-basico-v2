/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {    
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mauris purus, interdum porta efficitur ac, vehicula vitae tortor. Suspendisse potenti. Integer sit amet nibh nisi. Vestibulum sollicitudin nisi et odio elementum viverra. Praesent a velit vel neque posuere congue eu commodo eros. Maecenas turpis tortor, tristique sit amet elit non, lobortis rhoncus nunc. Phasellus ornare, justo sit amet ultrices bibendum, ligula leo accumsan elit, in dignissim nulla nibh sed diam. Etiam cursus commodo sapien in feugiat. Etiam nec mi eget nibh sagittis ultrices. Praesent fermentum auctor condimentum. Sed placerat ultrices magna quis suscipit."
        cy.get('#firstName').type('Ailton')
        cy.get('#lastName').type('Prata')
        cy.get('#email').type('junio.kade@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    
    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Ailton')
        cy.get('#lastName').type('Prata')
        cy.get('#email').type('junio.kade@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone')
            .type('abcde')
            .should('have.value', '')

    })

    it('campo telefone continua deve ser obrigatório ao enviar formulário', function() {
        cy.get('#firstName').type('Ailton')
        cy.get('#lastName').type('Prata')
        cy.get('#email').type('junio.kade@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Ailton').should('have.value', 'Ailton').clear().should('have.value', '')
        cy.get('#lastName').type('Prata').should('have.value', 'Prata').clear().should('have.value', '')
        cy.get('#email').type('junio.kade@gmail.com').should('have.value', 'junio.kade@gmail.com').clear().should('have.value', '')
        cy.get('#open-text-area').type('Teste').should('have.value', 'Teste').clear().should('have.value', '')
        cy.get('#phone').type('2298304231').should('have.value', '2298304231').clear().should('have.value', '')

    })

    it('exibe mensagem erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')


    })


    it('selecione um produto (Youtube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
           
    })
   
    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        cy.get('#firstName').type('Ailton')
        cy.get('#lastName').type('Prata')
        cy.get('#email').type('junio.kade@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
   
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: "drag-drop"})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
        .selectFile('@sampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
    })


  })
