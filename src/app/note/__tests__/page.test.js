import Note from '../page.js';
import { render, act, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { enableFetchMocks } from 'jest-fetch-mock'
import { checkCustomRoutes } from 'next/dist/lib/load-custom-routes';

describe ('note page', () => {
    beforeEach(() => {
        enableFetchMocks();
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    // simulate the database starting with 3 notebooks, and check that the notebooks appear on load
    // tests have to begin with "it"
    it("should have three notebooks", () => {
        fetch.once(JSON.stringify([{name: "test notebook1"},]))     // mock the fetch to load notebooks from database
        render(<Note/>);                                            // render the component
        expect(screen.findByText('test notebook1')).toBeDefined(); 
    })

    testAddNotebook = function(notebooks) {    
        /*
        to do this:
        mock the fetch for handle create notebook
        "New Notebook" text is provided by the server, not the user
        */
        prevLength = notebooks.length;
        fireEvent.click(screen.getByRole('add'));
        expect(notebooks).toHaveLength(prevLength + 1);
    };
})