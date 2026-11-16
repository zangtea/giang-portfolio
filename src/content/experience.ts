export interface ExperienceItem {
  id: string;
  type: "work" | "education" | "certificate";
  title: { vi: string; en: string };
  organization: { vi: string; en: string };
  period: string; // e.g. "2023 – nay" or "2020 – 2024"
  description?: { vi: string; en: string };
  visible: boolean; // set false to hide until user adds real data
}

// User should replace these placeholders with their actual experience
export const experienceItems: ExperienceItem[] = [
  {
    id: "education-current",
    type: "education",
    title: { vi: "Sinh viên Công nghệ thông tin năm cuối", en: "Final-year IT Student" },
    organization: { vi: "", en: "" },
    period: "",
    visible: true,
  },
];
