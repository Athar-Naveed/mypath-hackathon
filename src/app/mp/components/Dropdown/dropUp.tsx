interface DropUpType {
  title: string;
  desc: string;
}
const DropUp = ({
  dropUpOptions,
  selectedIndex,
  setSelectedIndex,
  handleDropUpOption,
}: {
  dropUpOptions: Array<DropUpType>;
  selectedIndex: number;
  setSelectedIndex: any;
  handleDropUpOption: any;
}) => {
  return (
    <>
      <div className="fixed bottom-32 lg:bottom-36 left-0 right-0 max-w-xl lg:max-w-3xl mx-auto md:px-4 z-20 animate-fade-in">
        <div className="bg-white dark:bg-dark-custom-blue rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm">
          <div className="p-3">
            <ul className="grid gap-1.5">
              {dropUpOptions.map((option, index) => (
                <li
                  key={index}
                  className={`relative rounded-lg transition-all duration-200 cursor-pointer group ${
                    index === selectedIndex
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => handleDropUpOption(option.title)}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      {/* You can add an icon here if you have one for each option */}
                      <h3
                        className={`font-medium text-sm ${
                          index === selectedIndex
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {option.title}
                      </h3>
                    </div>
                    <p
                      className={`mt-1 text-xs ${
                        index === selectedIndex
                          ? "text-blue-600/80 dark:text-blue-300/80"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {option.desc}
                    </p>

                    {/* Subtle indicator for selected item */}
                    {index === selectedIndex && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 dark:bg-blue-400 rounded-r-full"></div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional footer with hint */}
          <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/20">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Press{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                ↑
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                ↓
              </kbd>{" "}
              to navigate and{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                Enter
              </kbd>{" "}
              to select
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default DropUp;
