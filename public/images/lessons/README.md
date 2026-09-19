# Lesson pictures

Drop illustrations and photographs for lessons here, then point a visual at them:

```ts
visual: {
  type: "image",
  src: "/images/lessons/british-g5-science/poppy.jpg",
  alt: { ar: "زهرة خشخاش حمراء وبرعم مغلق", en: "A red poppy and a closed bud" },
  caption: { ar: "…", en: "…" },
}
```

- One folder per subject: `british-g5-science/`, `saudi-g4-math/`, …
- `alt` is required and bilingual. A picture that teaches has to teach a child
  using a screen reader too.
- `npm run check` fails if a lesson points at a file that is not here, because a
  broken picture is worse than none: a child assumes they are missing something.
- Only artwork this academy owns or is licensed to use. Nothing scanned or taken
  from a publisher's book.
