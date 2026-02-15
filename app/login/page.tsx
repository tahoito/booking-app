"use client";

import { useMemo, useState } from "react";
import { loginUser } from "@/lib/client/auth";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "@/components/lucide";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const canSubmit = useMemo(() => {
        return password.trim().length >= 6;
    }, [username, password, loading]);


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        
        try {            
            await loginUser({ username, password });
            setLoading(false);
            router.push("/");
        }catch (err: any) {
            setError(err.message || "ログインに失敗しました");
            setLoading(false);
        }finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-main">
            <div className="flex min-h-screen items-center justify-center">
                <section className="w-full overflow-hidden">
                    <div className="mt-60 rounded-tl-[100px] bg-bg px-6 pt-30 text-text min-h-screen">
                        <h1 className="text-center text-2xl font-semibold tracking-wide">ログイン</h1>

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

                                <div className="relative mt-2" style={{ position: "relative" }}>
                                    <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="パスワードを入力"
                                    className="w-full rounded-[10px] border border-main/40 bg-white px-4 py-3 pr-12 text-base text-text placeholder:text-placeholder outline-none transition focus:border-main focus:ring-2 focus:ring-main/20"
                                    type={showPassword ? "text" : "password"}
                                    />

                                    <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
                                    className="rounded-md p-2 text-main2 transition hover:text-main"
                                    style={{
                                        position: "absolute",
                                        right: "0.5rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    >
                                    {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                    </button>
                                </div>
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

                            <button
                                type="button"
                                onClick={() => router.push("/register")}
                                className="text-center text-sm text-main2 w-full"
                            >
                                アカウント作成はこちら
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    )

}
