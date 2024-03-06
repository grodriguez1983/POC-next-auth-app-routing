# Next-Auth with Next.js 14 and Application Routing

This project is a proof of concept (POC) demonstrating how to use Next-Auth with Next.js 14 using the application routing approach.

## Test Users

This project includes a set of test users for development and testing purposes. These users are defined in the `src/app/api/auth/[...nextauth]/route.ts` file.

You can login to the app using the followings users:

- `user@email.com` | `password` for normal user
- `user1@email.com` | `password` for admin user

Each test user has the following properties:

- `id`: A unique identifier for the user.
- `role`: The user's role, which can be used for role-based access control.
- `name`: The user's full name, which is a combination of their first and last names.
- `firstName`: The user's first name.
- `lastName`: The user's last name.
- `email`: The user's email address, which is used for authentication.

The `authorize` function in `src/app/api/auth/[...nextauth]/route.ts` checks the provided credentials against the list of test users. If the credentials match a test user, the function returns the user's data, which is then stored in the user's session.

## Project Structure

The project is structured as follows:

- `src/app/api/auth/[...nextauth]/route.ts`: This file is responsible for handling authentication in the application using the NextAuth library. It defines a series of authentication options (`authOptions`) that include:
  - A set of `callbacks` that are used to customize the behavior of the user's session. In this case, the `session` callback is used to add additional user data to the session.
  - A `strategy` for session, which in this case is "jwt".
  - A set of `providers` for authentication. In this case, a custom credentials provider is used that allows users to log in with their email and password.

The credentials provider uses an `authorize` function to validate the user's credentials. If the credentials are valid, the function returns a user object that is stored in the user's session.

In addition, this file exports a handler (`handler`) that is used to handle GET and POST requests to the authentication route.

Finally, this file uses a list of `mockUsers` to simulate a user database.

- `src/lib/auth.ts`: This file contains helper functions for working with the server session and checking the user's role.

- `src/components/LogoutButton.tsx`: This component allows users to log out.

- `src/type/next-auth.d.ts`: This file contains custom type definitions for the Next-Auth session.

- `next.config.mjs`: This file contains the Next.js configuration, including the environment variables for Next-Auth.

- `src/middleware.ts`: This file exports a middleware from `next-auth/middleware`. The middleware is configured to match the routes `/dashboard` and `/dashboard/:path*`. This means that the middleware will be applied to these routes. Middleware is commonly used to perform operations on the request and response objects before they reach the route handler.

- `src/components/Provider.tsx`: This file exports a `Provider` component that wraps its children with a `SessionProvider` from `next-auth/react`. The `SessionProvider` is a context provider that allows you to access session data using the `useSession` hook from `next-auth/react` anywhere in your component tree.

- `src/app/dashboard/layout.tsx`: This file exports a `Layout` component that is used to wrap the dashboard pages. The `Layout` component includes common elements like a header, footer, or sidebar that are shared across all dashboard pages.

The `Layout` component uses a function called `checkUserRole` to determine the role of the current user. This function checks the user's role, which is stored in the user's session, and returns a boolean value indicating whether the user has a specific role.

Based on the user's role, the `Layout` component decides which pages the user has access to. For example, if the user has the 'admin' role, they might have access to the 'admin' page, while a user with the 'user' role might only have access to the 'user' page.

The 'admin' and 'user' pages are defined in separate files in the `src/app/dashboard` directory. Next.js treats these files as [parallel routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes), meaning that they are independent of each other and can be accessed directly via their respective URLs.

Please note that the actual implementation may vary depending on your codebase. For more information on routing in Next.js, you can refer to the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes).

- `src/app/api/dashboard/route.ts`: This file is not present in the workspace information provided. However, based on the name and common practices, it's likely that this file exports a Next.js API route that handles requests to `/api/dashboard`. The file would contain a default export function that receives a request and a response object, and sends a response based on the request.

## How to Build and Run the Project

1. Install the project dependencies with `npm install` or `yarn install`.
2. Run the development server with `npm run dev` or `yarn dev`.
3. Open http://localhost:3000 in your browser to see the result.

## How Next-Auth Works

Next-Auth is a library for server-to-server authentication in Next.js. It provides an easy way to authenticate users and manage sessions.

In this project, we use Next-Auth to authenticate users with a custom credentials provider. When a user attempts to log in, the `authorize` function in `src/app/api/auth/[...nextauth]/route.ts` is called with the user's credentials. If the credentials are valid, the function returns a user object that is stored in the user's session.

The user's session is managed through session callbacks. When a user's session is requested, the session callback in `src/app/api/auth/[...nextauth]/route.ts` is called to get the session data. This is where the user's data is added to the session.

For more information about Next-Auth, check out the [official Next-Auth documentation](https://next-auth.js.org/).
