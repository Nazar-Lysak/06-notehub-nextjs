import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number
}

interface HandleSubmitInterface {
  title: string;
  content: string;
  tag: NoteTag
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const API_URL = "https://notehub-public.goit.study/api/notes";

export const fetchNotes = async (note: string, page: number): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>(API_URL, {
    params: {
      search: note,
      page,
      perPage: 10
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
};

export const createNote = async (note: HandleSubmitInterface): Promise<Note> => {
  const { data } = await axios.post<Note>(
    API_URL,
    note,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};