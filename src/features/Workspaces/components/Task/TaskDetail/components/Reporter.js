// useEffect(() => {
//   const handleUpdateStatus = async () => {
//     try {
//       await updateTask(
//         axiosToken,
//         taskDetail.id,
//         {
//           status: status.name,
//         },
//         dispatch
//       );
//       await getListTask(axiosToken, taskDetail.idProject, dispatch);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   handleUpdateStatus();
// }, [status]);
// useEffect(() => {
//   const handleUpdatePriority = async () => {
//     try {
//       await updateTask(
//         axiosToken,
//         taskDetail.id,
//         {
//           priority: priority.name,
//         },
//         dispatch
//       );
//       await getListTask(axiosToken, taskDetail.idProject, dispatch);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   handleUpdatePriority();
// }, [priority]);
// useEffect(() => {
//   const handleUpdateAssignees = async () => {
//     try {
//       await updateTask(
//         axiosToken,
//         taskDetail.id,
//         {
//           assignees: assignees.reduce((acc, cur) => {
//             return [...acc, cur.id];
//           }, []),
//         },
//         dispatch
//       );
//       await getListTask(axiosToken, taskDetail.idProject, dispatch);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   handleUpdateAssignees();
// }, [assignees]);
// useEffect(() => {
//   const handleUpdateReporter = async () => {
//     try {
//       await updateTask(
//         axiosToken,
//         taskDetail.id,
//         {
//           reporter: reporter.name,
//         },
//         dispatch
//       );
//       await getListTask(axiosToken, taskDetail.idProject, dispatch);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   handleUpdateReporter();
// }, [reporter]);
//Object.keys(reporter).length === 0
