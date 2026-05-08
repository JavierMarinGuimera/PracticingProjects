import { currentUser } from "@clerk/nextjs/server";

export const getAdminEmails = () =>
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export const requireAdmin = async () => {
  const user = await currentUser();
  const email = user?.emailAddresses.find(
    (address) => address.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!user || !email || !getAdminEmails().includes(email.toLowerCase())) {
    return null;
  }

  return { id: user.id, email, name: user.fullName ?? "Admin" };
};
