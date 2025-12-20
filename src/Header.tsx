import { IoLibrary } from 'react-icons/io5';

export function Header() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-400 bg-clip-text text-transparent mb-4 flex items-center gap-2 ">
        <IoLibrary className="inline-block mr-3 text-blue-600" />
        <span className="">Humbly Read</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto leading-relaxed text-left">
        I buy a lot of comics on{' '}
        <a
          href="https://www.humblebundle.com/books"
          target="_blank"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          Humble Bundle
        </a>{' '}
        and{' '}
        <a
          href="https://www.fanatical.com/en/bundle/books"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          Fanatical
        </a>
        , but I don't read a lot of them. So I made this to keep track of things
        I've purchased and read to try to convince myself to stop throwing away
        money.
      </p>
    </div>
  );
}
