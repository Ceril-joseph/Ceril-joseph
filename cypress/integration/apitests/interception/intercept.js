/// <reference types = "Cypress" />


describe('Intercept api',()=>{

    it('intercept post api',()=>{
        cy.visit('https://jsonplaceholder.typicode.com')
        cy.intercept({
            path : '/posts'                     //SYNTAX: intercept({path:'<route to intercept>'}).as('<alias>')
        }).as('posts')

        cy.get("table:nth-of-type(1) a[href='/posts']").click()
        cy.wait('@posts').then(inter=>{
            cy.log(JSON.stringify(inter))
            console.log(JSON.stringify(inter))
        })
    })
})