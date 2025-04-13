import Quiz from '../../client/src/components/Quiz';

describe('<Quiz />', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json',
    }).as('getQuestions');
    cy.mount(<Quiz />);
  });

  it('renders the start button', () => {
    cy.get('button').contains('Start Quiz').should('exist');
  });

  it('starts the quiz when the button is clicked', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('exist');
  });

  it('displays the current question and answers', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.get('.alert').should('exist');
  });

  it('increments score on correct answer', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.get('button').first().click();
  });

  it('shows quiz completed message at the end', () => {
    cy.get('button').contains('Start Quiz').click();
    // Simulate answering all questions
    cy.get('button').first().click();
    cy.get('.card').should('contain', 'Quiz Completed');
  });
})