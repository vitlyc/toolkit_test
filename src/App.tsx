import { Route, Routes } from "react-router-dom"
import RepositoryCard from "./RepositoryCard/RepositoryCard"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import RepositorySearch from "./RepositorySearch/RepositorySearch"
const ACCESS_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
})

const App = () => (
  <main>
    <ApolloProvider client={client}>
      <Routes>
        <Route index element={<RepositorySearch />} />
        <Route path="/repositories/:name/:login" element={<RepositoryCard />} />
      </Routes>
      {/* <RepositorySearch /> */}
    </ApolloProvider>
  </main>
)
// localStorage.clear()
export default App
