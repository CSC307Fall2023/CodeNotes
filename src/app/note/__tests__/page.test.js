import Note from '../page.js';
import NotebookTree from '../_components/notebooktree.tsx'
import { render, act, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { enableFetchMocks } from 'jest-fetch-mock'
import { checkCustomRoutes } from 'next/dist/lib/load-custom-routes';

// mock setup
/*
fetchMock.fetchOnce = (data) => {
  fetchMock.mockResolvedValueOnce({
    ok: true,
    json: async () => JSON.parse(data),
  });
};
*/

describe ('notebook tree', () => {
    beforeEach(() => {
        enableFetchMocks();
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    it('should have no notebooks', async () => {
        const notebooks = [];
        fetch.once(JSON.stringify(notebooks));
        let tree;
        await act(async () => {
            tree = render(
            <NotebookTree
                notebooks={notebooks}
                setNotebooks={setNotebooks}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
            />
            );
        })
    })
    /*
    const [notebooks, setNotebooks] = React.useState([])
    const [activeNote, setActiveNote] = React.useState(null)
    const [activeNoteRename, setActiveNoteRename] = React.useState(null)
    */
})

describe ('note page', () => {
    beforeEach(() => {
        enableFetchMocks();
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    // simulate the database starting with 3 notebooks, and check that the notebooks appear on load
    // tests have to begin with "it"
    // it("should have three notebooks", () => {
    //     fetch.once(JSON.stringify([{name: "test notebook1"},]))     // mock the fetch to load notebooks from database
    //     render(<Note/>);                                            // render the component
    //     expect(screen.findByText('test notebook1')).toBeDefined(); 
    // })

// test notebook tree - one test for empty notebooks (there are no notebooks), one test for with data
// then go to thursday office hours and ask about this test  v  so we can look at it again 

    it('should have one notebook', async () => {
        const initialNotebooks = [{ name: 'test notebook1' }];
        const initialActiveNote = { id: 1, notebook: { name: 'test notebook1' }, title: 'Test Note' };

        // Set up the fetch mock response
        fetch.once(JSON.stringify(initialNotebooks));

        // Render the component within an act to handle asynchronous updates
        let note;
        await act(async () => {
            note = render(
            <Note
                notebooks={initialNotebooks}
                activeNote={initialActiveNote}
                activeNoteRename={initialActiveNote}
            />
            );

        // Wait for the asynchronous operation to complete
        let notebook = screen.findByText('test notebook1');

        // expect(note.container).toHaveTextContent('test notebook1');
        expect(screen.findByText('test notebook1')).toBeDefined(); 
  });
       
      });

    
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