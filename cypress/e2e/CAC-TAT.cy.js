/// <reference types="Cypress" />

const { title } = require("process")

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.viewport(1280, 880);
      cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Teste, teste Teste, teste Teste, teste Teste, teste Teste, teste Teste, teste Teste, teste ';
      cy.get('#firstName').type('Seu Nome', { delay: 0 });
      cy.get('#lastName').type('Seu Sobrenome', { delay: 0 });
      cy.get('#email').type('seuemail@exemplo.com', { delay: 0 });
      cy.get('#open-text-area').type(longText, { delay: 0 });
      cy.contains('button', 'Enviar').click()
       
      // Verifique se a mensagem de sucesso está visível
      cy.get('.success').should('be.visible');
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email co formatação inválida', function() {
      cy.get('#firstName').type('Seu Nome')
      cy.get('#lastName').type('Seu Sobrenome')
      cy.get('#email').type('seuemail@exemplo@com', { delay: 0 })
      cy.get('#open-text-area').type('Teste', { delay: 0 })
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible') 
    })
    
    it('Campo telefone continua vazio quando preenchido com valor diferente de numérico', function() {
      cy.get('#phone')
        .type('abcdefghijkl')
          .should('have.value', '')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible') 
      
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('#firstName').type('Seu Nome')
      cy.get('#lastName').type('Seu Sobrenome')
      cy.get('#email').type('seuemail@exemplo.com', { delay: 0 })
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste', { delay: 0 })
      //cy.get('#phone')
        //.type('abcdefghijkl')
          //.should('have.value', '')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos  nome, sobrenome, email e telefone', function() {
      cy.get('#firstName').type('Seu Nome').should('have.value','Seu Nome')
      .clear()
      .should('have.value','')
      cy.get('#lastName').type('Seu Sobrenome').should('have.value','Seu Sobrenome')
      .clear()
      .should('have.value','')
      cy.get('#email').type('seuemail@exemplo.com', { delay: 0 }).should('have.value','seuemail@exemplo.com')
      .clear()
      .should('have.value','')
      cy.get('#phone-checkbox').click()
      cy.get('#phone')
        .type('99999999')
          .should('have.value','99999999')
          .clear()
          .should('have.value','')
    })

    it('exibirerro ao submeter formuilário sem preencher os campos obrigatórios', function() {
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado',function(){
      cy.fillMandatoryFieldsAndSubmit()
    })
    
    it('seleciona um produto (Youtube) por seu texto',function(){
      cy.get('#product').select('youtube')
      .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
      cy.get('#product').select('Mentoria')
      .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu Indice',function(){
      cy.get('#product').select(1)
      .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"',function(){
      cy.get('input[type="radio"][value="feedback"]').check()
      .should('be.checked')
    })

    it('mmarca cada tipo de atendimento',function(){
      cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

    it('mmarca cada tipo de atendimento',function(){
      cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

  })