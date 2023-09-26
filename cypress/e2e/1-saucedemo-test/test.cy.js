/// <reference types="cypress" />

import { getOnlyNumericPrice, isNumeric } from '../../utils/1-saucedemo-test/helper';

const baseUrl = Cypress.config().baseUrl;

describe('Saucedemo User Scenario Test Example for Automate QA EX', () => {
    before(() =>{
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    })

    it('Navigate to website then Login', () => {
        cy.visit('/', { timeout: 10000});
        cy.url().should('eq', Cypress.config().baseUrl+'/')
        cy.get('input#user-name').type(Cypress.env('username'));
        cy.get('input#password').type(Cypress.env('password'));
        cy.get('input#login-button').click();
    });

    it('Add 2 items to cart, Check Item Count Badge then Click Cart icon', () => {
        const item_list = Cypress.env('item_list');
        item_list.forEach(item => {
            cy.get('div.inventory_item_description').contains(new RegExp(item, 'g')).as('item_desc');
            cy.get('@item_desc').parentsUntil('div.inventory_item')
            .find('div.pricebar').contains(new RegExp('Add to cart', 'g')).as('add_to_cart_btn');
            cy.get('@add_to_cart_btn').should('have.class', 'btn_primary').and('not.be.disabled').click();
            cy.get('@item_desc').parentsUntil('div.inventory_item').find('div.pricebar > button').should('have.class', 'btn_secondary');
        });
        cy.get('span.shopping_cart_badge').as('shopping_cart').should('have.text', item_list.length);
        cy.get('@shopping_cart').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/cart.html`)
    });

    it('Check Item in cart that matches our test item list then Proceed to Checkout Pt.1', () => {
        const item_list = Cypress.env('item_list');
        cy.get('div.cart_list').find('.cart_item').as('cart_items');
        cy.get('@cart_items').should('have.length', item_list.length);
        item_list.forEach(item => {
            cy.get('@cart_items').contains(new RegExp(item, 'g')).as('match_item_name');
            cy.get('@match_item_name').should('have.text', item);
            cy.get('@match_item_name').should('have.length', 1);
            cy.get('@match_item_name').parentsUntil('.cart_item').siblings('div.cart_quantity').should('have.text', 1);
        });
        // cy.get('button#checkout]').click();
        cy.get('button[data-test=checkout]').click();
        cy.url().should('eq', `${baseUrl}/checkout-step-one.html`);
    });
    
    it('Fill Checkout information then Proceed to Checkout Pt.2', () => {
        cy.get('input#first-name').type(Cypress.env('recp_fname'));
        cy.get('input#last-name').type(Cypress.env('recp_lname'));
        cy.get('input#postal-code').type(Cypress.env('recp_postal_code'));
        cy.get('#continue').click();
        cy.url().should('eq', `${baseUrl}/checkout-step-two.html`);
    });
    
    it('Check Price By Type then sum and compare against total price', () => {
        let each_item_subtotal_exclude_vat = 0.00;
        let computed_subtotal = 0.00;
        let tax = 0.00;
        let computed_total = 0.00;

        cy.get('.cart_item').each(item => {
            cy.wrap(item).children().find('.inventory_item_price').then(priceText =>{
                // String Index = 1 is currency symbol e.g. [$]1.99
                const price_str =  priceText.text().slice(1);
                if(isNumeric(price_str)){
                    each_item_subtotal_exclude_vat += parseFloat(price_str);
                }
                // Nested-Synchronous
                cy.get('.summary_subtotal_label').then(t =>{
                    computed_subtotal = getOnlyNumericPrice(t.text());
                });
                cy.get('.summary_tax_label').then(t => {
                    tax = getOnlyNumericPrice(t.text());
                });
                cy.get('.summary_total_label').then(t => {
                    computed_total = getOnlyNumericPrice(t.text());
                });
            });
        })
        .then(() => {
            const subtotal = each_item_subtotal_exclude_vat + tax;
            cy.wrap(computed_subtotal).should('eq', each_item_subtotal_exclude_vat);
            cy.wrap(computed_total).should('eq', subtotal);
        });

        cy.url().should('eq', `${baseUrl}/checkout-step-two.html`);
    });

    it('Should Logged out and clear session cookie', () => {
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
        cy.url().should('eq', baseUrl + '/');
        cy.getCookie('session-username').should('be.null')
    });
});
