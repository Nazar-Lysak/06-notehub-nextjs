'use client'

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../lib/api";
import NoteList from "../components/NoteList/NoteList";

function NotesClient() {

    const { data: notes } = useQuery({
        queryKey: ['notes'],
        queryFn: () => fetchNotes('', 1),
        refetchOnMount: false
    })

    if (!notes) {
        return null
    }
    return (
        <ul>
            <NoteList notes={notes?.notes} />
        </ul>
    )
}

export default NotesClient;