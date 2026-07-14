"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

function NotesClient() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<boolean>(false);

  const {
    data: notes,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((query: string) => {
    if (page !== 1) {
      setPage(1);
    }
    setSearchQuery(query);
  }, 700);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  if (!notes) {
    return null;
  }

  return (
    <div>
      <header className={css.toolbar}>
        <SearchBox handleSearch={handleSearch} />
        {isSuccess && notes.totalPages > 1 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={notes.totalPages}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <h2>Something went wrong</h2>}
      {isSuccess && notes.notes.length > 0 && <NoteList notes={notes.notes} />}
      {modal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
