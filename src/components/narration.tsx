"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { localeMeta, type Locale } from "@/lib/i18n/config";

/**
 * Reading the screen aloud.
 *
 * The largest difference between a page and a teacher is that a teacher speaks.
 * This uses the voice already in the device — nothing is sent anywhere, no key
 * is needed, and it works offline. Quality is the device's: on a phone, where
 * children will actually use this, the Arabic and English voices are good.
 *
 * It reads block by block rather than as one long utterance, so the screen can
 * show which part is being read, and so stopping is immediate.
 */

export type Spoken = { id: string; text: string };

export type Narration = {
  /** False when the device has no voice for this language; the button then hides. */
  supported: boolean;
  speaking: boolean;
  /** The block being read, so the screen can mark it. */
  activeId?: string;
  toggle: () => void;
  stop: () => void;
};

export function useNarration(items: Spoken[], locale: Locale): Narration {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const lang = locale === "ar" ? "ar-SA" : "en-GB";

  // Voices arrive asynchronously in most browsers, so ask twice.
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const look = () => {
      const voices = window.speechSynthesis.getVoices();
      setSupported(voices.some((voice) => voice.lang.slice(0, 2) === locale) || voices.length === 0);
    };
    look();
    window.speechSynthesis.addEventListener("voiceschanged", look);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", look);
  }, [locale]);

  // Cancelling a voice makes some browsers fire `onend` for the utterance they
  // just threw away. A run id lets a queue that has been stopped recognise that
  // it is no longer the one being played, instead of carrying on talking.
  const run = useRef(0);

  const stop = useCallback(() => {
    run.current += 1;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
    setActiveId(undefined);
  }, []);

  // Leaving the screen, or the lesson, must not leave a voice talking.
  useEffect(() => stop, [stop, items]);

  const toggle = useCallback(() => {
    if (speaking) {
      stop();
      return;
    }

    const queue = items.filter((item) => item.text.trim().length > 0);
    if (queue.length === 0) return;

    run.current += 1;
    const mine = run.current;
    setSpeaking(true);

    let at = 0;
    const step = () => {
      if (run.current !== mine) return;
      const item = queue[at];
      at += 1;
      if (!item) {
        setSpeaking(false);
        setActiveId(undefined);
        return;
      }
      setActiveId(item.id);

      const utterance = new SpeechSynthesisUtterance(item.text);
      utterance.lang = lang;
      // A little under normal: a child following along needs the gap between
      // sentences more than they need the sentence quickly.
      utterance.rate = 0.92;
      const voice = window.speechSynthesis
        .getVoices()
        .find((candidate) => candidate.lang.startsWith(lang.slice(0, 2)));
      if (voice) utterance.voice = voice;
      utterance.onend = step;
      utterance.onerror = () => {
        if (run.current === mine) stop();
      };
      window.speechSynthesis.speak(utterance);
    };

    step();
  }, [items, lang, speaking, stop]);

  return { supported, speaking, activeId, toggle, stop };
}

/** The control itself: one button, and what it is doing. */
export function NarrationButton({
  narration,
  labels,
  locale,
}: {
  narration: Narration;
  labels: { read: string; stop: string; hint: string };
  locale: Locale;
}) {
  if (!narration.supported) return null;

  return (
    <div className="flex flex-wrap items-center gap-3" dir={localeMeta[locale].dir}>
      <button
        type="button"
        onClick={narration.toggle}
        aria-pressed={narration.speaking}
        className={`btn px-4 py-2 text-sm ${narration.speaking ? "btn-primary" : "btn-ghost"}`}
      >
        <span aria-hidden>{narration.speaking ? "⏹" : "🔊"}</span>
        {narration.speaking ? labels.stop : labels.read}
      </button>
      {narration.speaking ? null : <span className="text-xs text-muted">{labels.hint}</span>}
    </div>
  );
}
