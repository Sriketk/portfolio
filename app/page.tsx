import Link from "next/link";
export default function Home() {
  return (
    <>
      <section className="mb-12">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-foreground">
            Yo, I'm Sriket(Shree-keht). I'm building{" "}
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
            <Link href="/thoughts" rel="noopener noreferrer" className="underline">
              writer
            </Link>{" "}
            and a{" "}
            <Link href="/food" rel="noopener noreferrer" className="underline">
              cook
            </Link>
            .
          </p>

          <p className="text-lg leading-relaxed text-foreground">
            Do me a favor and support your local movie theater! This week I recommend{" "}
            <Link
              href="https://letterboxd.com/film/marty-supreme/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Marty Supreme
            </Link>{" "}
            and{" "}
            <Link
              href="https://letterboxd.com/film/avatar-fire-and-ash/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Avatar
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
            {" "}
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
            ,{" "}
            <Link
              href="https://www.tiktok.com/@sriketk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              TikTok
            </Link>
            ,{" "}
            <Link
              href="https://www.instagram.com/sriket.finance/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Instagram
            </Link>
            ,{" "}
            <Link
              href="https://www.youtube.com/@SriketFinance"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              YouTube
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
