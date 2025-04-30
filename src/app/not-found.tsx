import Link from "next/link";

// metadata - 404 don't want to inherit boilerplate
export const metadata = {
  title: {
    absolute: "404 - Page Not Found",
  },
  description: "Oops! This page doesn’t exist. Try heading back to the homepage.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "404 - Page Not Found",
    description: "This page couldn’t be found on Rachel Power Design.",
    images: [], // Explicitly clears inherited images
  },
  twitter: {
    card: "summary",
    title: "404 - Page Not Found",
    description: "This page couldn’t be found.",
    images: [], // Explicitly clears inherited images
  },
};


const NotFound = async () => {
  return (
    <>
      <section className="section-sm text-center">
        <div className="container">
          <div className="row justify-center">
            <div className="sm:col-10 md:col-8 lg:col-6">
              <span className="text-[8rem] block font-bold text-dark ">
                404
              </span>
              <h1 className="h2 mb-4">Page not found</h1>
              <div className="content">
                <p>
                  The page you are looking for might have been removed, had its
                  name changed, or is temporarily unavailable.
                </p>
              </div>
              <Link href="/" className="btn btn-primary mt-8">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
