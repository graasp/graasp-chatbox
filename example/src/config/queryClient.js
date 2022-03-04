import { configureQueryClient } from '@graasp/query-client';
import { API_HOST } from './constants';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  API_ROUTES
} = configureQueryClient({
  API_HOST,
  // notifier,
  enableWebsocket: true,
  keepPreviousData: true,
  // avoid refetching when same data are closely fethed
  staleTime: 1000, // ms
});

export {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  API_ROUTES,
};