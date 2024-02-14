/// <reference types="cypress" />
import 'cypress-xpath';

describe('Test Almosafer', () => {
    it('ChooseRandomTrip', () => {
        cy.visit("https://www.almosafer.com/ar/")
        cy.get('.cta__continue').click()
        const RandomNum = Math.floor(Math.random() * 2)
        if (RandomNum === 0) {
            EnglishOption();
        } else if (RandomNum === 1) {
            ArabicOption();
        }
    });



    function RandomOrigin() {
        cy.xpath('//*[@id="uncontrolled-tab-example-tabpane-flights"]/div/div[2]/div[1]/div/div[2]/div[1]/div/div/ul/li')
            .its('length')
            .then((theLength) => {
                const RandomIndex = Math.floor(Math.random() * theLength);
                cy.xpath('//*[@id="uncontrolled-tab-example-tabpane-flights"]/div/div[2]/div[1]/div/div[2]/div[1]/div/div/ul/li')
                    .eq(RandomIndex)
                    .click();
            });
    }

    function RandomDestination() {
        cy.get('.sc-hAnkBK').its('length').then((theLength) => {
            const RandomIndex = Math.floor(Math.random() * theLength);
            cy.get('.sc-hAnkBK').eq(RandomIndex).click();
        });
    }

    function RandomDate() {
        cy.xpath('//*[@id="DATEPICKER_DIALOG_ID"]/div/div[2]/div/div[2]/div[5]/div')
            .filter(':not(.DayPicker-Day--outside)')
            .then(($days) => {
                const availableDays = $days.length;
                const randomIndex = Math.floor(Math.random() * availableDays);
                cy.wrap($days.eq(randomIndex)).click();
            });
    }
    function EnglishOption() {
        cy.get('[data-testid="Header__LanguageSwitch"]').click();
        cy.wait(2000)
        cy.xpath('//*[@id="uncontrolled-tab-example-tabpane-flights"]/div/div[2]/div[1]/div/div[2]/div[1]/div/div/div/input')
            .click({ force: true });
        RandomOrigin();
        cy.get('[data-testid="FlightSearchBox__ToAirportInput"]').click({ force: true });
        RandomDestination();
        cy.get('[data-testid="FlightSearchBox__ToDateButton"]').click({ force: true });
        RandomDate();
        cy.get('.sc-fAJaQT').click();
        cy.get('[data-testid="FlightSearchCabinSelection__BusinessOption"]').click();
        cy.contains('Search flights').click();
    }

    function ArabicOption() {
        cy.wait(2000)
        cy.xpath('//*[@id="uncontrolled-tab-example-tabpane-flights"]/div/div[2]/div[1]/div/div[2]/div[1]/div/div/div/input')
            .click({ force: true });
        RandomOrigin();
        cy.get('[data-testid="FlightSearchBox__ToAirportInput"]').click({ force: true });
        RandomDestination();
        cy.get('[data-testid="FlightSearchBox__ToDateButton"]').click({ force: true });
        RandomDate();
        cy.get('.sc-fAJaQT').click();
        cy.get('[data-testid="FlightSearchCabinSelection__BusinessOption"]').click();
        cy.get('.col-lg-4 > .sc-hizQCF > [data-testid="FlightSearchBox__SearchButton"]').click();
    }

});
