/// <reference types = "Cypress" />

describe('Check weather information', ()=>{

    it('get weather info for the cities',()=>{

        cy.request({
            method:'GET',
            url:'https://www.metaweather.com/api/location/search/?query=san'
            
        }).then((res)=>{
            const city=res.body[0].title
            return city
        }).then((city)=>{
            cy.request({
                method:'GET',
                url:'https://www.metaweather.com/api/location/search/?query='+city  
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body[0]).to.have.property('title',city)
            })
        })
    })


    it.only('get weather info for the all cities',()=>{

        cy.request({
            method:'GET',
            url:'https://www.metaweather.com/api/location/search/?query=san'
            
        }).then((res)=>{
            const location=res.body
            return location
        }).then((location)=>{
            for(let i=0;i<location.length;i++){
            cy.request({
                method:'GET',
                url:'https://www.metaweather.com/api/location/search/?query='+location[i].title 
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body[0]).to.have.property('title',location[i].title)
            })
        }
        })
    })
})