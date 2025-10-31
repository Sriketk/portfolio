import Link from "next/link";
export default function Home() {
  return (
    <>
      <section className="mb-12">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-foreground">
            Hey, I'm Sriket(Shree-keht). Im 23 years old, and I'm building{" "}
            <Link
              href="https://try-cobalt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Cobalt
            </Link>{" "}
            to help you talk to your money.
          </p>

           <p className="leading-relaxed text-shadow-muted-foreground">
            I like to code, watch movies, and play basketball.  
          </p>

          <p className="leading-relaxed text-shadow-muted-foreground">
            Art is super important, and we all need to do our job in helping grow it. 
          </p>




          {/* <p className="leading-relaxed text-muted-foreground">
            Currently, I'm focused on building tools that help people work more
            creatively and efficiently. I'm particularly interested in design
            systems, developer experience, and the future of web technologies.
          </p>  */}
        </div>
      </section>

      {/* <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          Experience
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              Senior Designer & Developer
            </h3>
            <p className="mb-2 text-sm text-muted-foreground">
              Company Name • 2022 - Present
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Leading design and development of core product features,
              establishing design systems, and mentoring junior team members.
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              Product Designer
            </h3>
            <p className="mb-2 text-sm text-muted-foreground">
              Previous Company • 2020 - 2022
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Designed and shipped multiple product features, conducted user
              research, and collaborated with engineering teams.
            </p>
          </div>
        </div>
      </section> */}

      {/* <section>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">Skills</h2>

        <p className="leading-relaxed text-muted-foreground">
          Design: Figma, Sketch, Adobe Creative Suite
          <br />
          Development: React, Next.js, TypeScript, Tailwind CSS
          <br />
          Tools: Git, VS Code, Linear, Notion
        </p>
      </section> */}
    </>
  );
}
