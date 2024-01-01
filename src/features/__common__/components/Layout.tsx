import { React } from "../../../deps.ts";
import { Header } from "./Header.tsx";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/public/bulmaswatch.min.css" />
        <script defer src="/public/htmx.min.js" />
        <script defer src="/public/header.js" />
        <title>Garden Pros</title>
      </head>

      <body className="has-navbar-fixed-top">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
