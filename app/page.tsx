import Link from "next/link";
export default function Home() {
  return (
    <>
      <section className="mb-12">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-foreground">
            Hey, I'm Sriket(Shree-keht). Im 23 years old. I went to University
            of Maryland. Im a developer, and I'm building{" "}
            <Link
              href="https://try-cobalt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Cobalt
            </Link>{" "}
            to help you talk to your money. In my free time, I like to watch
            movies and play basketball. I'm working on becoming a better{" "}
            <Link href="/blog" rel="noopener noreferrer" className="underline">
              writer
            </Link>{" "}
            and a{" "}
            <Link href="/food" rel="noopener noreferrer" className="underline">
              cook
            </Link>
            .
          </p>

          <p className="text-lg leading-relaxed text-foreground">
            Do me a favor and support your local theater! This week I recommend{" "}
            <Link
              href="https://letterboxd.com/film/bugonia/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Bugonia
            </Link>{" "}
            or{" "}
            <Link
              href="https://letterboxd.com/film/die-my-love/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Die My Love
            </Link>
            .
          </p>

          <p className="text-lg leading-relaxed text-foreground">
            If you need help picking a movie, check{" "}
            <Link
              href="https://cinescape.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              this
            </Link>{" "}
            out
          </p>

          <p className="text-md leading-relaxed text-foreground">
            Follow me on{" "}
            <Link
              href="https://twitter.com/sriketk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Twitter
            </Link>
            ,{" "}
            <Link
              href="https://github.com/sriketk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              GitHub
            </Link>
            ,{" "}
            <Link
              href="https://www.linkedin.com/in/sriket-komali-415864219/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              LinkedIn
            </Link>
            ,{" "}
            <Link
              href="https://www.letterboxd.com/sriketk/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Letterboxd
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
