import fetch from 'isomorphic-unfetch';
import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';

// import { concatPagination } from '@apollo/client/utilities'
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import Cookies from 'js-cookie';
import { useMemo } from 'react';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message }) =>
      // eslint-disable-next-line no-console
      console.log(':: FROM errorLink [Apollo]', message)
    );
});

// On the client we store the apollo client in the following variable
// this prevents the client from re-initializing between page transitions.
let apolloClient;

// Adds Strapi Auth token to requests
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('jwt');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  fetch,
  uri: 'https://api.spacex.land/graphql/',
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);

function createApolloClient() {
  return new ApolloClient({
    // @NOTE: When cache is outside creation of the Apollo Client,
    // the auth header was not being attached. (i.e. in a different file our outside this closure.)
    cache: new InMemoryCache(),
    link,
    ssrMode: typeof window === 'undefined',
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    // eslint-disable-next-line no-param-reassign
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
