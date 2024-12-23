import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const retrieveSession = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Failed to retrieve session:", error);
    return null; 
  }
};

export default retrieveSession;
