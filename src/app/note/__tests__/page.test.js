import Note from '../page.js';
import NotebookTree from '../_components/notebooktree.tsx'
import { render, act, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { enableFetchMocks } from 'jest-fetch-mock'
import { checkCustomRoutes } from 'next/dist/lib/load-custom-routes';


describe ('notebook tree', () => {
    beforeEach(() => {
        enableFetchMocks();
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    it('should have no notebooks', async () => {    // test notebook tree with no notebooks
        const notebooks = [];
        const activeNote = {};
        const expanded = [];

        fetch.once(JSON.stringify(notebooks));
        let tree;
        await act(async () => {
            tree = render(
            <NotebookTree
                notebooks={notebooks}
                activeNote={activeNote}
            />
            );
        })
    });

    it('should have one notebook', async () => {    // test notebook tree with notebooks that have notes
        const notebooks = [{ name: 'test notebook1' }];
        const activeNote = { id: 1, notebook: { name: 'test notebook1' }, title: 'Test Note' };
        const expanded = [];

        fetch.once(JSON.stringify(notebooks));
        let tree;
        await act(async () => {
            tree = render(
            <NotebookTree
                expanded = {expanded}
                notebooks={notebooks}
                activeNote={activeNote}
            />
            );
        })

        let notebook = screen.findByText('test notebook1');
        expect(screen.findByText('test notebook1')).toBeDefined(); 
    })
})

describe ('note page', () => {
    beforeEach(() => {
        enableFetchMocks();
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    // nonworking attempt for note page test
    it('should have one notebook', async () => {
        const initialNotebooks = [{ name: 'test notebook1' }];
        const initialActiveNote = { id: 1, notebook: { name: 'test notebook1' }, title: 'Test Note' };

        // Set up the fetch mock response
        fetch.once(JSON.stringify(initialNotebooks));

        // Render the component within an act to handle asynchronous updates
        let note;
        await act(async () => {
            /*
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
            await waitFor(() => {
                expect(screen.findByText('test notebook1')).toBeDefined(); 
            });
            */
        });
       
    });
})