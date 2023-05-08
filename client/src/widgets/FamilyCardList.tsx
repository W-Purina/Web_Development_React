import FamilyCard from "../components/FamilyCard";

const FamilyCardList = () => {
  return (
    <>
      <div className="p-5">
        <FamilyCard
          familyName="1902/Columbia Apt."
          familyMembers={["Bo Pang", "Yuqian Ma", "Shengzhe Liu"]}
          total={732}
        ></FamilyCard>
        <FamilyCard
          familyName="1320/Unilodge at Whitaker Pl. Apt."
          familyMembers={[
            "Bo Pang",
            "Tianchuan Mi",
            "Bo Li",
            "Tianqi Jiang",
            "Haoru Guan",
          ]}
          total={711}
        ></FamilyCard>
      </div>
    </>
  );
};

export default FamilyCardList;
