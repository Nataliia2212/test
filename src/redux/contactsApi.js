import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  refreshEnd,
  refreshStart,
  refreshUser,
  resetUser,
  setUser,
} from './userSlice';

export const contactsApi = createApi({
  tagTypes: ['contacts', 'auth'],
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: builder => ({
    signupUser: builder.mutation({
      query: body => ({
        url: 'users/signup',
        method: 'POST',
        body,
      }),
    }),

    loginUser: builder.mutation({
      query: body => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(setUser((await queryFulfilled).data));
      },
      invalidatesTags: ['contacts', 'auth'],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(resetUser());
      },
      invalidatesTags: ['auth'],
    }),

    currentUser: builder.query({
      query: () => 'users/current',
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(refreshStart());
          dispatch(refreshUser((await queryFulfilled).data));
        } catch (error) {
          dispatch(refreshEnd());
        }
      },
    }),

    getContacts: builder.query({
      query: () => 'contacts',
      providesTags: ['contacts'],
    }),

    addNewContact: builder.mutation({
      query: body => ({
        url: '/contacts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['contacts'],
    }),

    deleteContact: builder.mutation({
      query: id => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useAddNewContactMutation,
  useDeleteContactMutation,
  useCurrentUserQuery,
} = contactsApi;
