export interface NavItem {
  title: string;
  path: string;
  description: string;
  keywords: string[];
  type: string;
}

export const navigationConfig: NavItem[] = [
  {
    title: "Trang chủ",
    path: "/",
    description: "Quay về trang chào mừng",
    keywords: ["home", "trang chủ", "bắt đầu", "welcome"],
    type: "page",
  },
  {
    title: "Blog",
    path: "/blog",
    description: "Chia sẻ kiến thức, tutorials và chuyện nghề",
    keywords: ["blog", "bài viết", "hướng dẫn", "tutorials", "tech"],
    type: "page",
  },
  {
    title: "Giới thiệu",
    path: "/about",
    description: "Câu chuyện về background và hành trình của mình",
    keywords: ["about", "giới thiệu", "tiểu sử", "profile", "tôi là ai"],
    type: "page",
  },
  {
    title: "Dự án",
    path: "/projects",
    description: "Kho tàng các dự án cá nhân và Open Source",
    keywords: ["projects", "dự án", "sản phẩm", "portfolio", "app", "web"],
    type: "page",
  },
  {
    title: "Học vấn",
    path: "/education",
    description: "Quá trình đào tạo và bằng cấp",
    keywords: ["education", "học vấn", "trường học", "bằng cấp"],
    type: "page",
  },
  {
    title: "Kinh nghiệm",
    path: "/experience",
    description: "Kinh nghiệm làm việc và thực chiến",
    keywords: ["experience", "kinh nghiệm", "làm việc", "công ty"],
    type: "page",
  },
  {
    title: "Kỹ năng",
    path: "/skills",
    description: "Các công nghệ, ngôn ngữ và tool mình sử dụng",
    keywords: ["skills", "kỹ năng", "công nghệ", "tech stack", "tool"],
    type: "page",
  },
  {
    title: "Chứng chỉ",
    path: "/certificates",
    description: "Các chứng nhận và thành tích đã đạt được",
    keywords: ["certificates", "chứng chỉ", "thành tích", "bằng khen"],
    type: "page",
  },
  {
    title: "Liên hệ",
    path: "/contact",
    description: "Kết nối và trao đổi công việc",
    keywords: ["contact", "liên hệ", "email", "gọi điện", "nhắn tin"],
    type: "page",
  },
];
