<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the landing page at `/` with reusable feature entry dialogs; the initial experience must remain usable without external integrations.
- Keep deterministic numerology in a browser-safe pure module, separate from interpretations, so calculation results never depend on AI.
- Do not simulate live AI, account creation, or chart generation; entry points must disclose pending integrations until configured.
- Use global semantic design tokens and shared button variants for all branded styling so future features inherit the same visual language.
