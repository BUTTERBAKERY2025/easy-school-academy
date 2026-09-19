/**
 * Runs once when the server starts — not during `next build`.
 *
 * A missing AUTH_SECRET used to let the app boot and serve pages normally, then
 * fail with an opaque 500 the first time somebody signed in. Checking it here
 * turns that into a startup failure whose message names the variable, so a
 * misconfigured deployment is obvious in the host's deploy log instead of being
 * discovered by a user.
 */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NODE_ENV !== "production") return;

  if (!process.env.AUTH_SECRET?.trim()) {
    throw new Error(
      "AUTH_SECRET is not set. Sessions cannot be signed without it, so the server will not start. " +
        "Set it to a long random string in your hosting provider's environment variables " +
        '(generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'base64url\'))").',
    );
  }
}
