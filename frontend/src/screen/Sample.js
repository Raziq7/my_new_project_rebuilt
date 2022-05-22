// import MaterialTable from "material-table";
// import {
//   AddBox,
//   ArrowDownward,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Clear,
//   DeleteOutline,
//   Edit,
//   FilterList,
//   FirstPage,
//   LastPage,
//   Remove,
//   SaveAlt,
//   Search,
//   ViewColumn,
// } from "@material-ui/icons";
// import { forwardRef, useEffect } from "react";
// import { getPurchaseData } from "../actions/productAction";
// import { useDispatch, useSelector } from "react-redux";

// const tableIcons = {
//   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//   DetailPanel: forwardRef((props, ref) => (
//     <ChevronRight {...props} ref={ref} />
//   )),
//   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   PreviousPage: forwardRef((props, ref) => (
//     <ChevronLeft {...props} ref={ref} />
//   )),
//   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//   SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
// };

// function Sample() {
//   const dispatch = useDispatch();
//   let { loading, purchaseData } = useSelector((state) => {
//     return state.purcaseDetails;
//   });

//   console.log(purchaseData, "123456787");
//   useEffect(() => {
//     dispatch(getPurchaseData());
//   }, []);

//   const columns = [
//     { title: "Name", field: "name" },
//     { title: "Size", field: "Size" },
//     { title: "Color", field: "Color" },
//     { title: "Brand", field: "Brand" },
//     { title: "Material", field: "Material" },
//     { title: "Max Qty", field: "Max Qty" },
//     { title: "Qty", field: "Qty" },
//     { title: "Material Type", field: "Material Type" },
//     { title: "vendor Name", field: "vendor Name" },
//     { title: "Action", field: "Action" },

//     {
//       title: "Birth Place",
//       field: "birthCity",
//       lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
//     },
//   ];

//   const data = purchaseData.map((purc) => {
//     return {
//       Name: purc.productName,
//       // Size = purc.description,
//       // category: purc.Size,
//     };
//   });
//   // options = {
//   //   exportButton: true,
//   //   exportCsv: (columns, data) => {
//   //     alert("You should develop a code to export " + data.length + " rows");
//   //   },
//   // };
//   return (
//     <>
//       <MaterialTable
//         style={{ marginLeft: "100px" }}
//         w="100"
//         icons={tableIcons}
//         data={data}
//         columns={columns}
//         title="Overriding Export Function Preview"
//         options={{
//           filtering: true,
//           pageSize: 10,
//           pageSizeOptions: [10, 20, 30, 40, 50],
//           exportButton: true,
//           exportAllData: false,
//         }}
//       />
//     </>
//   );
// }

// export default Sample;
