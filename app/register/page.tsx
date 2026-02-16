"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/lib/client/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      username.trim().length >= 2 &&
      studentId.trim().length >= 7 &&
      password.trim().length >= 6 &&
      confirmPassword.trim().length >= 6 &&
      !loading
    );
  }, [username, studentId, password, confirmPassword, loading]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      setLoading(false);
      return;
    }

    try {
      await registerUser({ username, studentId, password });
      router.replace("/");
    } catch (err: any) {
      setError(err.message || "登録に失敗しました");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-main">
        <div className="min-h-screen">
            <section className="w-full">
                <header className="bg-main py-10 pt-6 flex items-center justify-center">
                    <h1 className="text-center text-2xl text-bg font-semibold tracking-wide">
                        新規登録
                    </h1>
                </header>
                <div className="mt-6 rounded-tl-[100px] bg-bg px-6 pt-12 py-6 text-text min-h-screen">
                    <form onSubmit={onSubmit} className="mt-8 space-y-5">
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
                        <label className="text-base">学籍番号</label>
                        <input
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="学籍番号を入力"
                        className="mt-2 w-full rounded-[10px] border border-main/40 bg-white px-4 py-3 text-base text-text placeholder:text-placeholder outline-none transition focus:border-main focus:ring-2 focus:ring-main/20"
                        inputMode="numeric"
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
                            className="text-main2 transition hover:text-main"
                            style={{
                              position: "absolute",
                              right: "0.75rem",
                              top: "50%",
                              transform: "translateY(-50%)",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-base">パスワード(確認)</label>
                        <div className="relative mt-2" style={{ position: "relative" }}>
                          <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="もう一度入力"
                            className="w-full rounded-[10px] border border-main/40 bg-white px-4 py-3 pr-12 text-base text-text placeholder:text-placeholder outline-none transition focus:border-main focus:ring-2 focus:ring-main/20"
                            type={showConfirmPassword ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            aria-label={showConfirmPassword ? "パスワードを隠す" : "パスワードを表示"}
                            className="text-main2 transition hover:text-main"
                            style={{
                              position: "absolute",
                              right: "0.75rem",
                              top: "50%",
                              transform: "translateY(-50%)",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                          </button>
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        disabled={!canSubmit}
                        className="w-full rounded-full bg-main mt-6 h-[55px] text-bg font-semibold shadow-[0_10px_24px_-16px_rgba(0,47,108,0.75)] transition disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "登録中..." : "新規登録"}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="text-center text-sm text-main2 w-full"
                    >
                        ログインはこちら
                    </button>
                </form>
            </div>
        </section>
      </div>
    </main>
  );
}
