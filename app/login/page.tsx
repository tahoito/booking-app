"use client";

import { useMemo, useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const canSubmit = useMemo(() => {
        return password.trim().length >= 6;
    }, [username, password, loading]);


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const urn = username.trim();
        const pw = password.trim();

        if (urn.length < 4 || pw.length < 4) {
            setError("ユーザー名とパスワードを入力してね");
            setLoading(false);
            return;
        }


        const success = login(urn, pw);

        if (!success) {
            setError("ユーザー名またはパスワードが違います");
            setLoading(false);
            return;
        }

        // ログイン成功
        setLoading(false);
        router.push("/");

    };

    return (
        <main className="min-h-screen bg-main">
            <div className="flex min-h-screen items-center justify-center">
                <section className="w-full overflow-hidden">
                    <div className="mt-60 rounded-tl-[100px] bg-bg px-6 pt-30 text-text min-h-screen">
                        <h1 className="text-center text-xl font-semibold tracking-wide">ログイン</h1>

                        <form onSubmit={onSubmit} className="mt-12 space-y-5">
                            <div>
                                <label className="text-base">ユーザー名</label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="ユーザー名を入力"
                                    className="mt-2 w-full rounded-[10px] border border-main/40 bg-white px-4 py-3 text-base text-text placeholder:text-placeholder outline-none transition focus:border-main focus:ring-2 focus:ring-main/20"
                                />
                            </div>

                            <div>
                                <label className="text-base">パスワード</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="パスワードを入力"
                                    className="mt-2 w-full rounded-[10px] border border-main/40 bg-white px-4 py-3 text-base text-text placeholder:text-placeholder outline-none transition focus:border-main focus:ring-2 focus:ring-main/20"
                                    type="password"
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}

                            <button
                                disabled={!canSubmit}
                                className="w-full rounded-full bg-main mt-6 h-[55px] text-bg font-semibold shadow-[0_10px_24px_-16px_rgba(0,47,108,0.75)] transition disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "ログイン中..." : "ログイン"}
                            </button>

                            <div className="text-center text-sm text-main2">
                                アカウント作成はこちら
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    )

}
