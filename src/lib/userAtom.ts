// import { atom, selector } from "recoil";
// import { User } from "@/generated/prisma";
// import axios from "axios";

// export const userState = atom<User | null>({
//     key: "userState",
//     default: selector({
//         key: "userStateSelector",
//         get: async () => {
//             const res = await axios.get("http://localhost:3000/api/signup");
//             return res.data
//         }
//     }),
// }); 