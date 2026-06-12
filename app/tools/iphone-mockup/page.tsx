import { Mockup } from "./mockup";

export const metadata = {
  title: "iPhone Mockup Generator",
};

export default function Page() {
  return (
    <section className="mb-12">
      <h1 className="text-2xl font-serif mb-2">iPhone mockup generator</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Drop an image or MP4. Export PNG or MP4 (falls back to WebM on
        unsupported browsers).
      </p>
      <Mockup />
    </section>
  );
}
