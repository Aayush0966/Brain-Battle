import { getUserId } from "@/utils/cookies";

export default function handler(req, res) {
    const userId = getUserId(req, res);
    res.status(200).json({ userId });
}