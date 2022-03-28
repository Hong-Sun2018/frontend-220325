import { memo } from "react";
import PageContainer from "../components/PageContainer";
import TotalSalesView from "../views/totalSales/TotalSalesView";

const TotalSales = () => {


  return (
    <PageContainer pageTitle={'Big Query'}>
      <TotalSalesView /> 
    </PageContainer>
  );
}

export default memo(TotalSales)