export interface Entries {
  title: string;
  organization: string;
  startDate: string;
  description: string;
  endDate?: string | undefined;
  current?: boolean | undefined;
}
// Helper function to convert entries to markdown
export function entriesToMarkdown(entries : Entries[], type : string) {
  if (!entries?.length) return "";

  return (
    `## ${type}\n\n` +
    entries
      .map((entry) => {
        const dateRange = entry.current
          ? `${entry.startDate} - Present`
          : `${entry.startDate} - ${entry.endDate}`;
        return `### ${entry.title} @ ${entry.organization}\n${dateRange}\n\n${entry.description}`;
      })
      .join("\n\n")
  );
}
