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
    id: "edu-placeholder",
    type: "education",
    title: { vi: "[Tên bằng cấp / chương trình học]", en: "[Degree / Program Name]" },
    organization: { vi: "[Tên trường]", en: "[University / College Name]" },
    period: "[Năm bắt đầu] – [Năm tốt nghiệp]",
    description: { vi: "[Chuyên ngành, thành tích nổi bật nếu có]", en: "[Major, notable achievements if any]" },
    visible: false, // set true after filling real data
  },
  {
    id: "work-placeholder",
    type: "work",
    title: { vi: "[Chức danh]", en: "[Job Title]" },
    organization: { vi: "[Tên công ty / dự án]", en: "[Company / Project Name]" },
    period: "[Thời gian]",
    description: { vi: "[Mô tả công việc và thành tích]", en: "[Job description and achievements]" },
    visible: false,
  },
];
