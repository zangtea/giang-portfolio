export interface Project {
  slug: string;
  featured: boolean;
  status: "in-progress" | "completed" | "prototype";
  title: string;
  shortDesc: { vi: string; en: string };
  description: { vi: string; en: string };
  problem: { vi: string; en: string };
  solution: { vi: string; en: string };
  techStack: string[];
  features: { vi: string[]; en: string[] };
  role: { vi: string; en: string };
  githubUrl: string | null; // null = not yet verified/public
  demoUrl: string | null;
  thumbnailUrl: string; // e.g. "/projects/omniedu.png" - placeholder
  category: "web-app" | "tool" | "e-commerce" | "ai-ml";
}

export const projects: Project[] = [
  {
    slug: "omniedu",
    featured: true,
    status: "in-progress",
    title: "OmniEdu",
    shortDesc: {
      vi: "Nền tảng học tập thích ứng sử dụng AI và mô hình IRT",
      en: "Adaptive learning platform powered by AI and Item Response Theory",
    },
    description: {
      vi: "OmniEdu là công cụ học tập thích ứng kết hợp trí tuệ nhân tạo và mô hình Item Response Theory (IRT) để cá nhân hóa lộ trình học tập cho từng người dùng. Hệ thống phân tích hành vi học tập để điều chỉnh độ khó bài tập phù hợp.",
      en: "OmniEdu is an adaptive learning tool combining artificial intelligence and Item Response Theory (IRT) to personalize learning paths for each user. The system analyzes learning behavior to adjust exercise difficulty appropriately.",
    },
    problem: {
      vi: "Học tập truyền thống không cá nhân hóa được lộ trình cho từng người, dẫn đến hiệu quả thấp và học viên dễ nản chí.",
      en: "Traditional learning fails to personalize paths for each individual, leading to low efficiency and learner discouragement.",
    },
    solution: {
      vi: "Xây dựng engine AI phân tích năng lực người dùng theo thời gian thực, kết hợp mô hình IRT để chọn bài tập phù hợp nhất.",
      en: "Built an AI engine that analyzes user competency in real time, combined with IRT model to select the most appropriate exercises.",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Express.js", "Supabase", "Python", "PostgreSQL"],
    features: {
      vi: [
        "Phân tích hành vi học tập theo thời gian thực",
        "Mô hình IRT tính toán năng lực người dùng",
        "Lộ trình học tập được cá nhân hóa",
        "Dashboard theo dõi tiến độ",
      ],
      en: [
        "Real-time learning behavior analysis",
        "IRT model for user competency estimation",
        "Personalized learning paths",
        "Progress tracking dashboard",
      ],
    },
    role: {
      vi: "Full-stack Developer — xây dựng frontend, backend API và tích hợp AI engine",
      en: "Full-stack Developer — built frontend, backend API, and integrated AI engine",
    },
    githubUrl: null,
    demoUrl: null,
    thumbnailUrl: "/projects/omniedu.png",
    category: "ai-ml",
  },
  {
    slug: "qa-devtool",
    featured: true,
    status: "prototype",
    title: "AI-powered QA DevTool",
    shortDesc: {
      vi: "Công cụ tạo test case tự động từ yêu cầu phần mềm sử dụng AI",
      en: "AI-powered tool that automatically generates test cases from software requirements",
    },
    description: {
      vi: "Công cụ hỗ trợ QA và developer tạo test case từ mô tả yêu cầu (user story, spec) thông qua tích hợp AI. Giảm thời gian viết test thủ công và tăng độ bao phủ kiểm thử.",
      en: "A tool helping QA engineers and developers generate test cases from requirement descriptions (user stories, specs) via AI integration. Reduces manual test writing time and increases test coverage.",
    },
    problem: {
      vi: "Viết test case thủ công tốn nhiều thời gian và dễ bỏ sót các trường hợp biên.",
      en: "Manual test case writing is time-consuming and prone to missing edge cases.",
    },
    solution: {
      vi: "Tích hợp AI để phân tích yêu cầu và tự động sinh test case có cấu trúc, kèm theo bộ review để đảm bảo chất lượng.",
      en: "Integrated AI to parse requirements and auto-generate structured test cases, with a review workflow to ensure quality.",
    },
    techStack: ["Node.js", "TypeScript", "OpenAI API"],
    features: {
      vi: [
        "Sinh test case từ mô tả yêu cầu",
        "Review và chỉnh sửa test case",
        "Xuất test case ra nhiều định dạng",
      ],
      en: [
        "Generate test cases from requirement descriptions",
        "Review and edit generated test cases",
        "Export test cases in multiple formats",
      ],
    },
    role: {
      vi: "Developer — thiết kế kiến trúc và xây dựng toàn bộ công cụ",
      en: "Developer — designed architecture and built the entire tool",
    },
    githubUrl: null,
    demoUrl: null,
    thumbnailUrl: "/projects/qa-devtool.png",
    category: "tool",
  },
  {
    slug: "blackblue-laptop",
    featured: true,
    status: "completed",
    title: "BlackBlue Laptop",
    shortDesc: {
      vi: "Website thương mại điện tử bán laptop với đầy đủ tính năng mua sắm",
      en: "E-commerce website for laptops with complete shopping features",
    },
    description: {
      vi: "BlackBlue Laptop là website thương mại điện tử chuyên bán laptop, xây dựng với Node.js, Express, TypeScript, Prisma ORM và MySQL. Hệ thống bao gồm quản lý sản phẩm, giỏ hàng, checkout và quản lý đơn hàng.",
      en: "BlackBlue Laptop is an e-commerce website specialized in laptop sales, built with Node.js, Express, TypeScript, Prisma ORM, and MySQL. The system includes product management, shopping cart, checkout, and order management.",
    },
    problem: {
      vi: "Cần xây dựng một nền tảng thương mại điện tử hoàn chỉnh, dễ quản lý sản phẩm và đơn hàng.",
      en: "Need to build a complete e-commerce platform with easy product and order management.",
    },
    solution: {
      vi: "Thiết kế hệ thống MVC với Prisma ORM để quản lý cơ sở dữ liệu, EJS cho server-side rendering và luồng mua hàng đầy đủ.",
      en: "Designed an MVC system with Prisma ORM for database management, EJS for server-side rendering, and a complete shopping flow.",
    },
    techStack: ["Node.js", "Express.js", "TypeScript", "Prisma", "MySQL", "EJS"],
    features: {
      vi: [
        "Duyệt và tìm kiếm sản phẩm",
        "Giỏ hàng và checkout",
        "Quản lý địa chỉ giao hàng",
        "Lịch sử đơn hàng",
        "Giao diện quản trị",
      ],
      en: [
        "Product browsing and search",
        "Shopping cart and checkout",
        "Shipping address management",
        "Order history",
        "Admin interface",
      ],
    },
    role: {
      vi: "Full-stack Developer — xây dựng toàn bộ hệ thống backend và frontend",
      en: "Full-stack Developer — built the entire backend and frontend system",
    },
    githubUrl: null,
    demoUrl: null,
    thumbnailUrl: "/projects/blackblue-laptop.png",
    category: "e-commerce",
  },
  {
    slug: "finance-advisor",
    featured: false,
    status: "completed",
    title: "Finance Advisor",
    shortDesc: {
      vi: "Website tạo khách hàng tiềm năng cho dịch vụ tư vấn tài chính",
      en: "Lead generation website for financial advisory services",
    },
    description: {
      vi: "Finance Advisor là website được xây dựng để tạo khách hàng tiềm năng cho dịch vụ tư vấn tài chính, với giao diện thân thiện và form thu thập thông tin được tối ưu hóa.",
      en: "Finance Advisor is a website built to generate leads for financial advisory services, with a user-friendly interface and optimized information collection forms.",
    },
    problem: {
      vi: "Doanh nghiệp tư vấn tài chính cần một kênh online để thu hút và chuyển đổi khách hàng tiềm năng.",
      en: "Financial advisory businesses need an online channel to attract and convert potential clients.",
    },
    solution: {
      vi: "Xây dựng landing page tối ưu với CTA rõ ràng, form thu thập thông tin và tích hợp các công cụ theo dõi chuyển đổi.",
      en: "Built an optimized landing page with clear CTAs, information collection forms, and conversion tracking integration.",
    },
    techStack: ["[Stack chưa được xác nhận — cần bổ sung]"],
    features: {
      vi: [
        "Landing page tối ưu chuyển đổi",
        "Form thu thập thông tin khách hàng",
        "Giao diện responsive",
      ],
      en: [
        "Conversion-optimized landing page",
        "Client information collection form",
        "Responsive design",
      ],
    },
    role: {
      vi: "Developer — xây dựng và triển khai website",
      en: "Developer — built and deployed the website",
    },
    githubUrl: null,
    demoUrl: null,
    thumbnailUrl: "/projects/finance-advisor.png",
    category: "web-app",
  },
];
