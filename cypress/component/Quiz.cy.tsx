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
});