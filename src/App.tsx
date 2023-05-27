import { Route, Routes, BrowserRouter } from "react-router-dom"
import RepositoryCard from "./RepositoryCard/RepositoryCard"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import RepositorySearch from "./RepositorySearch/RepositorySearch"
const ACCESS_TOKEN = "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"

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

export default App
