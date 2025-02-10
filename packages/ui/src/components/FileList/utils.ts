// Param: size - size in octets
// Return a string representation of the size in unit (octets, Ko, Mo, Go, To)
// with following rules:
//    - show 1 decimal
//    - show size in unit only if size > 1 unit and size < 1024 unit
// Example:
//    - displaySize(1023*1024) => "1023.0 Ko"
//    - displaySize(1024*1024) => "1.0 Mo"
export const displaySize = (size: number) => {
  if (!size || size < 0) return null;
  const units = ["octets", "Ko", "Mo", "Go", "To"];
  const index = Math.min(Math.floor(Math.log2(size) / 10), units.length - 1);

  return `${(size / 1024 ** index).toFixed(1)} ${units[index]}`;
};

// Param: name - file name
// Return the extension of the file in uppercase
// Example:
//    - displayExtension("file.txt") => "TXT"
export const displayExtension = (name: string) => {
  if (!name) return null;
  const extension = name.split(".").pop();
  return extension ? extension.toUpperCase() : null;
};
