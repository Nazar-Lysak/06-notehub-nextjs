'use client'
import { useState } from "react";
import NoteList from "@/app/components/NoteList/NoteList";
import Pagination from "@/app/components/Pagination/Pagination";
import css from "./page.module.css";
import { fetchNotes } from "@/app/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/app/components/Modal/Modal";
import NoteForm from "@/app/components/NoteForm/NoteForm";
import SearchBox from "@/app/components/SearchBox/SearchBox";

function App() {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<boolean>(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    placeholderData: keepPreviousData
  });

  const handleSearch = useDebouncedCallback((query: string) => {
    if (page !== 1) {
      setPage(1)
    }
    setSearchQuery(query);
  }, 700);

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <div className={css.notes}>
      <header className={css.toolbar}>
        <SearchBox handleSearch={handleSearch} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination page={page} setPage={setPage} totalPages={data.totalPages} />
        )}

        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <h2>Something went wrong</h2>}
      {isSuccess && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {modal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

    </div>
  );
}

export default App;