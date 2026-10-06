import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-3 font-display text-4xl tracking-[-0.02em] md:text-5xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">The link may be old, or the page may have moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          View all work
        </ButtonLink>
      </div>
    </Container>
  );
}
