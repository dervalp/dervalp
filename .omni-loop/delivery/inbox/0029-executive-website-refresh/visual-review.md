# Detailed homepage visual reference

This is the refined homepage proposal for PRD #29, following Pierre’s review on 2026-10-16: retain the original logo and provide a precise version suitable for confident approval. Production source is unchanged; no screen is locked and the design-craft configuration remains off.

## What to review

- `visual-review.html`: approval desk with Desktop (1440 × 900), Tablet (768 × 900), Mobile (390 × 844) and dark-theme controls. Frames scale down to fit the browser while retaining the selected internal viewport. Scroll inside the frame to see the complete page.
- `pixel-perfect.html`: full-size homepage reference with the actual original light/dark wordmarks, Pierre’s existing portrait, company marks and editorial images. The original orange slash is retained. Original assets are referenced rather than modified or copied.
- `before-after.html`: the earlier structural comparison, with a link to the detailed approval desk. The symbolic portrait there is historical context; implementation follows the real-asset reference.

Serve the repository root, not just this inbox folder, because the preview uses relative references to tracked public assets. For example, a local static server’s root should be the repository root; open `/.omni-loop/delivery/inbox/0029-executive-website-refresh/visual-review.html`. Font data for Plus Jakarta Sans is embedded from the dependency already declared in package.json; no new dependency or network font request is needed for the page typography. The display face is Georgia. The original logo files are used unchanged.

The homepage is the detailed reference in this update. About, Services, How I help, Contact, articles and tools still have the scoped implementation/review requirements in spec.md and plan.md; their complete new screen designs are not claimed here.

## Defined visual behavior

- Main content: up to 1200 CSS pixels, with 48-pixel desktop side gutters, 32-pixel intermediate gutters, 24-pixel tablet gutters and 20-pixel phone gutters.
- Display typography: Georgia, responsive 49–110 px hero scale, deliberately tight tracking; body/UI: the embedded Plus Jakarta Sans variable font.
- Hero: actual portrait in an arched frame; on phones it becomes a 148 × 193 px image beside the signature line, rather than disappearing.
- Header/footer: original SVG wordmarks, correct light/dark variant, orange slash and aspect ratio. Tablet and phone navigation use the native disclosure menu; phone theme/menu targets are 44 × 44 px.
- Light/dark colour tokens, real image crops, divider rhythm, outcome labels, project narratives, engagements, editorial images and closing invitation are defined in the reference CSS.
- Reduced-motion CSS removes transitions and smooth scrolling when the preference matches. OS media-preference emulation was not exercised in this preview review.

## Verification performed

Reviewed through the browser at actual 1440, 768 and 390 CSS-pixel widths, in both light and dark themes. Document scroll width matched the viewport at all three widths, with no horizontal overflow in these checks. The first pass found low-contrast white employer marks and missing tablet navigation; both were corrected and the affected states inspected again.

- All eight visible image uses loaded: header wordmark, portrait, three employer marks, two editorial images and footer wordmark.
- Theme toggle switches the page and accessible button state/name; light/dark logo variants render correctly.
- Phone disclosure opens; selecting its work link closes it and reaches the work section.
- Keyboard Tab reaches the disclosure with a visible 3 px outline; Enter opens it.
- Contact preview dialog opens and closes with Escape. It explicitly describes the eventual existing Contact route and sends no message.
- Desktop/tablet/phone and theme controls on the approval desk are checked before this document is pushed. The actual site’s SEO, forms and calculators are not tested or implemented by this static preview.

The article and diagnostic actions are simulations. CV links currently show the existing public document; the supplied latest CV is still scheduled for slice 1. No external messages, contact submissions, deployment or analytics events are sent by this preview.

## Approval and delivery

Review the precise homepage at the three sizes and in both themes before merging phase-0 PR #31. Its logo-retention requirement is also in spec.md and slice s2’s done-when conditions. Approval of the visual direction does not silently lock a screen or certify unbuilt secondary pages. The feature PR remains draft until implementation and its own validation are complete.
