/// <reference types = "Cypress" />

const dataJson = require('../../fixtures/userdetail')

describe('post user request',()=>{

    let accessToken = '57216e2636099b3d833e095221888b5cbea86b1b363d36afd4f6656af68fdebd'
    let randomtext=""
    let testEmail=""

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
            const userId = res.body.data.id
            cy.log("User ID created: "+userId)
            cy.request({
                method: "GET",
                url:"https://gorest.co.in/public/v1/users/"+userId,
                headers:{
                    'Authorization': 'Bearer '+accessToken
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.data).has.property("id", userId),
                expect(res.body.data).has.property("email", testEmail),
                expect(res.body.data).has.property("name",dataJson.name),
                expect(res.body.data).has.property("status",dataJson.status)
            })
        })
    })
})