export function DATE({isoDate}) {
    const parts = isoDate.match(/^(\d+)-(\d+)-(\d+)T/);
  
    if (parts && parts.length === 4) {
      const year = parts[1];
      const month = parts[2];
      const day = parts[3];
  
      return `${day}/${month}/${year}`;
    } else {
      return "Invalid Date";
    }
  }