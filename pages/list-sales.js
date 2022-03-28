import { memo } from "react";
import PageContainer from "../components/PageContainer";
import ListSalesView from "../views/listSales/ListSalesView";

const ListSales = () => {


  return (
    <PageContainer pageTitle={'Big Query'}>
      <ListSalesView /> 
    </PageContainer>
  );
}

export default memo(ListSales)