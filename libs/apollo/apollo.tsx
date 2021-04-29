import merge from 'deepmerge'
import type { GetServerSidePropsContext } from 'next'
import type { NormalizedCacheObject } from '@apollo/client'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

interface PageProps {
  props?: Record<string, any>;
}

let apolloClient: ApolloClient<NormalizedCacheObject> = null

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const httpLink = new HttpLink({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    credentials: 'same-origin',
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache()
  })
}

export const initializeApollo = (intitalState = null, ctx = null) => {
  const client = apolloClient ?? createApolloClient(ctx)

  if (intitalState) {
    const existingCache = client.extract()

    const data = merge(intitalState, existingCache)

    client.cache.restore(data)
  }

  if (typeof window === 'undefined') {
    return client
  }

  if (!apolloClient) {
    apolloClient = client
  }

  return client
}
