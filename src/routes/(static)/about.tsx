import { Meta } from "~/components";

export default function AboutPage() {
  return (
    <>
      <Meta.Base title="About" description="About npmxt" />
      <Meta.OG url="about" title="About" description="About npmxt" image="about" />

      <div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-bold text-4xl text-neutral-12">
        <h1>AboutPage</h1>
      </div>
    </>
  );
}
