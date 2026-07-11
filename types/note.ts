export interface Note {
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    tag: NoteTag;
    title: string;
}

export type NoteTag = "Todo" | "Work" | "Shopping" | "Personal" | "Meeting";