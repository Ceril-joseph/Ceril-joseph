/// <reference types = "Cypress" />

describe('get api user tests', ()=>{   // "describe" block is from mocha

    let accessToken = '346827796d08fb91c1ba8d94b33af090891413cb0c5e3d953fe7871a940861d1'
    

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