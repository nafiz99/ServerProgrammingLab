//Synchronous and asynchronous function

//readFile
//writeFile
//appendFile
//Delete
//Rename

const fs = require("fs");

//fs.writeFileSync("demoFile.txt", "We are learning Javascript.");
//fs.appendFileSync("demoFile.txt", "We are learning NodeJs.");
// fs.rename("demoFile.txt", "renamedFile.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Rename successful!");
//   }
// });

// fs.readFile("renamedFile.txt","utf-8", (err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(data);
//     }
// });
// console.log("before");
// fs.readFile("renamedFile.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     fs.appendFile("renamedFile.txt", "Is this a synchronous process?",(err)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Append Successful");
//         }
//     });
//     fs.readFile("renamedFile.txt", "utf-8", (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//       }
//     });
//   }
// });
// console.log("after");

fs.unlink("renamedFile.txt", (err) => {
  if (!err) {
    console.log("Deleted successfully!");
  }
});
