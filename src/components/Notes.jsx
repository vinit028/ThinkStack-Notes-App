import React, { useState, useEffect } from "react";
import bin from "../components/bin.png";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [note, setNote] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("notes")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(note));
  }, [note]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !text.trim()) return;

    setNote((prev) => [
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        text: text.trim(),
      },
      ...prev,
    ]);

    setTitle("");
    setText("");
  };

  const deleteNote = (id) => {
    setNote((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      <div className="mx-auto max-w-7xl px-5 pt-10">

        {/* Header */}
        <header className="mb-10 flex flex-col justify-between gap-6 border-b border-white/8 pb-8 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              My Notes
            </h1>
          </div>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)]">

          {/* Create Note */}
          <section className="rounded-2xl border border-white/9 bg-[#111113] p-5 sm:p-7 lg:sticky lg:top-8">
            <div className="mb-7 flex items-start gap-3">
              <div>
                <h2 className="text-lg font-semibold">Create a note</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Write down your next idea.
                </p>
              </div>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Title
                </label>

                <input
                  id="note-title"
                  type="text"
                  placeholder="e.g. Project ideas"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20"
                />
              </div>

              <div>
                <label
                  htmlFor="note-description"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Description
                </label>

                <textarea
                  id="note-description"
                  placeholder="Start writing your thoughts..."
                  rows={7}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-800 px-5 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-gray-900 active:scale-95"
              >
                <span className="text-lg leading-none">+</span>
                Save note
              </button>

              <p className="text-center text-xs text-zinc-600">
                Your ideas, all in one place.
              </p>
            </form>
          </section>

          {/* Notes List */}
          <section className="min-w-0">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Your collection
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  All your notes in one place.
                </p>
              </div>
            </div>

            {note.length === 0 ? (
              <div className="flex min-h-85 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/1.5 px-6 py-12 text-center">
                <h3 className="text-base font-semibold text-zinc-200">
                  Nothing here yet
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
                  Your collection is waiting. Create your first note
                  to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {note.map((elem) => (
                  <article
                    key={elem.id}
                    className="group flex min-h-56 min-w-0 flex-col rounded-2xl border border-white/9 bg-[#111113] p-5 transition duration-200 hover:border-white/30"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="rounded-md border border-white/10 bg-gray-900/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">
                        Personal note
                      </span>

                      <button
                        type="button"
                        onClick={() => deleteNote(elem.id)}
                        aria-label={`Delete ${elem.title}`}
                        title="Delete note"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-transparent transition hover:border-red-400/20 hover:bg-red-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      >
                        <img
                          src={bin}
                          alt=""
                          className="h-5 w-5 object-contain opacity-60 transition group-hover:opacity-100"
                        />
                      </button>
                    </div>

                    <h3 className="wrap-break-word text-base font-semibold leading-6 text-zinc-100">
                      {elem.title}
                    </h3>

                    <p className="mt-3 flex-1 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-zinc-400">
                      {elem.text}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                      <span className="text-xs text-zinc-600">
                        Note
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Saved
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Notes;