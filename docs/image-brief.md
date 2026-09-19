# Image brief · دليل توليد صور easy school

Claude cannot generate raster images in this project — there is no image tool
available and the network blocks external services. Illustrations that ship in
the code are drawn as SVG (`src/components/art/`); anything photographic has to
be produced elsewhere and dropped into `public/images/`.

This brief keeps whatever is produced consistent. Paste the shared style block
plus one section prompt into an image tool, then send the result back to be
placed and optimised.

## Shared style block — prepend to every prompt

> Bright, friendly, modern children's-education brand. Palette: violet #6C4CF5,
> coral #FF6B4A, sunny yellow #FFC53D, mint #2ED3A0, sky #35C3F3, on warm
> off-white #FFF8F1. Soft rounded shapes, generous negative space, clean and
> uncluttered, no text in the image, no logos, no watermarks. Consistent with a
> set of images for the same brand.

## Per-section prompts

### 1. Hero — a child studying alone and enjoying it
> A happy Arab child around 9 years old at a desk at home, looking at a laptop
> with interest, warm natural daylight, tidy modern living room softly blurred
> behind, shot from slightly above, candid rather than posed, full colour
> photograph. Room on the left of the frame for text.

Used at: top of the homepage, beside the headline. **Ratio 4:3, ≥1600px wide.**

### 2. Teachers — who writes the lessons
> A friendly teacher in their thirties smiling at the camera, plain pastel
> background, head and shoulders, soft even lighting, professional but warm,
> full colour photograph.

Produce **three**: one wearing hijab, one man, one woman without hijab, so the
section reflects the teaching team. Used at: the teachers section.
**Ratio 3:4 portrait, ≥800px wide.**

### 3. Age bands — five ages at a glance
> A cheerful child of about N years old, head and shoulders, plain pastel
> background, looking at the camera, full colour photograph.

Produce five with N = 5, 7, 9, 11, 14, alternating boys and girls and varying
skin tone and hair. Used at: "كم عمر ابنك؟". **Square, ≥600px.**

### 4. Parents — the people reading the page
> An Arab parent in their thirties or forties at home, relaxed and smiling,
> soft domestic background, head and shoulders, full colour photograph.

Produce three. Used at: the testimonials section — and only once real quotes
exist to go with them. **Square, ≥600px.**

### 5. Certificate — unit completion
> A blank certificate of achievement with a gold seal and ribbon, decorative
> pastel border with small stars and leaves, empty centre with no text at all,
> flat illustration.

Used at: the section about unit certificates. **Landscape 3:2, ≥1400px wide.**

## What not to commission

- **Live video classes.** The platform teaches through self-paced interactive
  lessons; it runs no live classes. An image of a video call with a teacher and
  several children promises something the product does not do.
- **Screenshots of another app's interface.** Showing a different product's
  screens as if they were this one misleads a parent deciding whether to
  subscribe. Screenshots of the real lesson player are the honest alternative,
  and cost nothing to capture.
- **Anything copied from another school's website.** Their photography and
  illustration are their property.

## Placing what comes back

Put the original in the session, and it gets resized and cropped into
`public/images/` — roughly:

```
public/images/
  teacher.jpg        640px wide, jpeg q82
  icons/*.png        160x160
  seal.png           200px
```

Pages load them through `next/image`, so only the source resolution and framing
matter; sizing is handled in code.
