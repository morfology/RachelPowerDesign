// GPT 👉 https://chatgpt.com/c/68371d49-1b98-8004-b9e5-8ef2a8ad1034



const Cookie = ({
  className,
}: {
  className: string;
}) => {
  return (
    <>
      {/* Example JSX for a simple banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow z-50 text-sm flex flex-col sm:flex-row items-center justify-between">
        <span className="mb-2 sm:mb-0">
          We use cookies to improve your experience and understand how our site is used. You can accept or manage your preferences.
        </span>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">Manage</button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Accept All</button>
        </div>
      </div>

    </>

  );
};

export default Cookie;
