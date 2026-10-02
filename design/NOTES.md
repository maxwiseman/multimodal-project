# Design and verification notes

## Assignment

Read the English 101 “Multimodal Project” assignment through the connected UTK Session Canvas account on September 28, 2026 (https://utk.instructure.com/courses/262250/assignments/2921150).

Requirements: a position on a public issue, a defined audience, persuasive rhetorical appeals, at least 750 words, at least two modes, three credible outside sources, and genre-appropriate attribution. Separate reflection: 300–500 words describing actual labor, hardest work, a proud decision, future process changes, and collaboration if applicable.

Audience: curious college students whose experience of AI centers on chatbots, coursework, and career uncertainty. Position: pursue beneficial AI and robotics while making evidence, safety, access, and worker benefit part of progress. Modes: prose, conceptual imagery, explanatory diagrams, and interaction. Seven linked sources from OpenAI, Artificial Analysis, Figure, and NASA; company incentives are acknowledged. Default rendered argument was measured at 1,044 words excluding the sources section, with additional content in the tabs and disclosures. This count includes interface labels; the prose comfortably exceeds 750 words.

The embedded rubric was an image rather than connector-readable text. An attempt to open its Canvas preview through the browser timed out; the image-specific rubric has not been verified. The assignment’s textual requirements were read in full. Nothing was submitted or published. The separate reflection remains the student’s task after reviewing and revising this first version.

## Visual system and concept adaptations

Reference: `concept.png`. Warm paper #f5f3ed, near-black olive #24271f, dark section #20271f, orange accents. Editorial Georgia typography, italic headline emphasis, sans-serif explanatory body, monospace captions. Open sections and thin rules, with no generic card grid. Hero artwork is separate from real HTML text and controls.

Intentional adaptations to the generated concept:
- Added an explicit thesis and audience-facing introduction, benchmark explorer, fuller closing argument, and annotated source library to meet the assignment’s length and source requirements.
- Replaced the concept’s invented Nature source with the actual supplied OpenAI antimicrobial article.
- Replaced a decorative slower/faster slider with an accessible four-stage slider. It changes the explanation and human/AI roles rather than implying a measured speedup.
- Made orange text darker for contrast on cream. Body/UI text uses local system fonts to avoid network-dependent builds; the large serif/italic visual hierarchy follows the concept.
- Added honest AI artwork captions. Scientific vortex and rover-route SVGs are conceptual diagrams, explicitly labeled as not measured data.
- Collapsed the right rail on smaller screens and used stacked media/text, 2x2 stage buttons, and two-column evidence tabs on phones.

## Verification

Used Codex’s built-in browser, including read-only DOM measurements and native screenshots. Compared the concept and rendered desktop/mobile screenshots with `view_image`. Checked 1440x1000 desktop and 390x844 mobile viewports. The original concept is a full-page 1024x1536 composition; the implemented page is intentionally longer to contain the assignment-length argument.

Comparison ledger:
1. Headline/copy: hero headline, supporting argument, CTA, navigation labels, and Discover/Build/Choose contents match the concept; above-fold addition is the artwork disclosure, intentionally added for attribution.
2. Layout: preserved left editorial headline/right portrait art and separate slim right rail; mobile stacks without clipping.
3. Typography: retained serif headline/italic accent, serif panel headings, compact sans body and mono captions; deliberately self-contained fonts.
4. Palette: cream and olive band preserved; darker orange for readable text is intentional.
5. Imagery: generated robotic hand and molecular artwork are actual local assets, not screenshots of UI; separate crops remain legible.
6. Interaction containers: four evidence tabs, circular discovery nodes, range input, and future disclosures preserve the concept’s structure; benchmark and source search are documented extensions.
7. Responsive fix: removed intrinsic grid/aspect-ratio minimums and adjusted phone headline sizing. DOM verified document width equals viewport width at 390 and 1440 pixels.

Functional checks passed in the built-in browser: all four evidence chapters change copy/citations; Home keyboard navigation returns to Medicine; discovery stage buttons and slider update content; restart returns to Ask; benchmark category selection changes explanation; Work disclosure opens; NASA search yields one result; unmatched search shows an empty state; clearing restores seven sources. No browser console warnings/errors were reported in the checked session. Browser pointer targeting was unreliable after viewport overrides; keyboard activation succeeded. Full-page screenshot stitching also duplicated content, so viewport screenshots are the trustworthy visual evidence.

`bun run lint`, production compilation, TypeScript, and static generation passed. Production build uses Webpack because Turbopack’s local worker hit an environment port-binding restriction. No automated regression suite was added for this first static editorial draft.

## Generated asset provenance

Created with the built-in Image Gen tool, then converted to optimized WebP with the existing Sharp dependency. Final project assets: `public/images/possible-future.webp` and `public/images/molecules.webp`. These are conceptual illustrations, not documentary photographs or molecular models.

Hero prompt: “Create one exquisite editorial illustration for a website called The Possible about the hopeful possibilities of AI and robotics. Portrait 3:4 composition. A close-up beautifully engineered ivory ceramic robotic hand with visible small graphite and brushed metal joints reaches diagonally up from lower left and gently cradles a translucent glowing persimmon orange glass orb between thumb and fingers near upper right. Natural golden daylight, serene pale blue sky, wispy clouds, distant hazy mountains and blue water. At lower right pale limestone modernist terraces and a few slender cypress trees. Sophisticated tangible photography meets surreal architectural magazine art, sculptural, elegant, warm, realistic materials, quiet hopeful mood, subtle film grain. No typography, no letters, no logos, no watermark. Full bleed image. Match palette cream white terracotta orange and pale blue. This is conceptual artwork not a real robot photograph.”

Molecule prompt: “A beautiful abstract molecular structure for a sophisticated optimistic science editorial website. Wide landscape 16:10, peach background #f5c7ac. Macro sculptural photograph of branching winding chains of small translucent and ivory spheres joined by tiny cylinders, some luminous persimmon-orange spheres, realistic glass ceramic materials, soft shadows, shallow depth of field. Arrange from lower left sweeping through center toward upper right. Plenty of fine detail but airy composition, warm natural daylight, premium science magazine visual. No text, no labels, no lettering. Conceptual molecular artwork, not an accurate diagram of a specific compound.”
