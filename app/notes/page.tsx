import css from "./page.module.css";
import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

async function App() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes('', 1)
  })

  return (
    <div className={css.notes}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </div>
  );
}

export default App;