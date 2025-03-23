import Quiz from '../../client/src/components/Quiz'

describe('<Quiz />', () => {
    it('should render the Quiz component', () => {
      cy.mount(<Quiz />)
    })

    it('should render a start quiz button', () => {
        cy.mount(<Quiz />)
        cy.get('button').should('have.text', 'Start Quiz')
    });

    it('starts the quiz and shows the first question', () => {
        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()
        cy.get('h2').invoke('text').should('match', /\?/)
    });

    it('presents another question when the last is answered', () => {
        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()
        cy.get('button').first().click()
        cy.get('h2').invoke('text').should('match', /\?/)
    });

    it('ends after 10 questions are answered and display score', () => {
        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()
        Cypress._.times(10, (_i: number) => {
            cy.get('button').first().click();
        });
        cy.get('h2').should('have.text', 'Quiz Completed')
        cy.get('.alert-success').contains('Your score:').should('be.visible')
    });

    it('clicking button after quiz ends should start a new quiz', () => {
        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()
        Cypress._.times(10, (_i: number) => {
            cy.get('button').first().click();
        });
        cy.get('button').contains('Take New Quiz').should('be.visible');
        cy.contains('Take New Quiz').click()
        cy.get('h2').invoke('text').should('match', /\?/)
    });
});