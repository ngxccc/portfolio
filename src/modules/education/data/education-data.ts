export interface EducationItem {
  school: string;
  location: string;
  duration: string;
  degree: string;
  grade: string;
  image: string;
  resultUrl: string;
  coursework?: string[];
  subjects?: string[];
  description: string;
}

export const educationData: EducationItem[] = [
  {
    school: "Trường Cao Đẳng Kỹ Thuật Cao Thắng",
    location: "63 Huỳnh Thúc Kháng, Phường Sài Gòn, Tp.HCM",
    duration: "August 2024 - Current",
    degree: "Associate Degree",
    grade: "In Progress",
    image: "/education/caothang.jpg",
    resultUrl: "",
    coursework: ["DSA", "OOPs", "DBMS"],
    description:
      "Đang 'tu luyện' tại lò Cao Thắng danh tiếng. 🛠️ Chuyển hệ sang Software để 'bào' code thay vì vặn ốc. Đang tập trung master tư duy logic với DSA & OOP để sau này làm trùm Phân tích hệ thống. Phương châm: Code ít bug, ngủ nhiều hơn! 🦉",
  },
  {
    school: "Hoa Binh Xuan Loc College",
    location: "Trang Bom District, Dong Nai Province, Vietnam",
    duration: "2021 - 2024",
    degree: "Certificate in Computer Hardware",
    grade: "Xếp loại: Giỏi (8.2/10)",
    image: "/education/hbxl.jpg",
    resultUrl: "",
    subjects: ["Phần Cứng Máy Tính"],
    description:
      "Từ 'người dùng' thành 'pháp sư' phần cứng sau 3 năm tu luyện. 🧙‍♂️ Biết cách biến đống linh kiện rời rạc thành bộ PC chạy mượt mà. Sở trường: Tối ưu hiệu năng máy tính. Đam mê công nghệ từ trong máu!",
  },
];
