interface PerformerType {
  id: string;
  imgsrc: string;
  name: string;
  post: string;
  pname: string;
  status: string;
  budget: string;
  rides?: number;
  rating?: number;
  earning?: number;
}

const TopPerformerData: PerformerType[] = [
  {
    id: "1",
    imgsrc: "/images/profile/user-5.jpg",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    status: "Low",
    budget: "3.9",
    rides: 235,
    rating: 4,
    earning: 45677,
  },
  {
    id: "2",
    imgsrc: "/images/profile/user-2.jpg",
    name: "John Deo",
    post: "Web Developer",
    pname: "Flexy Admin",
    status: "Medium",
    budget: "24.5",
    rides: 235,
    rating: 4,
    earning: 45677,
  },
  {
    id: "3",
    imgsrc: "/images/profile/user-3.jpg",
    name: "Nirav Joshi",
    post: "Web Manager",
    pname: "Material Pro",
    status: "High",
    budget: "12.8",
    rides: 235,
    rating: 4,
    earning: 45677,
  },
  {
    id: "4",
    imgsrc: "/images/profile/user-4.jpg",
    name: "Yuvraj Sheth",
    post: "Project Manager",
    pname: "Xtreme Admin",
    status: "Very High",
    budget: "2.4",
    rides: 235,
    rating: 4,
    earning: 45677,
  },
];

export default TopPerformerData;
