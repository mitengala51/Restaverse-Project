import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;
    return session;
    
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getCurrentUser;
