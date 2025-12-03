"use client";

import { signIn, signOut, useSession } from "@/lib/auth-client";

type Props = {
  className?: string;
  showUser?: boolean;
};

export function GithubLoginButton({ className, showUser = true }: Props) {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <button
        disabled
        className={`rounded-xl px-4 py-2 bg-gray-200 text-gray-600 ${className ?? ""}`}
      >
        Načítám…
      </button>
    );
  }

  if (!user) {
    return (
      <button
        onClick={() => signIn.social({ provider: "github" })}
        className={`rounded-xl px-4 py-2 bg-black text-white hover:opacity-90 ${className ?? ""}`}
      >
        Přihlásit přes GitHub
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      {showUser && (
        <div className="flex items-center gap-2">
          {user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name ?? user.email}
              className="h-8 w-8 rounded-full"
            />
          )}
          <div className="text-sm">
            <div className="font-medium">{user.name}</div>
            <div className="text-gray-500">{user.email}</div>
          </div>
        </div>
      )}

      <button
        onClick={() => signOut()}
        className="rounded-xl px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm"
      >
        Odhlásit
      </button>
    </div>
  );
}
