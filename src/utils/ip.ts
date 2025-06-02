export const isValidIPAddress = (ip: string) => {
  const ipRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
};

export const isValidDomain = (input: string): boolean => {
  if (!input || typeof input !== "string") return false;

  let domain = input.trim();

  // Remove protocol if present (http://, https://, ftp://, etc.)
  domain = domain.replace(/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//, "");

  // Remove www. prefix if present
  domain = domain.replace(/^www\./, "");

  // Remove path, query parameters, and fragments
  domain = domain.split("/")[0].split("?")[0].split("#")[0];

  // Remove port number if present
  domain = domain.split(":")[0];

  // Basic length check
  if (domain.length === 0 || domain.length > 253) return false;

  // Check for invalid characters at start/end
  if (domain.startsWith(".") || domain.endsWith(".")) return false;
  if (domain.startsWith("-") || domain.endsWith("-")) return false;

  // Check for consecutive dots
  if (domain.includes("..")) return false;

  // Split into labels (parts separated by dots)
  const labels = domain.split(".");

  // Single word domains (like "localhost") are valid
  if (labels.length === 1) {
    const label = labels[0];
    return (
      label.length > 0 &&
      label.length <= 63 &&
      /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(label)
    );
  }

  // Multi-label domains need at least 2 parts (domain.tld)
  if (labels.length < 2) return false;

  // Validate each label
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];

    // Label length check
    if (label.length === 0 || label.length > 63) return false;

    // Label cannot start or end with hyphen
    if (label.startsWith("-") || label.endsWith("-")) return false;

    // Label can only contain alphanumeric characters and hyphens
    if (!/^[a-zA-Z0-9-]+$/.test(label)) return false;

    // TLD (last label) should be at least 2 characters and contain at least one letter
    if (i === labels.length - 1) {
      if (label.length < 2) return false;
      if (!/[a-zA-Z]/.test(label)) return false; // TLD must contain at least one letter
    }
  }

  return true;
};
