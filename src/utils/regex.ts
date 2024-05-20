const columnNameRegex = new RegExp(/_([a-zA-Z]+)$/);
export const getColumnName = (constaint: string) => {
  return constaint.match(columnNameRegex)?.[1];
};
