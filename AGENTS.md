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

- Keep the ONE SOLVE assistant as one account-scoped conversation stored as AI SDK UI message parts, because the gateway is stateless and users need cross-device continuity.
- Assistant tools may only read the public service catalogue and create DRAFT service requests; actual submission happens via a user-confirmed authenticated server function, so the model can never commit actions itself.
