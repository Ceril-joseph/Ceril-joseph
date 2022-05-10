/// <reference types = "Cypress" />


describe('update details of a user',()=>{

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
                "name": 'Ceril Joseph',
                "gender": 'male',
                "email": 'putapitest23@gmail.com',
                "status": 'active'

            }
        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201),
            expect(res.body.data).has.property("name",'Ceril Joseph')
            expect(res.body.data).has.property("gender",'male')
            expect(res.body.data).has.property("email",'putapitest23@gmail.com')
            expect(res.body.data).has.property("status",'active')
        }).then((res)=>{
            const userId = res.body.data.id
            cy.request({
                method: 'PUT',
                url:"https://gorest.co.in/public/v1/users/"+userId,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body:{
                "name": 'Ceril Updated Joseph',
                "gender": 'male',
                "email": 'putapitestupdated23@gmail.com',
                "status": 'active'

            }

            }).then((res)=>{
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(200),
                expect(res.body.data).has.property("name",'Ceril Updated Joseph')
                expect(res.body.data).has.property("gender",'male')
                expect(res.body.data).has.property("email",'putapitestupdated23@gmail.com')
                expect(res.body.data).has.property("status",'active')
            })
        }).then((res)=>{
            const userId = res.body.data.id
            cy.request({
                method: 'GET',
                url:"https://gorest.co.in/public/v1/users/"+userId,
            headers:{
                'Authorization': 'Bearer '+accessToken
            }
            }).then((res)=>{
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(200),
                expect(res.body.data).has.property("name",'Ceril Updated Joseph')
                expect(res.body.data).has.property("gender",'male')
                expect(res.body.data).has.property("email",'putapitestupdated23@gmail.com')
                expect(res.body.data).has.property("status",'active')
            })
        })


        
    })
})