import { atom, selector } from "recoil";
import { User } from "@/generated/prisma";
import axios from "axios";

export const userState = atom<User | null>({
    key: "userStateee",
    default: selector({
        key: "userStateSelector",
        get: async () => {
            const res = await axios.get("/api/getProfileDetails");
            return res.data
        }
    }),
}); 