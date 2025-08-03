import React from "react";

export default function KeywordInput({ keywords, setKeywords }) {
  const inputRef = React.useRef();

  const handleKey = (e) => {
    if (e.key === "Tab" && inputRef.current.value.trim() !== "") {
      e.preventDefault(); // Prevent focus from changing
      const inputValue = inputRef.current.value.trim();
      setKeywords((prev) => [...prev, inputValue]);
      inputRef.current.value = ""; // Clear input
    }

    if (e.key === "Backspace" && inputRef.current.value === "") {
      setKeywords((prev) => prev.slice(0, -1)); // remove last item
    }
  };

  return (
    <div className="border border-gray-200 rounded flex flex-wrap items-center p-1">
      {keywords.map((item, index) => (
        <span
          key={index}
          className="px-3 py-1 rounded-full font-light text-xs bg-gray-200 whitespace-nowrap m-1"
        >
          {item}
        </span>
      ))}

      <input
        type="text"
        onKeyDown={handleKey}
        ref={inputRef}
        className="focus:outline-none px-2 h-8 flex-grow min-w-[120px] font-light text-sm"
      />
    </div>
  );
}
