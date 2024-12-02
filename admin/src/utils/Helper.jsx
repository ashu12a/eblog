export const generateSlug = (value) => {
    const formattedslug = value
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading/trailing spaces
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with hyphens

    return formattedslug;
  };