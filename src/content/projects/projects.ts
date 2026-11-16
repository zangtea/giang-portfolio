export type LocalizedText = { vi: string; en: string };
export type ProjectCategory = "web-app" | "tool" | "e-commerce" | "ai-ml";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDesc: LocalizedText;
  overview: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  architecture: LocalizedText;
  features: { vi: string[]; en: string[] };
  role: LocalizedText;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  technicalNote?: LocalizedText;
}

export const projects: Project[] = [
  {
    slug: "omniedu",
    title: "OmniEdu",
    category: "ai-ml",
    shortDesc: {
      vi: "Nền tảng học tập thích ứng kết hợp IRT và AI tutor.",
      en: "An adaptive learning platform combining IRT and an AI tutor.",
    },
    overview: {
      vi: "OmniEdu hướng đến việc cá nhân hóa trải nghiệm học tập thông qua dữ liệu học tập, mô hình IRT và AI tutor.",
      en: "OmniEdu explores personalized learning through learning data, Item Response Theory, and an AI tutor.",
    },
    problem: {
      vi: "Một lộ trình học cố định khó phản ánh mức độ hiểu bài và nhu cầu khác nhau của từng người học.",
      en: "A fixed learning path cannot reflect each learner's different level of understanding and needs.",
    },
    solution: {
      vi: "Kết hợp ứng dụng Next.js, API Express.js, Supabase và thành phần Python cho các chức năng IRT/AI tutor.",
      en: "Combines a Next.js application, Express.js API, Supabase, and Python components for IRT and AI tutor capabilities.",
    },
    architecture: {
      vi: "Các lớp giao diện, API, dữ liệu và xử lý IRT/AI được triển khai bằng Next.js, Express.js, Supabase và Python.",
      en: "The interface, API, data, and IRT/AI processing layers use Next.js, Express.js, Supabase, and Python.",
    },
    features: {
      vi: ["Hỗ trợ lộ trình học tập thích ứng", "Ứng dụng mô hình IRT", "Tích hợp AI tutor"],
      en: ["Adaptive learning paths", "Item Response Theory integration", "AI tutor integration"],
    },
    role: {
      vi: "Phát triển full-stack và tích hợp các thành phần AI.",
      en: "Full-stack development and AI integration.",
    },
    techStack: ["Next.js", "Tailwind CSS", "Express.js", "Supabase", "Python", "IRT / AI tutor"],
    githubUrl: "https://github.com/zangtea/OmniEdu",
    demoUrl: null,
  },
  {
    slug: "ai-powered-qa-devtool",
    title: "AI-powered QA DevTool",
    category: "tool",
    shortDesc: {
      vi: "Công cụ QA ứng dụng Node.js, TypeScript và OpenAI API.",
      en: "A QA development tool using Node.js, TypeScript, and the OpenAI API.",
    },
    overview: {
      vi: "Công cụ hỗ trợ quy trình QA với tích hợp OpenAI API. Chi tiết kỹ thuật đang được xác minh.",
      en: "A QA workflow tool with OpenAI API integration. Technical details are currently being verified.",
    },
    problem: {
      vi: "Các bước chuẩn bị QA có thể tốn công khi phải xử lý thủ công những đầu vào dạng yêu cầu.",
      en: "QA preparation can require repetitive manual work when processing requirement inputs.",
    },
    solution: {
      vi: "Dự án sử dụng Node.js, TypeScript và OpenAI API; phạm vi chức năng cụ thể đang được xác minh.",
      en: "The project uses Node.js, TypeScript, and the OpenAI API; its exact feature scope is being verified.",
    },
    architecture: {
      vi: "Chi tiết kiến trúc và luồng dữ liệu chưa được xác minh, nên chưa được khẳng định ở đây.",
      en: "Architecture and data-flow details have not been verified and are not claimed here.",
    },
    features: {
      vi: ["Tích hợp OpenAI API", "Chi tiết tính năng đang được xác minh"],
      en: ["OpenAI API integration", "Feature details currently being verified"],
    },
    role: {
      vi: "Vai trò và phạm vi đóng góp cá nhân đang được xác minh.",
      en: "Individual role and contribution scope are currently being verified.",
    },
    techStack: ["Node.js", "TypeScript", "OpenAI API"],
    githubUrl: null,
    demoUrl: null,
    technicalNote: {
      vi: "Thông tin kỹ thuật chi tiết đang được xác minh.",
      en: "Detailed technical information is currently being verified.",
    },
  },
  {
    slug: "blackblue-laptop",
    title: "BlackBlue Laptop",
    category: "e-commerce",
    shortDesc: {
      vi: "Website thương mại điện tử về laptop và linh kiện.",
      en: "An e-commerce website for laptops and components.",
    },
    overview: {
      vi: "Nền tảng thương mại điện tử chuyên biệt phân phối laptop và linh kiện.",
      en: "A focused e-commerce platform for laptops and computer components.",
    },
    problem: {
      vi: "Quản lý dữ liệu sản phẩm, quan hệ cơ sở dữ liệu và luồng đơn hàng cần một ứng dụng thống nhất.",
      en: "Product data, relational records, and order flows need to be managed in one application.",
    },
    solution: {
      vi: "Xây dựng ứng dụng Node.js với Express, Prisma, MySQL và giao diện EJS.",
      en: "Built with a Node.js application using Express, Prisma, MySQL, and EJS views.",
    },
    architecture: {
      vi: "Express.js xử lý routing phía máy chủ, EJS kết xuất giao diện, Prisma truy cập MySQL.",
      en: "Express.js handles server-side routes, EJS renders views, and Prisma accesses MySQL.",
    },
    features: {
      vi: ["Danh mục laptop và linh kiện", "Luồng đơn hàng và checkout", "Tầng dữ liệu quan hệ với Prisma/MySQL"],
      en: ["Laptop and component catalog", "Order and checkout flow", "Relational data layer with Prisma and MySQL"],
    },
    role: {
      vi: "Phát triển full-stack.",
      en: "Full-stack development.",
    },
    techStack: ["Node.js", "Express.js", "TypeScript", "Prisma", "MySQL", "EJS"],
    githubUrl: "https://github.com/zangtea/BlackBlue_BanLapTop",
    demoUrl: null,
  },
  {
    slug: "finance-advisor",
    title: "Finance Advisor",
    category: "web-app",
    shortDesc: {
      vi: "Website tư vấn giải pháp tài chính và thu hút khách hàng tiềm năng.",
      en: "A finance advisory website focused on presenting services and reaching prospective clients.",
    },
    overview: {
      vi: "Website giới thiệu dịch vụ tư vấn tài chính, tập trung vào giao diện và khả năng tìm thấy qua công cụ tìm kiếm.",
      en: "A financial advisory website focused on service presentation and search visibility.",
    },
    problem: {
      vi: "Thông tin dịch vụ cần được trình bày rõ ràng, dễ tiếp cận trên nhiều kích thước màn hình.",
      en: "Service information needs to remain clear and accessible across screen sizes.",
    },
    solution: {
      vi: "Xây dựng giao diện web với Next.js, TypeScript và Tailwind CSS.",
      en: "Built the web interface with Next.js, TypeScript, and Tailwind CSS.",
    },
    architecture: {
      vi: "Ứng dụng Next.js và các thành phần TypeScript tạo giao diện, được định kiểu bằng Tailwind CSS.",
      en: "A Next.js application with TypeScript components and Tailwind CSS styling.",
    },
    features: {
      vi: ["Giao diện tư vấn tài chính", "Thiết kế responsive", "Nội dung dịch vụ hướng đến khách hàng"],
      en: ["Financial advisory interface", "Responsive layout", "Client-oriented service content"],
    },
    role: {
      vi: "Phát triển giao diện frontend.",
      en: "Frontend development.",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: null,
    demoUrl: "https://vayvontoanquoc.com",
  },
];