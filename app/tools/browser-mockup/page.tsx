import { Mockup } from "./mockup";

export const metadata = {
  title: "Browser Mockup Generator",
};

export default function Page() {
  return (
    <section className="mb-12">
      <h1 className="text-2xl font-serif mb-2">Browser mockup generator</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Drop an image or MP4 into a browser window frame. Export PNG / WebM /
        MP4.
      </p>
      <Mockup />
    </section>
  );
}
