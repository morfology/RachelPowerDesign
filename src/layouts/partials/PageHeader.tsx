import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({ title }: { title: string }) => {

  // Make the last title word brown
  const words = humanize(title).split(' ');
  const lastWord = words.pop();
  const firstWords = words.join(' ');

  return (
    <section>
      <div className="container text-center">
        <div className="rounded-2xl bg-gradient-to-b from-body to-theme-light px-8 py-14  ">
          <h1>{firstWords}<span className="text-primary"> {lastWord}</span></h1>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
