export const formatDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // mesi partono da 0
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };