/// <reference types = "Cypress" />

const dataJson = require('../../fixtures/userdetail')

describe('delete user request',()=>{

    let accessToken = 'dd32700a96a1bdc407103f7f93a4bd2875ff41a44e23b5fe557f7bea9e81260d'
    let randomtext=""
    let testEmail=""
    let userId =0

    it('create user test',()=>{
        var pattern="Aksncowuecllcnoweunclncwjncoerucnlwmcn"
        for(var i=0;i<10;i++)
        randomtext+=pattern.charAt(Math.floor(Math.random()*pattern.length))
        testEmail = randomtext+"@gmail.com"
       
        cy.request({
            method: 'POST',
            url:"https://gorest.co.in/public/v1/users",
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body:{
                "name": dataJson.name,
                "gender": dataJson.gender,
                "email": testEmail,
                "status": dataJson.status

            }
        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201),
            expect(res.body.data).has.property("email", testEmail),
            expect(res.body.data).has.property("name",dataJson.name),
            expect(res.body.data).has.property("status",dataJson.status)

        }).then((res)=>{
            userId = res.body.data.id
            cy.log("User ID created: "+userId)
            cy.request({
                method: "DELETE",
                url:"https://gorest.co.in/public/v1/users/"+userId,
                headers:{
                    'Authorization': 'Bearer '+accessToken
                }
            }).then((res)=>{
                expect(res.status).to.eq(204)
            })
        }).then((res)=>{
            //userId = res.body.data.id
            cy.log("User ID created: "+userId)
            cy.request({
                method: "GET",
                url:"https://gorest.co.in/public/v1/users/"+userId,
                failOnStatusCode: false,
                headers:{
                    'Authorization': 'Bearer '+accessToken
                }
            }).then((res)=>{
                //cy.log(JSON.stringify(res))
                expect(res.status).to.eq(404)
                //expect(res.data.message).to.eq('Resource not found')
            })
        })
    })
})