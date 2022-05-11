/// <reference types = "Cypress" />

describe('get api user tests', ()=>{   // "describe" block is from mocha

    let accessToken = 'dd32700a96a1bdc407103f7f93a4bd2875ff41a44e23b5fe557f7bea9e81260d'
    

    it.only('get users', ()=>{    // "it" block is from mocha
        cy.request({

            method : 'GET',
            url: "https://gorest.co.in/public-api/users",
            headers : {
                'authorization' : "Bearer "+ accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)   //chai assertion method
            expect(res.body.meta.pagination.limit).to.eq(20)
        })
    })

    it.only('get users by id', ()=>{
        cy.request({

            method : 'GET',
            url: "https://gorest.co.in/public-api/users/2204",
            headers : {
                'authorization' : "Bearer "+ accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)   //chai method
            expect(res.body.data.name).to.eq('Chitrali Devar')
        })
    })

    



})