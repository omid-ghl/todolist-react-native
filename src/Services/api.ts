// import {getCurrentNavigationState, navigate} from '@Navigators';
// import {RootState} from '@Store';
// import {setGuestIntendedNavigationState} from '@Store/navigation';
import {navigate} from '@Navigators';
import {
  createApi,
  EndpointBuilder,
  FetchArgs,
  fetchBaseQuery,
  RootState,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://rn-api.codebnb.me/api/',
  prepareHeaders: (headers, {getState}) => {
    headers.set('Accept', 'application/json');
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set('Authorization', `JWT ${token}`);
    }
    return headers;
  },
});

export type BaseQueryType = typeof baseQuery;

const logRequest = (
  args: Parameters<BaseQueryType>[0],
  api: Parameters<BaseQueryType>[1],
) => {
  try {
    if (api?.type === 'query') {
      console.log(
        '🔵',
        api.type,
        api.endpoint,
        `"${(args as FetchArgs)?.url ?? args}"`,
        'params:',
        (args as FetchArgs)?.params ?? {},
      );
    } else if (api?.type === 'mutation') {
      console.log(
        '🔵',
        api.type,
        api.endpoint,
        (args as FetchArgs)?.method,
        `"${(args as FetchArgs)?.url ?? args}"`,
        'params:',
        (args as FetchArgs)?.params ?? {},
        'body:',
        (args as FetchArgs)?.body ?? {},
      );
    }
  } catch {}
};

const logResult = (
  args: Parameters<BaseQueryType>[0],
  api: Parameters<BaseQueryType>[1],
  result: Awaited<ReturnType<typeof baseQuery>>,
) => {
  try {
    const isSuccess = !result.error;
    if (isSuccess) {
      console.log(
        '🟢',
        result.meta?.response?.status,
        api.type,
        api.endpoint,
        `"${(args as FetchArgs)?.url ?? args}"`,
        result.data ? JSON.stringify(result.data).substring(0, 100) : null,
      );
    } else {
      console.log(
        '🔴',
        result.meta?.response?.status,
        api.type,
        api.endpoint,
        `"${(args as FetchArgs)?.url ?? args}"`,
        result.error ? JSON.stringify(result.error).substring(0, 100) : null,
      );
    }
  } catch {}
};

const baseQueryWithInterceptor: BaseQueryType = async (
  args,
  api,
  extraOptions,
) => {
  logRequest(args, api);
  const result = await baseQuery(args, api, extraOptions);
  logResult(args, api, result);
  if (result.error && result.error.status === 401 && api.type === 'mutation') {
    // const currentNavigationState = getCurrentNavigationState();
    // api.dispatch(
    //   setGuestIntendedNavigationState({
    //     routes: currentNavigationState
    //       ? [...(currentNavigationState as any).routes]
    //       : [{name: 'tabBar'}],
    //     stale: true,
    //   }),
    // );
    navigate('login');
  }
  return result;
};

const tagTypes = ['User', 'Unauthorized'] as const;
type TagTypes = (typeof tagTypes)[number];
export type ApiEndpointBuilder = EndpointBuilder<
  BaseQueryType,
  TagTypes,
  'api'
>;

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: tagTypes,
});
