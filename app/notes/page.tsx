import css from "./page.module.css";
import { fetchNotes } from "@/app/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

async function App() {

  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const [page, setPage] = useState(1);
  // const [modal, setModal] = useState<boolean>(false);

  // const { data, isLoading, isError, isSuccess } = useQuery({
  //   queryKey: ["notes", searchQuery, page],
  //   queryFn: () => fetchNotes(searchQuery, page),
  //   placeholderData: keepPreviousData
  // });

  // const handleSearch = useDebouncedCallback((query: string) => {
  //   if (page !== 1) {
  //     setPage(1)
  //   }
  //   setSearchQuery(query);
  // }, 700);

  // const openModal = () => {
  //   setModal(true)
  // }

  // const closeModal = () => {
  //   setModal(false)
  // }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes('', 1)
  })

  return (
    <div className={css.notes}>
      {/* <header className={css.toolbar}>
        <SearchBox handleSearch={handleSearch} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination page={page} setPage={setPage} totalPages={data.totalPages} />
        )}

        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
     
      
      {isSuccess && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {modal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )} */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </div>
  );
}

export default App;