import type { Profile } from "~/types";
import { storage } from "../service/auth.server";
import { prisma } from "../service/db.server";


// if not expressely ask for full we return only profileId to avoid useless db query

export async function getProfile(request: Request, full = false) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  // Check if profileId is in session to avoid useless db query
  const profileId = await session.get("profileId");

  // Return profileId if it's in session and we don't need full profile
  let profile: Profile = { id: profileId, user_id: session.get("userId") };
  if (!full && profileId) return profile;

  // If we need full profile and profileId is in session we return full profile
  if (full && profileId) {
    const userProfile = await prisma.profiles.findUnique({
      where: { id: profileId },
    });
    return userProfile;
  }

  if (!profileId && !full) {
    const userId = await session.get("userId");
    const userProfile = await prisma.profiles.findUnique({
      where: { user_id: userId },
    });
    if (!userProfile) return null;
    let profile = { id: userProfile.id, user_id: userProfile.user_id };
    return profile;
  }

  if (!profileId && full) {
    const userId = await session.get("userId");
    const userProfile = await prisma.profiles.findUnique({
      where: { user_id: userId },
    });
    if (!userProfile) return null;
    return userProfile;
  }
}
