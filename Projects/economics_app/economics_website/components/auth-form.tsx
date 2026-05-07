"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.includes("@") || password.length < 8) {
      setError("Usa un email válido y una contraseña de al menos 8 caracteres.");
      return;
    }

    setLoading(true);
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(payload.error ?? "No se pudo completar la autenticación.");
      return;
    }

    router.push(searchParams.get("next") ?? "/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          className="mt-2 h-12 w-full rounded-md border border-line bg-white px-4 text-ink outline-none transition focus:border-ink"
          placeholder="tu@email.com"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <div className="mt-2 flex h-12 items-center rounded-md border border-line bg-white focus-within:border-ink">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="h-full min-w-0 flex-1 rounded-md bg-transparent px-4 text-ink outline-none"
            placeholder="Mínimo 8 caracteres"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="mr-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-ink"
            aria-label={showPassword ? "Ocultar password" : "Mostrar password"}
            title={showPassword ? "Ocultar password" : "Mostrar password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {mode === "login" ? "Entrar" : "Crear cuenta"}
      </button>
    </form>
  );
}
