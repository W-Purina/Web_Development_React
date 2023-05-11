import { NavBar } from "antd-mobile";

interface MainLayoutProps {
  title: string;
  onBack: () => void;
}

const MainLayout = ({ title, onBack }: MainLayoutProps) => {
  return <NavBar onBack={onBack}>{title}</NavBar>;
};

export default MainLayout;
